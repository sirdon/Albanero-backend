class EmailVerificationTemplate {
    constructor(data) {
        this.data = data
        this.subject = 'Verify your account'
        this.template = `Hi ${this.data.fullname},<br><br>
        Greetings of the day!<br><br>
        We're glad to welcome you to ABC Test.<br><br>      
        Click this link to confirm your email address and complete setup for your candidate account.<br><br>
        ${this.data.link}<br><br>
        Regards,<br>               
        Team ABC 
        `
    }
}
module.exports = EmailVerificationTemplate
