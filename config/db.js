const sql = require("mssql/msnodesqlv8");


const dbConfig = {
    server: "LIN-5CG1191SHS\\SQLEXPRESS",
    database: "ABC_Sales",
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true,
        trustServerCertificate: true
    }
};

let pool;
const connectDB = async () => {
    try{
        if(!pool){
        pool = await sql.connect(dbConfig);
        console.log("DB connected");
        return pool;
    }
}
    catch(error){
        console.error("DB failed",error.message)
    }
}
module.exports = {sql, connectDB}
