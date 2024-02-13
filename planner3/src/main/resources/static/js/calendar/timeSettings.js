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

// 첫 시작시 종일(all-day) 체크박스 블러처리 
$(document).ready(function() {
    // 페이지 로드 시 종일 체크 여부 확인
    if ($('#allDay').is(':checked')) {
        // 종일 체크되어 있을 때
        $('#timeInputs').addClass('blurred'); // 시간 설정 부분을 블러 처리
    }else {
        // 종일 체크가 해제되었을 때
        $('#timeInputs').removeClass('blurred');
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