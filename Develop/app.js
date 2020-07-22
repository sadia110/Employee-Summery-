const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// _________________________

let ID = 1; 

async function main (){
    console.log( [main] Start..) 
    const team = [] 


    const managerData = await inquirer.prompt([ 
        {
            name: 'name',
            type: 'input', 
            message: "Enter Manager's name"
        },  
        {
            name: 'email',
            type: 'input', 
            message: "Enter Manager's email"
        }, 
        {
            name: 'officeNumber',
            type: 'input', 
            message: "Enter Manager's office number"
        },  
        {
            name: 'count',
            type: 'input', 
            message: "Enter amount of employee working under Manager"
        }, 
 
    ]) 

    // to creat a manager object  
    team.push ( new Manager ( managerData.name, ID++, managerData.email, managerData.officeNumber, managerData.count)) 
    for ( let userCnt =1; userCnt<= managerData.count ; userCnt++ ){ 
        const user = await inquirer.prompt([
            {
                name:'type', 
                type:'list',
                message:`For person ${userCnt}/${managerData.count}`,
                choices: ["Intern", "Engineer"]
            }
        ]) 
         // ENGINEER
        if ( user.type== "Engineer" ){
            const userData = await inquirer.prompt([
                {
                    name: 'name', 
                    type: 'input', 
                    message: 'Enter engineer name'
                },   
                {
                    name: 'email', 
                    type: 'input', 
                    message: 'Enter engineer email address'
                },  
                // {
                //     name: 'employee ID', 
                //     type: 'input', 
                //     message: 'Enter engineer employee ID'
                // }, 
            
                {
                    name: 'github', 
                    type: 'input', 
                    message: 'Enter engineer github ID'
                }, 
            ]);
            team.push ( new Engineer (user.Data.name, ID++, userData.email, userData.github))
        
        } else {   

            // INTERN

            const userData = await inquirer.prompt([
                {
                    name:'name', 
                    type: 'input', 
                    message: 'Enter Intern name'
                },  
                {
                    name:'email', 
                    type: 'input', 
                    message: 'Enter Intern email address'
                },  
                {
                    name:'school ', 
                    type: 'input', 
                    message: 'Enter Intern school name'
                }, 
            ]);
            team.push( new Intern( userData.name, ID++, userData.email, userData.school))
        }

    
    } 

    // TO CREATE HTML & WRITE FILE 
    const html = render(team) 

    fs. writeFileSync (outputPath, html ); 
    console.log( `finshed writing file , availble in ${outputPath}`)

} 
main ();  








// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```