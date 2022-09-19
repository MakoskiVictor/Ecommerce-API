const { Router } = require("express");
const { Calendar } = require("../db");
var moment = require("moment");

const generateDate = (month, day) => {
  let dateNow = moment(month).startOf("month");
  dateNow.add(day, "days");
  return dateNow;
};

const deletePastDates = async () => {
  const fullDates = await Calendar.findAll();
  const today = new Date();
  fullDates.forEach((item) => {
    let tempDate = new Date(item.date);
    if (Date.parse(tempDate) < Date.parse(today)) {
      Calendar.destroy({ where: { id: item.id } });
    }
  });
};

const router = Router();

router.get("/", async (req, res, next) => {
  const fullCalendar = await Calendar.findAll();
  try {
    if (fullCalendar.length === 0) {
      for (let i = 0; i < 60; i++) {
        let actualDay = generateDate(moment(), i);
        for (let j = 8; j <= 18; j++) {
          await Calendar.create({
            date: actualDay,
            time: j,
            stock: 5,
          });
        }
      }
      deletePastDates();
    }
    const dates = await Calendar.findAll();
    res.send(dates);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const date = await Calendar.findOne({ where: { id: id } });
    date.stock = Number(date.stock) - 1;
    await date.save();
    res.send(date);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
