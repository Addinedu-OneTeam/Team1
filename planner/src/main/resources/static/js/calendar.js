
	  // 날짜를 받아와서 해당 요일의 문자열을 반환하는 함수
	  function getDayOfWeek(date) {
		    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
		    const dayIndex = date.getDay();
		    return `(${daysOfWeek[dayIndex]})`;
		}
	  
	 // 풀캘린더 api
    document.addEventListener('DOMContentLoaded', function () {
		
      var calendarEl = document.getElementById('calendar');
      var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth', // 처음 실행시 월별달력으로 실행
        fixedWeekCount: false, // 달력 마지막주 까지만 출력되게
        editable: true,
        
        headerToolbar: {
          left: 'prevYear,prev,next,nextYear today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        
        //시간표시 (ex - 01:30)
        eventTimeFormat: {
            hour: '2-digit',
            minute: '2-digit',
            meridiem: false,
            hour12: false
        },
       
        buttonText: {
	        today: '今日',
	        month: '月',
	        week: '週',
	        day: '日',
	        list: '目錄'
	      },
		locale: 'ja',
        selectable: true,
        


        dateClick: function (info) {
          // info 객체에 선택된 날짜의 정보가 담겨 있음
          //console.log(info);
          
          // FullCalendar에서 날짜를 클릭했을 때 flatpickr 시작일 종료일에 날짜만 넘어가게 하기(이렇게 안하면 2024-02-03T09:00:00+09:00 이렇게 넘어감 )
	      var clickedDate = info.date;
	      
	      var formattedDate = moment(clickedDate).format('YYYY-MM-DD(ddd)')
	      //var formattedDate = moment(clickedDate).format('YYYY-MM-DD') + getDayOfWeek(clickedDate);
	      
	      // 풀캘린더 날짜 클릭시 우측 시작일 종료일에 동기화  
	      document.getElementById('startDate').value = formattedDate;
	      document.getElementById('endDate').value = formattedDate;
	      document.getElementById('dateInput').value = formattedDate;
	      
	      // flatpickr 시작일과 종료일 업데이트 및 열기 이렇게하면 풀캘린더 클릭시 flatpickr도 같이 바뀜
            updateFlatpickr('#startDate', formattedDate);
            updateFlatpickr('#endDate', formattedDate);
            updateFlatpickr('#dateInput', formattedDate);
	      
        }
      });
      
      
       // 풀캘린더와 플랫피커 날짜 클릭시 동기화 시켜주기
       // 이걸 해주면 풀캘린더에서 날짜 클릭시 시작일 종료일 달력도 같이 업데이트되어서 해당 날짜로 바뀜
       function updateFlatpickr(selector, date) {
	        // flatpickr 입력란 업데이트 및 열기
	        var inputElement = document.querySelector(selector);
	        
	        var flatpickrInstance = inputElement._flatpickr;
	        
	        if (flatpickrInstance) {
	            flatpickrInstance.setDate(date, true);
	        }
	    }
	    
	    
      
      // FullCalendar 렌더링
      calendar.render();
      
      // 기본제공되는 today버튼을 커스터마이징한 today버튼으로 교체하고 숨기기
	  $('.fc-today-button').hide();	//숨기기
	  var todayButton = $('.fc-today-button');
	  todayButton.replaceWith($('#todayButton'));
	  // 숨기기를 먼저하고 .replaceWith를 이용하여 커스터마이징버튼으로 바꾸기. 숨기기를 먼저해야 달력전체에 적용이된다.
	  
	
	  // 오늘 버튼 클릭 시의 동작  내가 커스터마이징한 버튼
	  $('#todayButton').on('click', function () {
	    const today = new Date();
	    calendar.gotoDate(today);
	  });
      

      // 일정추가 
      $('#eventForm').submit(function (e) {
        e.preventDefault();
        
        var title = $('#title').val();
        var startDate = $('#startDate').val();
        var endDate = $('#endDate').val();
        var startTime = $('#startTime').val();
        var endTime = $('#endTime').val();
        var content = $('#content').val();
        var allDay = $('#allDay').is(':checked'); // 종일 체크 여부
        var repeatOption = $('#repeat').val();

        
		// 일정추가시 all-day로 가지않게, 날짜와 시간이 달력에 출력되게하기
		var eventStartTime, eventEndTime;

	    if (allDay) {
	        eventStartTime = startDate;
	        eventEndTime = endDate;
	    } else { // 종일이 아니면 시작 시간과 종료 시간을 ISO 8601 형식으로 조합
	        eventStartTime = startDate + 'T' + startTime;
	        eventEndTime = endDate + 'T' + endTime;
	        
	        // ISO 8601 형식에서 'T'는 날짜와 시간을 나누는 구분자로 사용
	        // "2024-01-31T12:30:00"은 2024년 1월 31일의 날짜와 12시 30분의 시간을 나타냄
	        //  'T'는 "2024-01-31"과 "12:30:00"을 나누는 역할을 함
	    }
	
	    // 일정추가시 all-day로 가지않게, 날짜와 시간 달력에 출력되게하기 
	    if (title) {
	        var event = {
	            title: title,
	            start: eventStartTime,
	            end: eventEndTime,
	            allDay: allDay // 종일(all-day) 여부
	        };
	        calendar.addEvent(event);
         }
         
         
      });


	  // flatpickr api 
      const dateInput = document.getElementById('dateInput');
      const startDateInput = document.getElementById('startDate');
	  const endDateInput = document.getElementById('endDate');


	  // flatpickr 클릭시 fullcalendar 연동
      function handleDateChange(selectedDates, dateStr, instance) {
        //console.log('선택된 날짜:', dateStr);
        // 선택된 날짜를 fullcalendar에 전달
        calendar.gotoDate(moment(dateStr).format('YYYY-MM-DD'));
      }
      
      
      // todayButton(今日) 버튼 클릭 시 Flatpickr 날짜 갱신(좌상단 flatpickr 버튼)
	  document.getElementById('todayButton').addEventListener('click', function () {
	    const today = new Date();
	    dateInput._flatpickr.setDate(today, true); // 미니달력 갱신
	    startDateInput._flatpickr.setDate(today, true); // 시작일 갱신
	    endDateInput._flatpickr.setDate(today, true); // 종료일 갱신
	
	    // FullCalendar에서 오늘 날짜로 이동
	    calendar.gotoDate(today);
	  });
	  
	  // FullCalendar 렌더링
    	calendar.render();


	// 좌상단 미니달력
      flatpickr(dateInput, {
		parent: document.getElementById('flatpickr-container'),
        inline: true,
        dateFormat: 'Y-m-d',
        enableTime: false,
        //minDate: 'today',		// 현재날짜 이전의 날짜 선택불가
        defaultDate: 'today',
        locale: 'ja',
        time_24hr: true, // 24시간 형식으로 표시
        onChange:  function (selectedDates, dateStr, instance) {
			            // 좌상단 미니 달력의 날짜가 변경될 때 시작일과 종료일 달력에도 업데이트
			            updateFlatpickr('#startDate', dateStr);
			            updateFlatpickr('#endDate', dateStr);
					   
			        },
      }).open();
      
      // 일정추가 시작달력
      flatpickr("#startDate", {
		dateFormat: 'Y-m-d',
		enableTime: false,
		//minDate: 'today',
		defaultDate: 'today',
		locale: 'ja',
		time_24hr: true, // 24시간 형식으로 표시
		onChange: function(selectedDates, dateStr, instance) {
				        // 날짜 선택 이벤트 핸들러 등록
				        handleDateChange(selectedDates, dateStr, instance);
				        // 종료일의 flatpickr 가져오기
				        const endDatePicker = endDateInput._flatpickr;
				
				        // 종료일이 시작일보다 이전인 경우에만 동기화
				        if (endDatePicker && endDatePicker.selectedDates[0] < selectedDates[0]) {
				            endDatePicker.setDate(selectedDates, true);
				        }
				    },
		appendTo: document.getElementById('flatpickr-container-start')
	});

	// 일정추가 종료달력
	flatpickr("#endDate", {
		dateFormat: 'Y-m-d',
		enableTime: false,
		//minDate: 'today',
		defaultDate: 'today',
		locale: 'ja',
		time_24hr: true, // 24시간 형식으로 표시
		onChange: function(selectedDates, dateStr, instance) {
				        handleDateChange(selectedDates, dateStr, instance);
				        // 시작일의 flatpickr 가져오기
				        const startDatePicker = startDateInput._flatpickr;
				        
				
				        if (startDatePicker) {
				            const startDate = startDatePicker.selectedDates[0];
				
				            // 종료일이 시작일보다 이전인 경우에는 시작일과 종료일을 동기화
				            if (startDate && startDate > selectedDates[0]) {
				                startDatePicker.setDate(selectedDates, true);
				            }
				            
				        }
				    },
		appendTo: document.getElementById('endDate').parentNode
		
	});
      
    });

  
//  <!-- ajax -->

		function insertPlan() {
			// 폼에서 데이터 가져오기
		    var plan = {
		        title: $('#title').val(),
		        startDate: $('#startDate').val(),
		        startTime: null,  // 시작 시간 초기화
		        endDate: $('#endDate').val(),
		        endTime: null,    // 종료 시간 초기화
		        content: $('#content').val(),
		        place: $('#place').val()
		    };
		
		    // 종일(all-day) 체크 여부 확인
		    var allDayChecked = $('#allDay').is(':checked');
		    
		    if (!allDayChecked) {
		        // 종일이 아니면 시작 시간과 종료 시간을 설정
		        plan.startTime = $('#startTime').val();
		        plan.endTime = $('#endTime').val();
		    }
		   
			$.ajax({
				type:"post",
				url: "/insert",
				contentType: "application/json",
				data: JSON.stringify(plan),
				success: function (response) {
					console.log(response);
					
					// 입력 필드 초기화
	                $('#title').val('');
	                $('#startTime').val('');
	                $('#endTime').val('');
	                $('#content').val('');
	                $('#place').val('');
				},
				error: function (error) {
		            console.error('ajax 실패실패실패 :', error);
		        }
			})
		};

	
//	<!-- 종일체크시 시간 활성/비활성 -->

		// 종일(all-day) 체크박스
		$('#allDay').change(function () {
		  if (this.checked) {
		    // 종일 체크되었을 때
		    $('#timeInputs').addClass('blurred');
		  } else {
		    // 종일 체크가 해제되었을 때
		    $('#timeInputs').removeClass('blurred');
		  }
		});

	
//	<!-- 시간설정 15분단위(24시간) -->

		function populateTimeDropdown(selectElement) {
		    for (let hour = 0; hour < 24; hour++) {
		        for (let minute = 0; minute < 60; minute += 15) {
		            const formattedHour = hour.toString().padStart(2, '0');
		            const formattedMinute = minute.toString().padStart(2, '0');
		            const optionText = `${formattedHour}:${formattedMinute}`;
		            
		            const optionElement = document.createElement('option');
		            optionElement.value = optionText;
		            optionElement.textContent = optionText;
		            
		            selectElement.appendChild(optionElement);
		        }
		    }
		}
		
		// 시작 시간과 종료 시간 드롭다운을 채우기
		const startTimeDropdown = document.getElementById('startTime');
		const endTimeDropdown = document.getElementById('endTime');
		
		populateTimeDropdown(startTimeDropdown);
		populateTimeDropdown(endTimeDropdown);
		
		// startTime 드롭다운에 이벤트 리스너 추가
		startTimeDropdown.addEventListener('change', function() {
		    // 선택된 startTime 가져오기
		    const selectedStartTime = this.value;
		
		    // 선택된 startTime을 기반으로 endTime 드롭다운의 옵션 업데이트
		    updateEndTimeOptions(selectedStartTime);
		});
		
		// endTime 드롭다운의 옵션을 업데이트하는 함수
		function updateEndTimeOptions(selectedStartTime) {
		    const endTimeDropdown = document.getElementById('endTime');
		    
		    // startTime선택 이후의 옵션만 남기기 (ex - 11:)
		    const filteredOptions = Array.from(endTimeDropdown.options).filter(option => option.value > selectedStartTime);
		    
		    // 옵션을 비우고 새로운 옵션으로 채우기
		    endTimeDropdown.innerHTML = '';
		    for (const option of filteredOptions) {
		        endTimeDropdown.appendChild(option.cloneNode(true));
		    }
		
		    // 기본 선택된 옵션을 첫 번째 유효한 옵션으로 설정
		    endTimeDropdown.selectedIndex = 0;
		}
		
