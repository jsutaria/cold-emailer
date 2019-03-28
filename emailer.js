var nodemailer = require('nodemailer');
var csv = require('./csv-parser');

readSheetEmails = (data) => {
  var email = new Object();
};

sendSingleEmail = (data) => {
  var transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com", // hostname
      secureConnection: false,
      port: 587,
      tls: {
         ciphers:'SSLv3'
      },
      auth: {
          user: data.email,
          pass: data.password,
      }
  });

  var mailOptions = {
      from: data.name,
      to: data.receiver,
      subject: data.subject,
      html: data.body
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if(error) {
        console.log("My err: " + error);
        return false;
      }
      console.log('Message sent: ' + info.response);
  });
}

exports.sendSingle = sendSingleEmail;
exports.readSheetEmails = readSheetEmails;
