import { openDB, initializeDB } from '../../lib/db';
import formidable from 'formidable';
import fs from 'fs';
import { parse } from 'csv-parse';
import { promisify } from 'util';

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = async (req, res) => {
    await initializeDB(); // Ensure the DB is initialized

    const db = await openDB();

    if (req.method === 'POST') {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) return res.status(500).json({ error: 'Error parsing file' });

            const filePath = files.file.path;
            const fileData = await promisify(fs.readFile)(filePath);

            parse(fileData, { columns: true }, async (err, records) => {
                if (err) return res.status(500).json({ error: 'Error parsing CSV' });

                for (const record of records) {
                    const { name, email, phone, address, timezone } = record;
                    await db.run('INSERT INTO contacts (user_id, name, email, phone, address, timezone) VALUES (?, ?, ?, ?, ?, ?)', [fields.user_id, name, email, phone, address, timezone]);
                }

                return res.status(201).json({ message: 'Contacts uploaded successfully' });
            });
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;
