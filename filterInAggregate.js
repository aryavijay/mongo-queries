//Query to get score $gt 60 in exam score i.e. an array
//filters in projection works only on arrays

db.friends.aggregate([
    {
        $project: {
            _id: 1,
            name: 1,
            score: {
                $filter: {
                    input: "$examScores",
                    as: 'sc',
                    cond: {
                        $gt: ["$$sc.score", 60]
                    }
                }
            }
        }
    }
])

//Get Max score from array

db.friends.aggregate([
    {$unwind: "$examScores"},
    {
        $group: {
            _id: "$_id",
            name: {$first: "$name"},
            maxScore: {$max:  "$examScores.score"}
        }
    },
    {
        $project: {
            _id:1,
            name:1,
            maxScore: 1
        }
    }
])