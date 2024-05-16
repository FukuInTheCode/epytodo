const db = require("../../config/db.js");

exports.get_all_users = (to_call) => {
    db.query("SELECT id, email, password, created_at, firstname, name FROM epytodo.user", (err, result) => {
        if (err)
            to_call(null);
        else
            to_call(result);
    });
}

exports.get_all_user_todos = (email, to_call) => {
    db.query("SELECT * FROM epytodo.todo WHERE user_id = (SELECT id FROM epytodo.user WHERE email = ?)", [email], (err, result) => {
        if (err)
            to_call(undefined);
        else
            to_call(result);
    });
}

exports.check_user_by_id = (id, to_call) => {
    db.query("SELECT COUNT(*) AS count FROM epytodo.user WHERE id = ?", [id], (err, result) => {
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

exports.get_user_by_id = (id, to_call) => {
    db.query("SELECT * FROM epytodo.user WHERE id = ?", [id], (err, result) => {
        if (err)
            to_call(undefined);
        else
            to_call(result);
    });
};

exports.check_user_by_email = (email, to_call) => {
    db.query("SELECT COUNT(*) AS count FROM epytodo.user WHERE email = ?", [email], (err, result) => {
        if (err) {
            to_call(84);
         } else {
            const count = result[0].count;
            if (count > 0)
                to_call(1);
            else
                to_call(0);
        }
    });
};

exports.get_user_by_email = (email, to_call) => {
    db.query("SELECT * FROM epytodo.user WHERE email = ?", [email], (err, result) => {
        if (err)
            to_call(undefined);
        else
            to_call(result);
    });
};


exports.update_user_by_id = (id, email, password, name, firstname, to_call) => {
    db.query("UPDATE epytodo.user SET email = ?, firstname = ?, name = ?, password = ? WHERE id = ?", [email, firstname, name, password, id], (err, result) => {
        if (err)
            to_call(84);
        else
            to_call(0);
    });
};


exports.delete_user_by_id = (id, to_call) => {
    db.query("DELETE FROM epytodo.user WHERE id = ?", [id], (err, result) => {
        if (err)
            to_call(84);
        else
            to_call(0);
    });
};

exports.create_user = (email, firstname, name, password, to_call) => {
    db.execute("INSERT INTO epytodo.user (email, firstname, name, password) VALUES (?, ?, ?, ?)", [email, firstname, name, password], (err, result) => {
        if (err)
            to_call(84);
        else
            to_call(0);
    });
};

exports.get_mail_account = function(res, mail, pwd, bcrypt, callback) {
    db.execute('SELECT password FROM epytodo.user WHERE email = ?', [mail], function(err, results, fields) {
        if (err)
            return callback(84);
        if (!results || results.length <= 0)
            return callback(84);
        var pwd2 = results[0].password;
        if (!pwd2)
            return callback(84);
        if (bcrypt.compareSync(pwd, pwd2)) {
            callback(0);
        } else {
            callback(84);
        }
    });
};
