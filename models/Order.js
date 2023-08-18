import mongoose, { model, models, Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    userEmail: String,
    line_items: Object,
    name: String,
    city: String,
    email: String,
    postCode: String,
    street: String,
    numberHome: String,
    paid: Boolean,
  },
  {
    timestamps: true,
  }
);

export const Order = models?.Order || model("Order", OrderSchema);
