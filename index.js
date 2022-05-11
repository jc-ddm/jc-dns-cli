#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let playerName;
let playerId;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.glitch(
    `--------    ------------      ----------   ----    ---- ------------      ------------ ----         --------  
********    ************      ************ *****   **** ************      ************ ****         ********  
  ---       ---               --        -- ------  ---- ----              ---          ----           ----    
  ***       ***               **        ** ************ ************      ***          ****           ****    
  ---       ---               --        -- ------------ ------------      ---          ----           ----    
  ***   **  ***               **        ** ****  ******        *****      ***          ************   ****    
  --------  ------------      ------------ ----   ----- ------------      ------------ ------------ --------  
  ********  ************      **********   ****    **** ************      ************ ************ ********  
                                                                                                              `
  );

  await sleep(5000);
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue('HOW TO Run')} 
    as each "question" (TASK) is ran we will have completed something 
    If at any time a task fails we will be processed out as - ${chalk.bgRed('killed')}
    This May change as the Task Function is built

  `);
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner('Processing Task...').start();
  await sleep();

  if (isCorrect) {
    spinner.success({ text: `Nice work ${playerName}. Let's Finish This!` });
  } else {
    spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
    process.exit(1);
  }
}

async function askName() {
  const answers = await inquirer.prompt({
    name: 'player_name',
    type: 'input',
    message: 'What is your name?',
    default() {
      return 'Player-User';
    },
  });

  const idAnswers = await inquirer.prompt({
    name: 'user_id',
    type: 'input',
    message: 'What is the Id?',
    default() {
      return 'x0011';
    },
  });

  playerName = answers.player_name;
  playerId = idAnswers.user_id;
}

function winner() {
  console.clear();
  figlet(`Congrats , ${playerName} !\n $ 1 , 0 0 0 , 0 0 0`, (err, data) => {
    console.log(gradient.pastel.multiline(data) + '\n');

    console.log(
      chalk.green(
        `🐍🐍🐍🐍🐍Programming isn't about what you know; it's about making the command line look cool🐍🐍🐍🐍🐍`
      ),
        chalk.red(
            `its the ascii snakese you meet on the way!`
        )
    );
    process.exit(0);
  });
}
async function task1() {
  const answers = await inquirer.prompt({
    name: 'task_1',
    type: 'list',
    message: 'Access ClubHouseShortcut\n',
    choices: [
      'DM-Link',
      'Personal-Link',
    ],
  });

  return handleAnswer(answers.task_1 === 'Personal-Link');
}

async function question1() {
  const answers = await inquirer.prompt({
    name: 'question_1',
    type: 'list',
    message: 'JavaScript was created in 10 days then released on\n',
    choices: [
      'May 23rd, 1995',
      'Nov 24th, 1995',
      'Dec 4th, 1995',
      'Dec 17, 1996',
    ],
  });

  return handleAnswer(answers.question_1 === 'Dec 4th, 1995');
}

async function question3() {
  const answers = await inquirer.prompt({
    name: 'question_3',
    type: 'list',
    message: `What is the first element in the array? ['🐏', '🦙', '🐍'].length = 0\n`,
    choices: ['0', '🐏', '🐍', 'undefined'],
  });

  return handleAnswer(answers.question_3 === 'undefined');
}

// Run it with top-level await
console.clear();
await welcome();
await askName();
await task1();
await question1();
// await question2();
// await question3();
// await question4();
// await question5();
winner();
