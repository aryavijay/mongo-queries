/*****************************/
db.person.aggregate([
    {
        $project: {
            _id: 1,
            age: "$dob.age",
            email: 1,
            gender: {
                $concat: [
                    {$toUpper: {$substrCP: ["$gender", 0, 1]}},
                    {$substrCP: ["$gender", 1, {$subtract: [{$strLenCP: "$gender"}, 1]}]}
                ]
            }
        }
    }
])
