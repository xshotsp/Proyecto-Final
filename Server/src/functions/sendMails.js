const nodemailer = require ("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "quirkz41@gmail.com",
        pass: "wzal qhnl lidu wffl"
    },
    tls: {
        rejectUnauthorized: false
    }
});


transporter.verify()
.then(() => {
    console.log("Message sent succesfully!");
})
.catch((error) => {
    console.error("Error sending email:", error);
});

            
module.exports = transporter;


