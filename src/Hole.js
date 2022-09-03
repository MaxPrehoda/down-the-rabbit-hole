import React, { Component } from 'react';
import Holes from './Holes';

class Hole extends React.Component {
    render() {
        return (
          <div className='w-4 h-4 items-center'>{this.props.hole}</div>
        );
    }
}

export default Hole;