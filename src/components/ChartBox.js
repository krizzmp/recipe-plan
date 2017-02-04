import React from 'react';
import { withHandlers, withProps, withState, compose } from 'recompose';
import BottomScrollList from './BottomScrollList';
require('../styles/App.styl');
const ifKey = (key, fn) => e => {
  if (e.key === key) fn();
};
const Item = ({ f }, i) => (
  <div style={{ borderBottom: '1px solid #eee', height: 32 }} key={i}>
    {f}
  </div>
);
const ChatBox = ({ items, send, update, inputI }) => (
  <div className="index" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
    <BottomScrollList style={{ flex: 1 }}>
      {items.map(Item)}
    </BottomScrollList>
    <div style={{ flexDirection: 'row', display: 'flex' }}>
      <input
        onChange={update}
        value={inputI}
        style={{ flex: 1, outline: 'none' }}
        onKeyUp={ifKey('Enter', send)}
      />
      <button onClick={send} style={{ width: 64, padding: 0, border: 'none', outline: 'none' }}>
        send
      </button>
    </div>
  </div>
);
export default compose(
  withState('items', 'changeItemArray', []),
  withState('inputI', 'setInput', ''),
  withHandlers({
    addItem: props => () => {
      props.changeItemArray(arr => [ ...arr, { f: props.inputI } ]);
    },
    update: props => event => {
      props.setInput(event.target.value);
    },
    reset: props => () => {
      props.setInput('');
    }
  }),
  withProps(({ addItem, reset }) => ({
    send: () => {
      addItem();
      reset();
    }
  }))
)(ChatBox);
