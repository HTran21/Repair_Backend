const nodemailer = require('nodemailer');


const sendNotificationEmail = async (ID_Repair) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'tranhoangtran22226@gmail.com',  // Điền email của bạn
                pass: 'ht211002'   // Điền mật khẩu email của bạn
            }
        });

        // Lấy thông tin cần cho email từ database (ID_User, email, ...)
        // ...

        // Tạo nội dung email
        const mailOptions = {
            from: 'tranhoangtran22226@gmail.com',
            to: 'tranhoangtran22225@gmail.com',  // Điền email của người dùng từ thông tin lấy được từ database
            subject: 'Đơn đăng ký sửa chữa đã được duyệt',
            text: 'Đơn đăng ký sửa chữa của bạn đã được duyệt. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.'
        };

        // Gửi email
        await transporter.sendMail(mailOptions);

        // Gọi next để tiếp tục xử lý middleware tiếp theo hoặc route handler
        next();
    }
    catch (error) {
        console.log('Error sending email:', error);

        // Trả về lỗi nếu có lỗi khi gửi email
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = sendNotificationEmail;