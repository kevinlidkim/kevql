import db from '../../db.js';

exports.hello = (req, res) => {
	console.log('hello');
	return res.status(200).json({
		status: 'OK',
		message: 'mongo server is working'
	});
};

exports.addEmployee = (req, res) => {
	let collection = db.get().collection('employee');
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
}