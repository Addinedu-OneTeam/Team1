package com.example.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Plan {
    @Id
    @SequenceGenerator (
            name = "myPlannerSEQ",
            sequenceName = "Planner_SEQ",
            allocationSize = 1
    )
    @GeneratedValue(generator = "myPlannerSEQ")
    private Long planNo; // 할 일 번호

    @NonNull
    private String title; // 제목

    @Column
    private int allDay; // 하루종일
    // 0 = 하루종일 off
    // 1 = 하루종일 on

    @NonNull
    private LocalDate startDate; // 시작일
    @NonNull
    private LocalDate endDate; // 종료일
    // String으로 하면 날짜 변경을 못한다
    
    private String startTime; // 시작시간
    private String endTime; // 종료시간
    
//    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
//    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "GMT+9")
//    private LocalDateTime startTime;
//    
//    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
//    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "GMT+9")
//    private LocalDateTime endTime;

    @Column
    private int repeat; // 반복 여부
    // 0 = 반복 off
    // 1 = 매일
    // 2 = 매주 해당 요일
    // 3 = 평일만
    // 4 = 주말 및 공휴일

    private String content; // 내용
    private String place; // 위치

    @Column
    private int alarm; // 알람 여부
    // 0 = 알람 off
    // 1 = 알람 on

    @NonNull
    private String userEmail;

}