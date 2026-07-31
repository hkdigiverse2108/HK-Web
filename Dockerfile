# Stage 1: Build the React Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
# Copy frontend source
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm install
COPY frontend/ ./
# Build the frontend
RUN npm run build

# Stage 2: Setup Python Backend
FROM python:3.10-slim
WORKDIR /app

# Install system dependencies (for OpenCV if needed)
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ ./backend/
COPY main.py .

# Copy the built frontend from Stage 1
COPY --from=frontend-builder /app/frontend/dist /app/frontend/dist

# Expose port
EXPOSE 8008

# Run the unified server in production mode
ENV ENV=production
ENV PORT=8008

CMD ["python", "main.py"]
