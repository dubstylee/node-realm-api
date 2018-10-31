const Router = require('koa-router');
const queries = require('../realm/companies');

const router = new Router();
const BASE_URL = `/api/v1/companies`;

router.get(BASE_URL, async (ctx) => {
//  try {
    const companies = await queries.getAllCompanies();
    ctx.body = {
      status: 'success',
      data: companies
    };
//  } catch (err) {
//    ctx.status = 400;
//    ctx.body = {
//      status: 'error',
//      message: err.message || 'Sorry, an error has occurred.'
//    };
//  }
});

router.get(`${BASE_URL}/:id`, async (ctx) => {
//  try {
    const company = await queries.getCompany(ctx.params.id);
    if (company) {
      ctx.body = {
        status: 'success',
        data: company
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That company does not exist.'
      };
    }
//  } catch (err) {
//    ctx.status = 400;
//    ctx.body = {
//      status: 'error',
//      message: err.message || 'Sorry, an error has occurred.'
//    };
//  }
});

router.post(`${BASE_URL}`, async (ctx) => {
//  try {
    const company = await queries.addCompany(ctx.request.body);

    if (company.id !== 'error') {
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        data: company
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: 'Something went wrong.'
      };
    }
//  } catch (err) {
//    ctx.status = 400;
//    ctx.body = {
//      status: 'error',
//      message: err.message || 'Sorry, an error has occurred.'
//    };
//  }
});

router.put(`${BASE_URL}/:id`, async (ctx) => {
//  try {
    const company = await queries.updateCompany(ctx.params.id, ctx.request.body);
    if (company !== null) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: company
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That company does not exist.'
      };
    }
//  } catch (err) {
//    ctx.status = 400;
//    ctx.body = {
//      status: 'error',
//      message: err.message || 'Sorry, an error has occurred.'
//    };
//  }
});

router.delete(`${BASE_URL}/:id`, async (ctx) => {
//  try {
    const company = await queries.deleteCompany(ctx.params.id);

    if (company !== null) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: company
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That company does not exist.'
      };
    }
//  } catch (err) {
//    ctx.status = 400;
//    ctx.body = {
//      status: 'error',
//      message: err.message || 'Sorry, an error has occurred.'
//    };
//  }
});

module.exports = router;
