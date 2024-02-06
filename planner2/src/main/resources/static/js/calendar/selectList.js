document.addEventListener('DOMContentLoaded', function () {
	selectList();
    // 일정 조회
    function selectList() {
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
        mainCalendar.addEvent({
			// 필요한 경우 여기에 추가 필드 추가
            title: plan.title,
            start: plan.start, // 서버에서 받은 시작 날짜
            end: plan.end // 서버에서 받은 종료 날짜
        });
    }

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
        height: '700px', // calendar 높이 설정
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
});