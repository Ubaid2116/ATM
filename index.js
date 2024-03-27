#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let myBalance = 20000; //Dollar
let myPin = 2004;
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: "Enter your pin",
    },
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.bold.red("\tAccess Granted ! Welcome to ATM service\t\n"));
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: "Please select an option",
            choices: ["Withdraw", "Check Balance", "Fast Cash"],
        },
    ]);
    if (operationAns.operation === "Withdraw") {
        let amountAns = await inquirer.prompt([
            {
                name: "amount",
                type: "number",
                message: "How much amount you would like to withdraw ?",
            },
        ]);
        if (amountAns.amount < myBalance) {
            myBalance -= amountAns.amount;
            console.log(chalk.italic(`Your remaining balance is ${myBalance}`));
        }
        else if (amountAns.amount > myBalance) {
            console.log(chalk.bold.red("\tInsufficient balance !\t"));
        }
    }
    else if (operationAns.operation === "Check Balance") {
        console.log(chalk.italic(`Your current balance is ${myBalance}`));
    }
    else if (operationAns.operation === "Fast Cash") {
        let cashAmont = await inquirer.prompt({
            name: "cash",
            type: "rawlist",
            message: "Choose your amount!",
            choices: ["1000", "5000", "10000", "15000"],
        });
        myBalance -= cashAmont.cash;
        console.log(chalk.italic(`Your remaining balane is ${myBalance}`));
    }
}
else {
    console.log(chalk.bold.red("Incorrect pin code !"));
}
