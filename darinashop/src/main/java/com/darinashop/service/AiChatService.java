
package com.darinashop.service;

import com.darinashop.dto.Dtos.ChatRequest;
import com.darinashop.dto.Dtos.ChatResponse;
import com.darinashop.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AiChatService {

    private final ProductRepository productRepo;

    private final WebClient.Builder webClientBuilder;

    @Value("${OPENAI_API_KEY}")
    private String apiKey;

    @Value("${openai.api.url:https://api.openai.com/v1/chat/completions}")
    private String apiUrl;

    @Value("${openai.api.model:gpt-3.5-turbo}")
    private String model;
    @Value("${telegram.bot-token}")
    private String telegramToken;

    @Value("${telegram.chat-id}")
    private String telegramChatId;
    public ChatResponse chat(String message, List<Map<String, String>> history) {

        String products = productRepo.findByActiveTrue()
                .stream()
                .map(p -> String.format("- %s (%s): €%.2f, залишок: %d шт",
                        p.getName(),
                        p.getCategory(),
                        p.getPrice(),
                        p.getStock()
                ))
                .collect(Collectors.joining("\n"));

        String systemPrompt = """
                Ти — Дарина, дружній AI-консультант магазину ефірних олій doTERRA.
                Відповідай ТІЛЬКИ українською мовою. Будь теплою і турботливою.
                
                🌿 ДОСТУПНІ ТОВАРИ В МАГАЗИНІ:
                """ + products + """
                
                📋 СЦЕНАРІЇ — як відповідати на різні питання:
                
                1. ПІДБІР ОЛІЇ ЗА ПРОБЛЕМОЮ:
                   - Стрес, тривога, нервозність → Lavender, Balance, Serenity
                   - Слабкий імунітет → OnGuard, Oregano, Frankincense
                   - Немає енергії, втома → Peppermint, Wild Orange, Motivate
                   - Погано сплю → Serenity, Lavender, Vetiver
                   - Болять м'язи → Deep Blue, AromaTouch
                   - Проблеми з травленням → DigestZen, Ginger, Peppermint
                   - Проблеми зі шкірою → Frankincense, Tea Tree, HD Clear
                   - Головний біль → Peppermint, Past Tense
                   - Застуда, кашель → Breathe, OnGuard, Eucalyptus
                
                2. СПОСОБИ ВИКОРИСТАННЯ (завжди пояснюй):
                   - Дифузор: додай 3-5 крапель у воду дифузора
                   - На шкіру: розбав з кокосовою олією (1 крапля олії + 3 краплі носія)
                   - Для чутливої шкіри і дітей: ОБОВ'ЯЗКОВО розбавляти!
                   - Цитрусові олії (Wild Orange, Lemon): не наносити перед виходом на сонце
                
                3. ПИТАННЯ ПРО ЦІНИ:
                   - Дивись у список товарів вище і називай точну ціну
                   - Якщо товару немає в списку — скажи що уточниш наявність
                
                4. ПОРІВНЯННЯ ОЛІЙ:
                   - Поясни різницю просто і зрозуміло
                   - Наприклад: Lavender — для спокою і сну, Serenity — глибше розслаблення
                
                5. ПИТАННЯ ПРО НАБОРИ:
                   - Starter Kit — ідеально для початківців, базові олії
                   - Family Essentials — для родини з дітьми
                   - Emotional Aromatherapy — для емоційного балансу
                
                6. ЗАСТЕРЕЖЕННЯ (завжди згадуй якщо доречно):
                   - Вагітність: проконсультуйся з лікарем перед використанням
                   - Діти до 6 років: тільки розбавлені, і не всі олії підходять
                   - Це не ліки і не замінює медичну допомогу
                
                7. ЯКЩО НЕ ЗНАЄШ ВІДПОВІДІ:
                   - Скажи: "Дозвольте уточнити це питання у Дарини особисто"
                   - Запропонуй написати на пошту або у Viber/Telegram
                
                ❌ НІКОЛИ:
                   - Не давай медичних діагнозів
                   - Не обіцяй вилікувати хвороби
                   - Не відповідай на теми не пов'язані з магазином
                
                Завжди закінчуй відповідь доброзичливо і пропонуй наступний крок 🌿
                """;

        Map<String, Object> body = Map.of(
                "model", model,
                "messages", buildMessages(systemPrompt, history, message),
                "max_tokens", 500,
                "temperature", 0.7
        );

        try {
            Map resp = webClientBuilder.build()
                    .post()
                    .uri(apiUrl)
                    .header("Authorization", "Bearer " + apiKey)
                    .header("Content-Type", "application/json")
                    .bodyValue(body)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            List<Map> choices = (List<Map>) resp.get("choices");
            Map msg = (Map) choices.get(0).get("message");
            sendTelegramNotification(message, (String) msg.get("content"));
            return new ChatResponse((String) msg.get("content"));
        } catch (Exception e) {
            return new ChatResponse(
                    "Вибачте, зараз маю технічні труднощі. " +
                            "Напишіть нам у Viber або Telegram — відповімо одразу! 🌿"
            );

        }
        }
        private List<Map<String, String>> buildMessages(
                String systemPrompt,
                List<Map<String, String>> history,
                String newMessage) {

            List<Map<String, String>> messages = new ArrayList<>();

            messages.add(Map.of("role", "system", "content", systemPrompt));

            List<Map<String, String>> recentHistory = history.size() > 10
                    ? history.subList(history.size() - 10, history.size())
                    : history;

            messages.addAll(recentHistory);

            messages.add(Map.of("role", "user", "content", newMessage));

            return messages;

    }
    private void sendTelegramNotification(String userMessage, String botReply) {
        try {
            String text = "🌿 Новий запит в чаті!\n\n"
                    + "👤 Клієнт: " + userMessage + "\n\n"
                    + "🤖 Відповідь: " + botReply;

            String url = "https://api.telegram.org/bot" + telegramToken + "/sendMessage";
            Map<String, Object> body = Map.of(
                    "chat_id", telegramChatId,
                    "text", text
            );

            webClientBuilder.build()
                    .post()
                    .uri(url)
                    .bodyValue(body)
                    .retrieve()
                    .bodyToMono(String.class)
                    .subscribe();

        } catch (Exception e) {
            System.out.println("Telegram notification failed: " + e.getMessage());
        }
    }
}