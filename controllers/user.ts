import bcrypt from 'bcrypt';
import { User } from "../db/entity/User.js";
import jwt from 'jsonwebtoken';
import { Profile } from '../db/entity/Profile.js';
import { Role } from '../db/entity/Role.js';
import db from '../db';
import { In } from 'typeorm';


const insertUser = async(body: any) => {
    try {
        const user = new User();
        const profile = new Profile();
        user.userName = body.userName;
        user.password = body.password;
        user.email = body.email;
        profile.firstName = body.firstName;
        profile.lastName = body.lastName;
        profile.dateOfBirth = body.dateOfBirth;
        user.profile = profile;
        // const roles = await Role.find({
        //   where: {
        //     id: In(body.roles)
        //   }
        // });
        // user.roles = roles;
        return db.dataSource.transaction(async (transactionManager) => {
          await transactionManager.save(profile);
          await transactionManager.save(user);
        });

    
      } catch (error) {
        console.error(error);
            throw("Something went wrong :(((((");
      }
}


const login = async (userName: string, password: string) => {
    try {
      const user = await User.findOneBy({
        userName
      });
  
      const passwordMatching = await bcrypt.compare(password, user?.password || '');
  
      if (user && passwordMatching) {
        const token = jwt.sign(
          {
            username: user.userName,
            email: user.email,
            name: user.profile.firstName + " " + user.profile.lastName
          },
          process.env.SECRET_KEY || '',
          {
            expiresIn: "14d"
          }
        );
  
        return token;
      } else {
        throw ("Invalid Username or password!");
      }
    } catch (error) {
      throw ("Invalid Username or password!");
    }
  }
  
  export{
    login,
    insertUser
  }