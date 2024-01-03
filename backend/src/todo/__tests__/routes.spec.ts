import request from 'supertest';
import express from 'express';
import routes from '../routes'; 
//Initial test

const app = express();
app.use(express.json());
app.use('/', routes);

describe('Todo Routes', () => {
  it('should create a new todo', async () => {
    const response = await request(app)
      .post('/create')
      .send({
        // payload for creating a new todo
      });

    expect(response.status).toBe(200);
    // Add more assertions based on expected response
  });

  it('should read all todos', async () => {
    const response = await request(app).get('/read');

    expect(response.status).toBe(200);
    // Add more assertions based on expected response
  });

  it('should update a todo status', async () => {
    const response = await request(app)
      .put('/status/your-todo-id')
      .send({
        // payload for updating the todo status
      });

    expect(response.status).toBe(200);
    // Add more assertions based on expected response
  });

  // Add more test cases for other routes
});
