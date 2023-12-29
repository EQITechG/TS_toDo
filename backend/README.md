
<br />
<div align="center">
  <a href="https://github.com/EQITechG/TS_toDo">
  </a>
<h3 align="center">TS_ToDo_Server_Side</h3>
  <p align="center">
    <br />
    <a href="https://github.com/EQITechG/TS_toDo"><strong>Explore Repo »</strong></a>
    <br />
    <a href="https://github.com/EQITechG/TS_toDo">View Demo</a>
    ·
    <a href="https://github.com/EQITechG/TS_toDo/issues">Report Bug</a>
    ·
  </p>
</div>
<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#time-spent-on-task">Time spent on tasl</a></li>
        <li><a href="#built-with">Built With</a></li>
         <li><a href="#api-endpoints">API Endpoints</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#incomplete-areas">Incomplete Areas</a></li>
        <li><a href="#understanding-completion">Understanding Completion</a></li>
      
      </ul>
    </li>
  </ol>
</details>
<!-- ABOUT THE PROJECT -->
## About The Project
ToDo Application
Server-Side (Node.js, TypeScript, Express) - API

## Time spent on task
Approximately 8 hours.


### Built With

* Node.js, TypeScript, Express: Chosen for their compatibility and efficiency in building   scalable and maintainable server-side applications.
* SQLite: Utilized for simplicity, as it's lightweight and doesn't require additional setup.
* Separation of Concerns: Divided the project into modular components (controllers, services, routes) to enhance readability and maintainability
* Others: Sequelize, Express-Validator

## API Endpoints

*	POST /todos/create: Creates a new todo.
*	GET /todos/read: Retrieves a list of todos.
* GET /todos/inomplete: Retrieves Incomplete todos.
*	GET /todos/completed: Retrieves completed todos.
*	PUT /todos/status/:id: Updates status a existing todo.
*	PUT /todos/update/:id: Updates an existing todo.
*	DELETE /todos/delete/:id: Deletes a todo.


### Getting Started

Clone repo [https://github.com/EQITechG/TS_toDo.git](https://github.com/EQITechG/TS_toDo.git)

### Installation

1. Initiate NPM 
    ```sh
   npm install 
   ```
2. Run app
    ```sh
   yarn dev start ||  npm run dev
   ```
3. Use app by visiting 
     ```sh
   localhost:3000 
   ```

### Incomplete Areas
*	Authentication and Authorization: The API currently lacks user authentication and authorization mechanisms. It assumes a single user environment.

### Understanding Completion
* Completion would involve implementing authentication to secure endpoints, handling edge cases, and thoroughly testing the API.