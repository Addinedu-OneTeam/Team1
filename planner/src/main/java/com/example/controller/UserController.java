package com.example.controller;

import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.domain.User;
import com.example.service.PlannerService;

import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/web")
public class UserController {
	
	@Autowired 
	public PlannerService plannerService;

    @Autowired
    public UserService userService;
    @RequestMapping("/")
    public String root() throws Exception {
        return "index";
    }
    @GetMapping("/passwordUpdate")
    public String passwordUpadte(Model model) {
        model.addAttribute("user", new User());
        return "user/passwordUpdate";
    }
    @GetMapping("/login")
    public String login(Model model) {
        model.addAttribute("user", new User());
        return "user/login";
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
//		session.invalidate();
        return "calendar/calendar";
    }


}
