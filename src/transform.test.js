import { filterAndSort } from './transform';

it('sorts', () => {
  let items = [{name: 'bob'},
               {name: 'dog'},
               {name: 'apple'},
               {name: 'cat'}],
      expected = [{name: 'apple'},
                  {name: 'bob'},
                  {name: 'cat'},
                  {name: 'dog'}];

  expect(filterAndSort(items, 'name', 'name', '')).toEqual(expected);
});

it('filters', () => {
  let items = [{name: 'apple'},
               {name: 'bob'},
               {name: 'cat'},
               {name: 'dog'}],
      expected = [{name: 'apple'},
                  {name: 'cat'}];

  expect(filterAndSort(items, 'name', 'name', 'a')).toEqual(expected);
});

it('filters and sorts', () => {
  let items = [{name: 'cat'},
               {name: 'bob'},
               {name: 'dog'},
               {name: 'apple'}],
      expected = [{name: 'apple'},
                  {name: 'cat'},];

  expect(filterAndSort(items, 'name', 'name', 'a')).toEqual(expected);
});
