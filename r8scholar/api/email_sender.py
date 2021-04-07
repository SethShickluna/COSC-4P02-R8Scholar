import smtplib, ssl

# Sends an SSL secured email from the r8scholar gmail to the specified user
def email_user(user_email,verification_code):
    port = 465  # For SSL
    smtp_server = "smtp.gmail.com"#Mail server(currently gmail)
    sender_email = "r8scholar@gmail.com" #R8scholar email
    password = "nuThutL!itr&7het" #R8scholar email password
    message = f"""Subject: R8scholar Account Verification


    Your verification code is: {verification_code}"""
    #Login to mail server and send email
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, user_email, message)
