package com.example.domain;

import java.time.LocalDate;
import java.time.LocalTime;

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
    private Long id; // 할 일 번호

    @NonNull
    private String title; // 제목

    private String allDay; // 하루종일

    @NonNull
    private LocalDate startDate; // 시작 날짜
    private String startTime; // 시작 시간

    @NonNull
    private LocalDate endDate; // 종료 날짜
    private String endTime; // 종료 시간
 
    private int repeat; // 반복 여부
    private String content; // 내용
    private String place; // 위치

    @Column
    private String alarm; // 알람 여부

    @NonNull
    private String userEmail;
}
