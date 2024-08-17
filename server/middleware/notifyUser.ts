import UserModel from "../models/User";

const notifyUser = async (userId: string, notification: any): Promise<void> => {
  try {
    const newNotification = await notification.save();
    if (userId) {
      await UserModel.findByIdAndUpdate(userId, {
        $push: { notifications: newNotification },
      });
      console.log("Notification sent🎉");
    } else {
      console.log("userId not received!");
    }
  } catch (error: any) {
    console.error("Error notifying user:", error.message);
  }
};

export default notifyUser;

// const notifySeller = async(sellerId:string|any) => {
//     const newNotification = await notification.save()
//     if (sellerId) {
//       await UserModel.findByIdAndUpdate(sellerId, {$push:{notifications: newNotification}})
//     }
//   }
