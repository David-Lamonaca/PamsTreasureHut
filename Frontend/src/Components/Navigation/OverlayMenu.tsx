import React, { useRef, useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import MenuItem from '../../Types/MenuItem';
import MobileDropdownMenu from './MobileDropDownMenu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '../../CSS/Navigation/OverlayMenu.css';

interface OverlayMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
}

const OverlayMenu: React.FC<OverlayMenuProps> = ({ isOpen, onClose, menuItems }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [isProductsDropdownOpen, setProductsDropdownOpen] = useState(false); // Tracks Products dropdown visibility

  // Update viewport width on resize
  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close menu if click occurs outside
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

  // Return null if menu is not open
  if (!isOpen) return null;

  return (
    <div>
      {viewportWidth < 1156 && (
        <div
          className="overlay-menu"
          ref={overlayRef}
          onClick={(e) => e.stopPropagation()}
          role="dialog" /* Accessibility: Marks overlay as a dialog */
          aria-modal="true" /* Accessibility: Makes it behave like a modal */
          aria-label="Navigation Menu"
          tabIndex={-1} /* Accessibility: Focusable for screen readers */
        >
          <div className="overlay-header">
            <div className="overlay-logo">
              <img
                src="./Images/logo.png"
                alt="Overlay Logo" /* Accessibility: Adds alt text */
                className="small-logo"
              />
            </div>
            <button
              className="close-icon"
              onClick={onClose}
              aria-label="Close menu" /* Accessibility: Describes button purpose */
              tabIndex={0} /* Accessibility: Makes focusable */
            >
              <CloseIcon />
            </button>
          </div>

          {/* Search Bar */}
          {viewportWidth < 901 && (
            <div className="overlay-search">
              <SearchBar />
            </div>
          )}

          {/* Navigation Links */}
          <ul className="overlay-links" role="menu" /* Accessibility: Marks as menu */>
            <li
              className="overlay dropdown-trigger"
              onClick={() => setProductsDropdownOpen(!isProductsDropdownOpen)}
              role="menuitem" /* Accessibility: Marks as menu item */
              aria-haspopup="true" /* Accessibility: Indicates dropdown */
              aria-expanded={isProductsDropdownOpen} /* Accessibility: Tracks dropdown state */
              tabIndex={0} /* Accessibility: Focusable */
            >
              Products
              <span
                className={`arrow ${isProductsDropdownOpen ? 'down' : 'right'}`}
                aria-hidden="true" /* Accessibility: Hides decorative element */
              >
                ▼
              </span>
            </li>
            {isProductsDropdownOpen && (
              <MobileDropdownMenu menuItems={menuItems} closeMenu={onClose} />
            )}
            <li>
              <Link to="/contact" onClick={onClose} tabIndex={0} aria-label="Blog">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/spread-report" onClick={onClose} tabIndex={0} aria-label="Events">
                Events
              </Link>
            </li>
          </ul>

          {/* Account Section */}
          {viewportWidth < 406 && (
            <div className="overlay-account">
              <Link
                to="/account"
                onClick={onClose}
                tabIndex={0} /* Accessibility: Focusable */
                aria-label="My Account" /* Accessibility: Describes link purpose */
              >
                <AccountCircleIcon
                  fontSize="large"
                  style={{ paddingLeft: '42.5px' }}
                  aria-hidden="true" /* Accessibility: Icon is decorative */
                />
                <span className="overlay-account-text">My Account</span>
              </Link>
              <hr className="account-divider" />

              <ul className="overlay-links" role="menu">
                <li>
                  <Link
                    to="/account/orders"
                    onClick={onClose}
                    tabIndex={0}
                    aria-label="My Orders"
                  >
                    My Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/account/profile"
                    onClick={onClose}
                    tabIndex={0}
                    aria-label="My Profile"
                  >
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/account/settings"
                    onClick={onClose}
                    tabIndex={0}
                    aria-label="Settings"
                  >
                    Settings
                  </Link>
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
