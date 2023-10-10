import mysql from 'mysql2/promise';
export default async function conectar (){
    
    if (global.poolConexoes){
        return await global.poolConexoes.getConnection();
    }

    global.poolConexoes = mysql.createPool({
        host: 'localhost',
        port: 3306,
        database: 'backendaluno15-ppiadsead', //alterar
        user: 'aluno15-ppiadsead', //alterar
        password: 'UwMkBVwYnPLc5VHx1HHH', //alterar
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        idleTimeout: 60000,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0
    })

    return await global.poolConexoes.getConnection();

}