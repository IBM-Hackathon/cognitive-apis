
export default (req, res) => {
  console.log('got query # body: ' + JSON.stringify(req.body, null, 4));
  res.json({
    orders: [
      {
        id: req.body.id,
        error: 'no',
        orderId: 'o12345',
        sapId: 's12345'
      },
      {
        id: '12345',
        error: 'no',
        orderId: 'o12346',
        sapId: 's12346'
      }
    ]
  });
};
