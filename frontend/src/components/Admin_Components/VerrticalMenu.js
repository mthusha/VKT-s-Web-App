import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Table from './Table';
import Billing from './Billing';
const VerticalMenu = () => {
const [activeTab, setActiveTab] = useState(0);
const handleTabClick = (index) => {
    setActiveTab(index);
  };
  return (
    <div className="vertical-menu">
      <ul className="tab-list">
        <li className={activeTab === 0 ? "active" : ""} onClick={() => handleTabClick(0)}>Dashboard</li>
        <li className={activeTab === 1 ? "active" : ""} onClick={() => handleTabClick(1)}>Tables</li>
        <li className={activeTab === 2 ? "active" : ""} onClick={() => handleTabClick(2)}>Charts</li>
        <li className={activeTab === 3 ? "active" : ""} onClick={() => handleTabClick(3)}>Notification</li>
        <li className={activeTab === 4 ? "active" : ""} onClick={() => handleTabClick(4)}>Profile</li>
      </ul>
      <div className="tab-content">
      <div className={`tab-pane ${activeTab === 0 ? "active" : ""}`}><Dashboard/></div>
        <div className={`tab-pane ${activeTab === 1 ? "active" : ""}`}><Table/></div>
        <div className={`tab-pane ${activeTab === 2 ? "active" : ""}`}><Billing/></div>
        <div className={`tab-pane ${activeTab === 3 ? "active" : ""}`}>Content for Tab 4</div>
        <div className={`tab-pane ${activeTab === 4 ? "active" : ""}`}>Content for Tab 5</div>
      </div>
    </div>
  );
};
export default VerticalMenu;
