package com.example.controller;

import java.time.LocalDate;

import com.example.domain.Plan;
import com.example.service.PlannerService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class PlannerController {
	
	@Autowired 
	public PlannerService plannerService;
	
	// 일정 추가
	@PostMapping("/insert")
	@ResponseBody
	public String insert(@RequestBody Plan plan, HttpSession session) {
		plan.setUserEmail((String)session.getAttribute("loginUser"));
		plannerService.insert(plan);
		return "success";
	}


//	public String insert(@RequestParam("title") String title,
//						 @RequestParam("startDate") LocalDate startDate,
//						 @RequestParam("startTime") String startTime,
//						 @RequestParam("endDate") LocalDate endDate,
//						 @RequestParam("endTime") String endTime,
//						 @RequestParam("content") String content,
//						 @RequestParam("place") String place,
//						 Plan plan, HttpSession session) {
//
//		plan.setTitle(title);
//		plan.setStartDate(startDate);
//		plan.setStartTime(startTime);
//		plan.setEndDate(endDate);
//		plan.setEndTime(endTime);
//		plan.setContent(content);
//		plan.setPlace(place);
//		plan.setUserEmail((String)session.getAttribute("loginUser"));
//
//		plannerService.insert(plan);
//		return "success";
//	}
	
	/*
	 * // 일정 조회
	 * 
	 * @GetMapping("select") public String select(@RequestParam(value="userEmail")
	 * String userEmail, HttpSession session , Model model) {
	 * 
	 * if(session.getAttribute("loginUser") != null) { }
	 * model.addAttribute("userplanner", plannernerService.select(userEmail)); return
	 * "calendar/mCalendar"; }
	 */
	
}
