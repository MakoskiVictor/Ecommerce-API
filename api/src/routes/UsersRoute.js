const { Router } = require("express");
const { User } = require("../db");
const axios = require("axios");

const router = Router();

router.get("/", async (req, res, next) => {
  const { email, password } = req.body;
  try {
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
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const { email, password, name, lastName, image, address } = req.body;
  let isAdmin = false;
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

// {
//     "email": "enzoholgadocdb@gmail.com",
//     "password": "huevos123",
//     "name": "enzo",
//     "lastName": "holgado",
//     "image": "",
//     "address": ""
//   }

module.exports = router;
