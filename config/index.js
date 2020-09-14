const joi = require('@hapi/joi');

require('dotenv').config({
  path: [__dirname, '..', 'environment', `.env.${process.env.ENV}`].join('/'),
});

const joiENVSchema = {
  ENV: joi.string().required().default('dev').description('ENV is required'),
  MONGO_DB_URL: joi.string().required().description('MONGO_DB_URL is required'),
  PORT: joi.string().required().description('PORT is required'),
};

const unverifiedVars = {};
for (const key in joiENVSchema) {
  unverifiedVars[key] = process.env[key];
}

const { error, value: envVars } = joi
  .object(joiENVSchema)
  .validate(unverifiedVars);
  
if (error) {
  throw new Error(error);
}

module.exports = {
  ENV: envVars.ENV,
  MONGO_DB_URL: envVars.MONGO_DB_URL,
  PORT: envVars.PORT,
};
