const express = require('express');
const app = express();
const puzzleRoutes = express.Router();

// Require Puzzle model in our routes module
let Puzzle = require('../models/puzzle');

// Defined store route
puzzleRoutes.route('/add').post(function (req, res) {
    // console.log('puzzle =>',puzzle);
    // checking if same users record already exists - updating it.
    // console.log("Puzzle By UserID: ", req.body.userId);
    Puzzle.findOne({
        userId: req.body.userId
    }).exec(function (err, puzzles) {
        if (err) {
            console.log("Puzzle By UserID Error ", err);
            res.json({
                success: false,
                msg: "failed",
                err: err
            });
            return;
        }

        if(!puzzles) {
            var objPuzzleNew = new Puzzle({
                puzzle1: req.body.puzzle1,
                puzzle2: req.body.puzzle2,
                userId: req.body.userId
            });
            objPuzzleNew.save((err, puzzle) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: "failed",
                        err: err
                    });
                }
                if (puzzle) {
                    res.json({
                        success: true,
                        msg: "saved successfully"
                    });
                }
            });
        } else {
            Puzzle.update(
                { userId: req.body.userId },
                { "$set": { puzzle1: req.body.puzzle1, puzzle2: req.body.puzzle2}, },
                function (err, raw) {
                    if (err) {
                        res.json({
                            success: true,
                            msg: "failed to update",
                            err: err
                        });
                    } else {
                        res.json({
                            success: true,
                            msg: "updated successfully"
                        });
                    }
                }
            );
        }
        // console.log('Puzzle By UserID Found: ', puzzles);
    });
});

// Defined get data(index or listing) route
puzzleRoutes.route('/').get(function (req, res) {

    Puzzle.find({}).populate('userId')
        .then(data => {
            res.status(200).json({
                data
            });
        })
        .catch(err => {
            res.status(400).send("unable to save");
        });

});

puzzleRoutes.route('/:userId').get(function (req, res) {
    // console.log(req.params.userId);
    Puzzle.findOne({
        userId: req.params.userId
    }, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    });
});

module.exports = puzzleRoutes;