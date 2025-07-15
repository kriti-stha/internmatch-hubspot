const axios = require("axios")

exports.main = async (context) => {
  const token = process.env.HUBSPOT_SERVERLESS_FUNCTION_TOKEN

  const ticketId = context.params.id

  if (!token) {
    return {
      statusCode: 500,
      body: { error: "Missing token" },
      headers: { "Content-Type": "application/json" },
    }
  }

  if (!ticketId) {
    return {
      statusCode: 400,
      body: { error: "Missing ticket ID" },
      headers: { "Content-Type": "application/json" },
    }
  }

  const url = `https://api.hubapi.com/crm/v3/objects/tickets/${ticketId}`

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      // params: {
      //   properties: [
      //     "subject", //name of person who submitted logbook
      //     "content", // what did you do today?
      //     "date_of_activity", //logbook date
      //     "ticket_notes", //what did you learn today?
      //     "hs_pipeline_stage", //id of what stage the logbook is in.
      //     "hs_pipeline", //logbooks pipeline id
      //     "source_type", //how was the ticket created? Form usually.
      //     "hubspot_owner_id", //who currently owns the ticket
      //     "hs_created_by_user_id", //who created it
      //     "hs_ticket_contact", //contact ID associated with the ticket
      //   ],
      // },
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
      statusCode: error.response?.status || 500,
      body: errorMessage,
      headers: { "Content-Type": "application/json" },
    }
  }
}
