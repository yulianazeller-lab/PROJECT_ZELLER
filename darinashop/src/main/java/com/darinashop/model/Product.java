package com.darinashop.model;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
@Entity @Table(name="products") @Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Product {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @Column(nullable=false) private String name;
    @Column(length=1000) private String description;
    @Column(nullable=false) private BigDecimal price;
    @Column(nullable=false) private Integer stock;
    private String imageUrl;
    @Column(nullable=false) private String category;
    @Column(nullable=false) @Builder.Default private Boolean active = true;
}
