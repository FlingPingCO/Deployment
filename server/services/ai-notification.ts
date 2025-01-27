import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type NotificationType = 'exposure' | 'test_result' | 'reminder';

// Fallback messages when AI generation fails
const FALLBACK_MESSAGES = {
  exposure: (context: any) => 
    `Someone you recently connected with has reported ${context.exposureType} exposure to ${context.testType}. Please get tested at your earliest convenience. Your health matters.`,
  test_result: (context: any) => 
    `A recent contact has received a ${context.testResultStatus} test result for ${context.testType} that they think you should know about. ${
      context.testResultStatus === 'positive' 
        ? 'Please consult with a healthcare provider as soon as possible.'
        : 'Consider getting tested to confirm your status.'
    }`,
  reminder: (context: any) => 
    `Time for your regular health check-up! Regular testing is a crucial part of staying healthy and protecting your partners. Our records show it's been a while since your last update. Visit our Resources section for nearby testing locations and health information.`,
};

const NOTIFICATION_PROMPTS = {
  exposure: `Generate a sensitive, supportive notification about STI exposure. 
  The message should be:
  - Anonymous and discreet
  - Non-judgmental and supportive
  - Clear about the need for testing
  - Specify whether it's direct or indirect exposure
  - Include the specific condition while maintaining privacy`,

  test_result: `Generate a notification about sharing test results. The message should be:
  - Private and confidential
  - Direct but sensitive
  - Focused on health and well-being
  - Include the specific test type and result status
  - Provide appropriate next steps based on result status`,

  reminder: `Generate a proactive health reminder. The message should:
  - Emphasize the importance of regular testing
  - Mention the benefits of staying up-to-date with sexual health
  - Include a call to action (like visiting testing centers or checking resources)
  - Be encouraging and supportive
  - Maintain a professional yet friendly tone`,
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
          content: `${basePrompt}\n\nContext:\n${contextStr}\n\nIMPORTANT: Include specific details about the ${type} (${context.testType ? `condition: ${context.testType}, ` : ''}${context.testResultStatus ? `result: ${context.testResultStatus}, ` : ''}${context.exposureType ? `exposure type: ${context.exposureType}` : ''}) while maintaining privacy and sensitivity.`,
        },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    return completion.choices[0].message.content || FALLBACK_MESSAGES[type](context);
  } catch (error) {
    console.error("AI Notification Generation Error:", error);
    // Return fallback message if AI generation fails
    return FALLBACK_MESSAGES[type](context);
  }
}