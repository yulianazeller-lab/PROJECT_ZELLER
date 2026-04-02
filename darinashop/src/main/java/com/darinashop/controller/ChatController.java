package com.darinashop.controller;

import com.darinashop.dto.Dtos.ChatRequest;
import com.darinashop.dto.Dtos.ChatResponse;
import com.darinashop.service.AiChatService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

    private final AiChatService chatService;

    @PostMapping
    public ResponseEntity<ChatResponse> chat(@Valid @RequestBody ChatRequest req) {
        return ResponseEntity.ok(
                chatService.chat(req.getMessage(), req.getHistory())
        );
    }
}