const Router = require('koa-router');
const queries = require('../realm/companies');

const router = new Router();
const BASE_URL = `/api/v1/companies`;

router.get(BASE_URL, async (ctx) => {
  try {
    const companies = await queries.getAllCompanies();
    ctx.body = {
      status: 'success',
      data: companies
    };
  } catch (err) {
    console.log(err)
  }
});

module.exports = router;
