package com.darinashop.service;
import com.darinashop.dto.Dtos.*;
import com.darinashop.model.*;
import com.darinashop.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;
@Service @RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepo;
    private final ProductRepository productRepo;
    private final UserRepository userRepo;
    private final TelegramNotificationService telegramNotificationService;
    @Transactional
    public OrderResponse createOrder(String email, CreateOrderRequest req) {
        User user = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        List<OrderItem> items = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;
        for (CartItem ci : req.getItems()) {
            Product p = productRepo.findById(ci.getProductId()).orElseThrow(() -> new RuntimeException("Product not found"));
            if (p.getStock() < ci.getQuantity()) throw new RuntimeException("Not enough stock: "+p.getName());
            p.setStock(p.getStock()-ci.getQuantity()); productRepo.save(p);
            items.add(OrderItem.builder().product(p).quantity(ci.getQuantity()).price(p.getPrice()).build());
            total = total.add(p.getPrice().multiply(BigDecimal.valueOf(ci.getQuantity())));
        }
        Order order = Order.builder().user(user).totalPrice(total).build();
        order = orderRepo.save(order);
        for (OrderItem item : items) item.setOrder(order);
        order.setItems(items); order = orderRepo.save(order);
        String msg = "🛒 Нове замовлення #" + order.getId() +
                "\n👤 " + email +
                "\n💰 Разом: €" + total;
        telegramNotificationService.sendMessage(msg);
        return toResp(order);
    }
    public List<OrderResponse> getUserOrders(String email) {
        User user = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        return orderRepo.findByUserOrderByCreatedAtDesc(user).stream().map(this::toResp).collect(Collectors.toList());
    }
    public OrderResponse toResp(Order o) {
        OrderResponse r = new OrderResponse();
        r.setId(o.getId()); r.setTotalPrice(o.getTotalPrice()); r.setStatus(o.getStatus().name()); r.setCreatedAt(o.getCreatedAt());
        r.setItems(o.getItems().stream().map(i -> { OrderItemResponse ir = new OrderItemResponse(); ir.setProductName(i.getProduct().getName()); ir.setQuantity(i.getQuantity()); ir.setPrice(i.getPrice()); return ir; }).collect(Collectors.toList()));
        return r;
    }
}
