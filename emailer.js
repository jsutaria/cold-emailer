var nodemailer = require('nodemailer');
var csv = require('./csv-parser');

readSheetEmails = (data) => {
  var email = {email: data.email, password: data.password, name: data.name};
  var replacers = csv.matrixer(data.data);
  const info_line = replacers[0];
  const body = data.body;
  const subj = data.subject;
  replacers.forEach((item, index, array) => {
    if(index == 0) return;
    var new_email = JSON.parse(JSON.stringify(email));
    new_email.body = body.replace(/~Personal Name~/gi, data.name).replace(/~Personal Email~/gi, data.email);
    new_email.subject = subj.replace(/~Personal Name~/gi, data.name).replace(/~Personal Email~/gi, data.email);
    info_line.forEach((info_item, info_index, info_arr) => {
      if(info_item.toLowerCase() == "email") new_email.receiver = item[info_index];
      var repl = new RegExp("~" + info_item + "~", "gi");
      new_email.body = new_email.body.replace(repl, item[info_index]);
      new_email.subject = new_email.subject.replace(repl, item[info_index]);
    });
    // console.log(JSON.stringify(new_email));
    sendSingleEmail(new_email);
  });
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
