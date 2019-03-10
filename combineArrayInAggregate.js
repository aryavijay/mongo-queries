db.collection.aggregate([
    {
        $unwind: "$hobbies"
    },
    {
        $group: {
            _id: "$age",
            "total": {$sum: 1},
            hobbies: {$push: "$hobbies"},
            hobbs: {$addToSet: "$hobbies"}
        }
    }
])

/********************/
db.friends.drop();
db.friends.aggregate([
    {
        $project: {
            name: 1,
            age: 1,
            noOfExam: {$size: "$examScores"},
            score: {$slice: ["$examScores", 0, 1]}
        },
    },
    {
        $unwind: "$score"
    },
    {
        $project: {
            name:1,
            age:1,
            noOfExam:1,
            difficulty: "$score.difficulty",
            CoreScore:"$score.score"

        }
    }
])