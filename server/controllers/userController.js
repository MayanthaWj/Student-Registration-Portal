const User = require("../model/user");
const bcrypt = require("bcrypt");
const { createTokens } = require("../middleware/jwt");

const createUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    //console.log("from create user:", name, password)

    if (!(name && password)) {
      res.status(400).send("All input is required");
    } else {
      const encryptedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        password: encryptedPassword,
      });
      res.status(201).json(user);
    }
  } catch (err) {
    console.log(err);
  }
};

const userLogin = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ where: { name: name } });
    if (!user) {
      res.status(400).json({ error: "User Doesn't Exist" });
    } else {
      const dbPassword = user.password;
      bcrypt.compare(password, dbPassword).then((match) => {
        if (!match) {
          res
            .status(400)
            .json({ error: "Wrong Username and Password Combination!" });
        } else {
          const accessToken = createTokens(user);

          res.json({
            //name: user.name,
            accessToken,
          });
          console.log("Created token: ", accessToken);
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { createUser, userLogin };
