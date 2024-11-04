import mongoose, { Schema, Document, model } from "mongoose";


const AdminSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    firstname: { type: String, min: 2, max: 50 },
    lastname: { type: String, min: 2, max: 50 },
    phone: { type: String },
    Admin: {type: Boolean}
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



const Admin = model('admin', AdminSchema);

export default Admin;