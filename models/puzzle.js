const mongoose = require('mongoose');
// const config = require('../config/database');
const Schema = mongoose.Schema;

// Define collection and schema for Puzzles
let PuzzleSchema = new Schema({
    puzzle1: {
        type: Number
    },
    puzzle2: {
        type: Number
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'User'
    },

});

const Puzzle = (module.exports = mongoose.model('Puzzle', PuzzleSchema));


module.exports.addPuzzle = function (newUser, callback) {
    newUser.save(callback);
};