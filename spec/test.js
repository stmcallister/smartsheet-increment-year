const getDateColumn = (sheet, dateName) => {
  let name = []
  name.push(sheet.columns.find((column) => column.title === dateName).title)
  return name
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
    expect(result).toBe(['birthday'])
  })
});

const getWeekAgo = () => {
  let today = new Date();
  let weekAgo = new Date(today.getFullYear(),today.getMonth(),today.getDate()-7);
  return weekAgo
}

describe('WeekAgo', () => {
  it('gets the today\'s date minus 7 days',() => {
      expect(getWeekAgo()).toBe('something?')
  });
});
