import User from "@models/User"
import { connectToDB } from "@mongodb"
import {  unstable_noStore } from "next/cache"

export const GET = async (req, res) => {
  unstable_noStore();
  try {
    await connectToDB()

    const allUsers = await User.find({isTherapist:true}).sort({ _id: -1 })

    return new Response(JSON.stringify(allUsers), { status: 200 })
  } catch (err) {
    console.log(err)
    return new Response("Failed to get all users", { status: 500 })
  }
}