// // // Developed by Manjistha Bidkar
// // import { downloadSubtitles } from './utils/downloader';
// // import { parseVttFile } from './utils/parser';
// // import { translateToEnglish } from './utils/translate';
// // import { loadConceptsFromExcel, identifyConcepts } from './utils/matchTopics';
// // import { config } from './config';
// // import path from 'path';
// // import fs from 'fs-extra';

// // async function main() {
// //   const videoUrl = process.argv[2];

// //   if (!videoUrl) {
// //     console.error('❌ Please provide a YouTube video URL as an argument.');
// //     process.exit(1);
// //   }

// //   try {
// //     const videoId = new URL(videoUrl).searchParams.get('v');
// //     if (!videoId) throw new Error('Invalid YouTube URL');

// //     await fs.ensureDir(config.DOWNLOAD_DIR);

// //     console.log('📥 Downloading subtitles...');
// //     const { filePath, langCode } = await downloadSubtitles(videoId, config.DOWNLOAD_DIR);
// //     console.log(`✅ Subtitles downloaded (${langCode}) → ${filePath}`);

// //     console.log('📃 Parsing subtitle file...');
// //     const transcript = await parseVttFile(filePath);

// //     console.log('🌐 Translating (if needed)...');
// //     const translated = await translateToEnglish(transcript);

// //     console.log('📚 Loading concepts...');
// //     const concepts = loadConceptsFromExcel(config.EXCEL_PATH);

// //     console.log('🔍 Matching topics...');
// //     const matched = identifyConcepts(translated, concepts);

// //     console.log('\n🎯 Matched Topics:');
// //     if (matched.length) {
// //       matched.forEach(topic => console.log('🔹', topic));
// //     } else {
// //       console.log('No matching topics found.');
// //     }
// //   } catch (err) {
// //     console.error('❌ Error:', err);
// //   }
// // }

// // main();


// // index.ts
// // Developed by Manjistha Bidkar

// import express from 'express';
// import path from 'path';
// import fs from 'fs-extra';
// import { downloadSubtitles } from './utils/downloader';
// import { parseVttFile } from './utils/parser';
// import { translateToEnglish } from './utils/translate';
// import { loadConceptsFromExcel, identifyConcepts } from './utils/matchTopics';
// import { config } from './config';
// import cookieUploadRoute from './routes/cookieUpload';

// const app = express();
// app.use(express.json());
// app.use(cookieUploadRoute); // ✅ For dynamic cookie upload

// app.get('/', async (req, res) => {
//   const videoUrl = req.query.url as string;

//   if (!videoUrl) {
//     return res.status(400).send('❌ Please provide a YouTube video URL as a query param `?url=`');
//   }

//   try {
//     const videoId = new URL(videoUrl).searchParams.get('v');
//     if (!videoId) throw new Error('Invalid YouTube URL');

//     await fs.ensureDir(config.DOWNLOAD_DIR);

//     console.log('📥 Downloading subtitles...');
//     const { filePath, langCode } = await downloadSubtitles(videoId, config.DOWNLOAD_DIR);
//     console.log(`✅ Subtitles downloaded (${langCode}) → ${filePath}`);

//     console.log('📃 Parsing subtitle file...');
//     const transcript = await parseVttFile(filePath);

//     console.log('🌐 Translating (if needed)...');
//     const translated = await translateToEnglish(transcript);

//     console.log('📚 Loading concepts...');
//     const concepts = loadConceptsFromExcel(config.EXCEL_PATH);

//     console.log('🔍 Matching topics...');
//     const matched = identifyConcepts(translated, concepts);

//     res.json({
//       message: '🎯 Matched Topics',
//       matchedTopics: matched,
//     });
//   } catch (err: any) {
//     console.error('❌ Error:', err);
//     res.status(500).json({ error: err.message });
//   }
// });

// async function runCLI() {
//   const videoUrl = process.argv[2];

//   if (!videoUrl) {
//     console.error('❌ Please provide a YouTube video URL as an argument.');
//     process.exit(1);
//   }

//   try {
//     const videoId = new URL(videoUrl).searchParams.get('v');
//     if (!videoId) throw new Error('Invalid YouTube URL');

//     await fs.ensureDir(config.DOWNLOAD_DIR);

//     console.log('📥 Downloading subtitles...');
//     const { filePath, langCode } = await downloadSubtitles(videoId, config.DOWNLOAD_DIR);
//     console.log(`✅ Subtitles downloaded (${langCode}) → ${filePath}`);

//     console.log('📃 Parsing subtitle file...');
//     const transcript = await parseVttFile(filePath);

//     console.log('🌐 Translating (if needed)...');
//     const translated = await translateToEnglish(transcript);

//     console.log('📚 Loading concepts...');
//     const concepts = loadConceptsFromExcel(config.EXCEL_PATH);

//     console.log('🔍 Matching topics...');
//     const matched = identifyConcepts(translated, concepts);

//     console.log('\n🎯 Matched Topics:');
//     if (matched.length) {
//       matched.forEach(topic => console.log('🔹', topic));
//     } else {
//       console.log('No matching topics found.');
//     }
//   } catch (err) {
//     console.error('❌ Error:', err);
//   }
// }

// // CLI mode or server mode
// if (process.argv.length > 2) {
//   runCLI();
// } else {
//   const PORT = process.env.PORT || 5000;
//   app.listen(PORT, () => {
//     console.log(`🚀 Server running on port ${PORT}`);
//   });
// }

import express from 'express';
import path from 'path';
import fs from 'fs-extra';
import { downloadSubtitles } from './utils/downloader';
import { parseVttFile } from './utils/parser';
import { translateToEnglish } from './utils/translate';
import { loadConceptsFromExcel, identifyConcepts } from './utils/matchTopics';
import { config } from './config';
import cookieUploadRoute from './routes/cookieUpload';

const app = express();
app.use(express.json());

// ✅ Mount routes with path so /upload-cookies becomes accessible
app.use('/', cookieUploadRoute);

app.get('/', async (req, res) => {
  const videoUrl = req.query.url as string;

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
      matchedTopics: matched,
    });
  } catch (err: any) {
    console.error('❌ Error:', err);
    res.status(500).json({ error: err.message });
  }
});

async function runCLI() {
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

// CLI mode or server mode
if (process.argv.length > 2) {
  runCLI();
} else {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}
