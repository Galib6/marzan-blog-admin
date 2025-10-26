import { Form, Input } from 'antd';
import classNames from 'classnames';
import React, { useState } from 'react';

interface IProps {
  type?: 'floatingLabel' | 'staticLabel';
  label?: string;
  name?: string;
  rules?: [{ required: boolean; message: string }];
  height?: number;
  color?: string;
  fontSize?: number;
}

const CustomLevelInput: React.FC<IProps> = ({
  type = 'floatingLabel',
  label,
  name,
  rules,
  height,
  color,
  fontSize,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <Form.Item className="custom_input" name={name}>
      <div
        className={classNames(
          type === 'floatingLabel' ? 'floating_level_input' : 'static_level_input',
          isFocused || inputValue ? 'active' : '',
        )}
      >
        <label style={{ color: color || '#000', fontSize: fontSize || 16 }}>{label}</label>
        <Input
          style={{ fontSize: fontSize || 16, color: color || '#000', height: height || 35 }}
          size="middle"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          value={inputValue}
        />
      </div>
    </Form.Item>
  );
};

export default CustomLevelInput;
