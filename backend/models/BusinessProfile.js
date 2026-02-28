import pool from '../db.js';

const BusinessProfile = {
    async findById(id) {
        const [rows] = await pool.execute('SELECT * FROM business_profiles WHERE id = ?', [id]);
        return rows.length ? rows[0] : null;
    },

    async findByUserId(userId) {
        const [rows] = await pool.execute('SELECT * FROM business_profiles WHERE user_id = ?', [userId]);
        return rows;
    },

    async create(data) {
        const { user_id, gstin, legal_name, state_code } = data;
        const [result] = await pool.execute(
            'INSERT INTO business_profiles (user_id, gstin, legal_name, state_code) VALUES (?, ?, ?, ?)',
            [user_id, gstin, legal_name, state_code]
        );
        return this.findById(result.insertId);
    }
};

export default BusinessProfile;
