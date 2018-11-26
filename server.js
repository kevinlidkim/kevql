import express from 'express';
import routes from './src/routes.js';

let port = 4000;
let app = express();
routes(app);

app.listen(port, () => {
	console.log('hosted on port ' + port);
})