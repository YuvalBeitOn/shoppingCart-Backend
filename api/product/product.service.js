const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
	query,
	getById,
	remove,
	update,
	add,
};

async function query() {
	const collection = await dbService.getCollection('product');
	try {
		const products = await collection.find().toArray();
		return products;
	} catch (err) {
		console.log('Product SERVICE: Cannot load products.');
		throw err;
	}
}
//NOTE
async function getById(productId) {
	const collection = await dbService.getCollection('product');
	try {
		const product = await collection.findOne({ _id: ObjectId(productId) });
		return product;
	} catch (err) {
		console.log(`Product SERVICE - ERROR: while finding product ${productId}`);
		throw err;
	}
}

async function remove(productId) {
	const collection = await dbService.getCollection('product');
	try {
		await collection.deleteOne({ _id: ObjectId(productId) });
	} catch (err) {
		console.log(`Product SERVICE - ERROR: cannot remove product ${productId}`);
		throw err;
	}
}

async function update(product) {
	const collection = await dbService.getCollection('product');
	product._id = ObjectId(product._id);
	try {
		console.log('Product SERVICE: Attempting update...');
		const savedProduct = await collection.replaceOne({ _id: product._id }, product);
		return savedProduct;
	} catch (err) {
		console.log(`Product SERVICE - ERROR: Cannot update product ${product._id}`);
		throw err;
	}
}

async function add(product) {
	const collection = await dbService.getCollection('product');
	try {
		await collection.insertOne(product);
		return product;
	} catch (err) {
		console.log(`Product SERVICE - ERROR: Cannot add product.`);
		throw err;
	}
}
