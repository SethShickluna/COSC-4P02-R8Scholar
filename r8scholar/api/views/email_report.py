import smtplib, ssl

# Sends an SSL secured email from the r8scholar gmail to the specified user
def email_r8scholar(review_id,report_description,numb_reports,email,nickname,subject,title,content,date_created):
    port = 465  # For SSL
    smtp_server = "smtp.gmail.com"#Mail server(currently gmail)
    sender_email = "r8scholar@gmail.com" #R8scholar email
    password = "nuThutL!itr&7het" #R8scholar email password
    message = f"""Subject: Reported Review
    Review id: {review_id}
    Date Created: {date_created}
    Report description: {report_description} 
    Number of reports on review: {numb_reports} 
    Email of reviewer: {email} 
    Nickname of reviewer: {nickname} 
    Review subject: {subject}
    Review title: {title}
    Review content: {content}"""
    
    #Login to mail server and send email
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, sender_email, message)