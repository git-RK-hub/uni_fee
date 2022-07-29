import React from 'react';
import './stepForm.css';

const StepForm = ({ data, setValue, amount }) => {
  const handleChange = (e) => {
    const { value } = e.target;
    setValue(value);
  }

  return (
    <div className="step-form">
      {amount > 0 ? (
          <div className="step-form__amount">
            <div className="step-form__amount-icon">💰</div>
            {amount}
          </div>
        ) : (
          <select className="step-form__select" onChange={handleChange}>
            <option >Select --</option>
            {data.map(el => {
              return <option value={el} key={el}>{el.toUpperCase()}</option>
            })}
          </select>
        )
      }
    </div>
  );
}

export default StepForm;