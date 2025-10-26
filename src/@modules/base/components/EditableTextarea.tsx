'use client';
import { Input } from 'antd';
import { TextAreaProps } from 'antd/lib/input';
import { useEffect, useState } from 'react';

interface IPropsTextarea extends TextAreaProps {}
const EditableTextarea: React.FC<IPropsTextarea> = ({ ...props }) => {
  const [border, setBorder] = useState(false);
  const [value, setValue] = useState(props.value);
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);
  return (
    <Input.TextArea
      {...props}
      value={value}
      bordered={border}
      onFocus={() => setBorder(!border)}
      onBlur={(e) => {
        props.onBlur && props.onBlur(e);
        setBorder(!border);
      }}
      onChange={(e) => setValue(e?.target?.value)}
    />
  );
};

export default EditableTextarea;