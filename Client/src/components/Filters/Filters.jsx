import React from 'react';
import { useSelector } from 'react-redux';
import Styles from './Filters.module.css';

const Filters = ({ name, ticket, options, handleChange, state }) => {
  const darkMode = useSelector((state) => state.darkMode);

  return (
    <div className={`${Styles.selectcontainer} ${darkMode ? Styles.darkMode : Styles.lightMode}`}>
      <select name={name} onChange={handleChange} value={state || ""}>
        <option value="" disabled hidden>{ticket}</option>
        {options?.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
