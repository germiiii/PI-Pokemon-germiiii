const { Router } = require("express")
const { getTypeHandler } = require('../handlers/typeHandlers')

const typeRouter = Router();

typeRouter.get('/', getTypeHandler)

module.exports = typeRouter;
