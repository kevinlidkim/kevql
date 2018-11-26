import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017';
const dbName = 'sts';
const client = new MongoClient(url, {useNewUrlParser: true});

let db = null;

client.connect((err) => {
	if (err) {
		console.log('Error connecting to MongoDB');
		console.log(err);
	} else {
		console.log('Successfully connected to MongoDB');
		db = client.db(dbName);
	}
});

exports.get = () => {
	return db;
}