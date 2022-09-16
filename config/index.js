const dotenv = require("dotenv");
dotenv.config();
module.exports = {
    email: process.env.EMAIL,
    NODE_ENV: process.env.NODE_ENV,
    APP_URL:process.env.APP_URL
};
