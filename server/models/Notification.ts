import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    body: { type: String, required: true },
    type: { type: String, required: true },
    header: { type: String, required: true },
    notifyId: { type: String, required: true },
    seen: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const NotificationModel = mongoose.model("Notification", NotificationSchema);

export default NotificationModel;
