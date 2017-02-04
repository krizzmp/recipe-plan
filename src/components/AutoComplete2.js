import React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import { filter, propSatisfies, curry, always } from 'ramda';
import { propContains, noop, log,_log } from './utils';
const select = curry((i, obj, index) => _log({ selected: i === index, ...obj }));
export class AutoComplete extends React.Component {
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
      index = -1,
      setIndex = noop
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
              if (key === 'Enter') onEnter();
              if (key === 'ArrowDown') setIndex(index + 1);
              if (key === 'ArrowUp') setIndex(index - 1);
            }}
          ref="input"
        />
        <div style={{ position: 'absolute' }}>{fn(value).map(select(index)).map(ListItem)}</div>
      </span>
    );
  }
}

let autoList = [ { text: 'hell' } ];
let unitList = [ { text: 'dl' }, { text: 'g' } ];
const T = ({ fn, ingredient, amount, updateIngredient, updateAmount, item, unit, updateUnit }) => (
  <div>
    <AutoComplete
      fn={fn(autoList)}
      value={ingredient}
      onChange={updateIngredient}
      ListItem={item}
    />
    <input type="text" value={amount} onChange={updateAmount} />
    <AutoComplete fn={fn(unitList)} value={unit} onChange={updateUnit} ListItem={item} />
  </div>
);

const Item = ({ text }) => (
  <div style={{ border: '1px solid #eee', background: '#fff' }}>{text}</div>
);

const autoCompFn = curry((xs, term) => term === '' ? [] : filter(propContains('text', term), xs));
const Main = ({ ...other }) => (
  <div>
    <T fn={autoCompFn} item={Item} {...other} />
    test
  </div>
);

export default compose(
  withState('ingredient', 'setIngredient', ''),
  withState('amount', 'setAmount', ''),
  withState('unit', 'setUnit', ''),
  withHandlers({
    updateIngredient: props => event => {
      props.setIngredient(event.target.value);
    },
    updateAmount: props => event => {
      props.setAmount(event.target.value);
    },
    updateUnit: props => event => {
      props.setUnit(event.target.value);
    }
  })
)(Main);
