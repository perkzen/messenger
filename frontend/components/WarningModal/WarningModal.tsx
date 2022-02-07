import React, { FC } from 'react';
import classes from './WarningModal.module.scss';
import { Modal } from '../../store/models/Modal';
import { ImWarning } from 'react-icons/im';

interface WarningModalProps {
  modal: Modal;
}

const WarningModal: FC<WarningModalProps> = ({ modal }) => {
  return (
    <div className={classes.Modal} onClick={(event) => event.stopPropagation()}>
      <div className={classes.Content}>
        <div className={classes.Body}>
          <ImWarning />
          {modal.body}
        </div>
      </div>
    </div>
  );
};

export default WarningModal;
