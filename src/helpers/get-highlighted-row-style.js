const getHighlightedRowStyle = (index, hoveredRow) => {
  const baseStyle = {
    background: index % 2 === 0 ? '#fff' : '#f4f6fb',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
  };

  if (hoveredRow === index) {
    return {
      ...baseStyle,
      background: '#d1e7ff',
      borderLeft: '4px solid #4a90e2',
      transform: 'translateX(2px)',
      boxShadow: '0 2px 8px rgba(74, 144, 226, 0.15)',
    };
  }

  return baseStyle;
};

export default getHighlightedRowStyle;