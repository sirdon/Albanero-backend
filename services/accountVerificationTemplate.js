class AccountVerificationTemplate {
    constructor(data) {
        this.data = data
        this.template = `<h1>${data.message}</h1>`
    }
}
module.exports = AccountVerificationTemplate
