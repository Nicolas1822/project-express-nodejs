const express = require("express");
const routerApi = require("./router/index.js");
const { boomErrorLogin, ormErrorHandler } = require('./middlewares/error.handler');
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

require('./utils/auth');

routerApi(app);
app.use(ormErrorHandler);
app.use(boomErrorLogin);

app.listen(PORT, () => {
	console.log(`Corriendo en el puerto ${PORT}`);
});

