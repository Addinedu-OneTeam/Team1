package com.example.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.domain.Plan;
import com.example.repository.PlannerRepository;

@Service
public class PlannerService {

	@Autowired
	public PlannerRepository plannerRepository;
	
	public Plan insert(Plan plan) { // 일정 추가
		return plannerRepository.save(plan);
	}

	
	public List<Map<String, Object>> selectList(String userEmail) { // 일정 목록 조회
		List<Plan> planList = plannerRepository.findAllByuserEmail(userEmail);

		// Plan 객체를 Map으로 변환하는 로직을 추가하면 됩니다.
        List<Map<String, Object>> eventList = 
        	planList.stream().map(plan -> {
        		
	        	Map<String, Object> event = new HashMap<>();
			    event.put("id",plan.getId());
			    event.put("title", plan.getTitle());
			    event.put("allDay", plan.getAllDay());
			    event.put("startDate", plan.getStartDate());
			    event.put("startTime", plan.getStartTime());
			    event.put("endDate", plan.getEndDate());
			    event.put("endTime", plan.getEndTime());
			    event.put("place", plan.getPlace());
			    event.put("repeat", plan.getRepeat());
			    event.put("content", plan.getContent());
			    event.put("alarm", plan.getAlarm());

    		    return event;
    		}).collect(Collectors.toList());
        	return eventList;
	}

	public Optional<Plan> selectDetail(Long id) { // 일정 상세 조회
		return plannerRepository.findById(id);
	}

	
	public Plan update(Plan plan) { // 일정 수정
	    Plan rePlan = plannerRepository.findById(plan.getId()).get();
	    rePlan.setTitle(plan.getTitle());
	    rePlan.setAllDay(plan.getAllDay());
	    rePlan.setStartDate(plan.getStartDate());
	    rePlan.setStartTime(plan.getStartTime());
	    rePlan.setEndDate(plan.getEndDate());
	    rePlan.setEndTime(plan.getEndTime());
	    rePlan.setRepeat(plan.getRepeat());
	    rePlan.setPlace(plan.getPlace());
	    rePlan.setContent(plan.getContent());
	    rePlan.setAlarm(plan.getAlarm());
	    return plannerRepository.save(rePlan);
	}
	
    public void delete(Long	Id) { // 일정 삭제
        plannerRepository.deleteById(Id);
    }


}
