# Cover Craft

AI-powered cover letter generator. Upload your CV, paste a job description, and get a personalized cover letter in seconds.

🔗 **Live Demo:** [cover-letter-ai-topaz.vercel.app](https://cover-letter-ai-topaz.vercel.app)

---

## Features

- **AI-Powered Generation** — Uses Groq (Llama 3.3 70B) to generate personalized cover letters
- **PDF Parsing** — Automatically extracts text from uploaded CVs
- **Credit System** — 3 free credits on signup, purchase more via Stripe
- **Application History** — View all past cover letters with job descriptions
- **Google Auth** — Sign in with Google via Supabase
- **Responsive Design** — Works on mobile and desktop

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + Shadcn UI |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth + Google OAuth |
| AI | Groq API (Llama 3.3 70B) |
| Payments | Stripe (Test Mode) |
| Rate Limiting | Upstash Redis |
| Deployment | Vercel |

## Integrations

This project connects multiple third-party services together:

- **[Supabase](https://supabase.com)** — PostgreSQL database, authentication, and row-level security. Handles user sessions, application history, and credit balances.
- **[Google Cloud](https://console.cloud.google.com)** — OAuth 2.0 consent screen and credentials for Google Sign-In.
- **[Groq](https://console.groq.com)** — LLM API running Llama 3.3 70B. Receives parsed CV text and job description, returns structured JSON with the generated cover letter.
- **[Stripe](https://stripe.com)** — Checkout sessions and webhooks for the credit purchase flow. Webhook signature validation ensures only legitimate Stripe events update user credits.
- **[Upstash](https://console.upstash.com)** — Serverless Redis for rate limiting. Limits each IP to 10 requests per minute to prevent abuse and control costs.
- **[Vercel](https://vercel.com)** — Deployment and hosting. Environment variables are managed through Vercel dashboard.

### Prerequisites

- Node.js 18+
- Supabase account
- Groq API key
- Stripe account (test mode)
- Upstash account
- Google Cloud account (for OAuth)

### Installation
```bash
git clone https://github.com/Yigitbdk/cover-letter-ai
cd cover-letter-ai
npm install
```

### Environment Variables

Create a `.env.local` file with the following keys obtained from each service:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Groq
GROQ_API_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_PRO_PRICE_ID=

# Upstash
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

```

## Testing Payments

This project uses Stripe in test mode. Use the following test card:

- **Card:** `4242 4242 4242 4242`
- **Expiry:** Any future date
- **CVC:** Any 3 digits

No real payments are processed.

## License

MIT