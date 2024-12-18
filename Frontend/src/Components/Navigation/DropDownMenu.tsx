import React, { useState } from 'react';
import '../../CSS/Navigation/DropdownMenu.css';

interface MenuItem {
  label: string;
  url?: string;
  children?: MenuItem[];
}

interface DropdownMenuProps {
  menuItems: MenuItem[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ menuItems }) => {
  return (
    <ul className="menu">
      {menuItems.map((item, index) => (
        <MenuItemComponent key={index} item={item} />
      ))}
    </ul>
  );
};

const MenuItemComponent: React.FC<{ item: MenuItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li
      className={`menu-item ${item.children ? 'has-children' : ''}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <a href={item.url || '#'}>{item.label}</a>
      {item.children && isOpen && (
        <ul className="submenu">
          {item.children.map((child, index) => (
            <MenuItemComponent key={index} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default DropdownMenu;
