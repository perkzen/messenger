import React, { FC } from 'react';
import classes from './ModalProvider.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { removeModal } from '../../store/features/globalSlice';
import { ModalType } from '../../store/models/Modal';
import SuccessModal from '../SucessModal/SuccessModal';
import WarningModal from '../WarningModal/WarningModal';

const ModalProvider: FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const { modal } = useAppSelector((state) => state.global);
  const open = !!modal;

  const showModalType = () => {
    switch (modal.modalType) {
      case ModalType.SUCCESS:
        return <SuccessModal modal={modal} />;
      case ModalType.WARNING:
        return <WarningModal modal={modal} />;
    }
  };

  return (
    <>
      {children}
      {open &&
        createPortal(
          <div
            className={classNames({
              [classes.Backdrop]: true,
              [classes.BackdropAnimateIn]: open,
            })}
            onClick={
              modal?.onBackdropClose ?? true
                ? () => dispatch(removeModal())
                : undefined
            }
          >
            <div className={classes.Container}>{showModalType()}</div>
          </div>,
          document.getElementById('modal')
        )}
    </>
  );
};

export default ModalProvider;
