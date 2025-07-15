const axios = require("axios")

exports.main = async (context) => {
  const token = process.env.HUBSPOT_SERVERLESS_FUNCTION_TOKEN
  const email = Array.isArray(context.params.email)
    ? context.params.email[0]
    : context.params.email

  if (!token) {
    return {
      statusCode: 500,
      body: { error: "Missing token" },
      headers: { "Content-Type": "application/json" },
    }
  }

  if (!email) {
    return {
      statusCode: 400,
      body: { error: "Email is required" },
      headers: { "Content-Type": "application/json" },
    }
  }

  try {
    // 1. Search for the contact by email
    const searchRes = await axios.post(
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
        limit: 1,
        properties: ["email"],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )

    if (!searchRes.data.results || searchRes.data.results.length === 0) {
      return {
        statusCode: 404,
        body: { error: "Contact not found" },
        headers: { "Content-Type": "application/json" },
      }
    }

    const contactId = searchRes.data.results[0].id

    // 2. Get tickets associated with the contact
    const ticketsRes = await axios.get(
      `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}/associations/tickets`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )

    const ticketIds = ticketsRes.data.results.map((r) => r.id)
    const flatTicketIds = Array.isArray(ticketIds)
      ? ticketIds.flat().map(String)
      : []

    // 3. Fetch ticket details (batch request)
    let tickets = []
    let batchPayload = null
    if (flatTicketIds.length > 0) {
      batchPayload = {
        properties: [
          "subject",
          "content",
          "date_of_activity",
          "ticket_notes",
          "hs_pipeline_stage",
          "hs_pipeline",
          "source_type",
          "hubspot_owner_id",
          "hs_created_by_user_id",
          "hs_ticket_contact",
        ],
        inputs: flatTicketIds.map((id) => ({ id })),
      }

      try {
        const batchRes = await axios.post(
          "https://api.hubapi.com/crm/v3/objects/tickets/batch/read",
          batchPayload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        tickets = batchRes.data.results
      } catch (batchError) {
        return {
          statusCode: batchError.response?.status || 500,
          body: {
            error:
              batchError.response && batchError.response.data
                ? batchError.response.data
                : { error: batchError.message },
            batchPayload,
          },
          headers: { "Content-Type": "application/json" },
        }
      }
    }

    return {
      statusCode: 200,
      body: { tickets, count: tickets.length },
      headers: { "Content-Type": "application/json" },
    }
  } catch (error) {
    console.error("Fetch error:", error)

    const errorMessage =
      error.response && error.response.data
        ? error.response.data
        : { error: error.message }

    return {
      statusCode: error.response?.status || 500,
      body: errorMessage,
      headers: { "Content-Type": "application/json" },
    }
  }
}
