const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  item: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
  createdOn: { type: Schema.Types.Date, default: new Date().toLocaleTimeString() },
  status: { type: Schema.Types.String, enum: ['Pending, In progress, In transit, Delivered'], default: 'Pending' }
});

const Order = model('Order', orderSchema);

module.exports = Order;