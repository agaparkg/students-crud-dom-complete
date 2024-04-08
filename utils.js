export const compareFn = (a, b, sortBy) => {
  // > 0 => 50 - 30
  // < 0 => 30 - 50
  // 0 => 50 = 50
  // return a.name - b.name;
  if (a[sortBy] > b[sortBy]) {
    return 1;
  } else if (a[sortBy] < b[sortBy]) {
    return -1;
  } else {
    return 0;
  }
};
