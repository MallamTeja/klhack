import pool from '../db.js';

const ReturnRequest = {
    async findById(id) {
        const [rows] = await pool.execute('SELECT * FROM return_requests WHERE id = ?', [id]);
        return rows.length ? rows[0] : null;
    },

    async updateResult(id, status, jsonResult) {
        await pool.execute(
            'UPDATE return_requests SET status = ?, json_result = ? WHERE id = ?',
            [status, JSON.stringify(jsonResult), id]
        );
    },

    async create(data) {
        const { user_id, business_id, ret_period } = data;
        const [result] = await pool.execute(
            'INSERT INTO return_requests (user_id, business_id, ret_period) VALUES (?, ?, ?)',
            [user_id, business_id, ret_period]
        );
        return this.findById(result.insertId);
    }
};

export default ReturnRequest;
