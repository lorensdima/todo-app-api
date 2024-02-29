Simple Todo application. 

FRONTEND REPOSITORY:
https://github.com/acricmg/todo-app-react

DATABASE REPOSITORY:
https://github.com/lorensdima/todo-app-db

To Run (first time):
1. npm install
2. npm run start

To Run:
1. npm run start

To Build to Docker:
1. docker build -t todo-app-api .
2. docker run -p 3000:3000 todo-app-api

APIs:
/api/tasks
 - GET request
 - returns all tasks in the DB
/api/tasks/:oid
 - GET request
 - returns all tasks for a user using their oid (object ID)
/api/task-c
 - POST request
 - creates a new task
 - Sample body:
    {
        "title": "Meeting w/ Lorens",
        "description": "Discuss about app Google Meet Link: gugle.kom",
        "status": "finished",
        "group": "",
        "assignedTo": "6550da34a2e08ab6e5f80147"
    }
/api/task-u
 - POST request
 - updates an existing task
 - Sample body:
    {
        "taskID": "65523caa9fafb6cdeb126449",
        "title": "Finish Filter Groups Page",
        "description": "Create a page for filtering using groups",
        "status": "done",
        "group": "group 1",
        "assignedTo":  "6550da34a2e08ab6e5f80147"
    }
/api/user-c
 - POST request
 - creates user with hashed password
 - Sample body:
    {
        "name": "Emilio Laurence",
        "password": "admin",
        "email": "lorens@gugel.com"
    }
