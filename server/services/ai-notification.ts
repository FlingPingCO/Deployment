import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type NotificationType = 'exposure' | 'test_result' | 'reminder';

// Fallback messages when AI generation fails
const FALLBACK_MESSAGES = {
  exposure: "Someone you recently connected with has reported potential exposure. Please get tested at your earliest convenience. Your health matters.",
  test_result: "A recent contact has received test results they think you should know about. Please consult with a healthcare provider.",
  reminder: "This is a friendly reminder to stay on top of your sexual health. Regular testing helps keep you and others safe.",
};

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

    return completion.choices[0].message.content || FALLBACK_MESSAGES[type];
  } catch (error) {
    console.error("AI Notification Generation Error:", error);
    // Return fallback message if AI generation fails
    return FALLBACK_MESSAGES[type];
  }
}