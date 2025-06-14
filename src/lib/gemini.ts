import { GoogleGenAI } from '@google/genai';
import type { SpellCheckResult } from '../lib/supabase';

if (!process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY) {
    throw new Error('Missing NEXT_PUBLIC_GOOGLE_AI_API_KEY environment variable');
  }

const ai = new GoogleGenAI({ 
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY 
});

const SYSTEM_PROMPT = `You are a personalized spell checker and tone assistant. When given a message, do the following:

1. Correct spelling and grammar errors.
2. Retain the user's texting style and slang unless it affects understanding.
3. Replace or flag any slurs or offensive language.
4. Suggest urban, informal, or trending alternatives when appropriate.
5. Adjust suggestions based on the conversation context (formal/informal).
6. Allow the user to add or approve slang and auto-learn their preferences over time.

IMPORTANT: You must respond with ONLY a valid JSON object in the following format:
{
  "corrected_message": "string",
  "detected_slang": ["string"],
  "replaced_slurs": ["string"],
  "suggested_alternatives": ["string"],
  "formality_level": "casual" | "semi-formal" | "formal"
}

Do not include any other text or explanation, only the JSON object.`;

// Main function
export async function spellCheck(
  message: string,
  userPreferences?: {
    slang_terms: string[];
    formality_level: 'casual' | 'semi-formal' | 'formal';
    custom_replacements: Record<string, string>;
  }
): Promise<SpellCheckResult> {
  const prompt = `${SYSTEM_PROMPT}

User preferences:
${JSON.stringify(userPreferences, null, 2)}

Message to check:
${message}

Remember: Respond with ONLY the JSON object, no other text.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
    });

    const text = response.text;
    if (!text) {
      throw new Error('Empty response from Gemini');
    }

    // Clean the response text to ensure it's valid JSON
    const cleanedText = text.trim().replace(/^```json\n?|\n?```$/g, '');
    
    try {
      return JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', text);
      throw new Error('Invalid JSON response from Gemini');
    }
  } catch (error) {
    console.error('Failed to process spell check:', error);
    throw new Error('Failed to process spell check response');
  }
}
