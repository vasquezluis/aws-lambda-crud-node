const AWS = require('aws-sdk')

const deleteTask = async (event) => {
  const { id } = event.pathParameters
  const dynamoDb = new AWS.DynamoDB.DocumentClient()

  await dynamoDb
    .delete({
      TableName: 'TaskTable',
      Key: { id }
    })
    .promise()

  return { status: 200, body: { message: 'Task deleted!' } }
}

module.exports = { deleteTask }
