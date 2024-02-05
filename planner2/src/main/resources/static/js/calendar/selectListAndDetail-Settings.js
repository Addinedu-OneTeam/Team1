document.addEventListener('DOMContentLoaded', function () {
    // 메인 달력 설정 및 렌더링
    var calendarEl = document.getElementById('main-calendar');
    var mainCalendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: 'prevYear,prev,next,nextYear today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        // 시간표시 (ex - 01:30)
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
        height: '800px', // calendar 높이 설정
        initialView: 'dayGridMonth', // 캘린더를 초기에 월별 뷰로 설정
        initialDate: new Date(), // 달력 처음 로드될때 표시되는 날짜를 현재 날짜로 설정
        navLinks: true, // 요일 및 날짜 클릭 시 일이나 주 단위 보여주는 화면으로 넘어가기
        selectable: true, // 날짜를 선택 및 드래그해서 새 이벤트를 추가 => 날짜 클릭시 파랑색으로 표시해줌
        editable: true, // 드래그해서 수정 여부
        droppable: true, // 타 이벤트 및 요소를 끌어 놓을 수 있게 설정
        dayMaxEvents: true, // +more 표시 전 최대 이벤트 갯수, true는 셀 높이에 의해 결정
        dayMaxEventRows: true, // 셀 높이에 따라 이벤트 표시
        fixedWeekCount: false, // 다음 달에 해당되는 날짜 미리 보여짐 여부
        locale: 'ja', // 원하는 지역(언어)로 설정

        dateClick: function (info) {
            // FullCalendar에서 날짜를 클릭했을 때 flatpickr 시작일 종료일에 날짜만 넘어가게 하기(이렇게 안하면 2024-02-03T09:00:00+09:00 이렇게 넘어감 )
            var clickedDate = info.date;
            var formattedDate = moment(clickedDate).format('YYYY-MM-DD');

            // 풀캘린더 날짜 클릭시 우측 시작일 종료일에 동기화
            document.getElementById('startDate').value = formattedDate;
            document.getElementById('endDate').value = formattedDate;
            document.getElementById('dateInput').value = formattedDate;

            // 미니 달력 시작일과 종료일 업데이트 및 열기 이렇게하면 메인 달력 클릭시 미니 달력도 같이 바뀜
            updateDate('#startDate', formattedDate);
            updateDate('#endDate', formattedDate);
            updateDate('#dateInput', formattedDate);
        }
    });
    
    selectPlans();

    // 일정 조회
    function selectPlans() {
        $.ajax({
            url: '/api/plan/selectList',
            success: function (planList) {
                planList.forEach(function (plan) {
                    addEventToCalendar(plan);
                });
            },
            error: function (error) {
                console.error('일정 불러오기 중 오류 발생:', error);
            }
        });
    }

    function addEventToCalendar(plan) {
		console.log(plan.planNo);
        mainCalendar.addEvent({
            title: plan.title,
            start: plan.start, // 서버에서 받은 시작 날짜
            end: plan.end, // 서버에서 받은 종료 날짜
            
            extendedProps: {
	            planNo: plan.planNo // 이 부분을 추가하여 일정 번호를 저장
	        },
        });
    }
    
    // 클릭 이벤트 핸들러
	mainCalendar.on('eventClick', function (info) {
	    // info.event.extendedProps.planNo를 통해 일정 번호를 가져올 수 있음
	    var planNo = info.event.extendedProps.planNo;
	    console.log(planNo);
	    if (planNo) {
	        showPlanDetail(planNo);
	    }
	});
    
    window.showPlanDetail = function (planNo) {
        $.ajax({
            url: '/api/plan/selectDetail?planNo=' + planNo,
            success: function (plan) {
                fillFormWithPlanDetails(plan);
            },
            error: function (error) {
                console.error('일정 상세 정보 불러오기 중 오류 발생:', error);
            }
        });
    };

	// 폼을 일정의 상세 정보로 채우는 함수
    function fillFormWithPlanDetails(plan) {
        // 폼의 각 입력란에 상세 정보를 설정
        $('#title').val(plan.title);
        $('#allDay').prop('checked', plan.allDay);
        $('#startDate').val(plan.startDate);
        $('#endDate').val(plan.endDate);
        $('#startTime').val(plan.startTime);
        $('#endTime').val(plan.endTime);
        $('#place').val(plan.place);
        $('#repeat').val(plan.repeat);
        $('#content').val(plan.content);
        $('#alarm').prop('checked', plan.alarm);

        // 기타 필요한 정보도 필요에 따라 추가

        // 사용자에게 보여주기 위해 폼을 표시
        $('#eventForm').show();
    }
    
    // 메인 달력과 미니 달력의 날짜 동기화
    // 이걸 해주면 메인 달력에서 날짜 클릭시 시작일 종료일 달력도 같이 업데이트되어서 해당 날짜로 바뀜
    function updateDate(selector, date) {
        // 미니 달력 입력란(시작일 종료일 입력란) 업데이트 및 열기
        var inputElement = document.querySelector(selector);

        var flatpickrInstance = inputElement._flatpickr;

        if (flatpickrInstance) {
            flatpickrInstance.setDate(date, true);
        }
    }

    // FullCalendar 렌더링
    mainCalendar.render();

    // 기본제공되는 today버튼을 커스터마이징한 today버튼으로 교체하고 숨기기
    $('.fc-today-button').hide(); //숨기기
    var todayButton = $('.fc-today-button');
    todayButton.replaceWith($('#todayButton'));
    // 숨기기를 먼저하고 .replaceWith를 이용하여 커스터마이징버튼으로 바꾸기. 숨기기를 먼저해야 달력전체에 적용이된다。

    // 오늘 버튼 클릭 시의 동작 내가 커스터마이징한 버튼
    $('#todayButton').on('click', function () {
        const today = new Date();
        mainCalendar.gotoDate(today);
    });

    // 일정 표시 
    $('#eventForm').submit(function (e) {
        e.preventDefault();

        var title = $('#title').val();
        var startDate = $('#startDate').val();
        var endDate = $('#endDate').val();
        var startTime = $('#startTime').val();
        var endTime = $('#endTime').val();
        var allDay = $('#allDay').is(':checked'); // 종일 체크 여부

        // 일정추가시 all-day로 가지않게, 날짜와 시간이 달력에 출력되게하기
        var eventStartTime, eventEndTime;

        if (allDay) {
            eventStartTime = startDate;
            eventEndTime = moment(endDate).add(1, 'days').format('YYYY-MM-DD');
        } else {
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
            mainCalendar.addEvent(event);
        }
    });

    // flatpickr api 
    const dateInput = document.getElementById('dateInput');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    
    // todayButton(今日) 버튼 클릭 시 Flatpickr 날짜 갱신(좌상단 flatpickr 버튼)
    document.getElementById('todayButton').addEventListener('click', function () {
        const today = new Date();
        dateInput._flatpickr.setDate(today, true); // 미니달력 갱신
        startDateInput._flatpickr.setDate(today, true); // 시작일 갱신
        endDateInput._flatpickr.setDate(today, true); // 종료일 갱신

        // FullCalendar에서 오늘 날짜로 이동
        mainCalendar.gotoDate(today);
    });

    // flatpickr 클릭시 fullcalendar 연동
    function handleDateChange(selectedDates, dateStr, instance) {
        //console.log('선택된 날짜:', dateStr);
        // 선택된 날짜를 fullcalendar에 전달
        mainCalendar.gotoDate(moment(dateStr).format('YYYY-MM-DD'));
    }

    // 좌상단 미니달력
    flatpickr(dateInput, {
        parent: document.getElementById('mini-calendar'),
        inline: true,
        dateFormat: 'Y-m-d',
        enableTime: false,
        shorthandCurrentMonth: true,
        static: true,
        defaultDate: 'today',
        locale: 'ja',
        time_24hr: true, // 24시간 형식으로 표시
        onChange: function (selectedDates, dateStr, instance) {
            // 좌상단 미니 달력의 날짜가 변경될 때 시작일과 종료일 달력에도 업데이트
            updateDate('#startDate', dateStr);
            updateDate('#endDate', dateStr);
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
        onChange: function (selectedDates, dateStr, instance) {
            // 날짜 선택 이벤트 핸들러 등록
            handleDateChange(selectedDates, dateStr, instance);
            // 종료일의 flatpickr 가져오기
            const endDatePicker = endDateInput._flatpickr;

            // 종료일이 시작일보다 이전인 경우에만 동기화
            if (endDatePicker && endDatePicker.selectedDates[0] < selectedDates[0]) {
                endDatePicker.setDate(selectedDates, true);
            }
        },
        appendTo: document.getElementById('mini-calendar-input')
    });

    // 일정추가 종료달력
    flatpickr("#endDate", {
        dateFormat: 'Y-m-d',
        enableTime: false,
        //minDate: 'today',
        defaultDate: 'today',
        locale: 'ja',
        time_24hr: true, // 24시간 형식으로 표시
        onChange: function (selectedDates, dateStr, instance) {
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