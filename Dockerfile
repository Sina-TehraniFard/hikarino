# Build stage
FROM node:20-alpine AS builder

WORKDIR /app
RUN apk add --no-cache libc6-compat

# Copy package files for dependency installation
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
# Don't set NODE_ENV=production here to ensure devDependencies are installed
RUN npm ci && npm cache clean --force

# Copy source code
COPY . .

# Build the application
ENV NODE_ENV=production
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app
RUN apk add --no-cache libc6-compat

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Install production dependencies only
COPY package*.json ./
ENV NODE_ENV=production
RUN npm ci --omit=dev && npm cache clean --force

# Copy built application and necessary files from builder stage
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NEXT_TELEMETRY_DISABLED=1

# Start the application
CMD ["npm", "start"]