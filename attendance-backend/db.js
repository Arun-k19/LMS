const {createPool} = require('mysql')

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "",
    connectionLimit: 10
})

pool.query(`select * from attendance_system.users`, (err, res)=>{
    return console.log(res);    
})









