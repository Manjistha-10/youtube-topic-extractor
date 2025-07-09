// // // // // // Developed by Manjistha Bidkar
// // // // // import { execa } from 'execa';
// // // // // import * as fs from 'fs';
// // // // // import * as path from 'path';
// // // // // import { config } from '../config';
// // // // // export interface SubtitleDownloadResult {
// // // // //   filePath: string;
// // // // //   langCode: string;
// // // // // }
// // // // // export async function downloadSubtitles(videoId: string): Promise<SubtitleDownloadResult> {
// // // // //   const baseUrl = `https://www.youtube.com/watch?v=${videoId}`;
// // // // //   const output = path.join(config.DOWNLOAD_DIR, `${videoId}.%(ext)s`);
// // // // //   try {
// // // // //     await execa('yt-dlp', [
// // // // //       '--write-auto-sub',
// // // // //       '--write-sub',
// // // // //       '--sub-lang', 'en',
// // // // //       '--skip-download',
// // // // //       '-o', output,
// // // // //       baseUrl,
// // // // //     ]);
// // // // //     const enVtt = fs.readdirSync(config.DOWNLOAD_DIR).find(f => f.startsWith(videoId) && f.endsWith('.en.vtt'));
// // // // //     if (enVtt) {
// // // // //       return { filePath: path.join(config.DOWNLOAD_DIR, enVtt), langCode: 'en' };
// // // // //     }
// // // // //   } catch {}
// // // // //   try {
// // // // //     await execa('yt-dlp', [
// // // // //       '--write-auto-sub',
// // // // //       '--write-sub',
// // // // //       '--sub-lang', 'best',
// // // // //       '--skip-download',
// // // // //       '-o', output,
// // // // //       baseUrl,
// // // // //     ]);
// // // // //     const fallback = fs.readdirSync(config.DOWNLOAD_DIR).find(f => f.startsWith(videoId) && f.endsWith('.vtt'));
// // // // //     if (fallback) {
// // // // //       const langMatch = fallback.match(/\.(\w+)\.vtt$/);
// // // // //       return {
// // // // //         filePath: path.join(config.DOWNLOAD_DIR, fallback),
// // // // //         langCode: langMatch?.[1] ?? 'unknown',
// // // // //       };
// // // // //     }
// // // // //   } catch (err) {
// // // // //     console.error(`Subtitle fallback failed:`, err);
// // // // //   }
// // // // //   throw new Error(`No subtitles found for video: ${videoId}`);
// // // // // }
// // // // // Developed by Manjistha Bidkar
// // // // import { execa } from 'execa';
// // // // import * as fs from 'fs';
// // // // import * as path from 'path';
// // // // import { config } from '../config';
// // // // export interface SubtitleDownloadResult {
// // // //   filePath: string;
// // // //   langCode: string;
// // // // }
// // // // export async function downloadSubtitles(
// // // //   videoId: string,
// // // //   outputDir: string,
// // // // ): Promise<SubtitleDownloadResult> {
// // // //   const baseUrl = `https://www.youtube.com/watch?v=${videoId}`;
// // // //   const output = path.join(outputDir, `${videoId}.%(ext)s`);
// // // //   const cookiesFile = config.COOKIES_PATH;
// // // //   // Ensure output directory exists
// // // //   if (!fs.existsSync(outputDir)) {
// // // //     fs.mkdirSync(outputDir, { recursive: true });
// // // //   }
// // // //   // Common yt-dlp arguments
// // // //   const commonArgs = [
// // // //     '--cookies', cookiesFile,
// // // //     '--no-check-certificate',
// // // //     '--write-auto-sub',
// // // //     '--write-sub',
// // // //     '--skip-download',
// // // //     '-o', output,
// // // //     baseUrl,
// // // //   ];
// // // //   if (config.PROXY) {
// // // //     commonArgs.unshift('--proxy', config.PROXY);
// // // //   }
// // // //   // Try downloading English subtitles first
// // // //   try {
// // // //     await execa('yt-dlp', ['--sub-lang', 'en', ...commonArgs]);
// // // //     const enVtt = fs.readdirSync(outputDir).find(f => f.startsWith(videoId) && f.endsWith('.en.vtt'));
// // // //     if (enVtt) {
// // // //       return { filePath: path.join(outputDir, enVtt), langCode: 'en' };
// // // //     }
// // // //   } catch (err) {
// // // //     console.warn(`English subtitles not found for ${videoId}. Falling back to best available language.`);
// // // //   }
// // // //   // Fallback to best available language
// // // //   try {
// // // //     await execa('yt-dlp', ['--sub-lang', 'best', ...commonArgs]);
// // // //     const fallback = fs.readdirSync(outputDir).find(f => f.startsWith(videoId) && f.endsWith('.vtt'));
// // // //     if (fallback) {
// // // //       const langMatch = fallback.match(/\.(\w+)\.vtt$/);
// // // //       const detectedLang = langMatch?.[1] ?? 'unknown';
// // // //       return { filePath: path.join(outputDir, fallback), langCode: detectedLang };
// // // //     }
// // // //   } catch (error) {
// // // //     console.error(`Failed to download subtitles for ${videoId}:`, error);
// // // //   }
// // // //   throw new Error(`No subtitles found for video: ${videoId}`);
// // // // }
// // // // Developed by Manjistha Bidkar
// // // const execa = require('execa');
// // // import * as fs from 'fs';
// // // import * as path from 'path';
// // // import { config } from '../config';
// // // export interface SubtitleDownloadResult {
// // //   filePath: string;
// // //   langCode: string;
// // // }
// // // export async function downloadSubtitles(
// // //   videoId: string,
// // //   outputDir: string,
// // // ): Promise<SubtitleDownloadResult> {
// // //   const baseUrl = `https://www.youtube.com/watch?v=${videoId}`;
// // //   const output = path.join(outputDir, `${videoId}.%(ext)s`);
// // //   const cookiesFile = config.COOKIES_PATH;
// // //   // Ensure output directory exists
// // //   if (!fs.existsSync(outputDir)) {
// // //     fs.mkdirSync(outputDir, { recursive: true });
// // //   }
// // //   const buildCommonArgs = () => {
// // //     const args = [
// // //       '--cookies', cookiesFile,
// // //       '--user-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
// // //       '--no-check-certificate',
// // //       '--write-auto-sub',
// // //       '--write-sub',
// // //       '--skip-download',
// // //       '-o', output,
// // //       baseUrl,
// // //     ];
// // //     if (config.PROXY) {
// // //       args.unshift('--proxy', config.PROXY);
// // //     }
// // //     return args;
// // //   };
// // //   const tryDownload = async (lang: string, maxRetries = 3): Promise<string | null> => {
// // //     for (let attempt = 1; attempt <= maxRetries; attempt++) {
// // //       try {
// // //         await execa.execa('yt-dlp', ['--sub-lang', lang, ...buildCommonArgs()]);
// // //         const match = lang === 'en' ? '.en.vtt' : '.vtt';
// // //         const subtitleFile = fs.readdirSync(outputDir).find(f => f.startsWith(videoId) && f.endsWith(match));
// // //         if (subtitleFile) {
// // //           return subtitleFile;
// // //         }
// // //       } catch (err: any) {
// // //         if (attempt === maxRetries) {
// // //           throw new Error(`Failed to download subtitles after ${maxRetries} attempts: ${err.message}`);
// // //         }
// // //         console.warn(`[Retry ${attempt}] Failed to download ${lang} subtitles for ${videoId}. Retrying...`);
// // //         await new Promise(res => setTimeout(res, 2000)); // Wait 2s before retry
// // //       }
// // //     }
// // //     return null; // In case nothing is found
// // //   };
// // //   // 1. Try English first
// // //   const enSubtitle = await tryDownload('en');
// // //   if (enSubtitle) {
// // //     return {
// // //       filePath: path.join(outputDir, enSubtitle),
// // //       langCode: 'en',
// // //     };
// // //   }
// // //   // 2. Fallback to best available
// // //   const fallbackSubtitle = await tryDownload('best');
// // //   if (fallbackSubtitle) {
// // //     const langMatch = fallbackSubtitle.match(/\.(\w+)\.vtt$/);
// // //     const detectedLang = langMatch?.[1] ?? 'unknown';
// // //     return {
// // //       filePath: path.join(outputDir, fallbackSubtitle),
// // //       langCode: detectedLang,
// // //     };
// // //   }
// // //   throw new Error(`No subtitles found for video: ${videoId}`);
// // // }
// // // Previous code:
// // /*
// // // Developed by Manjistha Bidkar
// // import execa from 'execa';
// // import * as fs from 'fs';
// // import * as path from 'path';
// // import { config } from '../config';
// // export interface SubtitleDownloadResult {
// //   filePath: string;
// // 	@@ -15,53 +16,73 @@ export async function downloadSubtitles(
// // ): Promise<SubtitleDownloadResult> {
// //   const baseUrl = `https://www.youtube.com/watch?v=${videoId}`;
// //   const output = path.join(outputDir, `${videoId}.%(ext)s`);
// //   const cookiesFile = config.COOKIES_PATH;
// //   // Ensure output directory exists
// //   if (!fs.existsSync(outputDir)) {
// //     fs.mkdirSync(outputDir, { recursive: true });
// //   }
// //   // Common yt-dlp arguments
// //   const commonArgs = [
// //     '--cookies', cookiesFile,
// //     '--no-check-certificate',
// //     '--write-auto-sub',
// //     '--write-sub',
// //     '--skip-download',
// //     '-o', output,
// //     baseUrl,
// //   ];
// //   if (config.PROXY) {
// //     commonArgs.unshift('--proxy', config.PROXY);
// //   }
// //   // Try downloading English subtitles first
// //   try {
// //     await execa('yt-dlp', ['--sub-lang', 'en', ...commonArgs]);
// //     const enVtt = fs.readdirSync(outputDir).find(f => f.startsWith(videoId) && f.endsWith('.en.vtt'));
// //     if (enVtt) {
// //       return { filePath: path.join(outputDir, enVtt), langCode: 'en' };
// //     }
// //   } catch (err) {
// //     console.warn(`English subtitles not found for ${videoId}. Falling back to best available language.`);
// //   }
// //   // Fallback to best available language
// //   try {
// //     await execa('yt-dlp', ['--sub-lang', 'best', ...commonArgs]);
// //     const fallback = fs.readdirSync(outputDir).find(f => f.startsWith(videoId) && f.endsWith('.vtt'));
// //     if (fallback) {
// //       const langMatch = fallback.match(/\.(\w+)\.vtt$/);
// //       const detectedLang = langMatch?.[1] ?? 'unknown';
// //       return { filePath: path.join(outputDir, fallback), langCode: detectedLang };
// //     }
// //   } catch (error) {
// //     console.error(`Failed to download subtitles for ${videoId}:`, error);
// //   }
// //   throw new Error(`No subtitles found for video: ${videoId}`);
// // }
// // */
// // // Developed by Manjistha Bidkar
// // import * as fs from 'fs';
// // import * as path from 'path';
// // import { config } from '../config';
// // import { getRandomUserAgent } from './userAgents';
// // export interface SubtitleDownloadResult {
// //   filePath: string;
// //   langCode: string;
// // }
// // export async function downloadSubtitles(
// //   videoId: string,
// //   outputDir: string,
// // ): Promise<SubtitleDownloadResult> {
// //   const baseUrl = `https://www.youtube.com/watch?v=${videoId}`;
// //   const output = path.join(outputDir, `${videoId}.%(ext)s`);
// //   const cookiesFile = config.COOKIES_PATH;
// //   // Ensure output directory exists
// //   if (!fs.existsSync(outputDir)) {
// //     fs.mkdirSync(outputDir, { recursive: true });
// //   }
// //   const buildCommonArgs = () => {
// //     const userAgent = getRandomUserAgent();
// //     const args = [
// //       '--cookies', cookiesFile,
// //       '--user-agent', userAgent,
// //       '--no-check-certificate',
// //       '--write-auto-sub',
// //       '--write-sub',
// //       '--skip-download',
// //       '-o', output,
// //       baseUrl,
// //     ];
// //     if (config.PROXY) {
// //       args.unshift('--proxy', config.PROXY);
// //     }
// //     return args;
// //   };
// //   const tryDownload = async (lang: string, maxRetries = 3): Promise<string | null> => {
// //   const { execa } = await import('execa');  // ✅ ESM-compatible import
// //   for (let attempt = 1; attempt <= maxRetries; attempt++) {
// //     try {
// //       await execa('yt-dlp', ['--sub-lang', lang, ...buildCommonArgs()]);
// //       const match = lang === 'en' ? '.en.vtt' : '.vtt';
// //       const subtitleFile = fs.readdirSync(outputDir).find(f => f.startsWith(videoId) && f.endsWith(match));
// //       if (subtitleFile) {
// //         return subtitleFile;
// //       }
// //     } catch (err: any) {
// //       if (attempt === maxRetries) {
// //         throw new Error(`Failed to download subtitles after ${maxRetries} attempts: ${err.message}`);
// //       }
// //       console.warn(`[Retry ${attempt}] Failed to download ${lang} subtitles for ${videoId}. Retrying...`);
// //       await new Promise(res => setTimeout(res, 2000));
// //     }
// //   }
// //   return null;
// // };
// //   // 1. Try English first
// //   const enSubtitle = await tryDownload('en');
// //   if (enSubtitle) {
// //     return {
// //       filePath: path.join(outputDir, enSubtitle),
// //       langCode: 'en',
// //     };
// //   }
// //   // 2. Fallback to best available
// //   const fallbackSubtitle = await tryDownload('best');
// //   if (fallbackSubtitle) {
// //     const langMatch = fallbackSubtitle.match(/\.(\w+)\.vtt$/);
// //     const detectedLang = langMatch?.[1] ?? 'unknown';
// //     return {
// //       filePath: path.join(outputDir, fallbackSubtitle),
// //       langCode: detectedLang,
// //     };
// //   }
// //   throw new Error(`No subtitles found for video: ${videoId}`);
// // }
// import * as fs from 'fs';
// import * as path from 'path';
// import { config } from '../config.js';
// import { getRandomUserAgent } from './userAgents.js';
// export interface SubtitleDownloadResult {
//   filePath: string;
//   langCode: string;
// }
// export async function downloadSubtitles(
//   videoId: string,
//   outputDir: string,
// ): Promise<SubtitleDownloadResult> {
//   const baseUrl = `https://www.youtube.com/watch?v=${videoId}`;
//   const output = path.join(outputDir, `${videoId}.%(ext)s`);
//   const cookiesFile = config.COOKIES_PATH;
//   if (!fs.existsSync(outputDir)) {
//     fs.mkdirSync(outputDir, { recursive: true });
//   }
//   const buildCommonArgs = () => {
//     const userAgent = getRandomUserAgent();
//     const args = [
//       '--cookies', cookiesFile,
//       '--user-agent', userAgent,
//       '--no-check-certificate',
//       '--write-auto-sub',
//       '--write-sub',
//       '--skip-download',
//       '-o', output,
//       baseUrl,
//     ];
//     if (config.PROXY) {
//       args.unshift('--proxy', config.PROXY);
//     }
//     return args;
//   };
//   const tryDownload = async (lang: string, maxRetries = 3): Promise<string | null> => {
//     const { execa } = await import('execa');
//     for (let attempt = 1; attempt <= maxRetries; attempt++) {
//       try {
//         await execa('yt-dlp', ['--sub-lang', lang, ...buildCommonArgs()]);
//         const match = lang === 'en' ? '.en.vtt' : '.vtt';
//         const subtitleFile = fs.readdirSync(outputDir).find(f => f.startsWith(videoId) && f.endsWith(match));
//         if (subtitleFile) return subtitleFile;
//       } catch (err: any) {
//         if (attempt === maxRetries) {
//           throw new Error(`Failed to download subtitles after ${maxRetries} attempts: ${err.message}`);
//         }
//         console.warn(`[Retry ${attempt}] Failed to download ${lang} subtitles. Retrying...`);
//         await new Promise(res => setTimeout(res, 2000));
//       }
//     }
//     return null;
//   };
//   const enSubtitle = await tryDownload('en');
//   if (enSubtitle) {
//     return { filePath: path.join(outputDir, enSubtitle), langCode: 'en' };
//   }
//   const fallbackSubtitle = await tryDownload('best');
//   if (fallbackSubtitle) {
//     const langMatch = fallbackSubtitle.match(/\.(\w+)\.vtt$/);
//     const detectedLang = langMatch?.[1] ?? 'unknown';
//     return {
//       filePath: path.join(outputDir, fallbackSubtitle),
//       langCode: detectedLang,
//     };
//   }
//   throw new Error(`No subtitles found for video: ${videoId}`);
// }
// Developed by Manjistha Bidkar
const execa = require('execa');
import * as fs from 'fs';
import * as path from 'path';
import { config } from '../config';
import { getRandomUserAgent } from './userAgents';
export async function downloadSubtitles(videoId, outputDir) {
    const baseUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const output = path.join(outputDir, `${videoId}.%(ext)s`);
    const cookiesFile = config.COOKIES_PATH;
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    const buildCommonArgs = () => {
        const userAgent = getRandomUserAgent();
        const args = [
            '--cookies', cookiesFile,
            '--user-agent', userAgent,
            '--no-check-certificate',
            '--write-auto-sub',
            '--write-sub',
            '--skip-download',
            '-o', output,
            baseUrl,
        ];
        if (config.PROXY) {
            args.unshift('--proxy', config.PROXY);
        }
        return args;
    };
    const tryDownload = async (lang, maxRetries = 3) => {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                await execa.execa('yt-dlp', ['--sub-lang', lang, ...buildCommonArgs()]);
                const match = lang === 'en' ? '.en.vtt' : '.vtt';
                const subtitleFile = fs.readdirSync(outputDir).find(f => f.startsWith(videoId) && f.endsWith(match));
                if (subtitleFile) {
                    return subtitleFile;
                }
            }
            catch (err) {
                if (attempt === maxRetries) {
                    throw new Error(`Failed to download subtitles after ${maxRetries} attempts: ${err.message}`);
                }
                console.warn(`[Retry ${attempt}] Failed to download ${lang} subtitles for ${videoId}. Retrying...`);
                await new Promise(res => setTimeout(res, 2000));
            }
        }
        return null;
    };
    // 1. Try English first
    const enSubtitle = await tryDownload('en');
    if (enSubtitle) {
        return {
            filePath: path.join(outputDir, enSubtitle),
            langCode: 'en',
        };
    }
    // 2. Fallback to best available
    const fallbackSubtitle = await tryDownload('best');
    if (fallbackSubtitle) {
        const langMatch = fallbackSubtitle.match(/\.(\w+)\.vtt$/);
        const detectedLang = langMatch?.[1] ?? 'unknown';
        return {
            filePath: path.join(outputDir, fallbackSubtitle),
            langCode: detectedLang,
        };
    }
    throw new Error(`No subtitles found for video: ${videoId}`);
}
