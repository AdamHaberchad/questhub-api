CREATE TABLE users (
    userID SERIAL PRIMARY KEY,
    username VARCHAR(30) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE collections (
    collID SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    userID INTEGER NOT NULL
        REFERENCES users(userID)
        ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE games (
    gameID SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    status VARCHAR(30) NOT NULL,
    rating DECIMAL(3,1),
    -- collID INTEGER NOT NULL
    --     REFERENCES collections(collID)
    --     ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE collection_games (
    collID INTEGER NOT NULL
        REFERENCES collections(collID)
        ON DELETE CASCADE,

    gameID INTEGER NOT NULL
        REFERENCES games(gameID)
        ON DELETE CASCADE,

    PRIMARY KEY (collID, gameID)
);