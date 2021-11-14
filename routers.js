const Router = require("@koa/router");
const path = require("path");

module.exports = function createRouters(files) {
  const router = new Router();

  router.get("/", (ctx, next) => {
    const data = files.map((file) => {
      return { name: file, link: file };
    });

    ctx.state = {
      files: data,
    };
    return ctx.render("home");
  });

  return router;
};
