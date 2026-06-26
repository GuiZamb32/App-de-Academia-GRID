const { Pool } = require('pg')

// 💡 Remove qualquer parâmetro de SSL da string de conexão se estiver no localhost
let urlConexao = process.env.DATABASE_URL;
const ehLocalhost = urlConexao?.includes('localhost') || urlConexao?.includes('127.0.0.1');

if (ehLocalhost && urlConexao) {
  // Remove "?sslmode=require" ou similares que travam o banco local
  urlConexao = urlConexao.split('?')[0]; 
}

const pool = new Pool({
  connectionString: urlConexao,
  // 💡 SE FOR LOCALHOST: Passa false (desliga SSL). SE FOR NUVEM: Mantém o SSL seguro.
  ssl: ehLocalhost ? false : { rejectUnauthorized: false }
})

console.log(`🔌 Banco conectado em modo: ${ehLocalhost ? 'LOCAL (Sem SSL)' : 'NUVEM (Com SSL)'}`);

module.exports = pool