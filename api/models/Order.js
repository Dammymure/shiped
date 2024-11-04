import mongoose, { Schema, model } from "mongoose";


const OrderSchema = new Schema(
  {
    orderId: { type: String, required: true },
    userId:  {
      type: Schema.Types.ObjectId,
      ref:"user"
    },
    packages: [
      {
        item: { type: String, required: true },
        weight: { type: Number, required: true },
      },
    ],
    status: { type: String, required: true },
    price: { type: Number },
    destination: { type: String, required: true },
    currentLocation: {
      lat: { type: Number },
      lng: { type: Number },
    },
    deliveryLocation: {
      lat: { type: Number },
      lng: { type: Number},
    },
    rider: { type: String }, // optional field for assigned rider
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);



const Order = model('order', OrderSchema);

export default Order;