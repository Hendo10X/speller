'use client';

import { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

type Language = 'english' | 'spanish' | 'french' | 'german' | 'italian' | 'portuguese';

interface LanguageTones {
  [key: string]: string[];
}

const languageTones: LanguageTones = {
  english: ['casual', 'flirty', 'friendly', 'professional', 'urban', 'sarcastic'],
  spanish: ['casual', 'flirty', 'friendly', 'professional', 'urban', 'passionate'],
  french: ['casual', 'flirty', 'friendly', 'professional', 'romantic', 'elegant'],
  german: ['casual', 'friendly', 'professional', 'formal', 'direct', 'humorous'],
  italian: ['casual', 'flirty', 'friendly', 'professional', 'passionate', 'expressive'],
  portuguese: ['casual', 'flirty', 'friendly', 'professional', 'warm', 'playful']
};

interface MessageSuggestion {
  response: string;
  explanation: string;
  slang: string[];
}

export function MessageAssistant() {
  const [message, setMessage] = useState('');
  const [language, setLanguage] = useState<Language>('english');
  const [tone, setTone] = useState<string>(languageTones.english[0]);
  const [suggestions, setSuggestions] = useState<MessageSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const genAI = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY!
  });

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setTone(languageTones[newLanguage][0]);
  };

  const generateSuggestions = async () => {
    if (!message) return;
    
    setLoading(true);
    setError(null);
    try {
      const prompt = `You are a relationship and urban slang expert. Help craft the perfect response to this message: "${message}"

      Please provide 3 different response suggestions in ${language} that:
      1. Match the ${tone} tone perfectly
      2. Include modern ${language} slang and expressions that are natural and not forced
      3. Consider the relationship context (crush, friend, professional, etc.)
      4. Are authentic and relatable to ${language} speakers

      IMPORTANT: You must respond with ONLY a valid JSON array. No other text or explanation.
      The JSON must follow this exact structure:
      [
        {
          "response": "the suggested response in ${language}",
          "explanation": "why this response works",
          "slang": ["list", "of", "${language}", "slang", "terms", "used"]
        }
      ]

      Do not include any markdown formatting, backticks, or additional text. Only the JSON array.`;

      const result = await genAI.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      });

      if (!result.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error('No response from AI');
      }

      const text = result.candidates[0].content.parts[0].text.trim();
      
      try {
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        const jsonText = jsonMatch ? jsonMatch[0] : text;
        
        const parsedSuggestions = JSON.parse(jsonText) as MessageSuggestion[];
        
        if (!Array.isArray(parsedSuggestions) || !parsedSuggestions.every(s => 
          typeof s.response === 'string' && 
          typeof s.explanation === 'string' && 
          Array.isArray(s.slang)
        )) {
          throw new Error('Invalid response structure');
        }
        
        setSuggestions(parsedSuggestions);
      } catch (error) {
        console.error('Error parsing suggestions:', error);
        console.log('Raw response:', text);
        setError('Failed to parse AI response. Please try again.');
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error generating suggestions:', error);
      setError('Failed to generate suggestions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <Card className="p-6 border">
        <h2 className="text-2xl font-bold mb-4 font-instrument-serif">Message Assistant</h2>
        
        <div className="space-y-4">
          <Textarea
            placeholder="Enter the message you want to respond to..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[100px] font-inter"
          />
          
          <div className="flex flex-wrap gap-4">
            <Select value={language} onValueChange={(value: string) => handleLanguageChange(value as Language)}>
              <SelectTrigger className="w-[180px] font-inter">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent className="shadow-none">
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="french">French</SelectItem>
                <SelectItem value="german">German</SelectItem>
                <SelectItem value="italian">Italian</SelectItem>
                <SelectItem value="portuguese">Portuguese</SelectItem>
              </SelectContent>
            </Select>

            <Select value={tone} onValueChange={(value: string) => setTone(value)}>
              <SelectTrigger className="w-[180px] font-inter">
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent className="shadow-none">
                {languageTones[language].map((t) => (
                  <SelectItem key={t} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              onClick={generateSuggestions}
              disabled={loading || !message}
              className="font-inter"
            >
              {loading ? 'Generating...' : 'Get Suggestions'}
            </Button>
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm font-inter">
              {error}
            </div>
          )}
        </div>
      </Card>

      {suggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {suggestions.map((suggestion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4 border">
                <div className="space-y-2">
                  <p className="text-lg font-medium font-instrument-serif">{suggestion.response}</p>
                  <p className="text-sm text-muted-foreground font-inter">{suggestion.explanation}</p>
                  {suggestion.slang.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {suggestion.slang.map((term, i) => (
                        <span key={i} className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm font-inter">
                          {term}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}