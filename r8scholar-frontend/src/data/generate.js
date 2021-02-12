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
    code.forEach((f) => {
        index++;
        data.push({
            name: "coursename coursename coursename",
            avgProfessorRating: index,
            avgCourseRating: (Math.random() * 5.0).toFixed(2),
            topPro: e,
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
