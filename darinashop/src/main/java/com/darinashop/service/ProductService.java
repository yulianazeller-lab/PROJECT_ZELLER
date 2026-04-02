package com.darinashop.service;
import com.darinashop.dto.Dtos.*;
import com.darinashop.model.Product;
import com.darinashop.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;
@Service @RequiredArgsConstructor
public class ProductService {
    private final ProductRepository repo;
    public List<ProductResponse> getAll() { return repo.findByActiveTrue().stream().map(this::toResp).collect(Collectors.toList()); }
    public List<ProductResponse> getByCategory(String cat) { return repo.findByCategoryAndActiveTrue(cat).stream().map(this::toResp).collect(Collectors.toList()); }
    public List<ProductResponse> search(String q) { return repo.searchProducts(q).stream().map(this::toResp).collect(Collectors.toList()); }
    public ProductResponse getById(Long id) { return toResp(repo.findById(id).orElseThrow(() -> new RuntimeException("Product not found"))); }
    public ProductResponse create(ProductRequest req) {
        Product p = Product.builder().name(req.getName()).description(req.getDescription()).price(req.getPrice()).stock(req.getStock()).imageUrl(req.getImageUrl()).category(req.getCategory()).build();
        return toResp(repo.save(p));
    }
    public void delete(Long id) { Product p = repo.findById(id).orElseThrow(() -> new RuntimeException("Not found")); p.setActive(false); repo.save(p); }
    public ProductResponse toResp(Product p) {
        ProductResponse r = new ProductResponse();
        r.setId(p.getId()); r.setName(p.getName()); r.setDescription(p.getDescription());
        r.setPrice(p.getPrice()); r.setStock(p.getStock()); r.setImageUrl(p.getImageUrl()); r.setCategory(p.getCategory());
        return r;
    }
}
