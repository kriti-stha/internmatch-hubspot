import React, { useEffect, useState } from "react"
import { styles } from "../../styles/detailedLogbook.style.js"
import LogbookDetail from "./LogbookDetail.jsx"
import convertStageIdToLabel from "../../helpers/convert-stage-id-to-label.js"
import { generateAllLogbooksPdf } from "../../utils/pdfGenerator.js"
import { useLogbookData } from "../../hooks/useLogbookData.js"
import { createTableColumns } from "../../utils/tableColumns.js"
import DataTable from "./DataTable.jsx"

const Logbooks = ({ fieldValues, hublParameters }) => {
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [hoveredRow, setHoveredRow] = useState(null)
  const [isClient, setIsClient] = useState(false)

  const [contact, setContact] = useState(null)
  const [contactEmail, setContactEmail] = useState("")

  useEffect(() => {
    if (window.req_contact && window.req_contact.contact) {
      setContact(window?.req_contact?.contact || {})
      setContactEmail(window?.req_contact?.contact?.identifier)
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

  const tickets = logbookTicketsByEmail?.results || logbookTicketsByEmail || []

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

  if (loading) return <div style={styles.loading}>Loading...</div>
  if (error) return <div style={styles.error}>Error: {error}</div>

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
    <div style={styles.container}>
      <h2 style={styles.title}>View all logbooks</h2>

      {isClient && tickets.length > 0 && (
        <div style={styles.buttonContainer}>
          <div></div>
          <button onClick={handleDownloadAllPdf} style={styles.downloadButton}>
            Download All Logbooks as PDF
          </button>
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
