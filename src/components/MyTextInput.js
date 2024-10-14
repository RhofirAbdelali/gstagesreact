import React from 'react';
import { useField } from 'formik';

const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    let inputStyle = "form-control";
    if (meta.touched) {
        inputStyle += meta.error ? " is-invalid" : " is-valid";
    }

    return (
        <div className='form-group'>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className={inputStyle} {...field} {...props} id={props.id || props.name} />
            <div className="valid-feedback">Ok !</div>
            <div className="invalid-feedback">{meta.error}</div>
        </div>
    );
};

export default MyTextInput;