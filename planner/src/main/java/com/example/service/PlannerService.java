package com.example.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.domain.Plan;
import com.example.repository.PlannerRepository;

@Service
public class PlannerService {

	@Autowired
	public PlannerRepository plannerRepository;
	
	public Plan insert(Plan plan) {
	    System.out.println("저장완료");
	    return plannerRepository.save(plan);
	}

	// 일정 조회
	public List<Map<String, Object>> selectList(String userEmail) {
		List<Plan> planList = plannerRepository.findAllByuserEmail(userEmail);

		// Plan 객체를 Map으로 변환하는 로직을 추가하면 됩니다.
        List<Map<String, Object>> eventList = 
        		planList.stream().map(plan -> {
							        		    Map<String, Object> event = new HashMap<>();
							        		    event.put("planNo",plan.getPlanNo());
							        		    event.put("title", plan.getTitle());
							        		    event.put("start", plan.getStartDate());
							        		    event.put("end", plan.getEndDate());
							        		    // 필요한 필드들을 추가로 넣어주면 됩니다.
							        		    return event;
							        		})
							        		.collect(Collectors.toList());
        return eventList;
	}
	

	public Optional<Plan> selectDetail(Long planNo) {
		return plannerRepository.findById(planNo);
	}

	public Plan update(Plan plan) {
	    Plan rePlan = plannerRepository.findById(plan.getPlanNo()).get();
	    rePlan.setTitle(plan.getTitle());
	    rePlan.setAllDay(plan.getAllDay());
	    rePlan.setStartDate(plan.getStartDate());
	    rePlan.setEndDate(plan.getEndDate());
	    rePlan.setStartTime(plan.getStartTime());
	    rePlan.setEndTime(plan.getEndTime());
	    rePlan.setRepeat(plan.getRepeat());
	    rePlan.setPlace(plan.getPlace());
	    rePlan.setContent(plan.getContent());
	    rePlan.setAlarm(plan.getAlarm());
	    return plannerRepository.save(rePlan);
	}


}
