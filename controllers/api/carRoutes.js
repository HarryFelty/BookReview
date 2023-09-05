const router = require('express').Router();
const { where } = require('sequelize');
const { Car } = require('../../models');

router.get('/', async (req, res) => {
    let cars = await Car.findAll();

    cars = cars.map(car => car.get({ plain: true }));

    res.json(cars);
})

router.post('/', async (req, res) => {
    let cars = await Car.create(req.body);

    res.json(cars);
});

router.put('/:id', async (req, res) => {
    let cars = await Car.update(
        {
            model: req.body.model,
            make: req.body.make
        },
        {
            where: {
                id: req.params.id
            }
        }
    );

});

router.delete('/:id', async (req, res) => {

    let result = await Car.destroy({ where: { id: req.params.id } });
    res.json(result);
})

module.exports = router;