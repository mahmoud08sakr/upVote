

import nodemailer from "nodemailer";


export const sendEmail = async (to  , html) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.GOOGLE_APP_PASSWORD,
        },
    });

    const mailOptions = {
        from: `ya masa2 el dangala <${process.env.EMAIL}>`,
        to: to,
        subject: "23ml signup yasta ", 
        text: "2a7la developer fe masr",
        html: html,
    };
    await transporter.sendMail(mailOptions);
}