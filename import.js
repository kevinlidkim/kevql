import fs from 'fs';
import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017';
const dbName = 'sts';
const client = new MongoClient(url, {useNewUrlParser: true});
const dir = './src/data';

client.connect((err) => {
	if (err) {
		console.error('Import script failed to connect to MongoDB')
		process.exit();
	} else {
		importData(client.db(dbName));
	}
});

let importData = (db) => {
	console.log('Starting import process...');
	fs.readdir(dir, (err, dataFiles) => {
		if (err) {
			console.error('Error reading directory');
			console.error(err);
			client.close();
			process.exit();
		} else {
			let importProcess = [];
			dataFiles.forEach((file) => {
				importProcess.push(importFile(db, file));
			});
			// wait for import process to finish before we close connection
			Promise.all(importProcess).then((res) => {
				console.log('Finished importing. Closing connection.');
				client.close();
				process.exit();
			})
		}
	})
}

let importFile = (db, file) => {
	console.log('Importing ' + file);
	let path = dir + '/' + file;
	let data = JSON.parse(fs.readFileSync(path));
	let collection = db.collection(file.split('.')[0]); // grab the file name without the extension
	// insert data into db
	return collection.insertMany(data).catch((err) => {
		console.error(err);
	});
}