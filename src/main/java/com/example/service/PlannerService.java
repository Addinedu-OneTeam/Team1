package com.example.service;

import java.util.List;

import com.example.domain.Plan;
import com.example.repository.PlannerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlannerService {

	@Autowired
	public PlannerRepository plannerRepository;
	
	public Plan insert(Plan plan) {
		return plannerRepository.save(plan);
	}


	public List<Plan> select(String userEmail) {
		return plannerRepository.findAllByuserEmail(userEmail);
		
	}

}
