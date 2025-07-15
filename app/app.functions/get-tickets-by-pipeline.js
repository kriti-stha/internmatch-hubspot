const axios = require("axios")

exports.main = async (context) => {
  const { email } = context.params

  if (!email) {
    return {
      statusCode: 400,
      body: { message: "Missing email in query params" },
    }
  }

  const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY // Use your private app token

  try {
    // Step 1: Find contact by email
    const contactSearchRes = await axios.post(
      "https://api.hubapi.com/crm/v3/objects/contacts/search",
      {
        filterGroups: [
          {
            filters: [
              {
                propertyName: "email",
                operator: "EQ",
                value: email,
              },
            ],
          },
        ],
        properties: ["email"],
        limit: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${HUBSPOT_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    )

    const contact = contactSearchRes.data.results?.[0]
    if (!contact) {
      return {
        statusCode: 404,
        body: { message: "Contact not found" },
      }
    }

    const contactId = contact.id

    // Step 2: Get associated tickets
    const associatedTicketsRes = await axios.get(
      `https://api.hubapi.com/crm/v4/objects/contacts/${contactId}/associations/tickets`,
      {
        headers: {
          Authorization: `Bearer ${HUBSPOT_API_KEY}`,
        },
        params: {
          limit: 100,
        },
      }
    )

    const ticketIds =
      associatedTicketsRes.data.results?.map((r) => r.toObjectId) || []

    if (ticketIds.length === 0) {
      return {
        statusCode: 200,
        body: [],
      }
    }

    // Step 3: Batch read tickets and filter by pipeline
    const ticketsBatch = await axios.post(
      "https://api.hubapi.com/crm/v3/objects/tickets/batch/read",
      {
        properties: ["subject", "hs_pipeline", "hs_pipeline_stage", "content"],
        inputs: ticketIds.map((id) => ({ id })),
      },
      {
        headers: {
          Authorization: `Bearer ${HUBSPOT_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    )

    const filtered = ticketsBatch.data.results.filter(
      (ticket) => ticket.properties.hs_pipeline === "735611506"
    )

    return {
      statusCode: 200,
      body: filtered,
    }
  } catch (error) {
    console.error("Error:", error.response?.data || error.message)
    return {
      statusCode: 500,
      body: { error: error.response?.data || error.message },
    }
  }
}
