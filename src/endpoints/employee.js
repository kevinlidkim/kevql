import db from '../../db.js';

exports.addEmployee = (req, res) => {
	let collection = db.get().collection('employee');
	// make sure a name is provided
	if (req.body.name) {
		collection.insert(req.body).then(() => {
			return res.status(200).json({
				status: 'OK',
				message: 'Successfully added in employee ' + red.body.name
			})
		}).catch((err) => {
			return res.status(500).json({
				status: 'Error',
				message: 'Failed to add employee to database'
			})
		})
	} else {
		return res.status(400).json({
			status: 'Bad Request',
			message: 'No name was passed in'
		})
	}
	collection.insert({
		name: 'kevin'
	})
	.then((result) => {
		console.log(result);
		return res.status(200).json({
			message: 'mongo success'
		});
	}).catch((err) => {
		console.log(err);
		return res.status(500).json({
			message: 'mongo failed'
		});
	})
};