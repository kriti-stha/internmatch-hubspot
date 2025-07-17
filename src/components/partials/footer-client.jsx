import React from "react"
import { createRoot } from "react-dom/client"
import Footer from "./Footer.jsx"

const footerRoot = document.getElementById("footer-root")
if (footerRoot) {
  createRoot(footerRoot).render(<Footer />)
}
