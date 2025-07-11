// // import express, { Request } from 'express';
// // import multer from 'multer';
// // import path from 'path';
// // import fs from 'fs-extra';
// // import { config } from '../config';

// // const router = express.Router();
// // const upload = multer({ dest: 'uploads/' });

// // router.post('/upload-cookies', upload.single('cookie'), async (req: Request & { file?: Express.Multer.File }, res) => {
// //   if (!req.file) {
// //     return res.status(400).send('No file uploaded.');
// //   }

// //   const targetPath = path.resolve(config.COOKIES_PATH);
// //   await fs.move(req.file.path, targetPath, { overwrite: true });
// //   console.log('✅ Cookies updated →', targetPath);
// //   res.send('Cookies file updated successfully.');
// // });

// // export default router;
// import express, { Request } from 'express';
// import multer from 'multer';
// import path from 'path';
// import fs from 'fs-extra';

// const router = express.Router();
// const upload = multer({ dest: 'uploads/' });

// router.post('/upload-cookies', upload.single('cookie'), async (req: Request & { file?: Express.Multer.File }, res) => {
//   const userId = req.query.userId as string;

//   if (!userId) return res.status(400).json({ error: 'Missing userId in query params.' });
//   if (!req.file) return res.status(400).json({ error: 'No file uploaded.' });

//   const targetDir = path.join(process.cwd(), 'cookies');
//   const targetPath = path.join(targetDir, `${userId}.txt`);

//   try {
//     await fs.ensureDir(targetDir);
//     await fs.move(req.file.path, targetPath, { overwrite: true });
//     console.log(`✅ Cookies updated for user: ${userId}`);
//     res.send('Cookies uploaded successfully.');
//   } catch (err) {
//     console.error('❌ Failed to save cookie file:', err);
//     res.status(500).json({ error: 'Failed to store cookies.' });
//   }
// });

// export default router;
// Developed by Manjistha Bidkar
import express from 'express';
import fs from 'fs-extra';
import path from 'path';
import { config } from '../config';

const router = express.Router();

// Middleware to parse text or JSON body
router.use(express.text({ type: 'text/plain' }));
router.use(express.json());

/**
 * Endpoint: POST /upload-cookies
 * Accepts plain text or JSON body: { cookiesText: "<cookie data>" }
 */
router.post('/upload-cookies', async (req, res) => {
  const cookiesText = req.body.cookiesText || req.body;

  if (!cookiesText || typeof cookiesText !== 'string') {
    return res.status(400).send('Invalid cookie content.');
  }

  try {
    const targetPath = path.resolve(config.COOKIES_PATH);
    await fs.outputFile(targetPath, cookiesText);
    console.log('✅ Cookies updated →', targetPath);
    res.send('Cookies file updated successfully.');
  } catch (error) {
    console.error('❌ Failed to save cookies:', error);
    res.status(500).send('Failed to save cookies file.');
  }
});

export default router;
