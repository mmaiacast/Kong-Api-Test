const uuidv4 = require('uuid/v4');

module.exports = app => {
  const ipvaDB = app.data.ipva;
  const controller = {};

  const {
    ipva: ipvaMock,
  } = ipvaDB;

  controller.listIpva = (req, res) => res.status(200).json(ipvaDB);

  controller.generateIpva = (req, res) => {
    const faker = require('faker');
    faker.locale = 'pt_BR';

    const { 
      quantidade,
    } = req.params;
    var tot = quantidade ?? 10;
    
    for (let i = 0; i < tot; i++) {
      ipvaMock.data.push({
        id: uuidv4(),
        AnoExercicio: faker.random.number({ min: 1997, max: 2023 }),
        Renavam: faker.vehicle.vin(),
        DarPlacaChassi: faker.vehicle.vrm(),
        ModeloVeiculo: faker.vehicle.vehicle(),     
      });
    }
   
    res.status(201).json(ipvaMock);
  };

  controller.saveIpva = (req, res) => {
    ipvaMock.data.push({
      id: uuidv4(),
      AnoExercicio: req.body.AnoExercicio,
      Renavam: req.body.Renavam,
      DarPlacaChassi: req.body.DarPlacaChassi,
      ModeloVeiculo: req.body.ModeloVeiculo,      
    });
    res.status(201).json(ipvaMock);
  };

  controller.removeIpva = (req, res) => {
    const {
      AnoExercicio,
      Renavam,
    } = req.params;

    const foundIpvaIndex = ipvaMock.data.findIndex((ano, renavam) => ano.AnoExercicio === AnoExercicio && renavam.Renavam === Renavam);

    if (foundIpvaIndex === -1) {
      res.status(404).json({
        message: 'Cliente não encontrado na base.',
        success: false,
        ipva: ipvaMock,
      });
    } else {
      ipva.data.splice(foundIpvaIndex, 1);
      res.status(200).json({
        message: 'Cliente encontrado e deletado com sucesso!',
        success: true,
        ipva: ipvaMock,
      });
    }
  };

  controller.updateIpva = (req, res) => {
    const { 
      customerId,
    } = req.params;

    const foundCustomerIndex = ipvaMock.data.findIndex(customer => customer.id === customerId);

    if (foundCustomerIndex === -1) {
      res.status(404).json({
        message: 'Cliente não encontrado na base.',
        success: false,
        ipva: ipvaMock,
      });
    } else {
      const newCustomer = {
        id: customerId ,
        parentId: req.body.parentId,
        name: req.body.name,
        birthDate: req.body.birthDate,
        cellphone: req.body.cellphone,
        phone: req.body.phone,
        email: req.body.email,
        occupation: req.body.occupation,
        state: req.body.state,
        createdAt: new Date()
      };
      
      ipvaMock.data.splice(foundCustomerIndex, 1, newCustomer);
      
      res.status(200).json({
        message: 'Cliente encontrado e atualizado com sucesso!',
        success: true,
        ipva: ipvaMock,
      });
    }
  }

  return controller;
}