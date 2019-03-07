db.person.aggregate([
    {$match: {"dob.age": {$gte: 50}}},
    {
        $group: {
            _id: "$gender",
            "People above 50": {$sum: 1},
            "Avg Age": {$avg: "$dob.age"},
            "Total Age Per Group": {$sum: "$dob.age"}
        }
    },
    {
        $project: {
            _id: 1,
            "People above 50": 1,
            "Avg Age": 1,
            "Total Age Per Group": 1,
            "Calculated Avg Age": {$divide: ["$Total Age Per Group", "$People above 50"]}
        }
    }
]).pretty()