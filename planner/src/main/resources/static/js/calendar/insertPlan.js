function insertPlan() {
    var plan = {
        title: $('#title').val(),
        startDate: $('#startDate').val(),
        startTime: $('#startTime').val(),
        endDate: $('#endDate').val(),
        endTime: $('#endTime').val(),
        content: $('#content').val(),
        place: $('#place').val(),
        userEmail: $('#userEmail').val()
    };

    // 종일(all-day) 체크 여부 확인
    var allDayChecked = $('#allDay').is(':checked');

    if (!allDayChecked) {
        // 종일이 아니면 시작 시간과 종료 시간을 설정
        plan.startTime = $('#startTime').val();
        plan.endTime = $('#endTime').val();
    }

    $.ajax({
        type: "post",
        url: "/api/plan/insert",
        contentType: 'application/json',
        data: JSON.stringify(plan),
        success: function (response) {
            console.log(response);

        },
        error: function (error) {
            console.error('일정 추가 중 ajax 오류 발생:', error);
        }
    })
};