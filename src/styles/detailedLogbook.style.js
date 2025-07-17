export const styles = {
  container: {
    padding: "32px",
    maxWidth: "1100px",
    margin: "40px auto",
    background: "#0d3535",
    boxShadow: "0 4px 24px rgba(60,72,88,0.10)",
    fontFamily: "Inter, Arial, sans-serif",
  },
  title: {
    marginBottom: "28px",
    color: "#fff", 
    fontSize: "2rem",
    fontWeight: 700,
    letterSpacing: "0.5px",
    textAlign: "center",
  },
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: 0,
    background: "#fff", 
    borderRadius: "8px", 
    overflow: "hidden",
    boxShadow: "0 1px 4px rgba(60,72,88,0.06)",
  },
  tableHeader: {
    background: "#EA5024", 
  },
  tableHeaderCell: {
    padding: "16px 18px",
    color: "#fff", 
    fontWeight: 600,
    fontSize: "1.05rem",
    textAlign: "left",
  },
  tableRow: (index) => ({
    background: index % 2 === 0 ? "#e6f4f4" : "#fff", 
    transition: "all 0.2s ease",
    cursor: "pointer",
    
  }),
  tableCell: {
    padding: "14px 18px",
    color: "#1a2233", // dark text
    fontSize: "1rem",
  },
  emptyState: {
    padding: "32px",
    textAlign: "center",
    color: "#8a94a6",
    background: "#e6f4f4", // subtle teal
    borderRadius: "10px",
    fontSize: "1.1rem",
    marginTop: "18px",
  },
  loading: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#EA5024", // orange
    fontSize: "1.2rem",
    padding: "32px",
    minHeight: "120px",
  },
  spinner: {
    width: "36px",
    height: "36px",
    border: "4px solid #fff",
    borderTop: "4px solid #EA5024",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "16px",
  },
  error: {
    textAlign: "center",
    color: "#e24a4a",
    fontWeight: 600,
    fontSize: "1.2rem",
    padding: "32px",
    background: "#fff0f0",
    borderRadius: "10px",
    marginTop: "18px",
  },
  backButton: {
    background: "#EA5024", // orange background
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    color: "#fff", // white text
    cursor: "pointer",
    fontWeight: 600,
    marginBottom: "20px",
    transition: "background 0.2s, color 0.2s",
    ":hover": {
      background: "#ffb380", // light orange on hover
      color: "#fff",
    },
  },
  downloadButton: {
    background: "#EA5024", // orange background
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    color: "#fff", // white text
    cursor: "pointer",
    fontWeight: 600,
    transition: "background 0.2s, color 0.2s",
    ":hover": {
      background: "#ffb380", // light orange on hover
      color: "#fff",
    },
  },
  buttonContainer: {
    display: "flex",
    marginBottom: "20px",
    justifyContent: "space-between",
  },
  detailContainer: {
    padding: "20px",
    background: "#fff",
    borderRadius: "12px",
  },
  detailItem: {
    padding: "10px 0",
    ":last-child": {
      borderBottom: "none",
    },
    color: "#2d3e50",
    fontSize: "1rem",
  },
}
