import food from './controllers/food';

let routes = (app) => {

	app.get('/food', food.getFood);
	app.get('/food/:id', food.getFoodById);

	app.get('*', (req, res) => {
		console.log('sup');
		return 'sup';
	})
};

module.exports = routes;