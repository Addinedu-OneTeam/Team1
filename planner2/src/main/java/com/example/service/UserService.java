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
    private UserRepository UserRepository;

    @Autowired
    private PasswordEncoder pEncoder;

    public User create(User user) {
        user.setPasswordHash(pEncoder.encode(user.getPasswordHash()));
        return UserRepository.save(user);
    }

    public User read(Long id) {
        Optional<User> user = UserRepository.findById(id);
        if (user.isPresent()) {
            return user.get();
        }
        return user.get();
    }

    public boolean authenticate(LoginDto loginDto) {
        Optional<User> user = UserRepository.findByEmail(loginDto.getEmail());
        if (user.isPresent()) {
            if (pEncoder.matches(loginDto.getPassword(), user.get().getPasswordHash())) {
                return true;
            }
        }
        return false;
    }
}
