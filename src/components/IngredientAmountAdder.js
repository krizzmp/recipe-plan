import React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import { filter, curry, ifElse, always } from 'ramda';
import { AutoComplete } from './AutoComplete';
import { propContains, log, _log, fork, noop, ifNotNil, notEmpty } from './utils';
// Item :: props -> element
const Item = ({ ingredient, selected }) => (
  <div style={{ border: '1px solid #eee', background: selected ? '#aaf' : '#fff' }}>
    {ingredient}
  </div>
);
// propContainsFilter :: str -> str -> [{str:str}] -> [{str:str}]
const propContainsFilter = curry((prop, term, xs) => filter(propContains(prop, term), xs));
// search :: (str -> bool) -> [{ingredient:str}] -> str -> [{ingredient:str}]
const search = curry(
  (pred, xs, term) => pred(term) ? propContainsFilter('ingredient', term, xs) : []
);
// setIngredient :: props -> {ingredient:str} -> ()
const setIngredient = curry((p, x) => p.setIngredient(x.ingredient));
// stepTwo :: props -> () -> ()
const stepTwo = curry(p => () => p.setStepTwo(true));
// stepTree :: props -> () -> ()
const stepTree = curry(p => () => p.setStepTree(true));
// unit :: props -> {unit:str} -> ()
const unit = curry((p, x) => p.setUnit(x.unit));
// onEnter :: p -> {ingredient:str, unit:str} -> ()
const onEnter = p => ifNotNil(fork(setIngredient(p), stepTwo(p), unit(p)), stepTree(p));
// F :: props -> element
const F = p => (
  <div>
    <AutoComplete
      value={p.ingredient}
      onChange={p.updateIngredient}
      fn={search(notEmpty, p.ingList)}
      ListItem={Item}
      onEnter={onEnter(p)}
      autoFocus={!p.stepTwo}
    />
    {
      p.stepTwo &&
        [
          <AutoComplete value={p.amount} onChange={p.updateAmount} autoFocus={true} />,
          <AutoComplete value={p.unit} onChange={p.updateUnit} />
        ]
    }
    {
      p.stepTree &&
        [
          <AutoComplete value={p.amount} onChange={p.updateAmount} autoFocus={true} />,
          <AutoComplete value={p.unit} onChange={p.updateUnit} />
        ]
    }
  </div>
);

export default compose(
  withState('ingredient', 'setIngredient', ''),
  withState('amount', 'setAmount', ''),
  withState('unit', 'setUnit', ''),
  withState('stepTwo', 'setStepTwo', false),
  withState('stepTree', 'setStepTree', false),
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
)(F);
