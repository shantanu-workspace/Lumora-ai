import {neon} from '@neondatabase/serverless'


const sql = neon(`${process.env.DATABASE_URL}`);  //this is how we connect the database

export default sql;