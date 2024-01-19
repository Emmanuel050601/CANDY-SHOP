const { Pool } = require('pg');

// Configura el pool de conexiones a la base de datos
const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'dulceria',
    password: 'root',
    port: 5432,
    max: 20, // número máximo de conexiones en el pool
    idleTimeoutMillis: 30000, // tiempo máximo en milisegundos que una conexión puede estar inactiva en el pool
    connectionTimeoutMillis: 2000, // tiempo máximo en milisegundos para establecer una nueva conexión
});

// Manejar eventos de pool
pool.on('connect', () => {
    console.log('Conexión establecida con el pool de la base de datos');
});

pool.on('error', (err) => {
    console.error('Error en el pool de la base de datos:', err);
    process.exit(-1); // Termina la aplicación en caso de error en el pool
});

// Exportar el pool en lugar de la conexión única
module.exports = pool;
