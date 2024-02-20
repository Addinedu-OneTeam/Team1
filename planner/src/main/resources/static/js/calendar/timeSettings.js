// 종일체크시 시간 활성/비활성
// 종일(all-day) 체크박스
$('#allDay').change(function () {
    if (this.checked) {
        // 종일 체크되었을 때
        $('#timeInputs').addClass('blurred');
        $('#startTime').prop('disabled', true);
        $('#endTime').prop('disabled', true);
    } else {
        // 종일 체크가 해제되었을 때
        $('#timeInputs').removeClass('blurred');
        $('#startTime').prop('disabled', false);
        $('#endTime').prop('disabled', false);
    }
});

// 첫 시작시 종일(all-day) 체크박스 블러처리 
$(document).ready(function() {
	$('#deletePlan').hide();
    // 페이지 로드 시 종일 체크 여부 확인
    if ($('#allDay').is(':checked')) {
        // 종일 체크되어 있을 때
        $('#timeInputs').addClass('blurred'); // 시간 설정 부분을 블러 처리
        $('#startTime').prop('disabled', true);
        $('#endTime').prop('disabled', true);
    }else {
        // 종일 체크가 해제되었을 때
        $('#timeInputs').removeClass('blurred');
        $('#startTime').prop('disabled', false);
        $('#endTime').prop('disabled', false);
    }
});

// 시간설정 15분단위(24시간)
function populateTimeDropdown(selectElement) {
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
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
    const selectedStartTime = this.value; // 선택된 시작 시간 가져오기
    const momentStartTime = moment(selectedStartTime, 'HH:mm'); // moment 객체로 변환

    // 종료 시간 설정
    const momentEndTime = momentStartTime.clone().add(30, 'minutes'); // 시작 시간으로부터 30분 후의 시간 계산
    const formattedEndTime = momentEndTime.format('HH:mm'); // 포맷팅된 종료 시간

    // 종료 시간 드롭다운에 반영
    endTimeDropdown.value = formattedEndTime;
});

// endTime 드롭다운에 이벤트 리스너 추가
endTimeDropdown.addEventListener('change', function() {
    const selectedEndTime = this.value; // 선택된 종료 시간 가져오기
    const momentEndTime = moment(selectedEndTime, 'HH:mm'); // moment 객체로 변환

    // 시작 시간 설정
    const momentStartTime = momentEndTime.clone().subtract(30, 'minutes'); // 종료 시간으로부터 30분 전의 시간 계산
    const formattedStartTime = momentStartTime.format('HH:mm'); // 포맷팅된 시작 시간

    // 시작 시간 드롭다운에 반영
    startTimeDropdown.value = formattedStartTime;
});