const { Router } = require("express");
const { User } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");
const bcryptjs = require("bcrypt");
// emails
const transporter = require("../../config/mailer");

const router = Router();

router.get("/login", async (req, res, next) => {
  const { email, password } = req.query;
  try {
    let userValidate = await User.findAll({
      where: { email: email },
    });

    if (Object.entries(userValidate).length !== 0) {
      if (!bcryptjs.compareSync(password, userValidate[0].password))
        userValidate = [];
    }

    if (Object.entries(userValidate).length === 0) {
      res.send(false);
    } else {
      res.send({
        name: userValidate[0].dataValues.name,
        lastName: userValidate[0].dataValues.lastName,
        image: userValidate[0].dataValues.image,
        address: userValidate[0].dataValues.address,
        isAdmin: userValidate[0].dataValues.isAdmin,
        id: userValidate[0].dataValues.id,
      });
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

router.post("/Google", async (req, res, next) => {
  const { email, password, name, lastName, image, address } = req.body;
  console.log("entro validacion Google");
  let isAdmin = false;
  let isBaned = false;
  try {
    var userValidate = await User.findAll({
      where: { email: email },
    });

    console.log("user validate", userValidate);
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

    let passwordHash = await bcryptjs.hash(password, 8);

    if (Object.entries(userValidate).length === 0) {
      const user = await User.findOrCreate({
        where: {
          email: email,
          name: name,
          lastName: lastName,
          password: passwordHash,
          image: image,
          address: address,
          isAdmin: isAdmin,
          isBaned: isBaned,
        },
      });
      await transporter.sendMail({
        from: '"Ecommerce Clothes👻" <dominicode.xyz@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Register successfully for google!", // Subject line
        // text: "Hello world?", // plain text body
        html: `
            <b> Hello ${name} you Register for Google in Eccomerce Clothes, wellcome Fashion and Style for life<b>`, // html body
      });
      userValidate = User.findAll({
        where: { email: email },
      });
    }
    res.send({
      name: userValidate[0].dataValues.name,
      lastName: userValidate[0].dataValues.lastName,
      image: userValidate[0].dataValues.image,
      address: userValidate[0].dataValues.address,
      isAdmin: userValidate[0].dataValues.isAdmin,
      id: userValidate[0].dataValues.id,
    });
  } catch (err) {
    console.log("entro error");
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  let allUsers;
  try {
    if (id) {
      allUsers = await User.findOne({
        where: {
          id: id,
        },
      });

      let user = allUsers.map((item) => {
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
      res.send(user);
    } else res.send(false);
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
    // send mail registro
    await transporter.sendMail({
      from: '"Ecommerce Clothes👻" <dominicode.xyz@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Register successfully!", // Subject line
      // text: "Hello world?", // plain text body
      html: `
         <b> Hello ${name} you register in Eccomerce Clothes, wellcome Fashion and Style for life<b>`, // html body
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

    let passwordHash = await bcryptjs.hash(password, 8);

    if (Object.entries(userValidate).length === 0) {
      const user = await User.findOrCreate({
        where: {
          email: email,
          name: name,
          lastName: lastName,
          password: passwordHash,
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
  console.log("SOY TYPE", type, "SOY USERID", userId);
  const user = await User.findOne({ where: { id: userId } });
  console.log(userId);
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
      case "profile":
        const { name, lastName, newAddress, newPhone } = req.body;
        console.log("SOY API PROFILE", name, lastName, newAddress, newPhone);
        user.name = name;
        user.lastName = lastName;
        user.address = newAddress;
        user.phone = newPhone;
        await user.save();
        res.send(`Changed successfully`);
        break;
      case "image":
        const { newImage } = req.body;
        user.image = newImage;
        await user.save();
        res.send(`image changed successfully`);
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

router.put("/put/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, lastName, address, phone  } = req.body;
    console.log({name, lastName, address,phone });
    const toEdit = await User.update(
      {
        name,
        lastName,
        address,
        phone
      },
      { where: { id } }
    );
    res.send("done");
    console.log("chau");
  } catch (error) {
    next(error);
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
