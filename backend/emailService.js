const nodemailer = require("nodemailer")

async function sendEmail(to, pdf){

const transporter = nodemailer.createTransport({

host: "smtp.gmail.com",
port: 587,
secure: false,

auth:{
user: process.env.EMAIL_USER,
pass: process.env.EMAIL_PASS
}

})

const mailOptions = {

from: process.env.EMAIL_USER,
to: to,
subject: "Offer Letter Annexure",
text: "Please find attached offer annexure",
attachments:[
{
filename: "offer-annexure.pdf",
content: pdf
}
]

}

await transporter.sendMail(mailOptions)

}

module.exports = sendEmail