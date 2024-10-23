import { openDB, initializeDB } from '../../lib/db';
import { Parser } from 'json2csv';

const handler = async (req, res) => {
    await initializeDB(); // Ensure the DB is initialized

    const db = await openDB();

    if (req.method === 'GET') {
        const contacts = await db.all('SELECT * FROM contacts WHERE is_deleted = 0');
        
        const csv = new Parser().parse(contacts);
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=contacts.csv');
        res.status(200).send(csv);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;