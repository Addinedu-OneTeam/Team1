package com.example.controller;

import com.example.domain.User;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/web")
public class UserController {

    @RequestMapping("/")
    public String root() throws Exception {
        return "index";
    }

    @GetMapping("/signup")
    public String sign(Model model) {
        model.addAttribute("user", new User());
        return "user/signup";
    }

    @GetMapping("/main")
    public String main(HttpSession session) {
        if (session.getAttribute("loginUser") == null) {
            return "redirect:/";
        }
//        session.invalidate();
        return "calendar/calendar";
    }
}
