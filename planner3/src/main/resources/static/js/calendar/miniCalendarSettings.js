document.addEventListener('DOMContentLoaded', function () {
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