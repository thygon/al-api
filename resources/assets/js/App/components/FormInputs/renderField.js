import React from 'react';
import TextInput from './TextInput';
import Checkbox from './Checkbox';
import Radio from './Radio';
import File from './File';
import Essay from './Essay';

const renderField = (props) => (
  <div>
    { (props.type === 'email' ||
       props.type === 'password' ||
       props.type === 'text' ||
       props.type === 'number') &&
      <TextInput {...props} />
    }
    { props.type === 'checkbox' && <Checkbox {...props} /> }
    { props.type === 'radio' && <Radio {...props} /> }
    { props.type === 'file' && <File {...props} /> }
    { props.type === 'textarea' && <Essay {...props} /> }
  </div>
);

export default renderField;