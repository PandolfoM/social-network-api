const router = require("express").Router();
const userRoutes = require("./user-routes");
const thoughtRoute = require("./thought-route");

router.use("/thoughts", thoughtRoute);
router.use("/users", userRoutes);

module.exports = router;
