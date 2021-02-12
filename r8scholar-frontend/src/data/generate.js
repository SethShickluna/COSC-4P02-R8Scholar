const fs = require("fs");

var data = [];

const department = [
    "Humanities",
    "Math and Computer Science",
    "Social Sciences",
    "Visual and Performance Arts",
    "Goodman School of Business",
    "Applied Health Sciences",
    "Education",
];

const code = [
    "1p02",
    "1p03",
    "1p03",
    "1p05",
    "2p02",
    "2p03",
    "2p03",
    "2p05",
    "3p02",
    "3p03",
    "3p03",
    "3p05",
    "4p02",
    "4p03",
    "4p03",
    "4p05",
];
var index = 0;
department.forEach((e) => {
    code.forEach((f) => {
        index++;
        data.push({
            id: index,
            name: "coursename coursename coursename",
            rating: (Math.random() * 5.0).toFixed(2),
            department: e,
            code: f,
        });
    });
});

fs.writeFile("./courses.json", JSON.stringify(data), (err) => {
    if (err) {
        throw err;
    }
    console.log("written");
});
