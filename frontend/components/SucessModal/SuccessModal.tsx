import React, { FC } from 'react';
import classes from './SuccessModal.module.scss';
import { Modal } from '../../store/models/Modal';

interface SuccessModalProps {
  modal: Modal;
}

const SuccessModal: FC<SuccessModalProps> = ({ modal }) => {
  return (
    <div className={classes.Modal} onClick={(event) => event.stopPropagation()}>
      <div className={classes.Content}>
        <div className={classes.Body}>{modal.body}</div>
      </div>
    </div>
  );
};

export default SuccessModal;
