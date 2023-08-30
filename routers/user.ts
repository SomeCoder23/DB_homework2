import express from 'express';
import { User } from '../db/entity/User';
import db from '../db';

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
    try{
        const newUser = new User();
        newUser.userName = req.body.userName;
        newUser.password = req.body.password;
        await newUser.save();
        res.send("User Created! :)");
    } catch(error){
        console.error(error);
        res.status(500).send("Something went wrong :(");
    }
});


export default router;
