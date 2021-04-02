import smtplib, ssl

# Sends an SSL secured email from the r8scholar gmail to the specified user
def email_r8scholar(review_id,report_description,numb_reports,email,nickname,subject,title,content):
    port = 465  # For SSL
    smtp_server = "smtp.gmail.com"#Mail server(currently gmail)
    sender_email = "r8scholar@gmail.com" #R8scholar email
    password = "nuThutL!itr&7het" #R8scholar email password
    message = "Subject: Reported Review \n"
    message += "Review id: " + str(review_id)+"\n"
    message += "Report description: "+str(report_description) +"\n"
    message += "Number of reports on review: "+str(numb_reports)+"\n"
    message += "Email of reviewer: "+str(email)+"\n"
    message += "Nickname of reviewer: " +str(nickname)+"\n"
    message += "Review subject: " +str(subject)+"\n"
    message += "Review title: "+str(title)+"\n"
    message += "Review content: "+str(content)+"\n"
    #Login to mail server and send email
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, sender_email, message)