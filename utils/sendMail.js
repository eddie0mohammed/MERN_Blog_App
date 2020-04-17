
const nodemailer = require('nodemailer');
// const sendGridTransport = require('nodemailer-sendgrid-transport');
const handlebars = require('handlebars');
const fs = require('fs');


//READ HTML EMAIL FILE
var readHTMLFile = function(path, callback) {


    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};


const sendMail = async (options) => {

    
    // 1. create transporter
    //MAILTRAP transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        post: process.env.EMAIL_PORT,
        auth:{
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASS
        }
    })

    // //SENDGRID Transporter
    // const transporter = nodemailer.createTransport({
    //     host: process.env.SENDGRID_HOST,
    //     port: process.env.SENDGRID_PORT,
    //     auth: {
    //         user: process.env.SENDGRID_USERNAME,
    //         pass: process.env.SENDGRID_PASSWORD
    //     }
    // })



    // READ EMAIL FILE AND REPLACE VARIABLES AND SEND MAIL
    let HTMLEmailFile;
    if (options.emailType === 'activation'){
        HTMLEmailFile = '/emailTemplates/activateAccount.html'
    }else if (options.emailType === 'forgotPassword'){
        HTMLEmailFile = '/emailTemplates/resetPassword.html'
    }
    readHTMLFile(__dirname + HTMLEmailFile , async function(err, html) {
        var template = handlebars.compile(html);
        var replacements = {
             link: options.URL
        };
        var htmlToSend = template(replacements);
        const mailOptions = {
            from: 'ADMIN <camagru@test.com',
            to: options.email,
            // cc:''
            subject: options.subject,
            // text: options.message
            html: htmlToSend
        }
        await transporter.sendMail(mailOptions);
    });


    // // 2. define email options
    // const mailOptions = {
    //     from: 'ADMIN <camagru@test.com',
    //     to: options.email,
    //     // cc:''
    //     subject: options.subject,
    //     // text: options.message
    //     html: htmlTemplate
    // }

    // // 3. send email
    // await transporter.sendMail(mailOptions);
}


module.exports = sendMail;