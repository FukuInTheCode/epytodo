const db = require("../../config/db.js");

exports.get_all_users = (to_call) => {
    return to_call();
}

exports.get_all_user_todos = (email, to_call) => {
    return to_call();
}

exports.check_user_by_id = (req.params.id, to_call) => {
    return to_call(84);
};
