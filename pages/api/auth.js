import { openDB, initializeDB } from '../../lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userSchema } from '../../utils/validator';

const handler = async (req, res) => {
    await initializeDB(); // Ensure the DB is initialized

    const db = await openDB();

    if (req.method === 'POST') {
        const { email, password } = req.body;

        const { error } = userSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        if (req.url === '/api/register') {
            const existingUser = await db.get('SELECT * FROM users WHERE email = ?', email);
            if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            await db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
            return res.status(201).json({ message: 'User registered successfully' });
        } else if (req.url === '/api/login') {
            const user = await db.get('SELECT * FROM users WHERE email = ?', email);
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.json({ token });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;
