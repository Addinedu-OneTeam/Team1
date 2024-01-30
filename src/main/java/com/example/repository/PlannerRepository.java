package com.example.repository;

import java.util.List;

import com.example.domain.Plan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlannerRepository extends JpaRepository<Plan, Long>{

	List<Plan> findAllByuserEmail(String userEmail);

	

}
