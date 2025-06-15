# Speller - AI-Powered Personalized Spell Checker

Speller is a modern, AI-powered spell checker that learns from your texting style and incorporates urban slang. It uses Google's Gemini AI to provide contextually appropriate suggestions while maintaining your unique communication style.

## 🌟 Features

- **Personalized Suggestions**: Learns from your texting style and adapts to your communication patterns
- **Multi-language Support**: Currently supports English, Spanish, French, German, Italian, and Portuguese
- **Tone Customization**: Choose from various tones including:
  - Casual
  - Flirty
  - Friendly
  - Professional
  - Urban
  - Sarcastic (English)
  - Passionate (Spanish/French)
  - Elegant (French)
  - Formal (German)
  - Direct (German)
  - Humorous (German)
  - Expressive (Italian)
  - Warm (Portuguese)
  - Playful (Portuguese)

- **Modern UI**: Built with Next.js and styled using Tailwind CSS
- **Secure Authentication**: Google Sign-in integration via Supabase
- **Responsive Design**: Works seamlessly across all devices
- **Custom Fonts**: Uses Instrument Serif for headings and Inter for body text

## 🚀 Tech Stack

- **Frontend Framework**: Next.js 15.3.3
- **UI Components**: Custom components built with Radix UI
- **Styling**: Tailwind CSS with custom configuration
- **Authentication**: Supabase Auth
- **AI Integration**: Google Gemini AI
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Type Safety**: TypeScript

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/spellz.git
cd spellz
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_GOOGLE_AI_API_KEY=your_google_ai_api_key
```

4. Run the development server:
```bash
npm run dev
```

## 🛠️ Development

### Project Structure
```
spellz/
├── src/
│   ├── app/                 # Next.js app directory
│   ├── components/         # React components
│   │   ├── ui/            # UI components
│   │   └── ...            # Feature components
│   ├── lib/               # Utility functions
│   └── styles/            # Global styles
├── public/                # Static assets
└── ...                   # Configuration files
```

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

## 🔒 Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `NEXT_PUBLIC_GOOGLE_AI_API_KEY` | Google Gemini AI API key |

## 🎨 UI Components

The project uses a custom UI component library built with Radix UI primitives and styled with Tailwind CSS. Key components include:

- **Card**: Container component with border and rounded corners
- **Button**: Various button styles (default, destructive, outline, secondary, ghost, link)
- **Textarea**: Custom styled text input
- **Select**: Dropdown component with custom styling
- **Tabs**: Tabbed interface component

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Google Gemini AI](https://ai.google.dev/)
- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainers.

---

Built with ❤️ using modern web technologies
