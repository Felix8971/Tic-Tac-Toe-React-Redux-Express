import React from 'react';
import PropTypes from 'prop-types';

class Square extends React.Component {
  render() {
    const classNames = ['square'];
    if (this.props.value === null) {
        classNames.push('empty'); 
    }
    
    return (
      <div className={classNames.join(' ')} onClick={() => { this.props.handleClick(); }}>{this.props.value}</div>
    )
  }
}

Square.propTypes = {
  value:PropTypes.any,
  handleClick: PropTypes.func
}

export default Square;