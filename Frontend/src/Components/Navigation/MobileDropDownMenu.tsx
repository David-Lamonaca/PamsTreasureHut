import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '../../Types/MenuItem';
import '../../CSS/Navigation/MobileDropDownMenu.css';

interface MobileDropdownMenuProps {
    menuItems: MenuItem[];
    closeMenu: () => void;
}

const MobileDropdownMenu: React.FC<MobileDropdownMenuProps> = ({ menuItems, closeMenu }) => {
    const [openIndexes, setOpenIndexes] = useState<number[]>([]); // Tracks open submenus

    // Toggle submenu visibility
    const toggleMenu = (index: number) => {
        setOpenIndexes((prevIndexes) =>
            prevIndexes.includes(index) ? [] : [index] // Allows one submenu open at a time
        );
    };

    return (
        <ul className="mobile-dropdown-menu" role="menu">
            {menuItems.map((item, index) => (
                <li
                    key={index}
                    className="mobile-dropdown-item"
                    role="menuitem"
                    aria-haspopup={!!item.children}
                    aria-expanded={openIndexes.includes(index)}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && toggleMenu(index)}
                >
                    <div
                        className="mobile-dropdown-link"
                        onClick={() => (item.children ? toggleMenu(index) : closeMenu())}
                        role="button"
                        tabIndex={0}
                        aria-label={item.label}
                        onKeyDown={(e) => e.key === 'Enter' && toggleMenu(index)}
                    >
                        {item.url ? (
                            <Link
                                to={item.url}
                                className="mobile-link"
                                onClick={closeMenu}
                                tabIndex={0}
                                aria-label={`Go to ${item.label}`}
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span 
                                className="mobile-link" 
                                aria-label={item.label}
                            >
                                {item.label}
                            </span>
                        )}
                        {item.children && (
                            <span 
                                className={`arrow ${openIndexes.includes(index) ? 'down' : 'right'}`}
                                aria-hidden="true"
                            >
                                ▼
                            </span>
                        )}
                    </div>
                    {item.children && openIndexes.includes(index) && (
                        <MobileDropdownMenu
                            menuItems={item.children}
                            closeMenu={closeMenu}
                        />
                    )}
                </li>
            ))}
        </ul>
    );
};

export default MobileDropdownMenu;
