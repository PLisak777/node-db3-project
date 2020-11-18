const db = require('../data/db-config');

module.exports = {
	find,
	findById,
	findSteps,
	add,
	update,
	remove,
};

async function find() {
	try {
		return await db('schemes');
	} catch (err) {
		throw err;
	}
}

async function findById(id) {
	try {
		const scheme = await db('schemes').where({ id }).first();
		return scheme;
	} catch (err) {
		throw err;
	}
}

async function findSteps(id) {
	try {
		const steps = await db('schemes as s')
			.join('steps as st', 's.id', 'st.scheme_id')
			.where({ scheme_id: id })
			.select('st.step_number', 's.scheme_name', 'st.instructions');
		return steps;
	} catch (err) {
		throw err;
	}
}

async function add(scheme) {
	try {
		const ids = await db('schemes').insert(scheme);
		const newScheme = await findById(ids[0]);
		return newScheme;
	} catch (err) {
		throw err;
	}
}

async function update(changes, id) {
	try {
		await db('schemes').where({ id }).update(changes);
		return await findById(id);
	} catch (err) {
		throw err;
	}
}

async function remove(id) {
	try {
		return await db('schemes').del().where({ id });
	} catch (err) {
		throw err;
	}
}
