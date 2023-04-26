import con from '../db.js'
import bcrypt from 'bcrypt'
import flake from '../utils/flake.js'
import validate from '../utils/validation.js'

export default async function (username, password){
    if(!validate(username))
        return {success:false, message:"User is not valid or already exists."}
    const [rows] = await con.execute('SELECT * FROM users WHERE username = ?', [username]);
    if(rows.length > 0)
        return {success:false, message:"User is not valid or already exists."}
    
    await con.end();
    const snowflake = flake()
    const hashed = await bcrypt.hash(password, 10)

    const [result] = await con.execute('INSERT INTO users (ID, password, username) VALUES (?, ?, ?)', [snowflake, hashed, username]);

    return {success:true, message:"User created successfully!"}
}