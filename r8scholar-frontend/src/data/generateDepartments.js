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

const code = [];
var index = 0;
department.forEach((e) => {
    data.push({
        id: index,
        name: e,
        avgProfessorRating: (Math.random() * 2.5 + 2.5).toFixed(2),
        avgCourseRating: (Math.random() * 2.5 + 2.5).toFixed(2),
        rating: (Math.random() * 2.5 + 2.5).toFixed(2),
        topProfessor: "John J. Johnson",
        topCourse: "1p01",
    });
});

fs.writeFile("./departments.json", JSON.stringify(data), (err) => {
    if (err) {
        throw err;
    }
    console.log("written");
});
