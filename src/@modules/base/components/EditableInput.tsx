'use client';
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';
import React, { useEffect, useState } from 'react';

interface IProps extends InputProps {}
const EditableInput: React.FC<IProps> = ({ ...props }) => {
  const [border, setBorder] = useState(false);
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <Input
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

export default EditableInput;