const { check_user_by_email, create_user, get_mail_account } = require("../user/user.query.js");
const jwt = require("jsonwebtoken");
function isValidEmail(email: string) {
  return email
      .toLowerCase()
      .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
}


module.exports = function(app, bcrypt) {
    app.post('/login', (req, res) => {
        var mail = req.body.email;

        if (mail === undefined || req.body.email === undefined) {
            res.status(400).json({"msg": "Bad parameter"});
            return;
        }
        get_mail_account(res, mail, req.body.password, bcrypt, function(nbr) {
            if (nbr == 84) {
                res.status(401).json({"msg":"Invalid Credentials"})
                return;
            }
            res.status(200).json({"token": jwt.sign({email: mail, password: req.body.password}, process.env.SECRET)})
        });
    });

    app.post("/register", (req, res) => {
        var email = req.body.email;
        var firstname = req.body.firstname;
        var name = req.body.name;
        var password = req.body.password;
        if (!email || !firstname || !name || !password || !is_validMail(email)) {
            res.status(400).json({"msg": "Bad parameter"});
            return;
        }
        check_user_by_email(email, (response) => {
            if (response == 84) {
                res.status(500).json({"msg": "Internal server error"});
                return;
            }
            if (response == 1) {
                res.status(409).json({"msg": "Account already exists"});
                return;
            }
            const hpassword = bcrypt.hashSync(password, 10);
            create_user(email, firstname, name, hpassword, (response) => {
                if (response == 84) {
                    res.status(500).json({"msg": "Internal server error"});
                    return;
                }
                res.status(201).json({"token": jwt.sign({email: email, password: password}, process.env.SECRET)})
            });
        })
        res
    });
}
