import request from 'supertest';
import { initializeDB } from '../lib/db';
import app from '../pages/api/auth';

beforeAll(async () => {
    await initializeDB(); // Initialize the DB before running tests
});

describe('User Authentication and Contact Management', () => {
    let token;

    it('should register a user', async () => {
        const res = await request(app).post('/api/auth/register').send({
            email: 'test@example.com',
            password: 'password123',
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toBe('User registered successfully');
    });

    it('should login a user', async () => {
        const res = await request(app).post('/api/auth/login').send({
            email: 'test@example.com',
            password: 'password123',
        });
        expect(res.statusCode).toEqual(200);
        token = res.body.token; // Store the token for later use
    });

    it('should add a contact', async () => {
        const res = await request(app)
            .post('/api/contacts')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'John Doe',
                email: 'john@example.com',
                phone: '1234567890',
                address: '123 Main St',
                timezone: 'UTC',
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toBe('Contact added successfully');
    });

    it('should retrieve contacts', async () => {
        const res = await request(app)
            .get('/api/contacts')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.contacts).toBeDefined();
    });
});
