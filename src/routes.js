import food from './endpoints/food';
import employee from './endpoints/employee';

let routes = (app) => {

	app.get('/food', food.getFood);
	app.get('/food/:id', food.getFoodById);
	app.post('/food', food.addFood);
	app.delete('/food/:id', food.deleteFoodById);

	app.get('/employee', employee.hello);
	app.get('/em', employee.addEmployee);

	app.get('*', (req, res) => {
		return res.status(200).json({
			status: 'OK',
			message: 'Server is up and running - try hitting an endpoint such as /food'
		});
	})
};

module.exports = routes;