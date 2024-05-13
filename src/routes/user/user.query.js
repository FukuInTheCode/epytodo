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

exports.check_user_by_id = (id, to_call) => {
    return to_call(84);
};

exports.get_user_by_id = (id, to_call) => {
    return to_call();
};

exports.check_user_by_email = (email, to_call) => {
    return to_call(84);
};

exports.get_user_by_email = (email, to_call) => {
    return to_call();
};


exports.update_user_by_id = (id, email, password, name, firstname, to_call) => {
    return to_call(84);
};


exports.delete_user_by_id = (id, to_call) => {
    return to_call(84);
};
