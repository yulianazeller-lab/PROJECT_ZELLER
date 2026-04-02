package com.darinashop.service;
import com.darinashop.model.Product;
import com.darinashop.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;
@ExtendWith(MockitoExtension.class)
class ProductServiceTest {
    @Mock private ProductRepository productRepository;
    @InjectMocks private ProductService productService;
    @Test void getAll_returnsProducts() {
        Product p = Product.builder().id(1L).name("Lavender").description("Test").price(new BigDecimal("32.00")).stock(10).category("Oils").active(true).build();
        when(productRepository.findByActiveTrue()).thenReturn(List.of(p));
        assertThat(productService.getAll()).hasSize(1);
    }
    @Test void getById_notFound_throws() {
        when(productRepository.findById(99L)).thenReturn(Optional.empty());
        assertThatThrownBy(() -> productService.getById(99L)).isInstanceOf(RuntimeException.class);
    }
}
