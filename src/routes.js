import food from './endpoints/food';
import employee from './endpoints/employee';

let routes = (app) => {

	app.get('/food', food.getFood);
	app.get('/food/:id', food.getFoodById);
	app.post('/food', food.addFood);
	app.delete('/food/:id', food.deleteFoodById);

	app.get('/employee', employee.getEmployee);
	app.get('/employee/:id', employee.getEmployeeById);
	app.post('/employee', employee.addEmployee);
	app.put('/employee/:id', employee.updateEmployeeById);

	app.get('*', (req, res) => {
		return res.status(200).json({
			status: 'OK',
			message: 'Server is up and running - try hitting an endpoint such as /food'
		});
	})
};

module.exports = routes;