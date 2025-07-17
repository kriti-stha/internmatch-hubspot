import React from "react";
import "../../styles/header.module.css";
import { Button } from "../ui/button.tsx";

const defaultHeaderImg = require('../../assets/internmatch-header.png');

const Header = ({ headerImage }) => (
  <header className="header">
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <img
        src={headerImage?.src || defaultHeaderImg}
        alt="InternMatch Logbooks header"
        className="header-img"
        style={{ maxWidth: '500px', width: '100%', height: 'auto', marginBottom: 0, display: 'block' }}
      />
      <Button
        variant="default"
        size="lg"
        style={{ marginLeft: '32px', marginTop: '16px' }}
        onClick={() => console.log('Contact us clicked')}
      >
        Contact us
      </Button>
    </div>
  </header>
);

export default Header;
