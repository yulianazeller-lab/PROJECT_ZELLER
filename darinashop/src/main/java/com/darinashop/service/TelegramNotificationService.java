package com.darinashop.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import java.net.URI;

@Service
public class TelegramNotificationService {

    @Value("${telegram.bot-token}")
    private String botToken;

    @Value("${telegram.chat-id}")
    private String chatId;

    public void sendMessage(String text) {
        try {
            URI uri = UriComponentsBuilder
                    .fromHttpUrl("https://api.telegram.org/bot" + botToken + "/sendMessage")
                    .queryParam("chat_id", chatId)
                    .queryParam("text", text)
                    .build()
                    .toUri();
            new RestTemplate().getForObject(uri, String.class);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}