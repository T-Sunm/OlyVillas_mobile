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