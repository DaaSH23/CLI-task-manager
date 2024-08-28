#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import fs from "fs-extra";
import path from "path";
import { createSpinner } from "nanospinner";

const taskFile = path.join(process.cwd(), 'task.json');

// Ensures task file exists
fs.ensureFileSync(taskFile);

// Buffer time
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

// Start function
async function startTaskManager() {
    console.log('\n-------------------------------------------------------')
    const welcomeText = chalkAnimation.rainbow('Welcome to the CLI task manager \n');
    await sleep();
    welcomeText.stop();

    console.log(`
        ${chalk.cyanBright('Commands for execution - ')}
        ${chalk.bgMagenta('  list        ')} ${chalk.yellowBright(' Displays the list of all tasks ')}
        ${chalk.bgMagenta('  add <task>  ')} ${chalk.yellowBright(' Adds the task in the task list')}
        ${chalk.bgMagenta('  done <id>   ')} ${chalk.yellowBright(' Marks the task as complete')}
        ${chalk.bgMagenta('  delete <id> ')} ${chalk.yellowBright(' Deletes the task from task list')}
    `)

    console.log('\n-------------------------------------------------------')

}

// Load task 
async function loadTasks() {
    try {
        const taskData = await fs.readFileSync(taskFile, 'utf8');
        return taskData ? JSON.parse(taskData) : [];
    } catch (error) {
        console.error('Error loading task: ', error);
        return [];
    }
}

// Save task to file 
async function saveTask(tasks) {
    try {
        await fs.writeFileSync(taskFile, JSON.stringify(tasks, null, 2));
    } catch (error) {
        console.error('Error in saveTask: ', error);
    }
}

// Add task
async function addTask(task) {
    try {
        const tasks = await loadTasks();
        tasks.push({ id: Date.now(), title: task, completed: false });
        await saveTask(tasks);
        console.log(chalk.greenBright('Task added successfully!'));
    } catch (error) {
        console.error('Error');
    }
}

// List all tasks
async function listTask() {
    try {
        const tasks = await loadTasks();
        
        if (tasks.length === 0) {
            console.log(chalk.yellow('No tasks found.'));
            return;
        }
        const spinner = createSpinner('Loading...').start();
        await sleep();
        spinner.stop({text: 'Todo Task List', mark: '➤', color: 'magenta'});
        console.log(`
            -------------------------------------------------------
                 status  |     task id     |  task description
            -------------------------------------------------------
        `)
        tasks.forEach(element => {
            const status = element.completed ? chalk.green('✓') : chalk.red('✗');
            console.log(`
                    ${status}       ${element.id}       ${chalk.bgBlue(` ${element.title} `)}`);
        });

        console.log(`
            -------------------------------------------------------`)
    } catch (error) {
        console.error(error);
    }
}

// Mark task as complete
async function completeTask(id) {
    try {
        let tasks = await loadTasks();
        let task = tasks.find(t => t.id === parseInt(id));
        if (task) {
            task.completed = true;
            await saveTask(tasks);
            console.log(chalk.greenBright('Task marked as complete'));
        } else {
            console.log(chalk.red('Task not found'));
        }
    } catch (error) {
        console.error('Error while marking the task as complete, Error: ', error)
    }
}

// Mark the task as incomplete
async function incompleteTask(id){
    try{
        let tasks = await loadTasks();
        let task = tasks.find(t => t.id === parseInt(id));
        if(task){
            task.completed = false;
            await saveTask(tasks);
            console.log(chalk.greenBright('Task marked as incomplete'));
        }else{
            console.log(chalk.red('Task not found'));
        }
    }catch(error){
        console.error('Error while marking the task as incomplete', error);
    }
}

// Delete a task
async function deleteTask(id) {
    try {
        let tasks = await loadTasks();
        const initialLength = tasks.length;
        tasks = tasks.filter(t => t.id !== parseInt(id));
        if (tasks.length < initialLength) {
            await saveTask(tasks);
            console.log(chalk.green('Task deleted successfully!'));
        } else {
            console.log(chalk.red('Task not found.'));
        }
    } catch (error) {
        console.error(`Error while executing delete operation on id: ${id},\n Error: `, error);
    }
}

// Deletes all tasks
async function deleteAllTask() {
    try{
        let tasks = [];
        await saveTask(tasks);
        console.log(chalk.greenBright('All task deleted'));
    }catch(error){
        console.error('Error in executing delete all task, Error: ', error);
    }
}



program
    .action(startTaskManager);

program
    .command('add <task>')
    .description('Add a new task')
    .action(addTask);

program
    .command('list')
    .description('Shows all tasks')
    .action(listTask)

program
    .command('delete <id>')
    .description('Deletes the task')
    .action(deleteTask)

program
    .command('done <id>')
    .description('Marks the task as completed')
    .action(completeTask)

program 
    .command('undone <id>')
    .description('Marks the task as incomplete')
    .action(incompleteTask)

program 
    .command('delete-all')
    .description('Deletes all tasks')
    .action(deleteAllTask)

program.parse(process.argv);

// if (!process.argv.slice(2).length) {
//     program.outputHelp();
// }

