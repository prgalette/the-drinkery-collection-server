var express = require('express');
var router = express.Router();

const User = require("../models/User");

const isAuthenticated = require('../middleware/isAuthenticated');

console.log("Hitting user route");

/* GET users listing. */
router.get('/:id', isAuthenticated, (req, res, next) => {
    console.log("Hitting the user get route");
    const { id } = req.params;
    console.log("This is the id ==>", id);

    User.findById(id)
      .then((user) => {
        console.log("Retrieved User ->", user);
        res.json(user);
      })
      .catch((error) => {
        console.error("Error while retrieving user ->", error);
        next(error);
        res.status(500).send({ error: "Failed to retrieve user" });
      });
});

module.exports = router;
