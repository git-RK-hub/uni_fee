import React, { useCallback, useEffect, useState } from 'react';
import StepForm from '../components/StepForm';
import { useAPI } from '../context';

import './form.css';

const ALL_COURSES = ["Medical", "Dental", "Ayurveda"];
const ALL_LEVEL = ["ug", "pg", "diploma", "ph.d"];
const STEPS  = {
  1: "Fee Type",
  2: "Country",
  3: "Course",
  4: "Level"
}

const Form = () => {
  const { data } = useAPI();
  const [step, setStep] = useState(1);
  const [values, setValues]= useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [track, setTrack] = useState([]);
  const [amount, setAmount] = useState(null);

  const handleSelectedValue = useCallback((value) => {
    let selectedValue;
    const newValues = [...selectedValues];
    if(ALL_COURSES.includes(value)) {
      selectedValue = 'ALL_COURSES'
    } else if (ALL_LEVEL.includes(value)) {
      selectedValue = 'ALL_LEVEL'
    } else {
      selectedValue = value
    }
    
    setStep(step + 1);
    setTrack(track => [...track , value]);
    newValues.push(selectedValue);
    setSelectedValues(newValues);
  }, [selectedValues, step])

  const handleResetAll = () => {
    setSelectedValues([]);
    setTrack([]);
    setAmount(null);
    setStep(1);
  }

  const handleReset = () => {
    setSelectedValues(state => state.slice(0, state.length - 1));
    setTrack(state => state.slice(0, state.length - 1));
    setAmount(null);
    setStep(step - 1);
  }

  useEffect(() => {
    let newData = {...data };
    let keys = Object.keys(newData);
    if(selectedValues.length > 0) {
      selectedValues.forEach(el => newData = newData[el]);
      keys = Object.keys(newData);
      if(keys.length === 1 && keys[0] === "ALL_COURSES") {
        keys = ALL_COURSES
      } else if(keys.length === 1 && keys[0] === "ALL_LEVEL") {
        keys = ALL_LEVEL
      } else if(keys.length === 1 && keys[0] === "amount") {
        setAmount(newData.amount);
        return;
      }
    }
    setValues(keys);
  }, [data, selectedValues])

  return (
    <div className='form-container'>
      <div className="form-container__heading">
        {STEPS[step] ? `${step}: Select ${STEPS[step]}` : 'Amount'}
      </div>
      <StepForm data={values} setValue={handleSelectedValue} amount={amount} />
      <div className='form-container__tracker'>
        {track.length > 0 && (
          <span>Your Selection:&nbsp;  
          {track.map((el, idx) => (
            <span>{`${el.toLowerCase()} ${idx < track.length-1 ? ' ->' : ''}`}</span>
          ))}
          </span>
        )}
      </div>
      <div className='form-container__buttons'>
        <button className="form-container__button" onClick={handleReset} disabled={step < 2}>Reset</button>
        <button className="form-container__button" onClick={handleResetAll} disabled={step < 2}>Reset all</button>
      </div>
    </div>
  );
}
 
export default Form;