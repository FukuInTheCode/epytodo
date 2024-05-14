const db = require("../../config/db.js");

exports.get_all_todos = (to_call) => {
    return to_call();
};

exports.check_todo_by_id = (id, to_call) => {
    return to_call(84);
};

exports.get_todo_by_todo = (id, to_call) => {
    return to_call(84);
};
