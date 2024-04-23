export const validateEmail = (email) => {
    // Kiểm tra email có được nhập hay không
    if (!email) return "Email cannot be blank.";

    // Kiểm tra xem email có chứa '@' hay không
    if (!email.includes('@')) return "Email must contain the character '@'.";

    // Tách email thành phần tên người dùng và tên miền
    const parts = email.split('@');
    const usernamePart = parts[0];
    const domainPart = parts[1];

    // Kiểm tra phần tên người dùng (trước '@')
    if (!/^[^<>()\[\]\\.,;:\s@"]+$/.test(usernamePart)) {
        return "The username portion of the email is invalid.";
    }

    // Kiểm tra phần tên miền (sau '@')
    if (!/^[a-zA-Z\-0-9]+(\.[a-zA-Z]{2,})+$/.test(domainPart)) {
        return "The domain part of the email is invalid.";
    }

    // Nếu tất cả kiểm tra đều hợp lệ, trả về chuỗi rỗng (không có lỗi)
    return "";
};