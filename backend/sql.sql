-- ==========================================
-- TABELA DE USUÁRIOS
-- ==========================================
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    foto_perfil TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- TABELA DE TREINOS
-- ==========================================
CREATE TABLE IF NOT EXISTS treinos (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_usuario_treino
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
);

-- ==========================================
-- TABELA DE EXERCÍCIOS
-- ==========================================
CREATE TABLE IF NOT EXISTS exercicios (
    id SERIAL PRIMARY KEY,
    treino_id INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    grupo_muscular VARCHAR(50) NOT NULL,
    series INT NOT NULL DEFAULT 3,
    repeticoes INT NOT NULL DEFAULT 12,
    carga NUMERIC(10,2) DEFAULT 0,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_treino_exercicio
        FOREIGN KEY (treino_id)
        REFERENCES treinos(id)
        ON DELETE CASCADE
);

-- ==========================================
-- TABELA DE TREINOS FINALIZADOS
-- histórico do usuário
-- ==========================================
CREATE TABLE IF NOT EXISTS historico_treinos (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    treino_id INT NOT NULL,
    iniciado_em TIMESTAMP,
    finalizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tempo_total_segundos INT DEFAULT 0,
    exercicios_concluidos INT DEFAULT 0,
    series_concluidas INT DEFAULT 0,
    progresso INT DEFAULT 0,

    CONSTRAINT fk_usuario_historico
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE,
        
    CONSTRAINT fk_treino_historico
        FOREIGN KEY (treino_id)
        REFERENCES treinos(id)
        ON DELETE CASCADE
);

-- ==========================================
-- TABELA DE SÉRIES CONCLUÍDAS
-- salva progresso do treino atual
-- ==========================================
CREATE TABLE IF NOT EXISTS series_realizadas (
    id SERIAL PRIMARY KEY,
    historico_id INT NOT NULL,
    exercicio_id INT NOT NULL,
    numero_serie INT NOT NULL,
    reps_feitas INT,
    carga_usada NUMERIC(10,2),
    concluida BOOLEAN DEFAULT FALSE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_historico_serie
        FOREIGN KEY (historico_id)
        REFERENCES historico_treinos(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_exercicio_serie
        FOREIGN KEY (exercicio_id)
        REFERENCES exercicios(id)
        ON DELETE CASCADE
);