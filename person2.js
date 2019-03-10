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
            },
            title: {
                $concat: [
                    {$toUpper: {$substrCP: ["$name.title", 0, 1]}},
                    {$substrCP: ["$name.title", 1, {$subtract: [{$strLenCP: "$name.title"}, 1]}]},
                    "."
                ]
            },
            fullName: {
                $concat: [
                    {$toUpper: {$substrCP: ["$name.first", 0, 1]}},
                    {$substrCP: ["$name.first", 1, {$subtract: [{$strLenCP: "$name.first"}, 1]}]},
                    ' ',
                    {$toUpper: {$substrCP: ["$name.last", 0, 1]}},
                    {$substrCP: ["$name.last", 1, {$subtract: [{$strLenCP: "$name.last"}, 1]}]}
                ]
            },
            geoJsonPoint:{
                type:"Point",
                coordinates:[ {$toDouble:"$location.coordinates.longitude"}, {$toDouble :"$location.coordinates.latitude"}]
            },
            dateOfBirth : { $convert : {input: "$dob.date", to : "date"}}
        }
    }
])
