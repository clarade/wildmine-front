import React from 'react';

const Button = ({ onClick, onClickValue, buttonLabel, buttonType, buttonClassName }) => (
  <button
    type={buttonType || 'submit'}
    onClick={() => onClick(!onClickValue)}
    className={`button-general ${buttonClassName}`}
  >
    {buttonLabel}
  </button>
);

export default Button;