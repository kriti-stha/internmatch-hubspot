export const createTableColumns = (stageIdToLabel) => [
  {
    header: "Name",
    accessor: (ticket) => ticket.properties.subject || "-",
  },
  {
    header: "Logbook Date",
    accessor: (ticket) => ticket.properties.date_of_activity || "-",
  },
  {
    header: "Status",
    accessor: (ticket) => {
      return (
        stageIdToLabel[ticket.properties.hs_pipeline_stage] ||
        ticket.properties.hs_pipeline_stage ||
        "-"
      )
    },
  },
  {
    header: "Created At",
    accessor: (ticket) =>
      ticket.createdAt ? new Date(ticket.createdAt).toLocaleString() : "-",
  },
  {
    header: "Updated At",
    accessor: (ticket) =>
      ticket.updatedAt ? new Date(ticket.updatedAt).toLocaleString() : "-",
  },
]
