// import express, { Request } from 'express';
// import multer from 'multer';
// import path from 'path';
// import fs from 'fs-extra';
// import { config } from '../config';

// const router = express.Router();
// const upload = multer({ dest: 'uploads/' });

// router.post('/upload-cookies', upload.single('cookie'), async (req: Request & { file?: Express.Multer.File }, res) => {
//   if (!req.file) {
//     return res.status(400).send('No file uploaded.');
//   }

//   const targetPath = path.resolve(config.COOKIES_PATH);
//   await fs.move(req.file.path, targetPath, { overwrite: true });
//   console.log('✅ Cookies updated →', targetPath);
//   res.send('Cookies file updated successfully.');
// });

// export default router;
import express, { Request } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs-extra';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload-cookies', upload.single('cookie'), async (req: Request & { file?: Express.Multer.File }, res) => {
  const userId = req.query.userId as string;

  if (!userId) return res.status(400).json({ error: 'Missing userId in query params.' });
  if (!req.file) return res.status(400).json({ error: 'No file uploaded.' });

  const targetDir = path.join(process.cwd(), 'cookies');
  const targetPath = path.join(targetDir, `${userId}.txt`);

  try {
    await fs.ensureDir(targetDir);
    await fs.move(req.file.path, targetPath, { overwrite: true });
    console.log(`✅ Cookies updated for user: ${userId}`);
    res.send('Cookies uploaded successfully.');
  } catch (err) {
    console.error('❌ Failed to save cookie file:', err);
    res.status(500).json({ error: 'Failed to store cookies.' });
  }
});

export default router;
