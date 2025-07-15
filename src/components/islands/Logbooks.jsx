import React, { useEffect, useState } from "react"
import { styles } from "../../styles/detailedLogbook.style.js"
import LogbookDetail from "./LogbookDetail.jsx"
import convertStageIdToLabel from "../../helpers/convert-stage-id-to-label.js"
import { generateAllLogbooksPdf } from "../../utils/pdfGenerator.js"
import { useLogbookData } from "../../hooks/useLogbookData.js"
import { createTableColumns } from "../../utils/tableColumns.js"
import DataTable from "./DataTable.jsx"
import { logInfo } from "@hubspot/cms-components"

const Logbooks = ({ fieldValues, membership_contact }) => {
  const { logbookData, pipelineStages, loading, error } = useLogbookData()
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [hoveredRow, setHoveredRow] = useState(null)
  const [isClient, setIsClient] = useState(false)

  console.log("INFO==>", { props, membership_contact })

  useEffect(() => {
    setIsClient(true)
  }, [])

  const tickets = logbookData?.results || []

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
      {membership_contact && (
        <p style={{ textAlign: "center", marginBottom: "20px", color: "#666" }}>
          Welcome back, {membership_contact}
        </p>
      )}
      {isClient && tickets.length > 0 && (
        <div style={styles.buttonContainer}>
          <div></div> {/* Empty div for spacing */}
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
