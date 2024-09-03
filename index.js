import app from './server.js'
import mongodb, { MongoClient } from "mongodb"
import dotenv from 'dotenv'
import ReviewsDAO from "./dao/reviewsDAO.js"
dotenv.config();

const mongo_username = process.env.MONGO_USERNAME
const mongo_password = process.env.MONGO_PASSWORD

const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.kyo1gei.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const port = 8000

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500
    }
)

.catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    await ReviewsDAO.injectDB(client)
    app.listen(port, () => {
        console.log(`listening at port ${port}`)
    })
})