import { sendEmail } from "@/infraestructure/lib/email/modules/sendEmail";
import { API } from "@shared/index";
import { Request, Response } from "express";
import fs from "fs/promises";
import path from "path";

export const verifyEmailUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const templatePath = path.join(__dirname, "template.html");
    let emailTemplate = await fs.readFile(templatePath, "utf-8");

    emailTemplate = emailTemplate
      .replace("{{userName}}", "John Doe")
      .replace("{{verificationLink}}", "https://yourapp.com/verify?token=xyz");

    const send = await sendEmail({
      to: "hantach10@gmail.com",
      subject: "Verify Your Email",
      html: emailTemplate,
    });

    API.success(res, "email sent successfully", send);
  } catch (error) {
    API.serverError(res, "Failed to send email", error);
  }
};
