import User from "@models/User"
import { connectToDB } from "@mongodb"

export const GET = async (req,{ params }) => {
  try {
    const { id } = params;
    await connectToDB()

    const user = await User.findById(id)

    return new Response(JSON.stringify(user), { status: 200 })
  } catch (err) {
    console.log(err)
    return new Response("Failed to get all users", { status: 500 })
  }
}