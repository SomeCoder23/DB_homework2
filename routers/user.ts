import express from 'express';
import { User } from '../db/entity/User';
import db from '../db';
import { Profile } from '../db/entity/Profile';
import { Permission } from '../db/entity/Permission';
import { Role } from '../db/entity/Role';
import { In } from 'typeorm';

const router = express.Router();


router.get('/', async (req: any, res) => {
    try{
        const page = parseInt(req.query.page || '1');
        const pageSize = parseInt(req.query.pageSize || '10');
        const [items, total] = await User.findAndCount({
          skip: pageSize * (page - 1),
          take: pageSize
        });
        
        res.send({
          page: 1,
          pageSize: items.length,
          total,
          items
        });
      } catch(error){
        console.error(error);
        res.status(500).send("Something went wrong!!!!");
      }
      
});

router.get('/permissions', async (req: any, res) => {
  try{
    const page = parseInt(req.query.page || '1');
    const pageSize = parseInt(req.query.pageSize || '10');
    const [items, total] = await Permission.findAndCount({
      skip: pageSize * (page - 1),
      take: pageSize
    });
    
    res.send({
      page: 1,
      pageSize: items.length,
      total,
      items
    });
  } catch(error){
    console.error(error);
    res.status(500).send("Something went wrong!!!!");
  }
});

router.get('/roles', async (req: any, res) => {
  try{
    const page = parseInt(req.query.page || '1');
    const pageSize = parseInt(req.query.pageSize || '10');
    const [items, total] = await Role.findAndCount({
      skip: pageSize * (page - 1),
      take: pageSize
    });
    
    res.send({
      page: 1,
      pageSize: items.length,
      total,
      items
    });
  } catch(error){
    console.error(error);
    res.status(500).send("Something went wrong!!!!");
  }
});

router.get('/:id', async (req, res) => {
    try{

        const id = Number(req.params.id);
        const user = await User.findOne({
            where: {id}
        });
        if (user) {
            res.status(200).send(user);
          } else {
            res.status(404).send("Task not found");
          }

    }catch(error){
        console.error(error);
        res.status(500).send("Something went wrong! :(")
    }
});

router.post('/register', async (req, res) => {
  try {
    const user = new User();
    const profile = new Profile();
    user.userName = req.body.userName;
    user.password = req.body.password;
    user.email = req.body.email;
    profile.firstName = req.body.firstName;
    profile.lastName = req.body.lastName;
    profile.dateOfBirth = req.body.birthday;
    user.profile = profile;
    const roles = await Role.find({
      where: {
        id: In(req.body.roles)
      }
    });
    user.roles = roles;
    db.dataSource.transaction(async (transactionManager) => {
      await transactionManager.save(profile);
      await transactionManager.save(user);
    }).then(() => {
      res.send('User Created!');
    }).catch(error => {
      res.status(500).send("Something went wrong");
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

router.post('/addPermission', async (req, res) => {
  try {
    const perm = new Permission();
    perm.name = req.body.name;
    perm.save().then((response) => {
      res.status(201).send('Permission created!');
    }).catch(error => {
      console.error(error);
      res.status(500).send('Something went wrong');
    });


  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

router.post('/addRole', async (req, res) => {
  try {
    const role = new Role();
    role.name = req.body.name;
    const permissions = await Permission.find({
      where: {
        id: In(req.body.perms)
      }
    });
    role.permissions = permissions;
    role.save().then((response) => {
      res.status(201).send('Role Created with ID:' + response.id);
    }).catch(error => {
      console.error(error);
      res.status(500).send('Something went wrong');
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

router.post('/assignRole/:id', async (req, res) => {
  const id = Number(req.params.id);
  const user = await User.findOneBy({ id });
  if (user) {
    const roles = await Role.find({
      where: {
        id: In(req.body.roles)
      }
    });

    user.roles = roles;
    user.save().then((response) => {
      res.status(201).send('User Updated :)');
    }).catch(error => {
      console.error(error);
      res.status(500).send('Something went wrong');
    });
  } else {
    res.status(404).send("User not found :( ");
  }

});




export default router;
