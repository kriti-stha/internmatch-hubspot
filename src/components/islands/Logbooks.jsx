import React, { useEffect, useState } from "react"
import { styles as logbookStyles } from "../../styles/detailedLogbook.style.js"
import LogbookDetail from "./LogbookDetail.jsx"
import convertStageIdToLabel from "../../helpers/convert-stage-id-to-label.js"
import { generateAllLogbooksPdf } from "../../utils/pdfGenerator.js"
import { useLogbookData } from "../../hooks/useLogbookData.js"
import { createTableColumns } from "../../utils/tableColumns.js"
import DataTable from "./DataTable.jsx"
import { Button } from "../ui/button.tsx"
import styles from "../../styles/component.module.css"

const Logbooks = ({ fieldValues, hublParameters }) => {
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [hoveredRow, setHoveredRow] = useState(null)
  const [isClient, setIsClient] = useState(false)

  const [contactEmail, setContactEmail] = useState("")

  useEffect(() => {
    if (window.req_contact ) {
      setContactEmail(window?.req_contact?.contact?.identifier || window?.req_contact?.contact.membership_contact|| window.)
    }
  }, [])

  const { logbookData, pipelineStages, loading, error, logbookTicketsByEmail } =
    useLogbookData(contactEmail)

  console.log("INFO==>", {
    fieldValues,
    hublParameters,
    logbookTicketsByEmail,
    logbookData,
    logbookTicketsByEmail,
  })

  useEffect(() => {
    setIsClient(true)
  }, [])

  // const mockData = [
  //   {
  //     id: "26592312607",
  //     properties: {
  //       content:
  //         "Working woth two project,develop a design and simulation for this company",
  //       createdate: "2025-07-16T12:14:31.039Z",
  //       date_of_activity: "2025-07-16",
  //       hs_created_by_user_id: null,
  //       hs_lastmodifieddate: "2025-07-17T01:01:46.528Z",
  //       hs_object_id: "26592312607",
  //       hs_pipeline: "735611506",
  //       hs_pipeline_stage: "1071384092",
  //       hubspot_owner_id: "104345995",
  //       source_type: "FORM",
  //       subject: "Test",
  //       ticket_notes: "How to work with matlab Software",
  //     },
  //     createdAt: "2025-07-16T12:14:31.039Z",
  //     updatedAt: "2025-07-17T01:01:46.528Z",
  //     archived: false,
  //   },
  //   {
  //     id: "26525981044",
  //     properties: {
  //       content: "Greetings with everyone",
  //       createdate: "2025-07-14T13:17:58.797Z",
  //       date_of_activity: "2025-07-14",
  //       hs_created_by_user_id: null,
  //       hs_lastmodifieddate: "2025-07-16T05:17:58.254Z",
  //       hs_object_id: "26525981044",
  //       hs_pipeline: "735611506",
  //       hs_pipeline_stage: "1071384092",
  //       hubspot_owner_id: "104345995",
  //       source_type: "FORM",
  //       subject: "Test",
  //       ticket_notes: "How to manage weekly meeting ,they give me project",
  //     },
  //     createdAt: "2025-07-14T13:17:58.797Z",
  //     updatedAt: "2025-07-16T05:17:58.254Z",
  //     archived: false,
  //   },
  //   {
  //     id: "26562232673",
  //     properties: {
  //       content: "Working with my project",
  //       createdate: "2025-07-15T08:42:20.309Z",
  //       date_of_activity: "2025-07-15",
  //       hs_created_by_user_id: null,
  //       hs_lastmodifieddate: "2025-07-17T00:42:19.551Z",
  //       hs_object_id: "26562232673",
  //       hs_pipeline: "735611506",
  //       hs_pipeline_stage: "1071384092",
  //       hubspot_owner_id: "104345995",
  //       source_type: "FORM",
  //       subject: "Test",
  //       ticket_notes: "how to use Second Solar panel",
  //     },
  //     createdAt: "2025-07-15T08:42:20.309Z",
  //     updatedAt: "2025-07-17T00:42:19.551Z",
  //     archived: false,
  //   },
  //   {
  //     id: "26524153997",
  //     properties: {
  //       content:
  //         "Greetings with every staff,joined weekly meeting,they gave me two projects",
  //       createdate: "2025-07-14T13:16:28.877Z",
  //       date_of_activity: "2025-07-14",
  //       hs_created_by_user_id: null,
  //       hs_lastmodifieddate: "2025-07-16T05:16:28.155Z",
  //       hs_object_id: "26524153997",
  //       hs_pipeline: "735611506",
  //       hs_pipeline_stage: "1071384092",
  //       hubspot_owner_id: "104345995",
  //       source_type: "FORM",
  //       subject: "test",
  //       ticket_notes: "How to manage weekly meeting with staff",
  //     },
  //     createdAt: "2025-07-14T13:16:28.877Z",
  //     updatedAt: "2025-07-16T05:16:28.155Z",
  //     archived: false,
  //   },
  // ]

 
  let tickets = []
  if (
    logbookTicketsByEmail &&
    Array.isArray(logbookTicketsByEmail.results) &&
    logbookTicketsByEmail.results.length > 0
  ) {
    tickets = logbookTicketsByEmail.results
  } else {
    tickets = logbookTicketsByEmail
  }

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket)
  }

  const handleBackClick = () => {
    setSelectedTicket(null)
  }

  const handleRowMouseEnter = (index) => {
    setHoveredRow(index)
  }

  const handleRowMouseLeave = () => {
    setHoveredRow(null)
  }

  const handleDownloadAllPdf = async () => {
    if (!isClient || tickets.length === 0) return

    try {
      await generateAllLogbooksPdf(tickets, stageIdToLabel)
    } catch (error) {
      console.error("Error generating PDF:", error)
    }
  }

  const stageIdToLabel = pipelineStages && convertStageIdToLabel(pipelineStages)
  const columns = createTableColumns(stageIdToLabel)

  if (loading)
    return (
      <div style={logbookStyles.loading}>
        <div style={logbookStyles.spinner} />
        Loading...
        <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      </div>
    )
  if (error) return <div style={logbookStyles.error}>Error: {error}</div>

  if (selectedTicket) {
    return (
      <LogbookDetail
        ticket={selectedTicket}
        onBackClick={handleBackClick}
        stageIdToLabel={stageIdToLabel}
      />
    )
  }
  return (
    <div style={logbookStyles.container}>
      <h2 style={logbookStyles.title}>View all logbooks</h2>

      {isClient && tickets.length > 0 && (
        <div style={logbookStyles.buttonContainer}>
          <div></div>
          <Button
            onClick={handleDownloadAllPdf}
            variant="default"
            className={styles.orangeButton}
          >
            Download All Logbooks as PDF
          </Button>
        </div>
      )}
      <DataTable
        data={tickets}
        columns={columns}
        onRowClick={handleTicketClick}
        hoveredRow={hoveredRow}
        onRowMouseEnter={handleRowMouseEnter}
        onRowMouseLeave={handleRowMouseLeave}
        emptyStateMessage="No logbooks found for this user."
      />
    </div>
  )
}

export default Logbooks
