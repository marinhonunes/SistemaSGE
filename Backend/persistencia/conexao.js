import mysql from 'mysql2/promise';

export default async function conectar(){
    if(global.poolConexoes){
        return await global.poolConexoes.getConnection();
    }
    
    global.poolConexoes = mysql.createPool({
        host:"localhost",
        user:"root",
        password:"",
        database:"sge"
    });
    
    return await global.poolConexoes.getConnection();
}