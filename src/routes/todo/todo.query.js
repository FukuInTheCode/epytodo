const db = require("../../config/db.js");

exports.get_all_todos = (to_call) => {
    return to_call();
};

exports.check_todo_by_id = (id, to_call) => {
    db.query("SELECT COUNT(*) AS count FROM todo WHERE id = ?", [id], (err, result) => {
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

exports.get_todo_by_id = (id, to_call) => {
    db.query("SELECT * FROM todo WHERE id = ?", [id], (err, result) => {
        if (err)
            to_call(84);
        else {
            if (result.length > 0)
                to_call(1);
            else
                to_call(0);
        }
    });
};

exports.add_todo = (title, description, due_time, user_id, status, to_call) => {
    db.execute("INSERT INTO todo (title, description, due_time, user_id, status) VALUES (?, ?, ?, ?, ?)", [title, description, due_time, user_id, status], (err, result) => {
        if (err)
            to_call(-1);
        else
            to_call(result.insertId);
    });
};

exports.update_todo_by_id = (id, title, description, due_time, user_id, status, to_call) => {
    return to_call(84);
};

exports.delete_todo_by_id = (id, to_call) => {
    return to_call(84);
};
