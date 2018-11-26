import express from 'express';
import routes from './src/routes.js';
import bodyParser from 'body-parser';

let port = 4000;
let app = express();
app.use(bodyParser.json());
routes(app);

app.listen(port, () => {
	console.log('hosted on port ' + port);
});
