import React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import { filter, curry } from 'ramda';
import { AutoComplete } from './AutoComplete';
import { propContains, log, _log, fork } from './utils';
const value = curry((fn, e) => fn(e.target.value));
const autoCompFn1 = curry(
  (show, xs, term) =>
    _log(show, 'show') && _log(!(term === ''), 'term') ? filter(propContains('text', term), xs) : []
);
const autoCompFn = curry(
  (show, xs, term) =>
    _log(show, 'show') && _log(!(term === ''), 'term') ? filter(propContains('text', term), xs) : []
);
const Item = ({ text, selected }) => (
  <div style={{ border: '1px solid #eee', background: selected ? '#aaf' : '#fff' }}>{text}</div>
);
const F = (
  {
    box,
    changeBox,
    ingredient,
    setIngredient,
    amount,
    setAmount,
    unit,
    setUnit,
    ingList,
    index,
    setIndex,
    showAC,
    setShowAC,
    addIngAmount
  }
) => (
  <div>
    <AutoComplete
      value={ingredient}
      onChange={fork(value(setIngredient), () => setShowAC(true))}
      onEnter={() => {
          if (index > -1) {
            setIngredient(autoCompFn(showAC, ingList, ingredient)[index].text);
            setShowAC(false);
          }
          changeBox(1);
        }}
      fn={autoCompFn1(showAC, ingList)}
      ListItem={Item}
      index={index}
      setIndex={setIndex}
      autoFocus={box === 0}
    />
    <AutoComplete
      value={amount}
      onChange={value(setAmount)}
      onEnter={() => changeBox(2)}
      autoFocus={box === 1}
    />
    <AutoComplete
      value={unit}
      onChange={value(setUnit)}
      onEnter={fork(() => log(index), () => addIngAmount({ ingredient, amount, unit }))}
      fn={autoCompFn(true, [ { text: 'dl' }, { text: 'g' } ])}
      ListItem={Item}
      autoFocus={box === 2}
    />
  </div>
);

export default compose(
  withState('box', 'changeBox', 0),
  withState('ingredient', 'setIngredient', ''),
  withState('amount', 'setAmount', ''),
  withState('unit', 'setUnit', ''),
  withState('index', 'setIndex', -1),
  withState('showAC', 'setShowAC', true)
)(F);
