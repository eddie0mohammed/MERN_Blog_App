
const nodemailer = require('nodemailer');
// const sendGridTransport = require('nodemailer-sendgrid-transport');
const handlebars = require('handlebars');
const fs = require('fs');


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

    // let htmlTemplate = `
    // <!DOCTYPE html>
    // <html lang="en">
    // <body>
    //     <p style="text-align: center; font-size: 20px">Welcome</p>
    //     <p style="text-align: left; font-size: 14px: padding-left: 20px">Thank you for creating an account with us</p>
    //     <a href=${options.activationURL}>Click here to activate your account. Please use the link below to validate your account.</a>
    //     <img src="https://source.unsplash.com/random" alt="" style="width: 100px; height: 100px">

    // </body>
    // </html>`

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



    //REPLACE READ EMAIL FILE AND REPLACE VARIABLES
    readHTMLFile(__dirname + '/emailTemplates/activateAccount.html', async function(err, html) {
        var template = handlebars.compile(html);
        var replacements = {
             link: options.activationURL
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