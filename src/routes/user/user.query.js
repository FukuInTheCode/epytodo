const db = require("../../config/db.js");

exports.check_email = (email, to_call) => {
    db.query("SELECT COUNT(*) AS count FROM user WHERE email = ?", [email], (err, result) => {
        if (err)
            to_call(84);
        else {
            const count = result[0].count;
            if (count > 0)
                to_call(1);
            else
                to_call(0);
        }
    });
};

exports.create_user = (email, firstname, name, password, to_call) => {
    return to_call(0);
};
