// 일정 추가 또는 업데이트 함수
function insertOrUpdatePlan() {
    var planDetail = {
        planNo: $('#planNo').val(),
        title: $('#title').val(),
        allDay: $('#allDay').is(':checked') ? 1 : 0,
        startDate: $('#startDate').val(),
        endDate: $('#endDate').val(),
        startTime: $('#startTime').val(),
        endTime: $('#endTime').val(),
        repeat: $('#repeat').val(),
        place: $('#place').val(),
        content: $('#content').val(),
        alarm: $('#alarm').is(':checked') ? 1 : 0
    };

    // planNo 값에 따라 새로운 일정 추가 또는 기존 일정 업데이트 로직 추가
    if (planDetail.planNo) {
        // planNo가 존재하면 기존 일정 업데이트 로직 수행
        updatePlan(planDetail);
    } else {
        // planNo가 없으면 새로운 일정 추가 로직 수행
        insertPlan(planDetail);
    }
};

// 기존 일정 업데이트 함수
function updatePlan(planDetail) {
	
	setTimeIfNotAllDay(planDetail);
    
    $.ajax({
        type: 'PUT',
        url: '/api/plan/update',
        contentType: 'application/json',
        data: JSON.stringify(planDetail),
        success: function (response) {
            console.log('update 성공');
        },
        error: function (error) {
            console.error('일정 업데이트 중 오류 발생:', error);
        }
    });
}
  
function insertPlan(planDetail) {
	
    setTimeIfNotAllDay(planDetail);
    
    $.ajax({
        type: 'POST',
        url: '/api/plan/insert',
        contentType: 'application/json',
        data: JSON.stringify(planDetail),
        success: function (response) {
            console.log('저장 성공');
            location.href="/js/calendar/selectListAndDetail-Settings.js";
        },
        error: function (error) {
            console.error('일정 저장 중 오류 발생:', error);
        }
    });
};

// 종일(all-day) 체크 여부에 따라 시작 시간과 종료 시간 설정하는 함수
function setTimeIfNotAllDay(planDetail) {

    if (!planDetail.allDay) {
        planDetail.startTime = $('#startTime').val();
        planDetail.endTime = $('#endTime').val();
    }
}