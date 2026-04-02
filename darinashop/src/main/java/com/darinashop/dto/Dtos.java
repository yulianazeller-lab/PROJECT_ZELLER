package com.darinashop.dto;
import jakarta.validation.constraints.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;

public class Dtos {
    @Data public static class RegisterRequest {
        @NotBlank @Email private String email;
        @NotBlank @Size(min=6) private String password;
        @NotBlank private String name;
    }
    @Data public static class LoginRequest {
        @NotBlank @Email private String email;
        @NotBlank private String password;
    }
    @Data public static class AuthResponse {
        private String token; private String name; private String role;
        public AuthResponse(String token, String name, String role) { this.token=token; this.name=name; this.role=role; }
    }
    @Data public static class ProductRequest {
        @NotBlank private String name;
        private String description;
        @NotNull @DecimalMin("0.01") private BigDecimal price;
        @NotNull @Min(0) private Integer stock;
        private String imageUrl;
        @NotBlank private String category;
    }
    @Data public static class ProductResponse {
        private Long id; private String name; private String description;
        private BigDecimal price; private Integer stock; private String imageUrl; private String category;
    }
    @Data public static class CartItem {
        @NotNull private Long productId;
        @NotNull @Min(1) private Integer quantity;
    }
    @Data public static class CreateOrderRequest {
        @NotEmpty private List<CartItem> items;
    }
    @Data public static class OrderResponse {
        private Long id; private List<OrderItemResponse> items;
        private BigDecimal totalPrice; private String status; private LocalDateTime createdAt;
    }
    @Data public static class OrderItemResponse {
        private String productName; private Integer quantity; private BigDecimal price;
    }
    @Data
    public static class ChatRequest {
        @NotBlank
        private String message;

        private List<Map<String, String>> history = new ArrayList<>();
    }
    @Data public static class ChatResponse {
        private String reply;
        public ChatResponse(String reply) { this.reply=reply; }
    }
}
