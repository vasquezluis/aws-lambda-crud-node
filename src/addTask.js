const { v4 } = require('uuid')
const AWS = require('aws-sdk')
const middy = require('@middy/core')
const httpJsonBodyParser = require('@middy/http-json-body-parser')

const addTask = async (event) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient()

  const { title, description } = event.body
  const createdAt = new Date().toLocaleDateString('es-MX')

  const newTask = {
    id: v4(),
    title,
    description,
    createdAt,
    done: false
  }

  await dynamoDb
    .put({
      TableName: 'TaskTable',
      Item: newTask
    })
    .promise()

  return { status: 200, body: { newTask } }
}

module.exports = {
  addTask: middy(addTask).use(httpJsonBodyParser())
}
