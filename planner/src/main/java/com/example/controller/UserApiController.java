package com.example.controller;

import com.example.domain.User;
import com.example.dto.LoginDto;
import com.example.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserApiController {
    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public User read(@PathVariable("id") Long id) {
        return userService.read(id);
    }

    @PostMapping("")
    public User create(@ModelAttribute User user) {
        return userService.create(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto, HttpSession session) {
        boolean isAuthenticated = userService.authenticate(loginDto);
        if (isAuthenticated) {
            session.setAttribute("loginUser", loginDto.getEmail());
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
