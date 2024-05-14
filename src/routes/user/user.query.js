const db = require("../../config/db.js");

exports.get_all_users = (to_call) => {
    db.query("SELECT id, email, password, created_at, firstname, name FROM user", (err, result) => {
        if (err)
            to_call(null);
        else
            to_call(result);
    });
}

exports.get_all_user_todos = (email, to_call) => {
    db.query("SELECT * FROM todo WHERE user_id = (SELECT id FROM user WHERE email = ?)", [email], (err, result) => {
        if (err)
            to_call(undefined);
        else
            to_call(result);
    });
}

exports.check_user_by_id = (id, to_call) => {
    return to_call(84);
};

exports.get_user_by_id = (id, to_call) => {
    db.query("SELECT * FROM user WHERE id = ?", [id], (err, result) => {
        if (err)
            to_call(undefined);
        else
            to_call(result);
    });
};

exports.check_user_by_email = (email, to_call) => {
    return to_call(84);
};

exports.get_user_by_email = (email, to_call) => {
    db.query("SELECT * FROM user WHERE email = ?", [email], (err, result) => {
        if (err)
            to_call(undefined);
        else
            to_call(result);
    });
};


exports.update_user_by_id = (id, email, password, name, firstname, to_call) => {
    return to_call(84);
};


exports.delete_user_by_id = (id, to_call) => {
    return to_call(84);
};
