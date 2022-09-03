import React, { Component } from 'react';
import Hole from './Hole';

  class Holes extends React.Component {
    renderHole(i) { 
        const holesStatus = this.props.holesStatus
        console.log(holesStatus)
        const rabbitPos = holesStatus[0].rabbit
        const pointerPos = holesStatus[0].start
        let holeEmoji = "🕳️"
        let rows = []
        console.log(holesStatus, rabbitPos, pointerPos);
        console.log(rows)
        if (i === rabbitPos) {
            holeEmoji = "🐰"
        }
        rows.push(<Hole value={i} hole={holeEmoji} />)  
        return <div> {rows} </div>;
    }
  }

export default Holes;