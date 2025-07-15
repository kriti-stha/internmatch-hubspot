const axios = require("axios")

exports.main = async (context) => {
  const token = process.env.HUBSPOT_SERVERLESS_FUNCTION_TOKEN

  const userId = context.params.id

  if (!token) {
    return {
      statusCode: 500,
      body: { error: "Missing token" },
      headers: { "Content-Type": "application/json" },
    }
  }

  const url = `https://api.hubapi.com/crm/v3/owners/${userId}`

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

    return {
      statusCode: 500,
      body: { error: error.message },
      headers: { "Content-Type": "application/json" },
    }
  }
}
