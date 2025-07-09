// Developed by Manjistha Bidkar
import { downloadSubtitles } from './utils/downloader';
import { parseVttFile } from './utils/parser';
import { translateToEnglish } from './utils/translate';
import { loadConceptsFromExcel, identifyConcepts } from './utils/matchTopics';
import { config } from './config';
import path from 'path';
import fs from 'fs-extra';

async function main() {
  const videoUrl = process.argv[2];

  if (!videoUrl) {
    console.error('❌ Please provide a YouTube video URL as an argument.');
    process.exit(1);
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

    console.log('\n🎯 Matched Topics:');
    if (matched.length) {
      matched.forEach(topic => console.log('🔹', topic));
    } else {
      console.log('No matching topics found.');
    }
  } catch (err) {
    console.error('❌ Error:', err);
  }
}

main();
