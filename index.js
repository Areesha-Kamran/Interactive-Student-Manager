import inquirer from "inquirer";
import chalk from 'chalk';
import chalkAnimation from "chalk-animation";
async function welcome() {
    let title = chalkAnimation.rainbow("\t\t\t\tWelcome to Interactive-Student-Manager!");
    await new Promise((resolve) => {
        setTimeout(resolve, 3000);
    });
    title.stop();
}
await welcome();
class Student {
    constructor(n) {
        this.name = n;
    }
}
class Person {
    constructor() {
        this.students = [];
    }
    addStudent(obj) {
        this.students.push(obj);
    }
}
const persons = new Person();
const programStart = async (persons) => {
    do {
        const ans = await inquirer.prompt([
            {
                name: "select",
                type: "list",
                message: (chalk.cyan("Whom would you like to interact with?")),
                choices: ["Staff", "student", "exit"]
            }
        ]);
        if (ans.select == "Staff") {
            console.log(chalk.blue("You approach the staff room. Please feel free to ask questions."));
        }
        else if (ans.select == "student") {
            const ans = await inquirer.prompt([
                {
                    name: "student",
                    type: "input",
                    message: (chalk.magenta("Enter the student's name you wish to engage with:")),
                }
            ]);
            const student = persons.students.find(val => val.name == ans.student);
            if (!student) {
                const name = new Student(ans.student);
                persons.addStudent(name);
                console.log(chalk.green(`Hello I am ${name.name}. Nice to meet you!`));
                console.log(chalk.yellow("New student added"));
                console.log(chalk.magenta("Current student list:"));
                console.log(persons.students);
            }
            else {
                console.log(chalk.green(`Hello I am ${student.name}. Nice to see you again!`));
                console.log(chalk.magenta("Existing student list:"));
                console.log(persons.students);
            }
        }
        else if (ans.select == "exit") {
            console.log(chalk.red("Exiting the program..."));
            process.exit();
        }
    } while (true);
};
programStart(persons);
