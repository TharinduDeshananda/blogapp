import mongoose, { Schema, mongo } from "mongoose";
import ResourceModelDto from "../ResourceModelDto";

const resourceSchema = new Schema<ResourceModelDto>({
  name: { type: String, required: true },
  size: { type: Number, required: true },
  type: { type: String, required: true },
});

export default function getResourceModel() {
  return (
    mongoose.models.Resource ||
    mongoose.model<ResourceModelDto>("Resource", resourceSchema)
  );
}
