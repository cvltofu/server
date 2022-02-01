import Joi from 'joi';

const expression = /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

const authSchema = Joi.object({
  username: Joi.string().min(3).max(40).required(),
  email: Joi.string().min(4).max(40).lowercase().email().required(),
  password: Joi.string().min(2).required().pattern(expression),
});

export default authSchema;
