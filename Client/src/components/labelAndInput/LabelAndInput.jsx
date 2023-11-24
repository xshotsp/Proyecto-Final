/* eslint-disable react/prop-types */
const LabelAndInput = ({ label, type, name, value, handler }) => {
  return (
    <div>
      <label htmlFor={name}>{label}: </label>
      <input type={type} name={name} value={value} onChange={handler} />
    </div>
  );
};

export default LabelAndInput;
