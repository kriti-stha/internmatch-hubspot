import React from "react"
import { styles } from "../../styles/detailedLogbook.style.js"
import getHighlightedRowStyle from "../../helpers/get-highlighted-row-style.js"

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
    <table style={styles.table}>
      <thead style={styles.tableHeader}>
        <tr>
          {columns.map((column) => (
            <th key={column.header} style={styles.tableHeaderCell}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} style={styles.emptyState}>
              {emptyStateMessage}
            </td>
          </tr>
        ) : (
          data.map((item, idx) => (
            <tr
              key={item.id}
              style={getHighlightedRowStyle(idx, hoveredRow)}
              onClick={() => onRowClick?.(item)}
              onMouseEnter={() => onRowMouseEnter?.(idx)}
              onMouseLeave={onRowMouseLeave}
            >
              {columns.map((column) => (
                <td key={column.header} style={styles.tableCell}>
                  {column.accessor(item)}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}

export default DataTable
