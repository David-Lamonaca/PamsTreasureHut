import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '../../Types/MenuItem';
import '../../CSS/Navigation/DropdownMenu.css';

interface DropdownMenuProps {
    menuItems: MenuItem[];
    closeAllMenus: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ menuItems, closeAllMenus }) => {
    const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null); // Tracks which submenu is open

    // Toggles a submenu
    const toggleMenu = (index: number) => {
        setOpenMenuIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <ul className="dropdown-menu" role="menu">
            {menuItems.map((item, index) => (
                <li 
                    key={index} 
                    className="dropdown-item" 
                    role="menuitem"
                    aria-haspopup={!!item.children} 
                    aria-expanded={openMenuIndex === index} 
                    tabIndex={0} // Allows tab navigation
                    onKeyDown={(e) => e.key === 'Enter' && toggleMenu(index)} // Keyboard support
                >
                    <div
                        className="dropdown-link"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (item.children) {
                                toggleMenu(index);
                            } else {
                                closeAllMenus();
                            }
                        }}
                        role="button"
                        tabIndex={0} // Allows focus and interaction
                        aria-label={item.label} // Screen reader label
                        onKeyDown={(e) => e.key === 'Enter' && toggleMenu(index)}
                    >
                        {item.url ? (
                            <Link
                                to={item.url}
                                className="dropdown-link-text"
                                onClick={closeAllMenus}
                                tabIndex={0} // Makes links focusable
                                aria-label={`Go to ${item.label}`}
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span 
                                className="dropdown-item-text" 
                                aria-label={item.label}
                            >
                                {item.label}
                            </span>
                        )}
                        {item.children && (
                            <span 
                                className="arrow-right" 
                                aria-hidden="true"
                            >
                                ▶
                            </span>
                        )}
                    </div>
                    {item.children && openMenuIndex === index && (
                        <DropdownMenu
                            menuItems={item.children}
                            closeAllMenus={closeAllMenus}
                        />
                    )}
                </li>
            ))}
        </ul>
    );
};

export default DropdownMenu;
