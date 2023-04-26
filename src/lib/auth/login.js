import con from '../db.js'
import bcrypt from 'bcrypt'
import {sign} from 'jsonwebtoken'

export default async function (username, password) {
    const [rows] = await con.execute('SELECT * FROM users WHERE username = ?', [username]);
    if(rows.length == 0)
        return {success:false, message:"User either does not exist or the password is wrong."}
    
    await con.end()
    let passValid = await bcrypt.compare(rows[0].password)

    if(!passValid)
        return {success:false, message:"User either does not exist or the password is wrong."}

    let jwt = sign({id:rows[0].ID, username:rows[0].username},process.env.JWT_SECRET)
    return {success:true, message:"Logged in successfully!", token:jwt}
}