import nodemailer from "nodemailer";

export async function sendEmail(to: string, html: string) {
  //   let testAccount = await nodemailer.createTestAccount();
  //   console.log("test account:", testAccount);

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "ybcimimgiw7hy2qh@ethereal.email",
      pass: "FwdvA544Kxpgdf8bwM",
    },
  });

  let info = await transporter.sendMail({
    from: "<foo@example.com>",
    to,
    subject: "This is a test email",
    html,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
