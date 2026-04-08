import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const POST = async (req, res) => {

  const body = await req.json();
  try {
    console.log(body);
    let messages = [
      {
        role: "system",
        content:
          "You are an adaptive medical Therapist. Based on the user's questions,responses, and level of Englsih comprehension, adjust your instruction accordingly. Start with a basic level and increase complexity if the user seems capable. Give tips, highlight important things, and educate the user with best solution in simple english",
      },
    ];

    messages.push({ role: "user", content: body.prompt });

    const completion = await openai.chat.completions.create({
      messages: messages,
      model: "gpt-3.5-turbo",
    });
    return new Response(JSON.stringify(completion), { status: 200 });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}