const auth = require("../../middlewares/auth.js");
function isValidStatus(status) {
    return status.match(/^(not started|todo|in progress|done)$/);
}

module.exports = (app) => {
    app.get("/todos", auth, (req, res) => {
        get_all_todos((result) => {
            if (!result) {
                res.status(500).json({"msg": "Internal server error"});
                return;
            }
            res.status(200).json(result);
        });
    });

    app.get("/todos/:id", auth, (req, res) => {
        check_todo_by_id(req.params.id, (exist) => {
            if (exist === 84) {
                res.status(500).json({"msg": "Internal server error"});
                return;
            }
            if (!exist) {
                res.status(404).json({"msg": "Not fount"});
                return;
            }
            get_todo_by_id(req.params.id, (result) => {
                if (!result) {
                    res.status(500).json({"msg": "Internal server error"});
                    return;
                }
                res.status(200).json(result[0]);
            });
        })
    });

    app.post("/todos", auth, (req, res) => {
        const title = req.body["title"];
        const desc = req.body["description"];
        const due_time = req.body["due_time"];
        const user_id = req.body["user_id"];
        const status = req.body["status"];

        if (!title || !desc || !due_time || !user_id || !status || !isValidStatus(status)) {
            res.status(498).json({"msg": "Bad parameter"});
            return;
        }
        add_todo(title, description, due_time, user_id, status, (id) => {
            if (id === -1) {
                res.status(500).json({"msg": "Internal server error"});
                return;
            }
            get_todo_by_id(id, (result) => {
                if (!result) {
                    res.status(500).json({"msg": "Internal server error"});
                    return;
                }
                res.status(200).json(result[0]);
            });
        })
    });

    app.put("/todos/:id", auth, (req, res) => {
        const title = req.body["title"];
        const desc = req.body["description"];
        const due_time = req.body["due_time"];
        const user_id = req.body["user_id"];
        const status = req.body["status"];

        if (!title || !desc || !due_time || !user_id || !status || !isValidStatus(status)) {
            res.status(498).json({"msg": "Bad parameter"});
            return;
        }
        check_todo_by_id(req.params.id, (exist) => {
            if (exist === 84) {
                res.status(500).json({"msg": "Internal server error"});
                return;
            }
            if (!exist) {
                res.status(404).json({"msg": "Not fount"});
                return;
            }
            update_todo_by_id(id, title, desc, due_time, user_id, status, (err) => {
                if (err === 84) {
                    res.status(500).json({"msg": "Internal server error"});
                    return;
                }
                res.status(200).json({"title": title, "description": desc, "due_time": due_time, "user_id": user_id, "status": status});
            });
        })
    });
};
