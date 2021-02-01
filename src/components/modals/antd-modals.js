import React from 'react';
import PropTypes, { object } from 'prop-types';
import { ModalStyled } from './styled';
import { Button } from '../buttons/buttons';

const Modal = props => {
  const { onCancel, className, onConfirm, visible, title, type, color, footer, width, children, btnCancelText, btnConfirmText, btnCancelClass, btnConfirmClass, disableButton, maskClosable, getContainer, noFooter, ...another } = props;

  return (
    <ModalStyled
      title={title}
      visible={visible}
      onConfirm={onConfirm}
      onCancel={onCancel}
      maskClosable={maskClosable}
      btnCancelText={btnCancelText ? btnCancelText : 'Batal'}
      btnConfirmText={btnConfirmText ? btnConfirmText : 'Simpan'}
      type={color ? type : false}
      width={width}
      className={className}
      getContainer={getContainer}
      {...another}
      footer={
        footer || footer === null
          ? footer
          : !noFooter ? (
            [
              <Button type={btnCancelClass} key="back" onClick={onCancel} disabled={disableButton}>
                {btnCancelText}
              </Button>,
              <Button type={btnConfirmClass} key="submit" htmlType="submit" onClick={onConfirm} disabled={disableButton}>
                {btnConfirmText}
              </Button>,
            ]
          ) : null
      }
    >
      {children}
    </ModalStyled>
  );
};

Modal.defaultProps = {
  width: 620,
  className: 'atbd-modal',
  btnConfirmText: 'Simpan',
  btnConfirmClass: 'primary',
  btnCancelText: 'Batal',
  btnCancelClass: 'danger',
  disableButton: false,
  maskClosable: true,
  getContainer: true,
  noFooter: false
};

Modal.propTypes = {
  noFooter: PropTypes.bool,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  visible: PropTypes.bool,
  title: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  footer: PropTypes.arrayOf(object),
  width: PropTypes.number,
  color: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.node]),
};

const alertModal = ModalStyled;
export { Modal, alertModal };
