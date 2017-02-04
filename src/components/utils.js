import { curry, propSatisfies, ifElse, complement, isNil} from 'ramda';
export const contains = curry((term, str) => str.indexOf(term) >= 0);
export const propContains = curry((prop, term, obj) => propSatisfies(contains(term), prop, obj));
export const noop = () => {
};
export const log = (e,...o) => {
  console.log(e,...o);
  return e;
};
export const fork = (...o) => e => o.map(fn => fn(e));
export const _log = e => e;
export const ifNotNil = ifElse(complement(isNil));
export const notEmpty = term => _log(!(term === ''), 'ingredient');
