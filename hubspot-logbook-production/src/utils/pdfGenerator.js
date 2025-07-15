export const generateAllLogbooksPdf = async (tickets, stageIdToLabel) => {
  try {
    // Only import these modules when the function is actually called
    const jsPDF = await import("jspdf")

    const pdf = new jsPDF.default("p", "mm", "a4")
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margin = 20
    const lineHeight = 6

    // Title for the entire document (only on first page)
    pdf.setFontSize(24)
    pdf.setFont("helvetica", "bold")
    pdf.text("All Logbooks", pageWidth / 2, margin, { align: "center" })

    tickets.forEach((ticket, index) => {
      // Start each logbook on a new page (except the first one)
      if (index > 0) {
        pdf.addPage()
      }

      let currentY = index === 0 ? 40 : margin // Start lower on first page due to title

      // Logbook title (matching styles.title)
      pdf.setFontSize(20)
      pdf.setFont("helvetica", "bold")
      const title = ticket.properties.subject || "Untitled Logbook"
      pdf.text(title, pageWidth / 2, currentY, { align: "center" })
      currentY += 20

      // Logbook Date (matching detailItemStyle)
      pdf.setFontSize(12)
      pdf.setFont("helvetica", "bold")
      pdf.text("Logbook Date:", margin, currentY)
      pdf.setFont("helvetica", "normal")
      const dateText = ticket.properties.date_of_activity || "-"
      pdf.text(dateText, margin + 35, currentY)
      currentY += 12

      // Status (matching detailItemStyle with status badge)
      pdf.setFont("helvetica", "bold")
      pdf.text("Status:", margin, currentY)
      pdf.setFont("helvetica", "normal")
      const statusText =
        stageIdToLabel[ticket.properties.hs_pipeline_stage] ||
        ticket.properties.hs_pipeline_stage ||
        "-"

      // Calculate status badge dimensions and position
      const statusTextWidth = pdf.getTextWidth(statusText)
      const statusPadding = 8
      const statusWidth = statusTextWidth + statusPadding
      const statusHeight = 8
      const statusX = margin + 20
      const statusY = currentY - 4

      // Draw status badge background with proper styling
      pdf.setFillColor(248, 215, 218) // Default status color (red theme)
      pdf.setDrawColor(245, 198, 203)
      pdf.roundedRect(statusX, statusY, statusWidth, statusHeight, 3, 3, "FD")

      // Add status text
      pdf.setTextColor(114, 28, 36) // Dark red text
      pdf.setFontSize(10)
      pdf.text(statusText, statusX + statusPadding / 2, statusY + 5)

      // Reset text color for rest of content
      pdf.setTextColor(0, 0, 0)
      currentY += 20

      // What did you do today? (matching contentBoxStyle)
      const contentBoxStartY = currentY
      pdf.setFillColor(250, 250, 250) // #fafafa
      pdf.setDrawColor(224, 224, 224) // #e0e0e0

      // Content title (matching contentTitleStyle)
      pdf.setFont("helvetica", "bold")
      pdf.setFontSize(14)
      pdf.text("What did you do today?", margin + 5, currentY + 5)
      currentY += 12

      // Content text (matching contentTextStyle)
      pdf.setFont("helvetica", "normal")
      pdf.setFontSize(11)
      const content = ticket.properties.content || "--"
      const contentLines = pdf.splitTextToSize(
        content,
        pageWidth - 2 * margin - 10
      )

      contentLines.forEach((line) => {
        if (currentY > pageHeight - 40) {
          pdf.addPage()
          currentY = margin
        }
        pdf.text(line, margin + 5, currentY)
        currentY += lineHeight
      })

      // Draw content box border after content
      const contentBoxHeight = currentY - contentBoxStartY + 10
      pdf.rect(
        margin,
        contentBoxStartY - 3,
        pageWidth - 2 * margin,
        contentBoxHeight,
        "D"
      )
      currentY += 15

      // What did you learn today? (matching contentBoxStyle)
      const notesBoxStartY = currentY
      pdf.setFillColor(250, 250, 250) // #fafafa
      pdf.setDrawColor(224, 224, 224) // #e0e0e0

      // Notes title (matching contentTitleStyle)
      pdf.setFont("helvetica", "bold")
      pdf.setFontSize(14)
      pdf.text("What did you learn today?", margin + 5, currentY + 5)
      currentY += 12

      // Notes text (matching contentTextStyle)
      pdf.setFont("helvetica", "normal")
      pdf.setFontSize(11)
      const notes = ticket.properties.ticket_notes || "--"
      const notesLines = pdf.splitTextToSize(notes, pageWidth - 2 * margin - 10)

      notesLines.forEach((line) => {
        if (currentY > pageHeight - 40) {
          pdf.addPage()
          currentY = margin
        }
        pdf.text(line, margin + 5, currentY)
        currentY += lineHeight
      })

      // Draw notes box border after content
      const notesBoxHeight = currentY - notesBoxStartY + 10
      pdf.rect(
        margin,
        notesBoxStartY - 3,
        pageWidth - 2 * margin,
        notesBoxHeight,
        "D"
      )
      currentY += 15

      // Created At (matching detailItemStyle)
      pdf.setFont("helvetica", "bold")
      pdf.setFontSize(11)
      pdf.text("Created At:", margin, currentY)
      pdf.setFont("helvetica", "normal")
      const createdAt = ticket.createdAt
        ? new Date(ticket.createdAt).toLocaleString()
        : "-"
      pdf.text(createdAt, margin + 25, currentY)
      currentY += 8

      // Updated At (matching detailItemStyle)
      pdf.setFont("helvetica", "bold")
      pdf.text("Updated At:", margin, currentY)
      pdf.setFont("helvetica", "normal")
      const updatedAt = ticket.updatedAt
        ? new Date(ticket.updatedAt).toLocaleString()
        : "-"
      pdf.text(updatedAt, margin + 25, currentY)
    })

    pdf.save("all-logbooks.pdf")
  } catch (error) {
    console.error("Error generating PDF:", error)
    throw error
  }
}

export const generateSingleLogbookPdf = async (ticket, stageIdToLabel) => {
  try {
    // Only import these modules when the function is actually called
    const jsPDF = await import("jspdf")

    const pdf = new jsPDF.default("p", "mm", "a4")
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margin = 20
    const lineHeight = 6
    let currentY = margin

    // Logbook title (matching styles.title)
    pdf.setFontSize(20)
    pdf.setFont("helvetica", "bold")
    const title = ticket.properties.subject || "Untitled Logbook"
    pdf.text(title, pageWidth / 2, currentY, { align: "center" })
    currentY += 20

    // Logbook Date (matching detailItemStyle)
    pdf.setFontSize(12)
    pdf.setFont("helvetica", "bold")
    pdf.text("Logbook Date:", margin, currentY)
    pdf.setFont("helvetica", "normal")
    const dateText = ticket.properties.date_of_activity || "-"
    pdf.text(dateText, margin + 35, currentY)
    currentY += 12

    // Status (matching detailItemStyle with status badge)
    pdf.setFont("helvetica", "bold")
    pdf.text("Status:", margin, currentY)
    pdf.setFont("helvetica", "normal")
    const statusText =
      stageIdToLabel[ticket.properties.hs_pipeline_stage] ||
      ticket.properties.hs_pipeline_stage ||
      "-"

    // Calculate status badge dimensions and position
    const statusTextWidth = pdf.getTextWidth(statusText)
    const statusPadding = 8
    const statusWidth = statusTextWidth + statusPadding
    const statusHeight = 8
    const statusX = margin + 20
    const statusY = currentY - 4

    // Draw status badge background with proper styling
    pdf.setFillColor(248, 215, 218) // Default status color (red theme)
    pdf.setDrawColor(245, 198, 203)
    pdf.roundedRect(statusX, statusY, statusWidth, statusHeight, 3, 3, "FD")

    // Add status text
    pdf.setTextColor(114, 28, 36) // Dark red text
    pdf.setFontSize(10)
    pdf.text(statusText, statusX + statusPadding / 2, statusY + 5)

    // Reset text color for rest of content
    pdf.setTextColor(0, 0, 0)
    currentY += 20

    // What did you do today? (matching contentBoxStyle)
    const contentBoxStartY = currentY
    pdf.setFillColor(250, 250, 250) // #fafafa
    pdf.setDrawColor(224, 224, 224) // #e0e0e0

    // Content title (matching contentTitleStyle)
    pdf.setFont("helvetica", "bold")
    pdf.setFontSize(14)
    pdf.text("What did you do today?", margin + 5, currentY + 5)
    currentY += 12

    // Content text (matching contentTextStyle)
    pdf.setFont("helvetica", "normal")
    pdf.setFontSize(11)
    const content = ticket.properties.content || "--"
    const contentLines = pdf.splitTextToSize(
      content,
      pageWidth - 2 * margin - 10
    )

    contentLines.forEach((line) => {
      if (currentY > pageHeight - 40) {
        pdf.addPage()
        currentY = margin
      }
      pdf.text(line, margin + 5, currentY)
      currentY += lineHeight
    })

    // Draw content box border after content
    const contentBoxHeight = currentY - contentBoxStartY + 10
    pdf.rect(
      margin,
      contentBoxStartY - 3,
      pageWidth - 2 * margin,
      contentBoxHeight,
      "D"
    )
    currentY += 15

    // What did you learn today? (matching contentBoxStyle)
    const notesBoxStartY = currentY
    pdf.setFillColor(250, 250, 250) // #fafafa
    pdf.setDrawColor(224, 224, 224) // #e0e0e0

    // Notes title (matching contentTitleStyle)
    pdf.setFont("helvetica", "bold")
    pdf.setFontSize(14)
    pdf.text("What did you learn today?", margin + 5, currentY + 5)
    currentY += 12

    // Notes text (matching contentTextStyle)
    pdf.setFont("helvetica", "normal")
    pdf.setFontSize(11)
    const notes = ticket.properties.ticket_notes || "--"
    const notesLines = pdf.splitTextToSize(notes, pageWidth - 2 * margin - 10)

    notesLines.forEach((line) => {
      if (currentY > pageHeight - 40) {
        pdf.addPage()
        currentY = margin
      }
      pdf.text(line, margin + 5, currentY)
      currentY += lineHeight
    })

    // Draw notes box border after content
    const notesBoxHeight = currentY - notesBoxStartY + 10
    pdf.rect(
      margin,
      notesBoxStartY - 3,
      pageWidth - 2 * margin,
      notesBoxHeight,
      "D"
    )
    currentY += 15

    // Created At (matching detailItemStyle)
    pdf.setFont("helvetica", "bold")
    pdf.setFontSize(11)
    pdf.text("Created At:", margin, currentY)
    pdf.setFont("helvetica", "normal")
    const createdAt = ticket.createdAt
      ? new Date(ticket.createdAt).toLocaleString()
      : "-"
    pdf.text(createdAt, margin + 25, currentY)
    currentY += 8

    // Updated At (matching detailItemStyle)
    pdf.setFont("helvetica", "bold")
    pdf.text("Updated At:", margin, currentY)
    pdf.setFont("helvetica", "normal")
    const updatedAt = ticket.updatedAt
      ? new Date(ticket.updatedAt).toLocaleString()
      : "-"
    pdf.text(updatedAt, margin + 25, currentY)

    pdf.save(`${ticket.properties.subject || "logbook"}.pdf`)
  } catch (error) {
    console.error("Error generating PDF:", error)
    throw error
  }
}
