const db = require("../../config/db.js");

exports.get_all_todos = (to_call) => {
    return to_call();
};
