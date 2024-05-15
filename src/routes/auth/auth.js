const { check_email, create_user, get_mail_account } = require("../user/user.query.js");
const jwt = require("jsonwebtoken");

module.exports = function(app, bcrypt) {
    app.post('/login', (req, res) => {
        var mail = req.body["email"];

        if (mail === undefined || req.body["password"] === undefined) {
            res.status(500).json({"msg":"internal server error"});
            return;
        }
        get_mail_account(res, mail, req.body["password"], bcrypt, function(nbr) {
            if (nbr == 84) {
                res.status(401).json({"msg":"Invalid Credentials"});
            }
            return;
        });
    });

    app.post("/register", (req, res) => {
        var email = req.body["email"];
        var firstname = req.body["firstname"];
        var name = req.body["name"];
        var password = req.body["password"];
        if (!email || !firstname || !name || !password) {
            res.status(400).json({msg: "Bad parameter"});
            return;
        }
        check_email(email, (response) => {
            if (response == 84) {
                res.status(500).json({"msg": "Internal server error"});
                return;
            }
            if (response == 0) {
                res.json({"msg": "Account already exists"});
                return;
            }
            bcrypt.hasSync(password, 10);
            create_user(email, firstname, name, password, (response) => {
                if (response == 84) {
                    res.status(500).json({"msg": "Internal server error"});
                    return;
                }
                res.status(200).json({"token": jwt.sign({email: email, password: password}, process.env.SECRET)})
            });
        })
        res
    });
}
