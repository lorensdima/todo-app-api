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
/api/user-c
 - POST request
 - creates user with hashed password
 - Sample body:
    {
        "name": "Emilio Laurence",
        "password": "admin",
        "email": "lorens@gugel.com"
    }
