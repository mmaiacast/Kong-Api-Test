module.exports = app => {
  const controller = app.controllers.ipva;

  app.route('/api/v1/ipva')
    .get(controller.listIpva)
    .post(controller.saveIpva);

  app.route('/api/v1/ipva/:customerId')
    .delete(controller.removeIpva)
    .put(controller.updateIpva);


  app.route('/api/v1/ipva/generate/:quantidade')
    .post(controller.generateIpva);


}