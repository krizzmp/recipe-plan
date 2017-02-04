import React from 'react';

export default class BottomScrollList extends React.Component {
  componentWillUpdate() {
    let node = this.refs.list;
    this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
  }

  componentDidUpdate() {
    if (this.shouldScrollBottom) {
      let node = this.refs.list;
      node.scrollTop = node.scrollHeight;
    }
  }

  render() {
    return (
      <div style={{ overflowY: 'auto', ...this.props.style }} ref="list">
        {this.props.children}
      </div>
    );
  }
}
