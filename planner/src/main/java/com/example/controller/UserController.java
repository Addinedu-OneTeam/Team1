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

@Controller
@RequestMapping("/web")
public class UserController {
	
	@Autowired 
	public PlannerService plannerService;

    @Autowired
    public UserService userService;

    @Autowired
    HttpSession session;
    @RequestMapping("")
    public String root(Model model) throws Exception {
        System.out.println("세션값" + session.getAttribute("loginUser"));
        if (session.getAttribute("loginUser") != null) {
            model.addAttribute("loginUser", session.getAttribute("loginUser"));
        }
        return "index";
    }
    @GetMapping("/passwordUpdate")
    public String passwordUpadte(Model model) {
        model.addAttribute("user", new User());
        return "user/passwordUpdate";
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
        return "calendar/calendar";
    }

    @GetMapping("/mlogin")
    public String mlogin() {

        return "user/mlogin";
    }

    @GetMapping("/logout")
    public String logout() {
        session.invalidate();
        return "redirect:/web";
    }
}
