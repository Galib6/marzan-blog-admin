import { Empty, Spin } from 'antd';
import classNames from 'classnames';
import React from 'react';

interface Props {
  loading?: boolean;
  empty?: boolean;
  hide?: '*' | 'loader' | 'empty';
  children?: any;
  style?: React.CSSProperties;
  className?: string;
}
const Purify: React.FC<Props> = ({ empty = false, loading = false, hide, children, style, className }) => {
  return (
    <>
      {loading === true ? (
        hide === 'loader' || hide === '*' ? (
          <span></span>
        ) : (
          <div className={classNames('h-60 grid place-content-center', className)} style={style}>
            <Spin className="content-center" />
          </div>
        )
      ) : empty === true ? (
        hide === 'empty' || hide === '*' ? (
          <span></span>
        ) : (
          <div className={classNames(className)} style={style}>
            <Empty className="content-center" />
          </div>
        )
      ) : (
        children
      )}
    </>
  );
};
export default Purify;
