package com.example.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.domain.Plan;
import com.example.service.PlannerService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/plan")
public class PlannerApiController {

    @Autowired
    private PlannerService plannerService;

    @Autowired
    HttpSession session;

    // 일정 추가
    @PostMapping("/insert")
    @ResponseBody
    public Plan insert(@RequestBody Plan plan) {
        plan.setUserEmail((String) session.getAttribute("loginUser"));
        return plannerService.insert(plan);
    }

    // 일정 목록 조회
    @GetMapping("/selectList")
    @ResponseBody
    public List<Map<String, Object>> selectList() {
        String userEmail = (String) session.getAttribute("loginUser");
        return plannerService.selectList(userEmail);
    }

    // 일정 상세 조회
    @GetMapping("/selectDetail/{id}")
    @ResponseBody
    public Plan selectDetail(@PathVariable(name = "id") Long id) {
        return plannerService.selectDetail(id).orElse(null);
    }

    // 일정 수정
    @PutMapping("/update")
    @ResponseBody
    public Plan update(@RequestBody Plan plan) {
        return plannerService.update(plan);
    }

    // 일정 삭제
    @DeleteMapping("/delete/{id}")
    @ResponseBody
    public void delete(@PathVariable(name = "id") Long id) {
        plannerService.delete(id);
    }
}

