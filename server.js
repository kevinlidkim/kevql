import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './src/schema.js';
import routes from './src/routes.js';

let port = 4000;


let app = express();
app.use('/graphql', graphqlHTTP({
	schema: schema,
	graphiql: true
}));

routes(app);

app.listen(port, () => {
	console.log('hosted on port ' + port);
})