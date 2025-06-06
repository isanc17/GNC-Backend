import request from 'supertest';
import express, { Application } from 'express';
import loginRoutes from '../../src/routes/loginRoutes'


const app: Application = express();
app.use(express.json());
app.use(loginRoutes);

describe('Login Controller', () => {
  it('debería devolver un token si las credenciales son correctas', async () => {
    const response = await request(app)
      .get('/login')
      .query({
        usuario: 'admin',
        contrasena: 'admin',
      });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data.token).toBe('Admin:admin');
  });

  it('debería devolver un error si las credenciales son incorrectas', async () => {
    const response = await request(app)
      .get('/login')
      .query({
        usuario: 'admin',
        contrasena: '12345',
      });

    expect(response.status).toBe(401);
    expect(response.body.status).toBe('error');
    expect(response.body.message).toBe('Credenciales inválidas.');
  });

  it('debería devolver un error si falta el campo usuario o contraseña', async () => {
    const response = await request(app).get('/login').query({
      usuario: 'admin',
    });

    expect(response.status).toBe(401);
    expect(response.body.status).toBe('error');
    expect(response.body.message).toContain('Datos inválidos.');
  });
});
