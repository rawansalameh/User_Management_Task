using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Text;

namespace Entities
{
    public class EmailHelper
    {

        public enum EmailTemplate
        {
            RegistrationWelcome = 1,
            PasswordResetOtp = 2,
        }

        public void SendEmail(string fromEmail, string password, string toEmail, string message, string body)
        {
            if (string.IsNullOrEmpty(toEmail))
                return;

            try
            {
                MailMessage mail = new MailMessage
                {
                    From = new MailAddress(fromEmail),
                    Subject = message,
                    Body = body,
                    IsBodyHtml = true
                };

                mail.To.Add(toEmail);

                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    UseDefaultCredentials = false,
                    Credentials = new System.Net.NetworkCredential(fromEmail, password),
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                };
                SmtpServer.Send(mail)
;

            }

            catch (Exception ex)
            {
                throw new Exception(ex.Message);
                //Logging.AddError(ex.ToString(), "Email Helper.cs", "", $"email:{email} , message:{message}");
            }
        }
    }
}