function comparator(field) {
  return (a, b) => {
    const aName = a[field];
    const bName = b[field]
    if (aName < bName) {
      return -1;
    }
    if (aName > bName) {
      return 1;
    }
    return 0;
  }
}

export function filterAndSort(items, sortField, filterField, filterValue) {
  let comp = comparator(sortField),
      sortedItems = items;

  sortedItems.sort(comp);

  if(filterValue === '') {
    return sortedItems;
  }

  return sortedItems.filter(player => player[filterField].match(new RegExp(filterValue, 'i')));
}
