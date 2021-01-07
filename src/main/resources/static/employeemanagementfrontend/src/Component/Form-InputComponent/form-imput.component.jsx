import React, { useEffect } from 'react';

import './form-input.styles.scss';

export default function FormInput({handleChange,label,...otherProps})
{
 /*useEffect(()=>
 {console.log(otherProps)},[otherProps.value]);
     */
     return  (
        <div className='group'>
        <input className='form-input' onChange={handleChange} {...otherProps} />
        {label ? (
          <label
            className={`${
                otherProps.value?  'shrink' : '' // in case when we hasn't put anything to the input 
              // then will apply css class of form-input-label and if we click or type then use shrink
            } form-input-label`}
          >
            {label}
          </label>
        ) : null //this is to check if there is label props passing from the input or not - such as for submit input
        // type we haven't any label props passing to the parent.
    }  
      </div>
     );
}