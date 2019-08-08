const Item = require('../models/Item');
const User = require('../models/User');

module.exports = {
  getAllItems: (req, res, next) => {
    Item
      .find()
      .where('status', 'Approved')
      .then((items) => {
        res
          .status(200)
          .json({
            success: true,
            items
          })
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }

        next(error);
      });
  },
  createItem: (req, res, next) => {
    const { title, description, price, imageURL: images } = req.body;

    const item = new Item({
      title,
      description,
      price,
      images,
      creator: req.userId
    });

    item
      .save()
      .then((i) => {
        return User.findById(req.userId);
      })
      .then((user) => {
        user.items.push(item);
        return user.save();
      })
      .then((u) => {
        res
          .status(201)
          .json({
            success: true,
            message: `${u.firstName}, your item has been created successfully! Needs approval though...`,
            item
          })
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }

        next(error);
      });
  }
}