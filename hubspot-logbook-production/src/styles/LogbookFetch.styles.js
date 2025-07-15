export const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  title: {
    marginBottom: '24px',
    color: '#2d3e50'
  },
  dropdownContainer: {
    marginBottom: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  dropdownLabel: {
    fontWeight: '500',
    color: '#2d3e50',
    minWidth: '120px'
  },
  dropdown: {
    padding: '8px 12px',
    minWidth: '300px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    fontSize: '14px',
    cursor: 'pointer'
  },
  tableContainer: {
    border: '1px solid #ddd',
    borderRadius: '4px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white'
  },
  tableHeader: {
    backgroundColor: '#f8f9fa'
  },
  tableHeaderCell: {
    borderBottom: '2px solid #ddd',
    padding: '12px 16px',
    textAlign: 'left',
    color: '#2d3e50',
    fontWeight: '600'
  },
  stageLabelCell: {
    width: '60%'
  },
  ticketStateCell: {
    width: '40%'
  },
  tableRow: (index) => ({
    backgroundColor: index % 2 === 0 ? 'white' : '#f8f9fa',
    transition: 'background-color 0.2s'
  }),
  tableCell: {
    borderBottom: '1px solid #ddd',
    padding: '12px 16px',
    color: '#2d3e50'
  },
  emptyState: {
    padding: '20px',
    textAlign: 'center',
    color: '#666',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px',
    border: '1px solid #ddd'
  }
}; 