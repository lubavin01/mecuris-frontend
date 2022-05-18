import React from 'react';
import classes from './my-modal.module.css';

const MyModal = ({ children, visible, setModalData }) => {
    const modalClasses = [classes.myModal];
    if (visible) {
        modalClasses.push(classes.active);
    }

    return (
        <div className={modalClasses.join(' ')} onClick={() => setModalData({ visibility: false, data: {} })}>
            <div className={classes.myModalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MyModal;
