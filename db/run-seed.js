const { seed } = require("./seed")
const testData = require("./data/index")
const { db } = require("./connection")

const runSeed = async () => {
  await seed(testData)
  db.end()
}

runSeed()
