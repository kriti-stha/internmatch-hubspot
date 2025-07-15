const axios = require("axios")

exports.main = async (context) => {
  const token = process.env.HUBSPOT_SERVERLESS_FUNCTION_TOKEN

  const contactId = context.params.id

  if (!token) {
    return {
      statusCode: 500,
      body: { error: "Missing token" },
      headers: { "Content-Type": "application/json" },
    }
  }

  if (!contactId) {
    return {
      statusCode: 400,
      body: { error: "Missing contact ID" },
      headers: { "Content-Type": "application/json" },
    }
  }

  const url = `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    return {
      statusCode: 200,
      body: response.data,
      headers: { "Content-Type": "application/json" },
    }
  } catch (error) {
    console.error("Fetch error:", error)

    // Provide more detailed error information if available
    const errorMessage =
      error.response && error.response.data
        ? error.response.data
        : { error: error.message }

    return {
      statusCode: 500,
      body: errorMessage,
      headers: { "Content-Type": "application/json" },
    }
  }
}
