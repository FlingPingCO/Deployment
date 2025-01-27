import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type NotificationType = 'exposure' | 'test_result' | 'reminder';

const NOTIFICATION_PROMPTS = {
  exposure: `Generate a sensitive, supportive notification about potential STI exposure. 
  The message should be:
  - Anonymous and discreet
  - Non-judgmental and supportive
  - Clear about the need for testing
  - Encouraging and positive`,

  test_result: `Generate a notification about sharing test results. The message should be:
  - Private and confidential
  - Direct but sensitive
  - Focused on health and well-being
  - Include next steps for testing/treatment`,

  reminder: `Generate a friendly reminder about sexual health. The message should be:
  - Casual and non-threatening
  - Encouraging regular testing
  - Positive about taking control of health
  - Light but respectful in tone`,
};

export async function generateNotification(
  type: NotificationType,
  context: Record<string, any> = {}
): Promise<string> {
  try {
    const basePrompt = NOTIFICATION_PROMPTS[type];
    const contextStr = Object.entries(context)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a sensitive, supportive health communication assistant. Your role is to create notifications that are private, respectful, and encourage positive health actions.",
        },
        {
          role: "user",
          content: `${basePrompt}\n\nContext:\n${contextStr}`,
        },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    return completion.choices[0].message.content || "Unable to generate notification";
  } catch (error) {
    console.error("AI Notification Generation Error:", error);
    return "Unable to generate notification. Please try again later.";
  }
}