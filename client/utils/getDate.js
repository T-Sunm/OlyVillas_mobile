export const getDate = (dateTimeStr) => {
    const dateObj = new Date(dateTimeStr);
    // Hàm để thêm số 0 phía trước nếu cần (ví dụ: tháng 5 thành '05'
    function pad(number) {
        return number < 10 ? '0' + number : number;
    }
    var formattedDate = dateObj.getUTCFullYear() + '-' +
        pad(dateObj.getUTCMonth() + 1) + '-' +
        pad(dateObj.getUTCDate());

    // In ra định dạng ngày mới
    return formattedDate
}
export function convertISOToFormattedDates(startISO, endISO) {
    // Tạo các đối tượng Date từ chuỗi ISO
    const startDate = new Date(startISO);
    const endDate = new Date(endISO);

    // Tùy chỉnh để định dạng ngày tháng: "31 Dec 2025"
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const startFormatted = startDate.toLocaleDateString('en-GB', options);

    // Kiểm tra nếu ngày bắt đầu và kết thúc là cùng một ngày
    if (startDate.getTime() === endDate.getTime()) {
        // Trả về ngày bắt đầu đã định dạng nếu cùng ngày
        return startFormatted;
    } else {
        // Nếu khác nhau, định dạng cả ngày bắt đầu và kết thúc
        const endFormatted = endDate.toLocaleDateString('en-GB', options);
        return `${startFormatted} - ${endFormatted}`;
    }

}


export const differenceInDays = (startISO, endISO) => {
    const millisecondsPerDay = 24 * 60 * 60 * 1000; // Số milliseconds trong một ngày

    // Chuyển chuỗi ISO thành đối tượng Date
    const startDate = new Date(startISO);
    const endDate = new Date(endISO);

    // Tính toán chênh lệch millisecond
    const differenceInMilliseconds = endDate.getTime() - startDate.getTime();

    // Tính số ngày chênh lệch
    let differenceInDays = Math.ceil(differenceInMilliseconds / millisecondsPerDay);

    // Nếu ngày chênh lệch bằng 0, trả về 1 ngày
    differenceInDays = differenceInDays === 0 ? 1 : differenceInDays;

    // Nếu số ngày chênh lệch nhỏ hơn 0, trả về 0
    return Math.max(differenceInDays, 0);
}

export const differenceInDays_for_YourReservation = (startISO, endISO) => {
    const millisecondsPerDay = 24 * 60 * 60 * 1000; // Số milliseconds trong một ngày

    // Chuyển chuỗi ISO thành đối tượng Date
    const startDate = new Date(startISO);
    const endDate = new Date(endISO);

    // Tính toán chênh lệch millisecond
    const differenceInMilliseconds = endDate - startDate; // Bỏ qua .getTime() vì phép trừ date trong JS tự động chuyển thành milliseconds

    // Tính số ngày chênh lệch, sử dụng round để có tính toán chính xác hơn
    let differenceInDays = Math.round(differenceInMilliseconds / millisecondsPerDay);

    return differenceInDays;
}

export function formatDateRange(startDateString, endDateString) {
    // Tạo đối tượng Date từ chuỗi định dạng ISO
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    // Kiểm tra xem liệu Date có hợp lệ không
    if (isNaN(startDate) || isNaN(endDate)) {
        return "Invalid Date Range";
    }

    const startDay = startDate.getDate();
    const startMonth = startDate.toLocaleString('en-US', { month: 'short' });
    const startYear = startDate.getFullYear();

    const endDay = endDate.getDate();
    const endMonth = endDate.toLocaleString('en-US', { month: 'short' });
    const endYear = endDate.getFullYear();

    // Trường hợp 1: Cùng tháng, cùng năm
    if (startMonth === endMonth && startYear === endYear) {
        return `${startMonth} ${startDay} - ${endDay} ${startYear}`;
    }
    // Trường hợp 2: Khác tháng, cùng năm
    else if (startYear === endYear) {
        return `${startMonth} ${startDay} - ${endMonth} ${endDay} ${startYear}`;
    }
    // Trường hợp 3: Khác năm
    else {
        return `${startMonth} ${startDay} ${startYear} - ${endMonth} ${endDay} ${endYear}`;
    }
}

export function formatDateRange2(startDate, endDate) {
    // Chuyển chuỗi ngày tháng sang đối tượng Date
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Định dạng ngày tháng
    const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };

    const formattedStartDate = start.toLocaleDateString('en-US', options); // Định dạng ngày bắt đầu
    const formattedEndDate = end.toLocaleDateString('en-US', options); // Định dạng ngày kết thúc

    // Tạo ra chuỗi định dạng cuối cùng
    return {
        checkIn: formattedStartDate,
        checkOut: formattedEndDate
    };
}