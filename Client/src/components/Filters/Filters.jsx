/* eslint-disable react/prop-types */
import Styles from './Filters.module.css';

const Filters = ({ name, ticket, options, handleChange, state }) => (
    <div className={Styles.selectcontainer}>
      <select  name={name} onChange={handleChange} value={state || ""}>
        <option value="" disabled hidden>{ticket}</option>
        {options?.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      </div>
  );

export default Filters;