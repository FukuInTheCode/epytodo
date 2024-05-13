const auth = require("../../middlewares/auth.js");

module.exports = (app, bcrypt) => {
    app.get("/user", auth, (req, res) => {
        get_all_users((result) => {
            if (!result) {
                res.status(500).json({"msg": "Internal server error"});
                return;
            }
            res.status(200).json(result);
        });
    });

    app.get('/user/todos', auth, (req, res) => {
        if (!req.user_email) {
            res.status(500).json({"msg": "Internal server error"});
            return;
        }
        get_all_user_todos(req.user_email, (result) => {
            if (!result) {
                res.status(500).json({"msg": "Internal server error"});
                return;
            }
            res.status(200).json(result);
        });
    });

    app.get("/user/:id", auth, (req, res) => {
        check_user_by_id(req.body.id, (exist) => {
            if (exist == 84)
                res.status(500).json({"msg": "Internal server error"});
                return;
            };
            if (!exist) {
                res.status(404).json({"msg": "Not found"});
                return;
            }
            get_user_by_id(req.body.id, (result) => {
                if (!result) {
                    res.status(500).json({"msg": "Internal server error"});
                    return;
                }
                res.status(200).json(result);
            })
        });
    });

    app.get("/user/:email", auth, (req, res) => {
        check_user_by_email(req.body.email, (exist) => {
            if (exist == 84)
                res.status(500).json({"msg": "Internal server error"});
                return;
            };
            if (!exist) {
                res.status(404).json({"msg": "Not found"});
                return;
            }
            get_user_by_email(req.body.email, (result) => {
                if (!result) {
                    res.status(500).json({"msg": "Internal server error"});
                    return;
                }
                res.status(200).json(result);
            })
        });
    });
}
