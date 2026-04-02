package com.darinashop.repository;
import com.darinashop.model.Order;
import com.darinashop.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface OrderRepository extends JpaRepository<Order,Long> {
    List<Order> findByUserOrderByCreatedAtDesc(User user);
}
