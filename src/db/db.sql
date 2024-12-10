CREATE DATABASE moodjournal;

\c moodjournal;

CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE entries (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    content TEXT NOT NULL
);

CREATE TABLE analysis (
    id SERIAL PRIMARY KEY,
    entry_id INTEGER REFERENCES entries(id),
    created_at TIMESTAMP DEFAULT NOW(),
    mood VARCHAR(255) NOT NULL,
    summary TEXT NOT NULL,
    color VARCHAR(255) NOT NULL,
    negative BOOLEAN NOT NULL
);

CREATE INDEX idx_entries_user_id ON entries(user_id);
CREATE INDEX idx_analysis_entry_id ON analysis(entry_id);
