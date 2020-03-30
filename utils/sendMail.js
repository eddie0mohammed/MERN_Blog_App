
const nodemailer = require('nodemailer');


const sendMail = async (options) => {

    // 1. create transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        post: process.env.EMAIL_PORT,
        auth:{
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASS
        }
    })

    // 2. define email options
    const mailOptions = {
        from: 'ADMIN <camagru@test.com',
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    // 3. send email
    await transporter.sendMail(mailOptions);
}


module.exports = sendMail;