function initialDeal() {
  let num = 54;
  let colIdx = 0;
  for (i = 0; i < 54; i++) {
    columns[colIdx].push(deck.shift());
    columns[colIdx][columns.length - 1]
    colIdx === 9 ? colIdx = 0 : colIdx += 1;
  }
}
