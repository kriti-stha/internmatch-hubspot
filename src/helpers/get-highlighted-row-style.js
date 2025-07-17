const getHighlightedRowStyle = (index, hoveredRow) => {
  const baseStyle = {
    background: index % 2 === 0 ? "#fff" : "#f4f6fb",
    transition: "all 0.2s ease",
    cursor: "pointer",
  }

  if (hoveredRow === index) {
    return {
      ...baseStyle,
      background: "#d1ffd6", // light green
      borderLeft: "4px solid #34c759", // green accent
      transform: "translateX(2px)",
      boxShadow: "0 2px 8px rgba(52, 199, 89, 0.15)",
    }
  }

  return baseStyle
}

export default getHighlightedRowStyle
