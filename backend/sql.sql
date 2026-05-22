-- =========================================
-- USUARIOS
-- =========================================

CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- TREINOS
-- =========================================

CREATE TABLE IF NOT EXISTS treinos (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    nome VARCHAR(100) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_usuario
        FOREIGN KEY(usuario_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
);

-- =========================================
-- EXERCICIOS
-- =========================================

CREATE TABLE IF NOT EXISTS exercicios (
    id SERIAL PRIMARY KEY,
    treino_id INTEGER NOT NULL,
    nome VARCHAR(100) NOT NULL,
    grupo VARCHAR(100),
    series INTEGER DEFAULT 3,
    reps INTEGER DEFAULT 12,
    carga NUMERIC(10,2) DEFAULT 0,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_treino
        FOREIGN KEY(treino_id)
        REFERENCES treinos(id)
        ON DELETE CASCADE
);