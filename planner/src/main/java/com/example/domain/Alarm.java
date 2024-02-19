package com.example.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.sql.Timestamp;
import java.time.LocalDate;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "ALARM")
public class Alarm {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "alarm_id_seq")
    @SequenceGenerator(name = "alarm_id_seq", sequenceName = "alarm_id_seq", allocationSize = 1)
    private Long alarmId;

    @Column(nullable = false, length = 100)
    private String title;

    @NonNull
    private LocalDate startDate; // 시작일

    @NonNull
    private LocalDate endDate; // 종료일
    // String으로 하면 날짜 변경을 못한다

    @Column
    private int repeat; // 반복 여부
    // 0 = 반복 off
    // 1 = 매일
    // 2 = 매주 해당 요일
    // 3 = 평일만
    // 4 = 주말 및 공휴일

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plan_id", nullable = false)
    private Plan plan;

}