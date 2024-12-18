import React, { useState, useRef, useEffect } from 'react';
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import OverlayMenu from './OverlayMenu';
import AccountModal from './AccountModal';
import SearchBar from './SearchBar';
import '../../CSS/Navigation/NavigationBar.css';

const NavigationBar: React.FC = () => {
    const [cartCount, setCartCount] = useState<number>(0);
    const [isAccountModalOpen, setAccountModalOpen] = useState<boolean>(false);
    const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
    const accountRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    // Toggle account modal
    const toggleAccountModal = () => setAccountModalOpen((prev) => !prev);

    // Toggle overlay menu
    const toggleMenu = () => setMenuOpen((prev) => !prev);

    // Close overlay if clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                overlayRef.current &&
                !overlayRef.current.contains(event.target as Node) &&
                isMenuOpen
            ) {
                setMenuOpen(false);
            }

            if (
                accountRef.current &&
                !accountRef.current.contains(event.target as Node)
            ) {
                setAccountModalOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]);

    return (
        <nav className="navbar">
            {/* Left Section */}
            <div className="navbar-left">
                {/* Hamburger Icon */}
                <div className="hamburger-icon" onClick={toggleMenu}>
                    <MenuIcon fontSize="large" />
                </div>

                {/* Logo */}
                <div className="navbar-logo">
                    <Link to="/">
                        <img src="./Images/logo.png" alt="Logo" className="logo" />
                    </Link>
                </div>
            </div>

            {/* Center Section */}
            <div className="navbar-center">
                <ul className="navbar-links">
                    <li>
                        <Link to="/about" className="nav-link">
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link to="/blog" className="nav-link">
                            Blog
                        </Link>
                    </li>
                    <li>
                        <Link to="/events" className="nav-link">
                            Events
                        </Link>
                    </li>
                </ul>
                <div className="navbar-search">
                    <SearchBar />
                </div>
            </div>

            {/* Right Section */}
            <div className="navbar-right">
                <div
                    title='My Account'
                    className="nav-icon account-container"
                    onClick={toggleAccountModal}
                    ref={accountRef}
                >
                    <AccountCircleIcon fontSize="large" />
                    <span className="icon-text">My Account</span>
                    {isAccountModalOpen && <AccountModal anchorRef={accountRef} />}
                </div>

                <Link to="/cart" className="nav-icon">
                    <div 
                        title='My Account'
                        className="nav-icon"
                    >
                        <Badge badgeContent={cartCount} color="error">
                            <ShoppingCartIcon fontSize="large" />
                        </Badge>
                        <span className="icon-text" title='Cart'>Cart</span>
                    </div>
                </Link>
            </div>

            <OverlayMenu isOpen={isMenuOpen} onClose={toggleMenu} />
        </nav>
    );
};

export default NavigationBar;
