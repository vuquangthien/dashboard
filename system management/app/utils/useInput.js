import { useState } from 'react';

export const useInput = (
  initialValue,
  checkValid,
  validator,
  rules = { isRequired: false },
) => {
  const [value, setValue] = useState(initialValue);
  const [valid, setValid] = useState(!(!value && rules.isRequired));

  return {
    value,
    setValue: input => {
      setValue(input);
      if (typeof validator === 'function') {
        setValid(validator(input, rules));
      }
    },
    valid,
    setValid,
    bind: {
      value,
      onChange: e => {
        let data = e.target.value;
        if (rules.isToUpperCase) {
          data = data.toUpperCase() ;
        }
        if (typeof validator === 'function') {
          setValid(validator(data, rules));
        } else if (checkValid) {
          setValid(checkValid);
        } else if (data == null || data === '') {
          setValid(false);
        } else {
          setValid(true);
        }
        setValue(data);
      },
    },
  };
};
