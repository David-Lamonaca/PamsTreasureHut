import React, { useState, useRef, useEffect } from 'react';
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import OverlayMenu from './OverlayMenu';
import AccountModal from './AccountModal';
import SearchBar from './SearchBar';
import DropdownMenu from './DropDownMenu'; 
import '../../CSS/Navigation/NavigationBar.css';

const NavigationBar: React.FC = () => {
    const [cartCount, setCartCount] = useState<number>(0);
    const [isAccountModalOpen, setAccountModalOpen] = useState<boolean>(false);
    const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
    const [isProductsDropdownOpen, setProductsDropdownOpen] = useState<boolean>(false);

    const accountRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLLIElement>(null);

    // Toggle Account Modal
    const toggleAccountModal = () => setAccountModalOpen((prev) => !prev);

    // Toggle Overlay Menu
    const toggleMenu = () => setMenuOpen((prev) => !prev);

    // Close menus when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                accountRef.current &&
                !accountRef.current.contains(event.target as Node)
            ) {
                setAccountModalOpen(false);
            }

            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setProductsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Dropdown menu items
    const productsMenuItems = [
        {
            label: 'Web Design',
            url: '/web-design',
            children: [
                {
                    label: 'Responsive Design',
                    url: '/responsive-design',
                    children: [
                        { label: 'Mobile-First Design', url: '/mobile-design' },
                        { label: 'Progressive Web Apps', url: '/pwa' },
                    ],
                },
                { label: 'UI/UX Design', url: '/ui-ux-design' },
            ],
        },
        {
            label: 'Web Development',
            url: '/web-development',
            children: [
                {
                    label: 'Frontend Development',
                    children: [
                        { 
                            label: 'React.js', children: [
                                { label: 'React Native', url: '/react-native' },
                                { label: 'Next.js', url: '/nextjs' },
                            ] 
                        },
                        { label: 'Vue.js', url: '/vue' },
                    ],
                },
                {
                    label: 'Backend Development',
                    children: [
                        { label: 'Node.js', url: '/node' },
                        { label: 'Django', url: '/django' },
                    ],
                },
            ],
        },
        { label: 'Web Hosting', url: '/web-hosting' },
        {
            label: 'Graphic Design',
            children: [
                {
                    label: 'Adobe Suite',
                    children: [
                        { label: 'Photoshop', url: '/photoshop' },
                        { label: 'Illustrator', url: '/illustrator' },
                    ],
                },
                { label: 'Canva', url: '/canva' },
            ],
        },
    ];

    return (
        <nav className="navbar" role="navigation" aria-label="Main Navigation">
            {/* Left Section */}
            <div className="navbar-left">
                {/* Hamburger Icon */}
                <div
                    className="hamburger-icon"
                    onClick={toggleMenu}
                    tabIndex={0}
                    role="button"
                    aria-label="Open menu"
                >
                    <MenuIcon fontSize="large" />
                </div>

                {/* Logo */}
                <div className="navbar-logo">
                    <Link to="/" aria-label="Home">
                        <img src="./Images/logo.png" alt="Company Logo" className="logo" />
                    </Link>
                </div>
            </div>

            {/* Center Section */}
            <div className="navbar-center">
                <ul className="navbar-links">
                    {/* Products Dropdown */}
                    <li
                        ref={dropdownRef}
                        className="dropdown-container"
                        onClick={() => setProductsDropdownOpen((prev) => !prev)}
                        tabIndex={0}
                        aria-haspopup="true"
                        aria-expanded={isProductsDropdownOpen}
                        role="menuitem"
                    >
                        <div className="nav-link dropdown-trigger">
                            Products <span className="arrow-down" aria-hidden="true">▼</span>
                        </div>
                        {isProductsDropdownOpen && (
                            <DropdownMenu
                                menuItems={productsMenuItems}
                                closeAllMenus={() => setProductsDropdownOpen(false)}
                            />
                        )}
                    </li>
                    <li>
                        <Link to="/blog" className="nav-link" tabIndex={0} aria-label="Blog">
                            Blog
                        </Link>
                    </li>
                    <li>
                        <Link to="/events" className="nav-link" tabIndex={0} aria-label="Events">
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
                    title="My Account"
                    className="nav-icon account-container"
                    onClick={toggleAccountModal}
                    ref={accountRef}
                    tabIndex={0}
                    aria-haspopup="true"
                    aria-expanded={isAccountModalOpen}
                    role="button"
                >
                    <AccountCircleIcon fontSize="large" />
                    <span className="icon-text">Account</span>
                    {isAccountModalOpen && <AccountModal anchorRef={accountRef} />}
                </div>

                <Link to="/cart" className="nav-icon" tabIndex={0} aria-label="Shopping Cart">
                    <div className="nav-icon">
                        <Badge badgeContent={cartCount} color="error">
                            <ShoppingCartIcon fontSize="large" />
                        </Badge>
                        <span className="icon-text">Cart</span>
                    </div>
                </Link>
            </div>

            <OverlayMenu
                isOpen={isMenuOpen}
                onClose={toggleMenu}
                menuItems={productsMenuItems}
            />
        </nav>
    );
};

export default NavigationBar;
