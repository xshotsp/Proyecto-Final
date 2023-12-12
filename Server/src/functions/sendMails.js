const nodemailer = require ("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "quirkz41@gmail.com",
        pass: "wzal qhnl lidu wffl"
    },
});


transporter.verify()
.then(() => {
    console.log("mensaje enviado con exito!");
})
.catch((error) => {
    console.error("Error al enviar correo:", error);
});

            
module.exports = transporter;


