import React from "react"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../ui/table"
import getHighlightedRowStyle from "../../helpers/get-highlighted-row-style.js"

const tableStyles = {
  wrapper: {
    background: "#fff",
    borderRadius: "24px",
    overflow: "hidden",
    width: "100%",
    margin: 0,
    padding: 0,
  },
  headerRow: {
    background: "#ff6f2c",
    color: "#fff",
    fontWeight: 600,
    fontSize: "1.1rem",
    borderTopLeftRadius: "24px",
    borderTopRightRadius: "24px",
  },
  head: {
    background: "#ff6f2c",
    color: "#fff",
    fontWeight: 600,
    fontSize: "1.1rem",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    border: "none",
    padding: "16px 18px",
  },
  cell: {
    padding: "16px 18px",
    fontSize: "1rem",
    color: "#1a2233",
    border: "none",
  },
  striped: {
    background: "#f6f8fa",
  },
}

const DataTable = ({
  data,
  columns,
  onRowClick,
  hoveredRow,
  onRowMouseEnter,
  onRowMouseLeave,
  emptyStateMessage = "No data found.",
}) => {
  return (
    <div style={tableStyles.wrapper}>
      <Table
        style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}
      >
        <TableHeader>
          <TableRow style={tableStyles.headerRow}>
            {columns.map((column, idx) => (
              <TableHead
                key={column.header}
                style={{
                  ...tableStyles.head,
                  ...(idx === 0 ? { borderTopLeftRadius: "24px" } : {}),
                  ...(idx === columns.length - 1
                    ? { borderTopRightRadius: "24px" }
                    : {}),
                }}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                style={{ ...tableStyles.cell, textAlign: "center" }}
              >
                {emptyStateMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((item, idx) => (
              <TableRow
                key={item.id}
                style={{
                  ...(idx % 2 === 1 ? tableStyles.striped : {}),
                  ...(hoveredRow === idx
                    ? getHighlightedRowStyle(idx, hoveredRow)
                    : {}),
                  cursor: "pointer",
                }}
                onClick={() => onRowClick?.(item)}
                onMouseEnter={() => onRowMouseEnter?.(idx)}
                onMouseLeave={onRowMouseLeave}
              >
                {columns.map((column) => (
                  <TableCell key={column.header} style={tableStyles.cell}>
                    {column.accessor(item)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default DataTable
