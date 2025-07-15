export const getStatusAlertStyle = (status) => {
  const baseStyle = {
    padding: '8px 16px',
    borderRadius: '6px',
    fontWeight: 'bold',
    display: 'inline-block',
    fontSize: '14px'
  };

  if (status?.toLowerCase().includes('completed') || status?.toLowerCase().includes('done') || status?.toLowerCase().includes('submitted')) {
    return { ...baseStyle, backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb' };
  } else if (status?.toLowerCase().includes('in progress') || status?.toLowerCase().includes('pending')) {
    return { ...baseStyle, backgroundColor: '#fff3cd', color: '#856404', border: '1px solid #ffeaa7' };
  } else {
    return { ...baseStyle, backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb' };
  }
};

export const contentBoxStyle = {
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  padding: '16px',
  marginBottom: '24px',
  backgroundColor: '#fafafa',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

export const contentTitleStyle = {
  fontWeight: 'bold',
  marginBottom: '8px',
  color: '#333',
  fontSize: '16px',
  marginRight: '12px'
};

export const contentTextStyle = {
  lineHeight: '1.6',
  color: '#555',
  whiteSpace: 'pre-wrap'
};

export const detailItemStyle = {
  marginBottom: '16px',
  lineHeight: '1.6',
  marginRight: '12px'
}; 