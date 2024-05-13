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
            res.status(500).json({"msg"; "Internal server error"});
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
}
