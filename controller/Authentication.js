const Users = require("../models/User")
const jwt = require("jsonwebtoken")
const emailServise = require("../services/emailService")
const EmailVerificationTemplate = require("../services/emailVerificationTemplate")
const AccountVerificationTemplate = require("../services/accountVerificationTemplate")
const CONFIG = require("../config");
module.exports = {
    async register(req, res) {
        try {
            const { username, password, email, fullname } = req.body;
            const userData = { username, password, email, fullname };
            // existing user check
            const existingUser = await Users.findOne({ $or: [{ username: username },{email:email}] });
            if (existingUser) throw new Error("User already exists with this username or email")
            
            const user = await new Users(userData).save()
            if (user) {
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                    expiresIn: "1d",
                });
                user.link = `${CONFIG.APP_URL}auth/activate/${token}`;
                let template = new EmailVerificationTemplate(user);
                let mailOptions = {
                    to: user.email, // list of receivers
                    subject: template.subject, // Subject line
                    html: template.template, //
                };
                await emailServise.send(req, res, mailOptions)
                res.status(200).send({
                    status: true,
                    message: "User created successfully"
                })
            } else {
                res.status(400).send({
                    status: false,
                    message: "Something went wrong while creating user"
                })
            }
        } catch (error) {
            return res.status(400).send({
                status: false,
                message: error.message
            })
        }
    },
    login(req, res) {
        try {
            const { username, password } = req.body;
            Users.findOne({ username }).exec((err, user) => {
                if (err || !user) {
                    return res.status(400).json({
                        status: false,
                        error: `User with ${username} does not exist. Please register`,
                    });
                }
                //check user verify email
                if (!user.verified) {
                    return res.status(401).json({
                        status: false,
                        error: "Please verify your account",
                    });
                }
                // authenticate user
                if (!user.authenticate(password)) {
                    return res.status(400).json({
                        status: false,
                        error: "username and password not matched",
                    });
                }
                // generate a token and send to client
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                    expiresIn: "1d",
                });
                res.cookie("token", token, {
                    expiresIn: "1d",
                });
                user.token = token;
                user.save();
                const { _id, username } = user;
                return res.json({ user: { _id, username }, token });
            })

        } catch (error) {
            res.status(400).send({
                status: false,
                error: error.message
            })
        }
    },
    logout(req, res) {
        try {
            res.clearCookie("token");
            res.status(200).json({
                status: true,
                message: "Logout successful",
            });

        } catch (error) {
            return res.status(400).json({
                status: false,
                error: "Error while logging out",
            });
        }
    },
    async activate(req, res) {
        try {
            const token = req.params.token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            let user = await Users.findOne({ _id: decoded._id });
            let template;
            function sendMessage(message) {
                template = new AccountVerificationTemplate({ message });
                    res.writeHeader(200, {"Content-Type": "text/html"});  
                    res.write(template.template);  
                    res.end();
            }
            if (!user) {
                sendMessage("Account not found. Please register")
            } else if (user && !user.verified) {
                user.verified = true;
                await user.save()
                sendMessage("Account varification successful")
            } else {
                sendMessage("Account already varified")
            }
        } catch (error) {
            res.status(400).send({
                message: error.message, status: false
            })
        }
    },
    validateToken(req, res, next) {
        try {
            const token = req.headers.token || req.body.token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            Users.findOne({ _id: decoded._id }).exec((err, user) => {
                if (err || !user) {
                    return res.status(400).json({
                        status: false,
                        error: "Please re-login",
                    });
                } else if (!user.verified) {
                    return res.status(401).json({
                        status: false,
                        error: "Please verify your account",
                    });
                } else {
                    req.user = decoded;
                    next();
                }
            })
        } catch (err) {
            return res.status(401).json({
                status: false,
                message: err.message,
            });
        }
    }

}
