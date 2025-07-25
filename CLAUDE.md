# Hikarino - AI Tarot Fortune Telling Service

## Project Overview

**Hikarino** is a sophisticated AI-powered tarot fortune telling web application built with modern web technologies. The application provides users with personalized tarot readings using OpenAI's API, featuring a character named "Hikarino" who delivers warm, sister-like guidance through tarot card interpretations.

## Technology Stack

### Core Technologies
- **Next.js 15**: Modern React framework with App Router architecture
- **React 19**: Latest React with advanced features
- **TypeScript 5**: Full type safety with strict mode enabled
- **Tailwind CSS 4**: Modern utility-first CSS with inline theme syntax and warm color palette
- **Firebase**: Complete backend solution including Authentication, Firestore, and Cloud Functions
- **OpenAI API**: GPT-4 integration for generating personalized fortune readings
- **Stripe**: Payment processing for coin-based monetization system

### Development Tools
- **ESLint**: Code quality and consistency with Next.js recommended configuration
- **Semantic Release**: Automated versioning and CHANGELOG generation
- **PostCSS**: CSS processing with Tailwind integration
- **Firebase Tools**: Local development and deployment management

## Architecture & Structure

### Application Architecture
The application follows a modern, scalable architecture with clear separation of concerns:

```
Frontend (Next.js App Router) ↔ API Routes ↔ Firebase Cloud Functions ↔ External Services
                                     ↓
                              Firestore Database
```

### Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Main application page (refactored from 232 lines)
│   ├── layout.tsx               # Root layout with CoinProvider
│   ├── history/                 # Fortune reading history
│   └── api/                     # API Routes
│       ├── fortune/route.ts     # OpenAI integration with streaming
│       └── create-checkout-session/route.ts # Stripe checkout
├── components/                   # React Components
│   ├── Header.tsx               # Application header (completely refactored)
│   ├── LoginModal.tsx           # Firebase Auth integration
│   ├── CoinPurchaseModal.tsx    # Stripe payment integration
│   ├── NameSetupModal.tsx       # User onboarding
│   └── ui/                      # Reusable UI Components
│       ├── Button.tsx           # Unified button component
│       ├── TarotCards.tsx       # Card display with animations
│       ├── QuestionForm.tsx     # User input handling
│       ├── FortuneResult.tsx    # Streaming result display
│       ├── WaitingAnimation.tsx # Lottie-based animations
│       └── [other UI components]
├── hooks/                       # Custom React Hooks
│   ├── useAuth.ts              # Firebase Authentication
│   ├── useFortune.ts           # Fortune telling logic (completely externalized)
│   └── useCoinAnimation.ts     # Coin purchase animations
├── lib/                        # Business Logic & Utilities
│   ├── firebase.ts             # Firebase configuration
│   ├── tarot.ts                # 22 Major Arcana definitions
│   ├── fortune.ts              # API calling and streaming logic
│   └── firestore/              # Database operations
├── contexts/                   # React Context Providers
│   └── CoinContext.tsx         # Global coin state management
├── types/                      # TypeScript Definitions
│   └── index.ts               # Comprehensive type definitions
├── prompts/                    # AI Prompt Engineering
│   ├── character.ts           # Hikarino character definition
│   ├── style.ts               # Response style guidelines
│   ├── technique.ts           # Tarot reading techniques
│   └── policy.ts              # Content moderation policies
└── utils/                     # Helper utilities

functions-core/                 # Firebase Cloud Functions
├── src/
│   ├── index.ts               # Main functions export
│   └── webhook/               # Stripe webhook handlers
└── package.json               # Node.js 22 runtime
```

## Key Features & Architecture Decisions

### 1. **Component Architecture**
- **Before**: Monolithic 232-line page component
- **After**: Modular, single-responsibility components
- **Benefits**: Improved maintainability, reusability, and testing capabilities

### 2. **State Management**
- **React Context**: Global coin state management
- **Custom Hooks**: Encapsulated business logic (fortune telling, authentication, animations)
- **Local State**: Component-specific UI state

### 3. **Security-First Design**
- **Server-side card drawing**: Prevents client-side manipulation
- **Cloud Functions**: Secure coin transactions with atomic operations
- **Firebase Auth**: Robust user authentication
- **Stripe Webhooks**: Secure payment processing

### 4. **Type Safety**
- **Comprehensive TypeScript**: 100% typed codebase with detailed documentation
- **Strict Mode**: Enhanced error catching and code quality
- **Type Definitions**: Centralized in `/src/types/index.ts` with extensive comments

### 5. **Performance Optimizations**
- **Streaming API**: Real-time fortune results using Server-Sent Events
- **Lazy Loading**: Components and animations loaded on demand
- **Optimized Images**: Proper image handling for tarot cards
- **Firebase Caching**: Efficient data fetching strategies

## Available Scripts

### Frontend Development
```bash
npm run dev          # Development server with Turbopack
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint code quality check
```

### Firebase Functions
```bash
cd functions-core
npm run build        # TypeScript compilation
npm run serve        # Local emulator
npm run deploy       # Deploy to Firebase
npm run webhook:dev  # Local webhook development
```

### Deployment & Release
```bash
firebase deploy      # Full deployment
semantic-release     # Automated versioning (CI/CD)
```

## Development Patterns

### Component Development
1. **UI Components**: Place in `src/components/ui/` for reusability
2. **Business Logic**: Extract to `src/lib/` or custom hooks
3. **Type Definitions**: Add to `src/types/index.ts` with documentation
4. **Styling**: Use Tailwind classes with warm color palette defined in globals.css

### Best Practices
- **Single Responsibility**: Each component has one clear purpose
- **File Size Limit**: Keep components under 200 lines (split if larger)
- **Type Documentation**: Include JSDoc comments for complex types
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Loading States**: Consistent loading indicators and skeleton screens

## API Integration

### OpenAI Integration
- **Model**: GPT-4 with temperature 0.8 for creative responses
- **Streaming**: Real-time response delivery for better UX
- **Prompt Engineering**: Sophisticated prompt system with character consistency
- **Error Handling**: Graceful fallbacks for API failures

### Firebase Services
- **Authentication**: Email/password and social login
- **Firestore**: User data, coin balances, and fortune history
- **Cloud Functions**: Secure business logic execution
- **Security Rules**: Comprehensive data access control

### Stripe Integration
- **Checkout Sessions**: Secure payment processing
- **Webhooks**: Automated coin fulfillment
- **Metadata**: User identification and coin amounts
- **Error Recovery**: Failed payment handling

## UI/UX Design

### Design System
- **Warm Color Palette**: Gold (#ECC356), Sky Blue (#ABD2DD), Cream (#FFFDF5)
- **Glass Morphism**: Translucent backgrounds with backdrop blur
- **Responsive Design**: Mobile-first approach with tablet/desktop optimization
- **Animation System**: Lottie animations for engagement

### User Experience
- **Progressive Enhancement**: Works without JavaScript for basic functionality
- **Loading States**: Comprehensive feedback during async operations
- **Error Handling**: User-friendly error messages and recovery options
- **Accessibility**: ARIA labels and keyboard navigation support

## Security Considerations

### Data Protection
- **Environment Variables**: All sensitive keys in environment configuration
- **Server-side Validation**: All critical operations validated on backend
- **Rate Limiting**: API endpoint protection (handled by Firebase)
- **Content Moderation**: AI response filtering for inappropriate content

### Payment Security
- **PCI Compliance**: All payments handled by Stripe (PCI DSS Level 1)
- **Webhook Signatures**: Verified Stripe webhook authenticity
- **Atomic Transactions**: Coin operations are atomic and reversible
- **Audit Trail**: All transactions logged for monitoring

## Recent Architecture Improvements (2025)

### Major Refactoring
- **Component Decomposition**: Broke down monolithic components into focused, reusable pieces
- **Business Logic Extraction**: Moved API calls and state management to dedicated hooks and utilities
- **Type System Enhancement**: Added comprehensive TypeScript definitions with educational comments
- **Performance Optimization**: Implemented streaming APIs and optimized rendering

### Quality Improvements
- **Error Boundary**: Comprehensive error handling at component and application levels
- **Loading States**: Consistent loading indicators and skeleton screens
- **Code Documentation**: Extensive inline documentation for maintainability
- **Testing Foundation**: Prepared structure for comprehensive testing implementation

## Deployment

### Environment Configuration
- **Development**: Local development with Firebase emulators
- **Staging**: Firebase Hosting with preview channels
- **Production**: Firebase Hosting with CDN and custom domain

### CI/CD Pipeline
- **Semantic Release**: Automated versioning based on conventional commits
- **GitHub Actions**: Automated testing and deployment
- **Firebase CLI**: Deployment automation and rollback capabilities

## Future Development

### Planned Enhancements
- **Testing Suite**: Comprehensive unit and integration tests
- **Performance Monitoring**: Real-time performance metrics
- **Advanced Analytics**: User behavior tracking and insights
- **Mobile App**: React Native companion application

### Scalability Considerations
- **Database Sharding**: Prepared for horizontal scaling
- **CDN Integration**: Optimized asset delivery
- **Caching Strategy**: Multi-layer caching implementation
- **Monitoring**: Application performance and error tracking

---

**Version**: 1.3.1  
**Last Updated**: July 2025  
**Architecture Status**: Recently refactored and modernized  
**Maintenance**: Active development with regular updates