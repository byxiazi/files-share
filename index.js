const Koa = require("koa");
const views = require("koa-views");
const ks = require("koa-static");
const createRouters = require("./routers");
const { localIp } = require('./utils')

module.exports = function App(dir, files) {
  const app = new Koa();

  const render = views(__dirname + "/views", { extension: "mustache" });
  app.use(render);
  app.use(ks(dir));

  const router = createRouters(files);
  app.use(router.routes());

  const ip = localIp()
  app.listen(5000, () =>
    console.log(`Server running at http://${ip}:5000/`)
  );
};
