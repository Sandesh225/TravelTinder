import Joi from 'joi';

// User registration validation
const validateUserRegistration = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

// Login validation
const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

// Password change validation
const validatePasswordChange = (data) => {
  const schema = Joi.object({
    oldPassword: Joi.string().min(6).required(),
    newPassword: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

// User update validation
const validateUserUpdate = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
  });
  return schema.validate(data);
};

export {
  validateUserRegistration,
  validateLogin,
  validatePasswordChange,
  validateUserUpdate,
};
