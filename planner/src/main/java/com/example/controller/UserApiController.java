package com.example.controller;

import com.example.domain.User;
import com.example.dto.LoginDto;
import com.example.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
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
    public User create(@RequestBody User user) {
        System.out.println("회원가입 해줘" + user.getEmail());
        return userService.create(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto, HttpSession session) {
        User loginUser = userService.authenticate(loginDto);
        if (loginUser != null) {
            session.setAttribute("loginUser", loginUser);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PutMapping("/password-update")
    public User passwordUpdate(@RequestBody LoginDto loginDto) {
        return userService.passwordUpdate(loginDto);
    }

    @GetMapping("/checkDuplicateEmail")
    public boolean checkDuplicateEmail(@RequestParam("fullEmail") String email) {
        return userService.isEmailUnique(email);
    }


}

