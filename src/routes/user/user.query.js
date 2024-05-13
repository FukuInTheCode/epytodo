const db = require("../../config/db.js");

exports.get_all_users = (to_call) => {
    db.query("SELECT id, email, password, created_at, firstname, name FROM user", (err, result) => {
        if (err)
            to_call(err);
        else
            to_call(null, result);
    });
}

exports.get_all_user_todos = (email, to_call) => {
    return to_call();
}
