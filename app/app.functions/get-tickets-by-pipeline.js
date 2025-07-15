const axios = require("axios")

exports.main = async () => {
  const token = process.env.HUBSPOT_SERVERLESS_FUNCTION_TOKEN
  const pipelineId = "735611506"

  // Function to fetch all tickets in the pipeline, handling pagination
  async function fetchAllTicketsInPipeline(pipelineId) {
    let allTickets = []
    let after = null
    let hasMore = true

    while (hasMore) {
      try {
        const response = await axios.post(
          "https://api.hubapi.com/crm/v3/objects/tickets/search",
          {
            filterGroups: [
              {
                filters: [
                  {
                    propertyName: "hs_pipeline",
                    operator: "EQ",
                    value: pipelineId,
                  },
                ],
              },
            ],
            properties: [
              "subject", //name of person who submitted logbook
              "content", // what did you do today?
              "date_of_activity", //logbook date
              "ticket_notes", //what did you learn today?
              "hs_pipeline_stage", //id of what stage the logbook is in.
              "hs_pipeline", //logbooks pipeline id
              "source_type", //how was the ticket created? Form usually.
              "hubspot_owner_id", //who currently owns the ticket
              "hs_created_by_user_id", //who created it
              "hs_ticket_contact", //contact ID associated with the ticket
            ],
            limit: 100,
            after: after,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )

        allTickets = [...allTickets, ...response.data.results]
        after = response.data.paging?.next?.after || null
        hasMore = !!after
      } catch (error) {
        console.error("Error fetching tickets:", error)
        throw error
      }
    }

    return allTickets
  }

  try {
    const tickets = await fetchAllTicketsInPipeline(pipelineId)

    return {
      statusCode: 200,
      body: {
        results: tickets,
        count: tickets.length,
      },
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
