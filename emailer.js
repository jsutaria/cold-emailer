var nodemailer = require('nodemailer');

exports.sendMail = (receiver, subject) => {
  var transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com", // hostname
      secureConnection: false,
      port: 587,
      tls: {
         ciphers:'SSLv3'
      },
      auth: {
          user: process.env.USERNAME,
          pass: process.env.PASSWORD,
      }
  });

  var mailOptions = {
      from: process.env.NAME,
      to: receiver,
      subject: subject,
      html: '<b>Hello world </b><br> This is the first email sent with Nodemailer in Node.js'
  };

  mailOptions.to = receiver;
  transporter.sendMail(mailOptions, (error, info) => {
      if(error) return console.log(error);
      console.log('Message sent: ' + info.response);
  });
}
