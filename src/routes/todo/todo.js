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
};
