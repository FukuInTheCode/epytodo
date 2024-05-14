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

exports.add_todo = (title, description, due_time, user_id, status, to_call) => {
    return to_call(-1);
};

exports.update_todo_by_id = (id, title, description, due_time, user_id, status, to_call) => {
    return to_call(84);
};

exports.delete_todo_by_id = (id, to_call) => {
    return to_call(84);
};
