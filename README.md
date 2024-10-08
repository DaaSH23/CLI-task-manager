# cli-task-tracker

`cli-task-tracker` is a cli tool that runs on top of node.js(build on js). It helps in managing your tasks.

<img src="https://github.com/user-attachments/assets/3c7e4e9c-016f-44f7-aa98-93011da67498" alt="task-manager-cli pic" width="350" height="200">
<img src="https://github.com/user-attachments/assets/136089ba-40fb-4d80-952b-69f21bbf7692" alt="task-manager-cli task" width="400" height="200">

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contact](#contact)


## Installation

You can clone the repo - https://github.com/DaaSH23/CLI-task-manager.git
and run it locally, intall your tool globally, run :
```bash
    npm install -g .
```

To install the package, use npm 
```bash
    npm install cli-task-tracker
```

visit the website for any issue - https://www.npmjs.com/package/cli-task-tracker

## Usage

- Add a task 
``` bash
    task add "your task name (description)"
```

- Display all the tasks
```bash
    task list
```

- Mark a task as done / complete
```bash
    task done <task id>
```

- Mark a task as undone / incomplete
```bash
    task undone <task id>
```

- Delete / remove a task
```bash
    task delete <task id>
```

- Delete / remove all tasks
```bash
    task delete-all
``` 

## Project-Structure

```bash
cli-task-manager/
│
├── index.js                  # Main script file contains all the logic 
├── package.json              # Matadatas and scripts
├── README.md                 # The file you're reading
├── task.json                 # Contains all the tasks saved by the user
└── ...                       # Any other essential files
```

## Contact
  email - reachtoabhisheko@gmail.com
  linkedIn - https://www.linkedin.com/in/abhishek-oraon-developer/
