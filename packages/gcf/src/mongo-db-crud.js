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

const replaceOne = async (collectionName, query, document, options) => {
  try {
    const db = await retrieveCwbDb()
    const updateResult = await db.collection(collectionName).replaceOne(query, document, options)
    console.log(`Result of upsert ${collectionName}, n = ${updateResult.result.n}`)
  } catch (error) {
    console.error(error)
  }
}

export { replaceOne }