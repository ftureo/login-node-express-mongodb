const User = require("../Models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userController = {
  signIn: async (req, res) => {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email: email });
    if (!userExists) {
      return res.json({
        success: false,
        response:
          "The user name or password you entered is not correct. Please, try again",
      });
    }
    const passwordMatches = bcryptjs.compareSync(password, userExists.password);
    console.log("Match", passwordMatches);
    console.log("userExists", userExists);
    if (!passwordMatches) {
      return res.json({
        success: false,
        response:
          "The user name or password you entered is not correct. Please, try again",
      });
    } else {
      const token = jwt.sign({ ...userExists }, process.env.SECRET_KEY, {});

      return res.json({
        success: true,
        message: "Login Succesfully. Welcome!",
        response: {
          token,
          email: userExists.email,
          urlPic: userExists.urlPic,
        },
      });
    }
  },

  signUp: async (req, res) => {
    const { givenName, lastName, urlPic, email, password, rol } = req.body;
    try {
      const userExists = await User.findOne({ email });

      if (userExists) {
        return res.json({
          success: false,
          error: "This email is already registered. Please use another address",
        });
      }
      const hashedPassword = bcryptjs.hashSync(password, 10);

      const newUser = new User({
        givenName,
        lastName,
        urlPic,
        email,
        password: hashedPassword,
        rol,
      });

      const newUserSaved = await newUser.save();
      const token = jwt.sign({ ...newUserSaved }, process.env.SECRET_KEY, {});

      return res.json({
        success: true,
        response: {
          token,
          givenName: newUserSaved.givenName,
          email: newUserSaved.email,
        },
      });
    } catch (err) {
      console.log(err);
      res.json({ success: false, error: err });
    }
  },
};
module.exports = userController;
