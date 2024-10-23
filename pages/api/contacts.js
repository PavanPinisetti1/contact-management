import { openDB, initializeDB } from '../../lib/db';
import { authenticateToken } from '../../middleware/auth';
import { contactSchema } from '../../utils/validator';

const handler = async (req, res) => {
    await initializeDB(); // Ensure the DB is initialized

    const db = await openDB();

    if (req.method === 'GET') {
        const contacts = await db.all('SELECT * FROM contacts WHERE is_deleted = 0');
        return res.json({ contacts });
    } else if (req.method === 'POST') {
        const { error } = contactSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const { name, email, phone, address, timezone } = req.body;
        await db.run('INSERT INTO contacts (user_id, name, email, phone, address, timezone) VALUES (?, ?, ?, ?, ?, ?)', [req.user.id, name, email, phone, address, timezone]);
        return res.status(201).json({ message: 'Contact added successfully' });
    } else if (req.method === 'PUT') {
        const { id } = req.query;
        const { name, email, phone, address, timezone } = req.body;

        await db.run('UPDATE contacts SET name = ?, email = ?, phone = ?, address = ?, timezone = ? WHERE id = ? AND user_id = ?', [name, email, phone, address, timezone, id, req.user.id]);
        return res.json({ message: 'Contact updated successfully' });
    } else if (req.method === 'DELETE') {
        const { id } = req.query;
        await db.run('UPDATE contacts SET is_deleted = 1 WHERE id = ? AND user_id = ?', [id, req.user.id]);
        return res.json({ message: 'Contact deleted successfully' });
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default authenticateToken(handler);
