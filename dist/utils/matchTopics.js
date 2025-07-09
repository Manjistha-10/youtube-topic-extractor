// Developed by Manjistha Bidkar
import * as XLSX from 'xlsx';
import Fuse from 'fuse.js';
import { cleanText } from './textCleaner';
export function loadConceptsFromExcel(filePath) {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets['DSA_Concept_Graph'];
    const data = XLSX.utils.sheet_to_json(sheet);
    return data
        .map(row => row.Concept?.trim().toLowerCase())
        .filter((v) => !!v);
}
export function identifyConcepts(text, concepts) {
    const cleanedText = cleanText(text);
    const matchedConcepts = new Set();
    for (const concept of concepts) {
        if (cleanedText.includes(concept))
            matchedConcepts.add(concept);
    }
    const fuse = new Fuse(concepts.filter(c => !matchedConcepts.has(c)), {
        includeScore: true,
        threshold: 0.03,
        minMatchCharLength: 4
    });
    const words = cleanedText.split(/\s+/);
    const phrases = [...words];
    for (let i = 0; i < words.length - 1; i++) {
        phrases.push(`${words[i]} ${words[i + 1]}`);
        if (i < words.length - 2) {
            phrases.push(`${words[i]} ${words[i + 1]} ${words[i + 2]}`);
        }
    }
    for (const phrase of phrases) {
        const results = fuse.search(phrase);
        for (const result of results) {
            if (result.score !== undefined && result.score < 0.03) {
                matchedConcepts.add(result.item);
            }
        }
    }
    return Array.from(matchedConcepts);
}
