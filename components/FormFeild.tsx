import React from 'react'

const FormFeild = ({id, label, type = "text", value, onChange, placeholder, as = 'input', options=[]}: FormFieldProps) => {
    
  return (
    <div className="form-field">
        <label htmlFor={id}>{label}</label>
        { as === 'textarea' ?
            (<textarea
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            />) 
            : as === 'select' ? (
        <select
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            >
                {options.map((option) => (
                    <option key={label} value={value}>{label}</option>
                ))}
            </select>
        ): 
            (<input 
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            />
            )}
    </div>
  )
}

export default FormFeild