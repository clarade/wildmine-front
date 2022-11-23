import React from 'react';

const LoginInput = ({ label, value, setValue, placeHolder, type = "text", inputClassName, labelClassName }) => (
  <div className="login-input-container">
        <label className={`login-label ${labelClassName}`}>
            {label}
        </label>
        <input
            className={`login-input ${inputClassName}`}
            type={type}
            onChange={(v) => setValue(v.target.value)}
            value={value}
            placeholder={placeHolder}
        />
    </div>
);

export default LoginInput;