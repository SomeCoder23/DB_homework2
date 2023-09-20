import express from 'express';
import isEmail from 'validator/lib/isEmail.js';

const validateUser = (req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const values = ['userName', 'firstName', 'lastName', 'email', 'password', 'dateOfBirth', 'roles'];
  const user = req.body;
  const errorList = [];
  values.forEach(key => {
    if (!user[key]) {
      return errorList.push(`${key} is Required!`);
    }
  });

//   if (!isEmail.default(user.email)) {
//     errorList.push('Email is not Valid');
//   }

  if (user.password.length < 6) {
    errorList.push('Password should contain at least 6 characters!');
  }
  if (user.userName.length < 3) {
    errorList.push('Username should contain at least 3 characters!');
  }

  if (errorList.length) {
    res.status(400).send(errorList);
  } else {
    next();
  }
}

const validateLogin = (req: express.Request, res: express.Response, next: express.NextFunction ) => {
    const values = ['userName', 'password'];
    const user = req.body;

    values.forEach(key => {
      if (!user[key]) {
        return `${key} is Required!`;
      }
    });

    next();
   
}



export {
  validateUser,
  validateLogin
}