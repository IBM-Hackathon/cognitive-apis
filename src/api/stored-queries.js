
let storedQueries = {
  Default: {
    title: 'Default',
    readOnly: true,
    value: {
      $select: [
        'id',
        'error',
        'orderId',
        'sapId'
      ],
      $from: 'orders',
      $where: [
        {
          id: {
            $equals: 'a'
          }
        }
      ]
    }
  },
  Foo: {
    title: 'Foo',
    value: {
      $select: [
        'id',
        'sapId'
      ],
      $from: 'orders',
      $where: [
        {
          id: {
            $equals: 'foo'
          }
        }
      ]
    }
  }
};

export const getStoredQueries = (req, res) => {
  res.json(storedQueries);
};

export const setStoredQueries = (req, res) => {
  storedQueries = req.body;
  console.log('updating stored queries ...');
  console.log(JSON.stringify(req.body, null, 2));
  res.json(storedQueries);
};
