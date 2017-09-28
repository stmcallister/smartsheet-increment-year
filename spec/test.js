const getDateColumn = (sheet, dateName) => {
  return sheet.columns.find((column) => column.title === dateName).title
}

describe('getDateColumn',() => {
  it('returns column name if argument meets column name', () => {
    let sheet = {
      columns: [
        {
          title: 'name',
        },
        {
          title: 'related',
        },
        {
          title: 'birthday',
        },
      ]
    };
    let result = getDateColumn(sheet,'birthday')
    expect(result).toBe('birthday')
  })
});
