package com.example.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class EventDto {
	private String title;
	private LocalDate startDate;
	private LocalDate endDate;
}
