import React, { PropTypes, Component } from 'react'

export default class TabsComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {likesCount : 0};
    this.onLike = this.onLike.bind(this);
  }

  onLike () {
    let newLikesCount = this.state.likesCount + 1;
    this.setState({likesCount: newLikesCount});
    // chrome.tabs.create({'url': chrome.extension.getURL('popup/popup.html')}, function(tab){

    //});
  }

  render() {
    return (
      <div>
        Likes : <span>{this.state.likesCount}</span>
        <div><button onClick={this.onLike}>Hello</button></div>
      </div>
    );
  }

}
