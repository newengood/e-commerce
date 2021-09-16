const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll(
      {
      // JOIN with products
      include: [{ model: Product}]
    });
    res.status(200).json(categoryData);
  } catch(error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      // JOIN with products
      include: [{ model: Product}]
    });
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch(error) {
    res.status(400).json(error);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      id: req.body.id,
      category_name: req.body.category_name,
      products: [
        {
          id: req.body.id,
          product_name: req.body.product_name,
          price: req.body.price,
          stock: req.body.stock,
          category_id: req.body.category_id,
          category_id: req.body.category_id
        }
      ]
    },
    {
      where: {
        id: req.params.id,
      },
      include: [{ model: Product }],
    }
  )
  .then((updatedCategory) => {
    res.json(updatedCategory);
  })
  .catch((error) => res.json(error));
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!'})
      return;
    }
    res.status(200).json(categoryData);
  } catch(error) {
    res.status(500).json(error);
  }
});

module.exports = router;
