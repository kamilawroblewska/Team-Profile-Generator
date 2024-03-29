const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

// Create an empty array of team members
const teamMembers = [];

// Function starting team generator
function start() {
  managerQuery();
}

// Function to generate manager
function managerQuery() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the team manager?",
      },
      {
        type: "input",
        name: "id",
        message: "Team Manager's ID number:",
      },
      {
        type: "input",
        name: "email",
        message: "Team Manager's email address:",
      },
      {
        type: "input",
        name: "officeNumber",
        message: "Team Manager's office number:",
      },
    ])

    // Displaying manager information in the table
    .then((val) => {
      const manager = new Manager(
        val.name,
        val.id,
        val.email,
        val.officeNumber
      );
      console.table(manager);
      teamMembers.push(manager);
      addTeamMember();
    });
}

// Function adding team members depeneds on a choice
function addTeamMember() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "what_type",
        message: "Add an engineer or intern to the team?",
        choices: ["Engineer", "Intern", "Generate Team"],
      },
    ])
    .then((val) => {
      if (val.what_type === "Engineer") {
        engineerQuery();
      } else if (val.what_type === "Intern") {
        internQuery();
      } else {
        createFile();
      }
    });
}
// Adding engineer
function engineerQuery() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Engineer's name?",
      },
      {
        type: "input",
        name: "id",
        message: "Engineer's ID number:",
      },
      {
        type: "input",
        name: "email",
        message: "Engineer's email address:",
      },
      {
        type: "input",
        name: "github",
        message: "What is the Engineer's GitHub Username?",
      },
    ])
    .then((val) => {
      const engineer = new Engineer(val.name, val.id, val.email, val.github);
      console.table(engineer);
      teamMembers.push(engineer);
      addTeamMember();
    });
}
// Adding intern
function internQuery() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Intern's name?",
      },
      {
        type: "input",
        name: "id",
        message: "Intern's ID number:",
      },
      {
        type: "input",
        name: "email",
        message: "Intern's email address:",
      },
      {
        type: "input",
        name: "school",
        message: "What school does/did the intern attend?",
      },
    ])
    .then((val) => {
      const intern = new Intern(val.name, val.id, val.email, val.school);
      console.table(intern);
      teamMembers.push(intern);
      addTeamMember();
    });
}
// Generating HTML file with ready team
function createFile() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  } else {
    fs.writeFileSync(outputPath, render(teamMembers), "UTF-8");
    console.log("File created in the output folder");
  }
}
// Start the aplication
start();
