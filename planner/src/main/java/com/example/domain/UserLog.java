package com.example.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "USER_LOG")
public class UserLog {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_log_id_seq")
    @SequenceGenerator(name = "user_log_id_seq", sequenceName = "user_log_id_seq", allocationSize = 1)
    private Long id;

    @Column(name = "login_date")
    private LocalDateTime loginDate;

    @Column(name = "login_status")
    private String loginStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "userId")
    private User user;
}
