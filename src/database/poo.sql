-- Active: 1689719220566@@127.0.0.1@3306

CREATE TABLE videos (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    title TEXT NOT NULL,
    duration_in_seconds TEXT NOT NULL,
    created_at TEXT NOT NULL
);
