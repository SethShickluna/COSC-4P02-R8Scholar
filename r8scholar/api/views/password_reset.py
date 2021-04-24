import smtplib, ssl

# Sends an SSL secured email from the r8scholar gmail to the specified user
def email_password(user_email,new_pass):
    port = 465  # For SSL
    smtp_server = "smtp.gmail.com"#Mail server(currently gmail)
    sender_email = "r8scholar@gmail.com" #R8scholar email
    password = "nuThutL!itr&7het" #R8scholar email password
    message = f"""Subject: R8scholar Account Password Reset
    Your new temporary password is: {new_pass}
    Please change your password immediatly upon logging into the site with your temporary password.
    If you did not request a password reset, then someone else has made the request using your email."""
    #Login to mail server and send email
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, user_email, message)