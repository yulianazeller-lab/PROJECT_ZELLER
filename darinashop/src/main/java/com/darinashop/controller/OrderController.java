package com.darinashop.controller;
import com.darinashop.dto.Dtos.*;
import com.darinashop.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/api/orders") @RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;
    @PostMapping public ResponseEntity<OrderResponse> create(@AuthenticationPrincipal UserDetails ud, @Valid @RequestBody CreateOrderRequest req) { return ResponseEntity.ok(orderService.createOrder(ud.getUsername(), req)); }
    @GetMapping public ResponseEntity<List<OrderResponse>> getMine(@AuthenticationPrincipal UserDetails ud) { return ResponseEntity.ok(orderService.getUserOrders(ud.getUsername())); }
}
