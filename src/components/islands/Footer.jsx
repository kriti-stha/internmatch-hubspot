import React from "react"
import "../../styles/footer.module.css"

const defaultFooterImg = require("../../assets/internmatch-footer.png")

const Footer = ({ footerImage }) => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-left">
        <img
          src={footerImage || defaultFooterImg}
          alt="InternMatch logo"
          className="footer-logo-img"
        />
      </div>
      <div className="footer-right">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-icon-circle"
          aria-label="Instagram"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="12" fill="#A3DBDB" />
            <g>
              <rect
                x="7"
                y="7"
                width="10"
                height="10"
                rx="3"
                stroke="#222"
                strokeWidth="1.5"
                fill="none"
              />
              <circle
                cx="12"
                cy="12"
                r="2.5"
                stroke="#222"
                strokeWidth="1.5"
                fill="none"
              />
              <circle cx="15.5" cy="8.5" r="0.75" fill="#222" />
            </g>
          </svg>
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-icon-circle"
          aria-label="LinkedIn"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="12" fill="#A3DBDB" />
            <g>
              <path
                d="M9.429 17h-2.286V10h2.286v7zM8.286 9.048c-.732 0-1.286-.563-1.286-1.262 0-.71.566-1.262 1.314-1.262.748 0 1.286.552 1.286 1.262 0 .699-.538 1.262-1.314 1.262zM17 17h-2.286v-3.429c0-.819-.293-1.378-1.025-1.378-.559 0-.892.377-1.038.741-.054.132-.068.316-.068.501V17h-2.286s.03-6.5 0-7.001h2.286v.993c.304-.47.847-1.142 2.062-1.142 1.506 0 2.625.984 2.625 3.104V17z"
                fill="#222"
              />
            </g>
          </svg>
        </a>
      </div>
    </div>
  </footer>
)

export default Footer
