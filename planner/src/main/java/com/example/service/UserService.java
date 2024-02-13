package com.example.service;

import com.example.domain.User;
import com.example.dto.LoginDto;
import com.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder pEncoder;

    public User create(User user) {
        user.setPasswordHash(pEncoder.encode(user.getPasswordHash()));
        return userRepository.save(user);
    }

    public User read(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return user.get();
        }
        return user.get();
    }

    public boolean authenticate(LoginDto loginDto) {
        Optional<User> user = userRepository.findByEmail(loginDto.getEmail());
        if (user.isPresent()) {
            if (pEncoder.matches(loginDto.getPassword(), user.get().getPasswordHash())) {
                return true;
            }
        }
        return false;
    }

    public boolean isEmailUnique(String email) {
        Optional<User> existingUser = userRepository.findByEmail(email);
        System.out.println("있으니가 가입 불가능 false" + !existingUser.isPresent());
        return !existingUser.isPresent();
    }

    public User passwordUpdate(LoginDto loginDto) {
        Optional<User> user = userRepository.findByEmail(loginDto.getEmail());
        System.out.println(user);
        user.get().setPasswordHash(pEncoder.encode(loginDto.getPassword()));
        return userRepository.save(user.get());
    }
}
