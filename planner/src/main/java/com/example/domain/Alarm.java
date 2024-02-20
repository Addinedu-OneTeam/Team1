package com.example.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


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

    private LocalDateTime alarmTime; // 알람 시간

    private String repeatPattern; // 반복 패턴

    private String message; // 알람 메시지

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plan_id", nullable = false)
    private Plan plan;

}
