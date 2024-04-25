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

export const validatePassword = (password, email) => {
    // Kiểm tra mật khẩu có được nhập hay không
    if (!password) return "Password cannot be blank.";

    // Kiểm tra độ dài mật khẩu
    if (password.length < 8) return "Password must be at least 8 characters long.";

    // Kiểm tra mật khẩu chứa số hoặc ký tự đặc biệt
    if (!/[0-9]/.test(password) && !/[^a-zA-Z0-9]/.test(password)) {
        return "Password must contain a number or a special character.";
    }

    if (email && password.toLowerCase().includes(email.split('@')[0].toLowerCase())) {
        return "Password cannot contain your email address.";
    }

    // Nếu tất cả kiểm tra đều hợp lệ, trả về chuỗi rỗng (không có lỗi)
    return "";
};