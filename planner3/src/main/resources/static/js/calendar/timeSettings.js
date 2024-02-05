// 종일체크시 시간 활성/비활성
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

// 시간설정 15분단위(24시간)
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