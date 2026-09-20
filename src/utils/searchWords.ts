import type { CharacterRelation, LexicalRelation, SimilarityType, WordEntry } from '../types/Word';
import { normalizePinyin } from './normalizePinyin';

export type SortKey='caution'|'high'|'low'|'kana'|'pinyin';
export interface SearchOptions {
  query:string;
  similarity:'all'|SimilarityType;
  relation:'all'|CharacterRelation;
  lexical:'all'|LexicalRelation;
  sort:SortKey;
}

const searchableText=(word:WordEntry)=>[
  word.japanese.word,word.japanese.reading,word.japanese.meaning,
  word.chinese.simplified,word.chinese.traditional,word.chinese.pinyin,word.chinese.meaning,
  word.note,
  word.example?.chinese,word.example?.pinyin,word.example?.japanese,
  word.equivalentChinese?.simplified,word.equivalentChinese?.traditional,
  word.equivalentChinese?.pinyin,word.equivalentChinese?.meaning,
  word.equivalentChinese?.example.chinese,word.equivalentChinese?.example.pinyin,
  word.equivalentChinese?.example.japanese,
].filter(Boolean).join(' ').toLowerCase();

export function searchWords(words:WordEntry[],options:SearchOptions){
  const query=options.query.trim().toLowerCase();
  const normalizedQuery=normalizePinyin(query);
  return words.filter(word=>{
    const text=searchableText(word);
    const matchesQuery=!query||text.includes(query)||normalizePinyin(text).includes(normalizedQuery);
    return matchesQuery
      &&(options.similarity==='all'||word.similarityType===options.similarity)
      &&(options.relation==='all'||word.characterRelation===options.relation)
      &&(options.lexical==='all'||word.lexicalRelation===options.lexical);
  }).sort((a,b)=>options.sort==='high'?b.similarity-a.similarity
    :options.sort==='low'||options.sort==='caution'?a.similarity-b.similarity
    :options.sort==='kana'?a.japanese.reading.localeCompare(b.japanese.reading,'ja')
    :normalizePinyin(a.chinese.pinyin).localeCompare(normalizePinyin(b.chinese.pinyin)));
}
