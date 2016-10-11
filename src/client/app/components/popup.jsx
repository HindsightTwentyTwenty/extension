import React from 'react';

class Popup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {likesCount : 0};
    this.onLike = this.onLike.bind(this);
  }

  onLike () {
    // let newLikesCount = this.state.likesCount + 1;
    // this.setState({likesCount: newLikesCount});
    chrome.tabs.create({'url': chrome.extension.getURL('views/popup.html')}, function(tab){

    });
  }

  render() {
    return (
      <div>
        Likes : <span>{this.state.likesCount}</span>
        <div><button onClick={this.onLike}>SICK BRO</button></div>
      </div>
    );
  }

}

export default popup;
