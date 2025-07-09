# Dockerfile
FROM node:18

# Install yt-dlp
RUN apt-get update && apt-get install -y curl \
  && curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp \
  && chmod a+rx /usr/local/bin/yt-dlp

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Set environment variables if needed
ENV LANG_PATH=tessdata_fast
ENV EXCEL_PATH=DSA_Concept_Graph.xlsx
ENV NODE_ENV=production

# Install ts-node & typescript
RUN npm install -D ts-node typescript

# Run the app with video URL as argument
ENTRYPOINT ["ts-node", "src/index.ts"]
