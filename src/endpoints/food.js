import Food from './../data/food.js';

exports.getFood = (req, res) => {
	return res.status(200).json({
		status: 'OK',
		message: 'Successfully retrieved all food items',
		data: Food
	})
};

exports.getFoodById = (req, res) => {
	// check to see if there is an id passed in
	if (req.params.id) {
		// check to see if id is valid
		let id = Number.parseInt(req.params.id);
		if (Number.isInteger(id)) {
			// search array for item with matching id
			let food = Food.find((item) => {
				if (item.id === id) {
					return item;
				}
			});
			if (food) {
				return res.status(200).json({
					status: 'OK',
					message: 'Successfully found food by id',
					data: food
				});
			} else {
				return res.status(404).json({
					status: 'No Content',
					message: 'No entry was found with that id'
				});
			}
		} else {
			return res.status(400).json({
				status: 'Bad Request',
				message: 'Id passed in is not an integer'
			});
		}
	} else {
		return res.status(400).json({
			status: 'Bad Request',
			message: 'No id was passed in'
		});
	}
};

exports.addFood = (req, res) => {
	// check to see if required fields exist
	// description and halal are optional which is why they have default values below
	if (req.body.id && req.body.name) {
		let id = Number.parseInt(req.params.id);
		if (Number.isInteger(id)) {
			let food = {
				id: id,
				name: req.body.name,
				description: req.body.description || 'No description provided',
				halal: req.body.halal || false
			}
			Food.push(food);
			return res.status(200).json({
				status: 'OK',
				message: 'Successfully added ' + food.name + ' with id: ' + food.id
			});
		} else {
			return res.status(400).json({
				status: 'Bad Request',
				message: 'Id passed in is not an integer'
			});
		}
	} else {
		return res.status(400).json({
			status: 'Bad Request',
			message: 'No id or name was passed in'
		});
	};
};

exports.deleteFoodById = (req, res) => {
	// check for id
	if (req.params.id) {
		let id = Number.parseInt(req.params.id);
		if (Number.isInteger(id)) {
			// find the index of the food with specified id
			let index = Food.findIndex((item) => {
				return item.id === id;
			});
			// if food exists, remove it from the list
			if (index >= 0) {
				Food.splice(index, 1);
				return res.status(200).json({
					status: 'OK',
					message: 'Successfully deleted food at id: ' + id
				})
			} else {
				return res.status(404).json({
					status: 'No Content',
					message: 'No entry was found with that id'
				});
			}
		} else {
			return res.status(400).json({
				status: 'Bad Request',
				message: 'Id passed in is not an integer'
			});
		}
	} else {
		return res.status(400).json({
			status: 'Bad Request',
			message: 'No id was passed in'
		})
	}
}
