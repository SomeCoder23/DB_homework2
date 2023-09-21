import express from 'express';
import { User } from '../db/entity/User';
import db from '../db';
import { Profile } from '../db/entity/Profile';
import { Permission } from '../db/entity/Permission';
import { Role } from '../db/entity/Role';
import { In } from 'typeorm';
import { assignRole, insertUser, login } from '../controllers/user.js';
import { validateLogin, validateUser } from '../middleware/validation/user';


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
  
  insertUser(req.body)
    .then(result => {
      res.status(201).send("User added Succesfully! :)");
    })
    .catch(err => {
    console.error(err);
    res.status(500).send("Something went wrong :(");
    });
});

router.post('/login', validateLogin, async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  login(username, password)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(401).send(err);
    })
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
  assignRole(id, req.body.roles)
    .then(result => {
      res.status(201).send("Successfully assigned role to user :)");
    })
    .catch(err => {
      res.status(401).send(err);
    })
});




export default router;
