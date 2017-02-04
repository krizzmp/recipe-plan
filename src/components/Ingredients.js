import React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import G from './IngredientAmountAdder';
import { curry } from 'ramda';
const IngAmount = ({ ingredient, amount, unit }) => (
  <div>{amount}{unit} {ingredient}</div>
);
const Main = props /*{ addIngAmount, createIng, ingList }*/ => (
  <div>
    <G {...props} />
    {props.ingAmountList.map(IngAmount)}
  </div>
);
const ing = curry((ingredient, unit) => ({ ingredient, unit }));
export default compose(
  withState('ingAmountList', 'changeIngAmountList', [
    { ingredient: 'spagetti', amount: 100, unit: 'g' }
  ]),
  withState('ingList', 'changeIngList', [
    ing('milk', 'dl'),
    ing('parmesan', 'g'),
    ing('spaghetti', 'g')
  ]),
  withHandlers({
    addIngAmount: props => ({ ingredient, amount, unit }) => {
      props.changeIngAmountList(arr => [ ...arr, { ingredient, amount, unit } ]);
    },
    createIng: props => ({ ingredient, unit }) => {
      props.changeIngList(arr => [ ...arr, { ingredient, unit } ]);
    }
  })
)(Main);
