// Developed by Manjistha Bidkar

const express = require('express');
const path = require('path');
const fs = require('fs-extra');
const { downloadSubtitles } = require('./utils/downloader');
const { parseVttFile } = require('./utils/parser');
const { translateToEnglish } = require('./utils/translate');
const { loadConceptsFromExcel, identifyConcepts } = require('./utils/matchTopics');
const { config } = require('./config');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', async (req: any, res: any) => {
  const videoUrl = req.query.url;

  if (!videoUrl) {
    return res.status(400).send('❌ Please provide a YouTube video URL as a query param `?url=`');
  }

  try {
    const videoId = new URL(videoUrl).searchParams.get('v');
    if (!videoId) throw new Error('Invalid YouTube URL');

    await fs.ensureDir(config.DOWNLOAD_DIR);

    console.log('📥 Downloading subtitles...');
    const { filePath, langCode } = await downloadSubtitles(videoId, config.DOWNLOAD_DIR);
    console.log(`✅ Subtitles downloaded (${langCode}) → ${filePath}`);

    console.log('📃 Parsing subtitle file...');
    const transcript = await parseVttFile(filePath);

    console.log('🌐 Translating (if needed)...');
    const translated = await translateToEnglish(transcript);

    console.log('📚 Loading concepts...');
    const concepts = loadConceptsFromExcel(config.EXCEL_PATH);

    console.log('🔍 Matching topics...');
    const matched = identifyConcepts(translated, concepts);

    res.json({
      message: '🎯 Matched Topics',
      matchedTopics: matched
    });

  } catch (err: any) {
    console.error('❌ Error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
