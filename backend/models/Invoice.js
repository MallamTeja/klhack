import pool from '../db.js';

const Invoice = {
    async findByBusinessId(businessId) {
        const [invoices] = await pool.execute('SELECT * FROM invoices WHERE business_id = ?', [businessId]);

        for (let inv of invoices) {
            const [items] = await pool.execute('SELECT * FROM invoice_items WHERE invoice_id = ?', [inv.id]);
            inv.items = items;

            // Handle parsing raw_image_urls JSON payload
            if (typeof inv.raw_image_urls === 'string') {
                try {
                    inv.raw_image_urls = JSON.parse(inv.raw_image_urls);
                } catch (e) {
                    inv.raw_image_urls = [];
                }
            } else if (!inv.raw_image_urls) {
                inv.raw_image_urls = [];
            }
        }
        return invoices;
    },

    async create(data) {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();
            const [result] = await conn.execute(
                'INSERT INTO invoices (user_id, business_id, ctin, inum, date, pos, raw_image_urls) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [data.user_id, data.business_id, data.ctin || null, data.inum, data.date, data.pos, JSON.stringify(data.raw_image_urls || [])]
            );
            const invoiceId = result.insertId;

            if (data.items && data.items.length) {
                for (let item of data.items) {
                    await conn.execute(
                        'INSERT INTO invoice_items (invoice_id, description, quantity, price, tax_rate) VALUES (?, ?, ?, ?, ?)',
                        [invoiceId, item.description, item.quantity, item.price, item.tax_rate]
                    );
                }
            }

            await conn.commit();
            return { id: invoiceId };
        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    }
};

export default Invoice;
