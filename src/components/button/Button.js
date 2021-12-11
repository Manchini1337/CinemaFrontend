import React from 'react';
import './button.scss';

const Button = (props) => {
  return (
    <button
      className={`btn ${props.className}`}
      type={props.type ? props.type : 'button'}
      onClick={props.onClick ? () => props.onClick() : null}
    >
      {props.children}
    </button>
  );
};

export const OutlineButton = (props) => {
  return (
    <Button
      className={`btn-outline ${props.className}`}
      type={props.type ? props.type : 'button'}
      onClick={props.onClick ? () => props.onClick() : null}
    >
      {props.children}
    </Button>
  );
};

export default Button;
