class EmailLikeNotification {
    constructor(data) {
        this.data = data
        this.subject = 'Like on your post'
        this.template = `Hi ${this.data.fullname},<br><br>
        ${this.data.friendName} liked your post<br><br>
        Regards,<br>               
        Team ABC 
        `
    }
}
module.exports = EmailLikeNotification
