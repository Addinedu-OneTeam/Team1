package com.example.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.domain.Plan;
import com.example.repository.PlannerRepository;

@Service
public class PlannerService {

	@Autowired
	public PlannerRepository plannerRepository;
	
	// 일정 추가
	public Plan insert(Plan plan) {
		return plannerRepository.save(plan);
	}

	// 일정 조회
	public List<Map<String, Object>> selectList(String userEmail) {
		List<Plan> planList = plannerRepository.findAllByuserEmail(userEmail);

		// Plan 객체를 Map으로 변환하는 로직을 추가하면 됩니다.
        List<Map<String, Object>> eventList = 
        		planList.stream().map(plan -> {
							        		    Map<String, Object> event = new HashMap<>();
							        		    event.put("title", plan.getTitle());
							        		    event.put("start", plan.getStartDate());
							        		    event.put("end", plan.getEndDate());
							        		    // 필요한 필드들을 추가로 넣어주면 됩니다.
							        		    return event;
							        		})
							        		.collect(Collectors.toList());

        return eventList;
	}

	/*public Optional<Plan> selectDetail(Long planNo, String userEmail) {
		return plannerRepository.findByUserEmailAndPlanNo(planNo, userEmail);
	}*/


}
