import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../CSS/Navigation/AccountModal.css';

interface AccountModalProps {
    anchorRef: React.RefObject<HTMLDivElement>;
}

const AccountModal: React.FC<AccountModalProps> = ({ anchorRef }) => {
    const [isRightAligned, setRightAligned] = useState(false);
    const [isVisible, setVisible] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (anchorRef.current && modalRef.current) {
            const anchorRect = anchorRef.current.getBoundingClientRect();
            const modalWidth = modalRef.current.offsetWidth;

            // Determine if modal should align to the right
            setRightAligned(anchorRect.left + modalWidth > window.innerWidth);

            // Show the modal only after alignment calculation
            setVisible(true);
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [anchorRef]);

    return (
        <div
            ref={modalRef}
            className={`account-dropdown ${isRightAligned ? 'right-align' : ''}`}
            style={{ visibility: isVisible ? 'visible' : 'hidden' }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Account Options"
            aria-modal="true"
            tabIndex={-1}
        >
            <div 
                className={`account-caret ${isRightAligned ? 'right-align-caret' : ''}`} 
                aria-hidden="true"
            />
            <ul className="modal-menu" role="menu">
                <li role="menuitem" tabIndex={0}>
                    <Link to="/profile" aria-label="View Profile">
                        Profile
                    </Link>
                </li>
                <li role="menuitem" tabIndex={0}>
                    <Link to="/orders" aria-label="View Orders">
                        Orders
                    </Link>
                </li>
                <li role="menuitem" tabIndex={0}>
                    <Link to="/settings" aria-label="Account Settings">
                        Settings
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default AccountModal;
