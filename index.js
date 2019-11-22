// Use `fs` for reading data files and writing the result to `result.out`
const fs = require('fs');

/**
 * The main program function.
 */
function executeProgram() {
  // TODO: implement

//Reading teams.json file
let data1 = fs.readFileSync('./data/teams.json');
let teams = JSON.parse(data1);

//Reading students.json file
let data2= fs.readFileSync('./data/students.json');
let studentsList = JSON.parse(data2);

//Reading teams.json file
let data3 = fs.readFileSync('./data/student-teams.json');
let studentTeams = JSON.parse(data3);


//loop through every team in teams.json
for(x in teams){

	//new array for storing students(id, fullName) of a team
	var students = []; 

	//getting students which are part of team[x]
	let studentsInTeam =studentTeams.filter(y => y.teamId == teams[x].id);


	//find student information for every student part of team 
	for(s in studentsInTeam){
		const found = studentsList.find(y => y.id == studentsInTeam[s].studentId);

		//if student is not injured then add it to the list of students in team
		if(found.injured == false){
			let id = found.id;
			let fullName = found.firstName + " " + found.lastName;
			students.push({id: id , fullName: fullName});
		}
		
	}

	
	//alphabetically sorting students based on their full name
	students.sort((a, b) => a.fullName.localeCompare(b.fullName));
	//Adding array of students in respective team
	teams[x].students = students;

}
//console.log(teams);

//alphabetically sorting teams based on their id
teams.sort((a, b) => a.id - b.id);

//adding teams array to an object teams
var obj = { };
obj.teams =teams;
//Writing the new teams data in result.json
const result = JSON.stringify(obj);
fs.writeFileSync('./data/result.json', result);

}

// Run the program
executeProgram();
