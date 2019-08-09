const { Schema, model } = require('mongoose');

const itemSchema = new Schema({
  title: { type: Schema.Types.String, required: true },
  description: { type: Schema.Types.String, required: true },
  price: { type: Schema.Types.Number, required: true },
  images: [{ type: Schema.Types.Object, required: true }],
  createdOn: { type: Schema.Types.Date, default: new Date() },
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  status: { type: Schema.Types.String, enum: ['Pending', 'Approved'], default: 'Approved' }
});

const Item = model('Item', itemSchema);

module.exports = Item;