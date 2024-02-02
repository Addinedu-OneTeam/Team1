package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.domain.User;
import com.example.service.PlannerService;

import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/web")
public class UserController {
	
	@Autowired 
	public PlannerService plannerService;

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
    public String main(User user, Model model, HttpSession session) {
    	
        if (session.getAttribute("loginUser") == null) {
            return "redirect:/";
        }
//		session.invalidate();
        return "calendar/calendar2";
    }
    
	
}
