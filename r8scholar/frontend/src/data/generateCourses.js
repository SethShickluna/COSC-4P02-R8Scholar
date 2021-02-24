const fs = require("fs");

var data = [];

const department = [
    "Goodman School of Business",
    "Education",
    "Humanities",
    "Applied Health Sciences",
    "Math and Computer Science",
    "Visual and Performance Arts",
    "Social Sciences",
];

const code = [
    "1p02",
    "1p03",
    "1p04",
    "2p02",
    "2p03",
    "2p04",
    "3p02",
    "3p03",
    "3p04",
    "4p02",
    "4p03",
    "4p04",
];
var index = 0;
department.forEach((e) => {
    code.forEach((f) => {
        index++;
        data.push({
            id: index,
            name: "coursename coursename coursename",
            code: f,
            department: e,
            rating: (Math.random() * 5.0).toFixed(2),
        });
    });
});

fs.writeFile("./courses.json", JSON.stringify(data), (err) => {
    if (err) {
        throw err;
    }
    console.log("written");
});
