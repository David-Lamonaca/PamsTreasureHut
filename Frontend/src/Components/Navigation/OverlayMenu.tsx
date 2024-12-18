import React, { useRef, useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '../../CSS/Navigation/OverlayMenu.css';

interface OverlayMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const OverlayMenu: React.FC<OverlayMenuProps> = ({ isOpen, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  // Update viewport width on resize
  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (

    <div>
    {viewportWidth < 1156 && (
      
      <div className="overlay-menu" ref={overlayRef} onClick={(e) => e.stopPropagation()}>
      <div className="overlay-header">
        <div className="overlay-logo">
          <img src="./Images/logo.png" alt="Overlay Logo" className="small-logo" />
        </div>
        <CloseIcon className="close-icon" onClick={onClose} />
      </div>

      {/* Search Bar */}
      {viewportWidth < 901 && (
        <div className="overlay-search">
          <SearchBar />
        </div>
      )}

      {/* Links */}
      <ul className="overlay-links">
        <li>
          <Link to="/about" onClick={onClose}>Products</Link>
        </li>
        <li>
          <Link to="/contact" onClick={onClose}>Blog</Link>
        </li>
        <li>
          <Link to="/spread-report" onClick={onClose}>Events</Link>
        </li>
      </ul>

      {/* Account Section */}
      {viewportWidth < 406 && (
        <div className="overlay-account">
          <Link to="/account" onClick={onClose}>
            <AccountCircleIcon fontSize="large" style={{paddingLeft: '42.5px'}} />
            <span className="overlay-account-text">My Account</span>
          </Link>
          <hr className="account-divider" />

          <ul className="overlay-links">
            <li>
              <Link to="/account/orders" onClick={onClose}>My Orders</Link>
            </li>
            <li>
              <Link to="/account/profile" onClick={onClose}>My Profile</Link>
            </li>
            <li>
              <Link to="/account/settings" onClick={onClose}>Settings</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
    )}
    </div>

   
  );
};

export default OverlayMenu;
