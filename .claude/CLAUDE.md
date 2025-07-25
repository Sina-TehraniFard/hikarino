# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Hikarino** is an AI-powered tarot fortune telling web application targeting Japanese users. The app features a character-driven experience where "Hikarino" (ひかりの) provides warm, sisterly guidance through tarot readings powered by OpenAI GPT-4.

## Technology Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript 5
- **Styling**: Tailwind CSS 4 with modern inline theme syntax (`theme(colors.warm-sky)`)
- **Backend**: Firebase (Auth, Firestore, Cloud Functions)
- **AI**: OpenAI GPT-4 with streaming responses
- **Payments**: Stripe integration for coin-based monetization
- **Deployment**: Vercel (frontend) + Firebase (backend)

## Development Commands

```bash
# Development
npm run dev          # Start dev server with Turbopack
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint code quality check

# Firebase Functions (from /functions-core)
npm run build        # Build functions
npm run serve        # Local functions emulator
npm run deploy       # Deploy to Firebase
npm run webhook:dev  # Development webhook server for Stripe
```

## Architecture & Code Organization

### Core Application Flow
1. **User Authentication**: Firebase Auth with guest mode support
2. **Question Input**: Users ask questions for tarot guidance
3. **Card Drawing**: Server-side randomization ensures fairness
4. **AI Fortune**: Streaming GPT-4 responses as "Hikarino" character
5. **Coin Economy**: Pay-per-use model with Stripe integration

### Key Directories
- `/src/app/` - Next.js App Router pages and API routes
- `/src/components/` - React components (recently refactored from monolithic to modular)
- `/src/hooks/` - Custom hooks for complex logic (fortune, auth, animations)
- `/src/contexts/` - React Context providers for global state
- `/src/lib/` - Utilities, Firebase config, API clients
- `/src/types/` - Comprehensive TypeScript definitions
- `/functions-core/` - Firebase Cloud Functions
- `/design/` - UI/UX documentation and design specs

### Recently Refactored Components
The codebase underwent major refactoring to break down a 232-line monolithic component into smaller, focused components. Key architectural patterns:

- **Single Responsibility**: Each component has one clear purpose
- **Custom Hooks**: Complex logic extracted (fortune telling, coin management, animations)
- **Type Safety**: Comprehensive TypeScript with educational comments
- **Clean Separation**: Clear boundaries between UI, business logic, and data layers

### State Management Patterns
- **Contexts**: `CoinContext` for global coin state
- **Custom Hooks**: `useFortune`, `useAuth`, `useCoinAnimation` for feature logic
- **Local State**: React useState for component-specific state

### API Architecture
- **Streaming**: Real-time fortune delivery via streaming API
- **Security**: Server-side card drawing and validation
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Rate Limiting**: Coin-based usage prevents abuse

## Character & UX Guidelines

### Hikarino Character
- **Personality**: Warm, caring older sister figure
- **Tone**: Gentle, encouraging, slightly mystical
- **Language**: Natural Japanese with appropriate honorifics
- **Responses**: Always provide hope and positive direction

### UI/UX Patterns
- **Warm Color Palette**: Soft purples, pinks, and amber tones
- **Glass Morphism**: Translucent overlays and blur effects
- **Mobile-First**: Responsive design prioritizing mobile experience
- **Smooth Animations**: Thoughtful transitions and micro-interactions

## Firebase Configuration

### Firestore Collections
- `users/` - User profiles, coin balances, names
- `fortunes/` - Fortune history and results
- `payments/` - Stripe transaction records

### Cloud Functions
- `createUser` - Initialize new user data
- `webhooks/stripe` - Handle Stripe payment events
- Card drawing and fortune generation APIs

## Development Notes

### Testing Philosophy
The project does not use traditional unit testing frameworks. Quality is maintained through:
- TypeScript strict mode for compile-time safety
- Comprehensive error handling and validation
- Manual testing with real user scenarios

### Deployment Workflow
1. Frontend deploys automatically to Vercel on main branch push
2. Firebase Functions deployed manually via `npm run deploy`
3. Stripe webhooks require tunnel setup for local development

### Security Considerations
- Server-side card randomization prevents client manipulation
- Secure coin transaction handling
- User data privacy with minimal data collection
- API rate limiting and validation

### Performance Optimizations
- Streaming API responses for perceived speed
- Lazy loading of heavy components
- Optimized images and animations
- Efficient state management to prevent unnecessary re-renders

## Important Files to Reference

- `/src/types/index.ts` - Complete type definitions
- `/src/hooks/useFortune.ts` - Core fortune telling logic
- `/src/contexts/CoinContext.tsx` - Global coin management
- `/functions-core/src/index.ts` - Backend API endpoints
- `/design/` - UI specifications and design decisions

## Knowledge Management
- Project-specific patterns are stored in `.claude/knowledge/patterns/`
- Lessons learned are stored in `.claude/knowledge/lessons/`
- Patterns with high reusability are auto-promoted to global knowledge

