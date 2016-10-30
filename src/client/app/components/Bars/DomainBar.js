import React, { PropTypes, Component } from 'react'

export default class DomainBar extends Component {

    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className='domain-bar'>
          {props.url}
        </div>
      );
    }

  }
