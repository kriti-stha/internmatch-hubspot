import React, { useRef, useEffect, useState } from "react"
import { styles } from "../../styles/detailedLogbook.style"
import {
  getStatusAlertStyle,
  contentBoxStyle,
  contentTitleStyle,
  contentTextStyle,
  detailItemStyle,
} from "../../helpers/logbook-detail-helpers"
import { generateSingleLogbookPdf } from "../../utils/pdfGenerator.js"

const LogbookDetail = ({ ticket, onBackClick, stageIdToLabel }) => {
  if (!ticket) {
    return null
  }

  const pdfRef = useRef()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleDownloadPdf = async () => {
    if (!isClient) return

    try {
      await generateSingleLogbookPdf(ticket, stageIdToLabel)
    } catch (error) {
      console.error("Error generating PDF:", error)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.buttonContainer}>
        <button onClick={onBackClick} style={styles.backButton}>
          &larr; Back to Logbooks
        </button>
        {isClient && (
          <button onClick={handleDownloadPdf} style={styles.downloadButton}>
            Download as PDF
          </button>
        )}
      </div>
      <div ref={pdfRef}>
        <h2 style={styles.title}>{ticket.properties.subject}</h2>
        <div style={styles.detailContainer}>
          <div style={detailItemStyle}>
            <strong>Logbook Date:</strong>
            {ticket.properties.date_of_activity || "-"}
          </div>
          <div style={detailItemStyle}>
            <strong>Status:</strong>
            <span
              style={{
                ...getStatusAlertStyle(
                  stageIdToLabel[ticket.properties.hs_pipeline_stage]
                ),
                marginLeft: "12px",
              }}
            >
              {stageIdToLabel[ticket.properties.hs_pipeline_stage] ||
                ticket.properties.hs_pipeline_stage ||
                "-"}
            </span>
          </div>

          <div style={contentBoxStyle}>
            <div style={contentTitleStyle}>What did you do today?</div>
            <div style={contentTextStyle}>
              {ticket.properties.content || "--"}
            </div>
          </div>

          <div style={contentBoxStyle}>
            <div style={contentTitleStyle}>What did you learn today?</div>
            <div style={contentTextStyle}>
              {ticket.properties.ticket_notes || "--"}
            </div>
          </div>

          <div style={detailItemStyle}>
            <strong>Created At:</strong>
            <span style={{ marginLeft: "12px" }}>
              {new Date(ticket.createdAt).toLocaleString()}
            </span>
          </div>
          <div style={detailItemStyle}>
            <strong>Updated At:</strong>
            <span style={{ marginLeft: "12px" }}>
              {new Date(ticket.updatedAt).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogbookDetail
