const db = require("../../config/db.js");

exports.check_email = (email, to_call) => {
    return to_call(0);
};

exports.create_user = (email, firstname, name, password, to_call) => {
    return to_call(0);
};
