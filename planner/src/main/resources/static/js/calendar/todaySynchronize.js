document.addEventListener('DOMContentLoaded', function () {
	
    // 기본제공되는 today버튼을 커스터마이징한 today버튼으로 교체하고 숨기기
    $('.fc-today-button').hide(); //숨기기
    var todayButton = $('.fc-today-button');
    todayButton.replaceWith($('#todayButton'));
    // 숨기기를 먼저하고 .replaceWith를 이용하여 커스터마이징버튼으로 바꾸기(숨기기를 먼저해야 달력 전체에 적용이된다)

    // 오늘 버튼 클릭 시의 동작  내가 커스터마이징한 버튼
    $('#todayButton').on('click', function () {
        const today = new Date();
        mainCalendar.gotoDate(today);
    });
});