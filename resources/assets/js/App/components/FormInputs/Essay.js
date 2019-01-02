import React from 'react';
import cx from 'classnames';

const Essay = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
  inputClassName,
  placeholder,
  helpText,
  disabled,
  rows
}) => (
  <div>
    <textarea {...input}
              type={type}
              className={cx(inputClassName, 'form-control', {
                error: !!error
              })}
              placeholder={placeholder}
              disabled={disabled}
              rows={rows}
              style={ {resize:false} }
              >
    </textarea>

    { touched && error &&
      <label className="error" htmlFor={input.name}>{error}</label>
    }

    { helpText &&
      <span className="help-block">{helpText}</span>
    }
  </div>
);

export default Essay;