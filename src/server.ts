// src/server.ts
import express from 'express';
import { downloadSubtitles } from './utils/downloader';
import { parseVttFile } from './utils/parser';
import { translateToEnglish } from './utils/translate';
import { loadConceptsFromExcel, identifyConcepts } from './utils/matchTopics';
import { config } from './config';
import fs from 'fs-extra';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.post('/analyze', async (req, res) => {
  const { videoUrl } = req.body;

  if (!videoUrl) {
    return res.status(400).json({ error: 'Missing videoUrl in request body' });
  }

  try {
    const videoId = new URL(videoUrl).searchParams.get('v');
    if (!videoId) throw new Error('Invalid YouTube URL');

    await fs.ensureDir(config.DOWNLOAD_DIR);

    const { filePath, langCode } = await downloadSubtitles(videoId, config.DOWNLOAD_DIR);
    const transcript = await parseVttFile(filePath);
    const translated = await translateToEnglish(transcript);
    const concepts = loadConceptsFromExcel(config.EXCEL_PATH);
    const matched = identifyConcepts(translated, concepts);

    return res.json({
      videoId,
      langCode,
      matchedTopics: matched,
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Unknown error' });
  }
});

app.get('/', (_req, res) => {
  res.send('✅ YouTube Topic Extractor is live');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
