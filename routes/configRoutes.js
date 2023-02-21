const indexR = require("./index");
const usersR = require("./users");
const coffeesR = require("./coffees");
const foodsR = require("./foods");



exports.routesInit = (app) => {
  app.use("/",indexR);
  app.use("/users",usersR);
  app.use("/coffee",coffeesR);
  app.use("/foods",foodsR);

  // TODO show 404 routes
}