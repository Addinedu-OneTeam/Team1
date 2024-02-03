//package com.example.domain;
//
//import jakarta.persistence.*;
//
//import java.sql.Timestamp;
//
//@Entity
//@Table(name = "Alarm")
//public class Alarm {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "alarm_id_seq")
//    @SequenceGenerator(name = "alarm_id_seq", sequenceName = "alarm_id_seq", allocationSize = 1)
//    private Long alarmId;
//
//    @ManyToOne
//    @JoinColumn(name = "planner_id", nullable = false)
//    private Plan plan;
//
//    @Column(nullable = false, length = 100)
//    private String title;
//
//    @Column(nullable = false)
//    private Timestamp time;
//
//}
