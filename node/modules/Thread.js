const mongoose = require("mongoose");

const ThreadSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		maxlength: 20
	},
	title: {
		type: String,
		required: true,
		maxlength: 20
	},
	content: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model("Thread", ThreadSchema);