package com.darinashop.service;
import com.darinashop.dto.Dtos.*;
import com.darinashop.model.User;
import com.darinashop.repository.UserRepository;
import com.darinashop.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
@Service @RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    private final TelegramNotificationService telegramNotificationService;
    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) throw new RuntimeException("Email already in use");
        User user = User.builder().email(req.getEmail()).password(passwordEncoder.encode(req.getPassword())).name(req.getName()).build();
        userRepository.save(user);
        telegramNotificationService.sendMessage(
                "🌿 Новий користувач: " + req.getEmail()
        );
        return new AuthResponse(jwtUtils.generateToken(user.getEmail()), user.getName(), user.getRole().name());
    }
    public AuthResponse login(LoginRequest req) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword()));
        User user = userRepository.findByEmail(req.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));
        return new AuthResponse(jwtUtils.generateToken(user.getEmail()), user.getName(), user.getRole().name());
    }
}
