import User from "@models/User"
import { connectToDB } from "@mongodb"
import { unstable_noStore } from "next/cache";

export const GET = async (req, res) => {
  unstable_noStore();
  try {
    await connectToDB()

    const allUsers = await User.find()

    return new Response(JSON.stringify(allUsers), { status: 200 })
  } catch (err) {
    console.log(err)
    return new Response("Failed to get all users", { status: 500 })
  }
}

export const PUT = async (req, res) => {
  try {
    await connectToDB()
    const body = await req.json();
    const {id,socketId}=body;
    
    console.log(">>>>>ID:",socketId);
     await User.updateOne({_id:id},{ $set: { socketId: socketId } });
    return new Response(JSON.stringify([{message:"socketID updated"}]), { status: 200 })
  } catch (err) {
    console.log(err)
    return new Response("Failed to update socketID", { status: 500 })
  }
}