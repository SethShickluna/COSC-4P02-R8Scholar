import smtplib, ssl

# Sends an SSL secured email from the r8scholar gmail to the specified user
def email_password(user_email,new_pass):
    port = 465  # For SSL
    smtp_server = "smtp.gmail.com"#Mail server(currently gmail)
    sender_email = "r8scholar@gmail.com" #R8scholar email
    password = "nuThutL!itr&7het" #R8scholar email password
    message = """\
    Subject: R8scholar Account Password Reset

    Your new temporary password is: """+str(new_pass)+"\n"
    message += "Please change your password immediatly upon logging into the site with your temporary password."
    message += "If you did not request a password reset, then someone else has made the request using your email.\n"
    #Login to mail server and send email
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, user_email, message)