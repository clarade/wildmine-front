import React from 'react';

const Select = ({ options, setValue, value, label, selectClassName }) => (
  <div className='flex flex-col'>
    {label && <label className='label text-sm mb-4'>{label}</label>}
    <div className='w-full mb-2'>
    <select
      className={`select ${label ? 'select-arrow-modified' : 'appearance-none'} ${selectClassName}`}
      value={value}
      onChange={event => setValue(event.target.value)}
    >
      {options.map(option => {
        return <option value={option.value}>{option.label}</option>;
      })}
    </select>
  </div>
  </div>
);

export default Select;