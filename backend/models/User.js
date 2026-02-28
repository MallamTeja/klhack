import pool from '../db.js';

const User = {
    async findByEmail(email) {
        const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
        return rows.length ? rows[0] : null;
    },

    async findById(id) {
        const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
        return rows.length ? rows[0] : null;
    },

    async create(userData) {
        const { email, password_hash } = userData;
        const [result] = await pool.execute(
            'INSERT INTO users (email, password_hash) VALUES (?, ?)',
            [email, password_hash]
        );
        return this.findById(result.insertId);
    }
};

export default User;
