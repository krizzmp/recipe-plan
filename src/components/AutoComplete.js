import React from 'react';
import { filter, propSatisfies, curry, always } from 'ramda';
import { propContains, noop, log, _log } from './utils';
import { withState } from 'recompose';
const select = curry((i, obj, index) => _log({ selected: i === index, ...obj }));
export const AutoComplete = withState('index', 'setIndex', -1)(
  class extends React.Component {
    extracted() {
      if (this.props.autoFocus) {
        this.refs.input.focus();
      }
    }
    componentDidMount() {
      this.extracted();
    }
    componentDidUpdate() {
      this.extracted();
    }
    render() {
      let {
        value,
        onChange,
        fn = always([]),
        ListItem = () => <div />,
        onEnter = noop,
        index,
        setIndex
      } = this.props;
      return (
        <span>
          <input
            type="text"
            value={value}
            onChange={e => {
                onChange(e);
                setIndex(-1);
              }}
            onKeyUp={({ key }) => {
                if (key === 'Enter') onEnter(fn(value)[index]);
                if (key === 'ArrowDown') setIndex(index + 1);
                if (key === 'ArrowUp') setIndex(index - 1);
              }}
            ref="input"
          />
          <div style={{ position: 'absolute' }}>
            {fn(value).map(select(index)).map(ListItem)}
          </div>
        </span>
      );
    }
  }
);
