const nodemailer = require("nodemailer");
const Users = require("../models/User")
const EmailVerificationTemplate = require("./emailLkeNotification")
module.exports.send = function (req, res, mailOptions) {
    let transporter = nodemailer.createTransport(process.env.EMAIL);
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        return info.messageId;
    });
};

module.exports.sendLikeEmail = async (ownerId, friendId) => {
    try {
        let owner = await Users.findOne({ _id: ownerId })
        let friend = await Users.findOne({ _id: friendId })
        let transporter = nodemailer.createTransport(process.env.EMAIL);
        let template = new EmailVerificationTemplate({fullname: owner.username, friendName:friend.username});
        const mailOptions = {
            to: owner.email, // list of receivers
            subject: template.subject, // Subject line
            html: template.template, //

        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            return info.messageId;
        });

    } catch (error) {
        return console.log(error);
    }
};