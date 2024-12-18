import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../CSS/Navigation/AccountModal.css';

interface AccountModalProps 
{
    anchorRef: React.RefObject<HTMLDivElement>;
}

const AccountModal: React.FC<AccountModalProps> = ({ anchorRef }) => 
{
    const [isRightAligned, setRightAligned] = useState(false);
    const [isVisible, setVisible] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => 
    {
        if (anchorRef.current && modalRef.current) {
            const anchorRect = anchorRef.current.getBoundingClientRect();
            const modalWidth = modalRef.current.offsetWidth;

            // Determine if modal should align to the right
            setRightAligned(anchorRect.left + modalWidth > window.innerWidth);

            // Show the modal only after alignment calculation
            setVisible(true);
        }

        // Prevent body scrollbars from appearing temporarily
        //document.body.style.overflow = 'hidden';
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
        >
            <div className={`account-caret ${isRightAligned ? 'right-align-caret' : ''}`} />
            <ul className="modal-menu">
                <li>
                    <Link to="/profile">
                        Profile
                    </Link>
                </li>
                <li>
                    <Link to="/profile">
                        Profile
                    </Link>
                </li>
                <li>
                    <Link to="/profile">
                        Profile
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default AccountModal;
