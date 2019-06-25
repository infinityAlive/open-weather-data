import mongodb from 'mongodb'
import config from './config'

const mongoDbUri = config.mongoDbUri

const retrieveCwbDb = (() => {
  let mongoClient, cwbDb
  return async () => {
    if (!mongoClient) {
      mongoClient = await mongodb.MongoClient
        .connect(mongoDbUri,
          {
            useNewUrlParser: true,
            poolSize: 20
          })
    }

    if (!cwbDb) {
      cwbDb = mongoClient.db('cwb')
    }
    return cwbDb
  }
})()


const find = async (collectionName, query) => {
  try {
    const db = await retrieveCwbDb()
    return await db.collection(collectionName).find(query).toArray()
  } catch (error) {
    console.error(error)
  }
}

export { find }