import mongodb from 'mongodb'
const ObjectId = mongodb.ObjectId

let reviews
export default class ReviewsDAO{
    static async injectDB(conn){
        if(reviews){
            return 
        }
        try{
            reviews = await conn.db('reviews').collection('reviews')
        }catch(e){
            console.error(`Unable to establish collection handles in userDAO:${e}`)
        }
    }

    static async addReview(movieID, user, review){
        try{
            const reviewDoc = {
                movieID: movieID,
                user: user,
                review: review,
            }
            return await reviews.insertOne(reviewDoc)
        }catch(e){
            console.error(`unable to post review: ${e}`)
            return {error: e}
        }
    }

    static async getReview(reviewID){
        try{
            return await reviews.findOne({_id: new ObjectId(reviewID)})
        }catch(e){
            console.error(`unable to get review: ${e}`)
            return {error: e}
        }
    }

    static async updateReview(reviewID, user, review){
        try{
            const updateresponse = await reviews.updateOne({_id: new ObjectId(reviewID)},{$set: {user: user, review: review}})
            return updateresponse
        }catch(e){
            console.error(`Unable to update review: ${e}`)
            return {error: e}
        }
    }

    static async deleteReview(reviewID){
        try{
            const deleteresponse = await reviews.deleteOne({_id: new ObjectId(reviewID)})
            return deleteresponse
        }catch(e){
            console.error(`Unable to delete review: ${e}`)
            return {error: e}
        }
    }

    static async getReviewsByMoviesId(movieID){
        
        try{
            const cursor = await reviews.find({movieID: movieID})
            return cursor.toArray()
        }catch(e){
            console.error(`Unable to get review: ${e}`)
            return {error: e}
        }
    }

}