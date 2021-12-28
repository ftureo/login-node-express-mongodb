const Joi = require("joi");

const validator = {
  validateNewUser: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string()
        .trim()
        .required()
        .email({
          minDomainSegments: 2,
          tlds: {
            allow: false,
          },
        }),
      password: Joi.string().trim().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
      rePassword: Joi.ref("password"),
      rol: Joi.string().trim(),
      givenName: Joi.string().trim().required().min(2).max(25),
      lastName: Joi.string().trim().required().min(2).max(25),
      urlPic: Joi.string().trim().uri().required(),
    });

    const validation = schema.validate(req.body, { abortEarly: false });
    console.log(validation);
    if (!validation.error) {
      next();
    } else {
      res.json({
        success: false,
        error: "Data form contain errors. Please, try again",
      });
    }
  },
};

module.exports = validator;
