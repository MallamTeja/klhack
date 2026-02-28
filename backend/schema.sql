-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS taxflow_db;
USE taxflow_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Business Profiles table
CREATE TABLE IF NOT EXISTS business_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    gstin VARCHAR(15) NOT NULL UNIQUE,
    legal_name VARCHAR(255) NOT NULL,
    state_code VARCHAR(2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Invoices table
CREATE TABLE IF NOT EXISTS invoices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    business_id INT NOT NULL,
    ctin VARCHAR(15), -- Optional counterparty GSTIN
    inum VARCHAR(50) NOT NULL,
    date VARCHAR(20) NOT NULL, -- Kept as string per original schema, consider DATE type for strictness
    pos VARCHAR(2) NOT NULL,
    raw_image_urls JSON, -- Store array of strings as JSON array
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (business_id) REFERENCES business_profiles(id) ON DELETE CASCADE
);

-- Invoice Items table (normalized from embedded array)
CREATE TABLE IF NOT EXISTS invoice_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    invoice_id INT NOT NULL,
    description TEXT NOT NULL,
    quantity DECIMAL(10, 2) NOT NULL,
    price DECIMAL(15, 2) NOT NULL,
    tax_rate DECIMAL(5, 2) NOT NULL,
    FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE
);

-- Return Requests table
CREATE TABLE IF NOT EXISTS return_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    business_id INT NOT NULL,
    ret_period VARCHAR(10) NOT NULL, -- e.g., '012024'
    status ENUM('draft', 'generated') DEFAULT 'draft',
    json_result JSON, -- Store mixed/nested GST JSON here
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (business_id) REFERENCES business_profiles(id) ON DELETE CASCADE
);
