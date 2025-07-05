import React from 'react';
import icon from '../Public/icon.png'
// import ThemeToggle from './ThemeToggle';

const Navbar = ({ setTab, handleLogout }) => (
    <div className="navbar">
        <div className="nav-left">
            <img src={icon} alt="logo" className="nav-logo" />
            <div className="tabs">

                <button onClick={() => setTab('view')}>View</button>
                <button onClick={() => setTab('add')}>Add</button>
                <button onClick={() => setTab('edit')}>Edit</button>
                <button onClick={() => setTab('delete')}>Delete</button>
                <button onClick={() => setTab('sort')}>Sort</button>
            </div>
        </div>
        {/* <ThemeToggle /> */}
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
);

export default Navbar;
