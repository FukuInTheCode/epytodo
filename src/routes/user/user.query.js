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
    db.execute("INSERT INTO user (email, firstname, name, password) VALUES (?, ?, ?, ?)", [email, firstname, name, password], (err, result) => {
        if (err)
            to_call(84);
        else
            to_call(0);
    });
    return to_call(0);
};
