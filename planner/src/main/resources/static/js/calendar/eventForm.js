document.addEventListener('DOMContentLoaded', function () {

    $('#eventForm').submit(function (e) {
        e.preventDefault();

        var title = $('#title').val();
        var startDate = $('#startDate').val();
        var endDate = $('#endDate').val();
        var startTime = $('#startTime').val();
        var endTime = $('#endTime').val();
        var content = $('#content').val();
        var allDay = $('#allDay').is(':checked');
        var repeatOption = $('#repeat').val();

        var eventStartTime, eventEndTime;

        if (allDay) {
            eventStartTime = startDate;
            eventEndTime = endDate;
        } else {
            eventStartTime = startDate + 'T' + startTime;
            eventEndTime = endDate + 'T' + endTime;
        }

        if (title) {
            var event = {
                title: title,
                start: eventStartTime,
                end: eventEndTime,
                allDay: allDay
            };
            mainCalendar.addEvent(event);
        }
    });
});