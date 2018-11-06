import Food from './../data/food.js';

exports.getFood = (req, res) => {
	return res.status(200).json({
		status: 'OK',
		message: 'Successfully retrieved all food',
		data: Food
	})
}

exports.getFoodById = (req, res) => {
	// check to see if there is an id passed in
	if (req.params.id) {
		let id = Number.parseInt(req.params.id);
		// parse id to make sure it is an int
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
				})
			} else {
				return res.status(204).json({
					status: 'No Content',
					message: 'No entry was found with that id'
				})
			}
		} else {
			return res.status(400).json({
				status: 'Bad Request',
				message: 'Id passed in is not an integer'
			})
		}
	} else {
		return res.status(400).json({
			status: 'Bad Request',
			message: 'No id was passed in'
		})
	}
}