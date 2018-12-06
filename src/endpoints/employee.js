import db from '../../db.js';
import { ObjectId } from 'mongodb';

const MONGO_NOT_CONNECTED = {
	status: 'Error',
	message: 'MongoDB is not connected yet'
};

exports.getEmployee = (req, res) => {
	if (db.get() === null) {
		return res.status(500).json(MONGO_NOT_CONNECTED);
	}

	let collection = db.get().collection('employee');
	collection.find().toArray().then((result) => {
		return res.status(200).json({
			status: 'OK',
			message: 'Successfully retrieved all employees',
			data: result
		});
	})
	.catch((err) => {
		console.error(err);
		return res.status(500).json({
			status: 'Error',
			message: 'Failed to retrieve all employees'
		});
	})
}

exports.addEmployee = (req, res) => {
	if (db.get() === null) {
		return res.status(500).json(MONGO_NOT_CONNECTED);
	}

	let collection = db.get().collection('employee');
	// make sure a name is provided
	if (req.body.name) {
		collection.insertOne(req.body).then(() => {
			return res.status(200).json({
				status: 'OK',
				message: 'Successfully added in employee ' + req.body.name
			});
		}).catch((err) => {
			console.error(err);
			return res.status(500).json({
				status: 'Error',
				message: 'Failed to add employee to database'
			});
		})
	} else {
		return res.status(400).json({
			status: 'Bad Request',
			message: 'No name was passed in'
		});
	}
};

exports.getEmployeeById = (req, res) => {
	if (db.get() === null) {
		return res.status(500).json(MONGO_NOT_CONNECTED);
	}

	let collection = db.get().collection('employee');
	if (req.params.id && req.params.id.length === 24) {
		collection.findOne({
			_id: ObjectId(req.params.id)
		})
		.then((result) => {
			if (result) {
				return res.status(200).json({
					status: 'OK',
					message: 'Successfully found employee by id',
					data: result
				});
			} else {
				return res.status(404).json({
					status: 'No content',
					message: 'No entry was found with that id'
				});
			}
		})
		.catch((err) => {
			console.error(err);
			return res.status(500).json({
				status: 'Error',
				message: 'Failed to find employee by id'
			});
		})
	} else {
		return res.status(400).json({
			status: 'Bad Request',
			message: 'Invalid id passed in'
		});
	}
}

exports.updateEmployeeById = (req, res) => {
	if (db.get() === null) {
		return res.status(500).json(MONGO_NOT_CONNECTED);
	}

	let collection = db.get().collection('employee');
	// make sure an id is provided
	if (req.params.id && req.params.id.length === 24) {
		collection.findOneAndUpdate({
			_id: ObjectId(req.params.id)
		}, { 
			$set: req.body
		}).then(() => {
			return res.status(200).json({
				status: 'OK',
				message: 'Successfully updated employee with id ' + req.params.id
			});
		}).catch((err) => {
			console.error(err);
			return res.status(500).json({
				status: 'Error',
				message: 'Failed to update employee ' + req.params.id
			});
		})
	} else {
		return res.status(400).json({
			status: 'Bad Request',
			message: 'No id was passed in'
		});
	}
}

exports.deleteEmployeeById = (req, res) => {
	if (db.get() === null) {
		return res.status(500).json(MONGO_NOT_CONNECTED);
	}

	let collection = db.get().collection('employee');
	// make sure an id is provided
	if (req.params.id && req.params.id.length === 24) {
		collection.deleteOne({
			_id: ObjectId(req.params.id)
		}).then(() => {
			return res.status(200).json({
				status: 'OK',
				message: 'Successfully deleted employee with id ' + req.params.id
			});
		}).catch((err) => {
			console.error(err);
			return res.status(500).json({
				status: 'Error',
				message: 'Failed to delete employee ' + req.params.id
			});
		})
	} else {
		return res.status(400).json({
			status: 'Bad Request',
			message: 'No id was passed in'
		});
	}
}
