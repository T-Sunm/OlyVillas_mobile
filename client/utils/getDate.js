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