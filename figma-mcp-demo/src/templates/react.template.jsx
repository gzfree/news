import React from 'react';
import PropTypes from 'prop-types';
import styles from './{{COMPONENT_NAME}}.module.css';

/**
 * {{COMPONENT_NAME}} 组件
 * 
 * @description {{COMPONENT_DESCRIPTION}}
 */
export const {{COMPONENT_NAME}} = ({
  {{#PROPS}}
  {{PROP_NAME}}{{#PROP_DEFAULT}} = {{PROP_DEFAULT}}{{/PROP_DEFAULT}},
  {{/PROPS}}
  className,
  ...props
}) => {
  return (
    <div 
      className={`${styles.root}${className ? ` ${className}` : ''}`}
      {{#STYLE_PROPS}}
      style={{
        {{#STYLE_ITEMS}}
        {{STYLE_NAME}}: {{STYLE_VALUE}},
        {{/STYLE_ITEMS}}
      }}
      {{/STYLE_PROPS}}
      {...props}
    >
      {{COMPONENT_CONTENT}}
    </div>
  );
};

{{COMPONENT_NAME}}.propTypes = {
  {{#PROPS}}
  /**
   * {{PROP_DESCRIPTION}}
   */
  {{PROP_NAME}}: {{PROP_TYPE}},
  {{/PROPS}}
  /**
   * 附加的CSS类名
   */
  className: PropTypes.string,
};

export default {{COMPONENT_NAME}}; 