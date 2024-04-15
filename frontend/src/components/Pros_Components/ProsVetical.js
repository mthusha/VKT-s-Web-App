import React, { useState } from 'react';
import ProsDash from './ProsDash';
import Mywork from './Mywork';
const ProsVetical = ({ showMenu }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="vertical-menu">
      {showMenu && (
        <ul className="tab-list">
          <li className={activeTab === 0 ? "active" : ""} onClick={() => handleTabClick(0)}>Newly Add</li>
          <li className={activeTab === 1 ? "active" : ""} onClick={() => handleTabClick(1)}>My Works</li>
          <li className={activeTab === 2 ? "active" : ""} onClick={() => handleTabClick(2)}>Billing</li>
          <li className={activeTab === 3 ? "active" : ""} onClick={() => handleTabClick(3)}>Notification</li>
          <li className={activeTab === 4 ? "active" : ""} onClick={() => handleTabClick(4)}>Profile</li>
        </ul>
      )}
      <div className="tab-content">
        <div className={`tab-pane ${activeTab === 0 ? "active" : ""}`}><ProsDash/></div>
        <div className={`tab-pane ${activeTab === 1 ? "active" : ""}`}><Mywork/></div>
        <div className={`tab-pane ${activeTab === 2 ? "active" : ""}`}>Content for Tab 3</div>
        <div className={`tab-pane ${activeTab === 3 ? "active" : ""}`}>Content for Tab 4</div>
        <div className={`tab-pane ${activeTab === 4 ? "active" : ""}`}>Content for Tab 5</div>
      </div>
    </div>
  );
}

export default ProsVetical;
