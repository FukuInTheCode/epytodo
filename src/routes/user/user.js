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
        check_user_by_id(req.params.id, (exist) => {
            if (exist == 84)
                res.status(500).json({"msg": "Internal server error"});
                return;
            };
            if (!exist) {
                res.status(404).json({"msg": "Not found"});
                return;
            }
            get_user_by_id(req.params.id, (result) => {
                if (!result) {
                    res.status(500).json({"msg": "Internal server error"});
                    return;
                }
                res.status(200).json(result);
            })
        });
    });

    app.get("/user/:email", auth, (req, res) => {
        check_user_by_email(req.params.email, (exist) => {
            if (exist == 84)
                res.status(500).json({"msg": "Internal server error"});
                return;
            };
            if (!exist) {
                res.status(404).json({"msg": "Not found"});
                return;
            }
            get_user_by_email(req.params.email, (result) => {
                if (!result) {
                    res.status(500).json({"msg": "Internal server error"});
                    return;
                }
                res.status(200).json(result);
            })
        });
    });

    app.put("/user/:id", auth, (req, res) => {
        const email = req.body["email"];
        const firstname = req.body["firstname"];
        const name = req.body["name"];
        const password = req.body["password"];

        if (!email || !firstname || !name || !password) {
            res.status(498).json({"msg": "Bad parameter"});
            return;
        }
        check_user_by_id(req.params.id, (exist) => {
            if (exist == 84)
                res.status(500).json({"msg": "Internal server error"});
                return;
            };
            if (!exist) {
                res.status(404).json({"msg": "Not found"});
                return;
            }
            pwd = bcrypt.hashSync(pwd, 10);
            update_user_by_id(req.params.id, email, password, name, firstname, (err) => {
                if (err == 84) {
                    res.status(500).json({"msg": "Internal server error"});
                    return;
                }
                get_user_by_id(req.params.id, (result) => {
                    if (!result) {
                        res.status(500).json({"msg": "Internal server error"});
                        return;
                    }
                    res.status(200).json(result);
                });
            });
        });
    });
}
