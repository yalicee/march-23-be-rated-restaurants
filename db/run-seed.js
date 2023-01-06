const { seed } = require("./seed")
const testData = require("./data/index")

console.log(process.env)

seed(testData)
