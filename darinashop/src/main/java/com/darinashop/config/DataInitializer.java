package com.darinashop.config;
import com.darinashop.model.Product;
import com.darinashop.model.User;
import com.darinashop.repository.ProductRepository;
import com.darinashop.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.math.BigDecimal;
import java.util.List;
@Configuration @RequiredArgsConstructor
public class DataInitializer {
    @Bean CommandLineRunner initData(ProductRepository productRepo, UserRepository userRepo, PasswordEncoder encoder) {
        return args -> {
            if (!userRepo.existsByEmail("admin@darinashop.com")) {
                userRepo.save(User.builder().email("admin@darinashop.com").password(encoder.encode("admin123")).name("Darina").role(User.Role.ADMIN).build());
            }
            if (productRepo.count() == 0) {
                productRepo.saveAll(List.of(
                    Product.builder().name("Lavender 15mL").description("Лаванда — універсальна олія для розслаблення, сну та догляду за шкірою. Заспокоює, знімає стрес, допомагає при подразненні шкіри.").price(new BigDecimal("32.00")).stock(50).category("Одиночні олії").imageUrl("lavender").build(),
                    Product.builder().name("Lemon 15mL").description("Лимон — освіжаюча цитрусова олія. Очищує поверхні, підтримує імунітет, додає енергії. Для 1 пляшки потрібно 45 лимонів.").price(new BigDecimal("14.67")).stock(60).category("Одиночні олії").imageUrl("lemon").build(),
                    Product.builder().name("Peppermint 15mL").description("М'ята перцева — охолоджує, бадьорить, допомагає при головному болю та нудоті. Чудово діє при дифузії.").price(new BigDecimal("27.33")).stock(55).category("Одиночні олії").imageUrl("peppermint").build(),
                    Product.builder().name("Frankincense 15mL").description("Ладан — «король олій». Підтримує здорову шкіру, покращує медитацію, зміцнює імунітет. Одна з найцінованіших олій doTERRA.").price(new BigDecimal("93.33")).stock(20).category("Одиночні олії").imageUrl("frankincense").build(),
                    Product.builder().name("Tea Tree (Melaleuca) 15mL").description("Чайне дерево — природний антисептик. Ідеально для очищення шкіри, боротьби з недосконалостями та домашнього прибирання.").price(new BigDecimal("24.67")).stock(45).category("Одиночні олії").imageUrl("teatree").build(),
                    Product.builder().name("Wild Orange 15mL").description("Дикий апельсин — піднімає настрій, заряджає енергією, чудово очищує. Найпопулярніша цитрусова олія doTERRA.").price(new BigDecimal("13.00")).stock(70).category("Одиночні олії").imageUrl("wildorange").build(),
                    Product.builder().name("Eucalyptus 15mL").description("Евкаліпт — підтримує вільне дихання, освіжає повітря, ідеальний при сезонних застудах.").price(new BigDecimal("22.67")).stock(40).category("Одиночні олії").imageUrl("eucalyptus").build(),
                    Product.builder().name("Ylang Ylang 15mL").description("Іланг-іланг — квіткова екзотична олія. Балансує настрій, підтримує здоров'я шкіри та волосся.").price(new BigDecimal("44.00")).stock(25).category("Одиночні олії").imageUrl("ylangylang").build(),
                    Product.builder().name("On Guard® Protective Blend 15mL").description("Захисна суміш — підтримує імунну систему, захищає від сезонних загроз. Містить Wild Orange, Clove, Cinnamon, Eucalyptus, Rosemary.").price(new BigDecimal("40.00")).stock(35).category("Суміші").imageUrl("onguard").build(),
                    Product.builder().name("Breathe® Respiratory Blend 15mL").description("Дихальна суміш — підтримує чисте дихання, створює відчуття свіжості. Ідеальна для дифузора вночі.").price(new BigDecimal("32.67")).stock(30).category("Суміші").imageUrl("breathe").build(),
                    Product.builder().name("DigestZen® Digestive Blend 15mL").description("Травна суміш — підтримує здорове травлення, зменшує дискомфорт після їжі. Містить Ginger, Fennel, Coriander.").price(new BigDecimal("44.00")).stock(28).category("Суміші").imageUrl("digestzen").build(),
                    Product.builder().name("Serenity® Restful Blend 15mL").description("Суміш для відпочинку — сприяє глибокому розслабленню та спокійному сну. Містить Lavender, Cedarwood, Ho Wood.").price(new BigDecimal("40.00")).stock(32).category("Суміші").imageUrl("serenity").build(),
                    Product.builder().name("Balance® Grounding Blend 15mL").description("Заземлювальна суміш — створює відчуття спокою та рівноваги. Ідеальна для ранкової медитації та йоги.").price(new BigDecimal("28.00")).stock(38).category("Суміші").imageUrl("balance").build(),
                    Product.builder().name("Beginner's Trio Kit").description("Ідеальний старт — 3 найпопулярніші олії doTERRA: Lavender, Lemon, Peppermint. Найкращий подарунок для початківців.").price(new BigDecimal("74.67")).stock(15).category("Набори").imageUrl("triokit").build(),
                    Product.builder().name("Family Essentials Kit").description("Сімейний набір 10×5mL — 10 найнеобхідніших олій для всієї родини.").price(new BigDecimal("150.00")).stock(10).category("Набори").imageUrl("familykit").build(),
                    Product.builder().name("Fractionated Coconut Oil 115mL").description("Фракціонована кокосова олія — ідеальна базова олія для розведення ефірних олій. Не залишає жирних плям.").price(new BigDecimal("22.00")).stock(60).category("Аксесуари").imageUrl("coconut").build(),
                    Product.builder().name("Petal Diffuser").description("Дифузор Petal — ультразвуковий аромадифузор doTERRA. Покриває площу до 30 м², безшумний, до 4 годин роботи.").price(new BigDecimal("41.33")).stock(12).category("Аксесуари").imageUrl("diffuser").build()
                ));
            }
        };
    }
}
