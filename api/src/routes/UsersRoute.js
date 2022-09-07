const { Router } = require("express");
const { User } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");

const router = Router();

router.get("/login", async (req, res, next) => {
   try {
      const { email, password } = req.body;
      const userValidate = await User.findAll({
         where: { email: email, password: password },
      });
      if (Object.entries(userValidate).length === 0) {
         res.send(false);
      } else {
         res.send({
            name: userValidate[0].dataValues.name,
            lastName: userValidate[0].dataValues.lastName,
            image: userValidate[0].dataValues.image,
            address: userValidate[0].dataValues.address,
            isAdmin: userValidate[0].dataValues.isAdmin,
         });
         if (Object.entries(userValidate).length === 0) {
            res.send(false);
         } else {
            res.send({
               name: userValidate[0].dataValues.name,
               lastName: userValidate[0].dataValues.lastName,
               image: userValidate[0].dataValues.image,
               address: userValidate[0].dataValues.address,
               isAdmin: userValidate[0].dataValues.isAdmin,
            });
         }
      }
   } catch (err) {
      next(err);
   }
});

router.get("/", async (req, res, next) => {
   const { name, email } = req.query;
   let allUsers;
   try {
      if (name) {
         allUsers = await User.findAll({
            where: {
               name: {
                  [Op.iLike]: `%${name}%`,
               },
            },
         });
      } else if (email) {
         allUsers = await User.findAll({
            where: {
               email: {
                  [Op.iLike]: `%${email}%`,
               },
            },
         });
      } else {
         allUsers = await User.findAll();
      }
      let users = allUsers.map((item) => {
         return {
            id: item.id,
            email: item.email,
            name: item.name,
            lastName: item.lastName,
            image: item.image,
            address: item.address,
            isAdmin: item.isAdmin,
            isBaned: item.isBaned,
         };
      });
      res.send(users);
   } catch (err) {
      next(err);
   }
});

router.post("/", async (req, res, next) => {
   const { email, password, name, lastName, image, address } = req.body;
   let isAdmin = false;
   let isBaned = false;
   try {
      const userValidate = await User.findAll({
         where: { email: email },
      });
      if (
         email === "enzoholgadodev@gmail.com" ||
         email === "makoski.ed@gmail.com" ||
         email === "sebaslkjh@gmail.com" ||
         email === "ingdcuevas@gmail.com" ||
         email === "mattvalenti11@gmail.com" ||
         email === "rider_shock@outlook.es" ||
         email === "marina-mansilla@hotmail.com" ||
         email === "eze-leiva@hotmail.com"
      ) {
         isAdmin = true;
      }
      if (Object.entries(userValidate).length === 0) {
         const user = await User.findOrCreate({
            where: {
               email: email,
               name: name,
               lastName: lastName,
               password: password,
               image: image,
               address: address,
               isAdmin: isAdmin,
               isBaned: isBaned,
            },
         });
         res.send({
            name: name,
            lastName: lastName,
            image: image,
            address: address,
            isAdmin: isAdmin,
         });
      } else {
         res.send(false);
      }
   } catch (err) {
      next(err);
   }
});

router.put("/:userId", async (req, res, next) => {
   const { type } = req.query;
   const { userId } = req.params;
   const user = await User.findOne({ where: { id: userId } });
   try {
      switch (type) {
         case "admin":
            if (user.isAdmin) {
               user.isAdmin = false;
               await user.save();
               res.send(`the user ${user.name} is no longer an administrator`);
            } else {
               user.isAdmin = true;
               await user.save();
               res.send(`the user ${user.name} is now an administrator`);
            }
            break;
         case "name":
            const { name, lastName } = req.body;
            user.name = name;
            user.lastName = lastName;
            await user.save();
            res.send(`name changed successfully`);
            break;
         case "image":
            const { newImage } = req.body;
            user.image = newImage;
            await user.save();
            res.send(`image changed successfully`);
         case "address":
            const { newAddress } = req.body;
            user.address = newAddress;
            await user.save();
            res.send(`address changed successfully`);
         case "password":
            const { oldPassword, newPassword } = req.body;
            if (user.password === oldPassword) {
               user.password = newPassword;
               await user.save();
               res.send(`password changed successfully`);
            } else {
               res.send(`Password is incorrect`);
            }
         case "ban":
            if (user.isBaned) {
               user.isBaned = false;
               await user.save();
               res.send(`the user ${user.name} has been unbanned`);
            } else {
               user.isBaned = true;
               await user.save();
               res.send(`the user ${user.name} has been banned`);
            }
            break;
         default:
            break;
      }
   } catch (err) {
      next(err);
   }
});

// {
//     "email": "enzoholgadocdb@gmail.com",
//     "password": "huevos123",
//     "name": "enzo",
//     "lastName": "holgado",
//     "image": "",
//     "address": ""
//   }

module.exports = router;
