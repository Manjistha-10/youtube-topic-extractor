# Dockerfile
FROM node:18

# Install yt-dlp
RUN apt-get update && apt-get install -y curl \
  && curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp \
  && chmod a+rx /usr/local/bin/yt-dlp

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Set environment variables if needed
ENV LANG_PATH=tessdata_fast
ENV EXCEL_PATH=DSA_Concept_Graph.xlsx
ENV NODE_ENV=production

# Run the compiled JS file
CMD ["node", "dist/index.js"]
