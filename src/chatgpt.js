const middy = require('@middy/core')
const httpJsonBodyParser = require('@middy/http-json-body-parser')
const { Configuration, OpenAIApi } = require('openai')

const API_KEY = ''

const configuration = new Configuration({
  apiKey: `${API_KEY}`
})
const openai = new OpenAIApi(configuration)

const chatgpt = async (event) => {
  try {
    const { message } = event.body

    const responseOpenAI = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${message}`,
      max_tokens: 200,
      temperature: 0
    })

    const resultMessage = responseOpenAI?.data?.choices[0]?.text

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ message: resultMessage })
    }
  } catch (error) {
    console.log(error)
    return { status: 500, error: { error } }
  }
}

module.exports = { chatgpt: middy(chatgpt).use(httpJsonBodyParser()) }
