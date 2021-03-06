const Koa = require("koa");
const bodyParser = require("koa-bodyparser");

const indexRoutes = require("./routes/index");
const companiesRoutes = require("./routes/companies");

const app = new Koa();
const PORT = process.env.PORT || 1338;

app.use(bodyParser());
app.use(indexRoutes.routes());
app.use(companiesRoutes.routes());

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
