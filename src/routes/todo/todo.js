const auth = require("../../middlewares/auth.js");

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
        check_todo(req.params.id, (exist) => {
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
                res.status(200).json(result);
            });
        })
    });
};
