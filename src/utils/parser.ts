// Developed by Manjistha Bidkar
import * as fs from 'fs-extra';
import * as path from 'path';
import * as readline from 'readline';

export async function parseVttFile(subtitleFile: string): Promise<string> {
  const filePath = path.resolve(subtitleFile);
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  const content: string[] = [];
  let lastLine = '';

  for await (const line of rl) {
    const cleanLine = line
      .trim()
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ');

    if (
      cleanLine === '' ||
      cleanLine.startsWith('WEBVTT') ||
      /^\d{2}:\d{2}/.test(cleanLine) ||
      cleanLine === lastLine
    ) continue;

    content.push(cleanLine);
    lastLine = cleanLine;
  }

  return content.join(' ').replace(/\s+/g, ' ').trim();
}
