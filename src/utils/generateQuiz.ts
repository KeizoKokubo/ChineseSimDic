import type { WordEntry } from '../types/Word';
import type { QuizMode,QuizQuestion } from '../types/Quiz';

const shuffle=<T,>(items:T[])=>{
  const result=[...items];
  for(let index=result.length-1;index>0;index--){
    const swapIndex=Math.floor(Math.random()*(index+1));
    [result[index],result[swapIndex]]=[result[swapIndex],result[index]];
  }
  return result;
};
const unique=(items:string[])=>[...new Set(items.filter(Boolean))];
const answerFor=(entry:WordEntry,mode:QuizMode)=>mode==='jaToZh'
  ?(entry.equivalentChinese?.simplified??entry.chinese.simplified)
  :entry.chinese.meaning;
const eligibleForMode=(entry:WordEntry,mode:QuizMode)=>mode==='jaToZh'||entry.lexicalRelation==='bothCommon';

function relatedness(entry:WordEntry,candidate:WordEntry){
  const entryCharacters=new Set(entry.japanese.word);
  const sharedCharacters=[...candidate.japanese.word].filter(character=>entryCharacters.has(character)).length;
  return sharedCharacters*4
    +(entry.similarityType===candidate.similarityType?3:0)
    +(entry.lexicalRelation===candidate.lexicalRelation?2:0)
    +(entry.characterRelation===candidate.characterRelation?1:0);
}

function distractorsFor(entry:WordEntry,mode:QuizMode,pool:WordEntry[],answer:string){
  const misleadingHeadword=mode==='jaToZh'&&entry.chinese.simplified!==answer?[entry.chinese.simplified]:[];
  const ranked=shuffle(pool.filter(candidate=>candidate.id!==entry.id&&eligibleForMode(candidate,mode)))
    .sort((a,b)=>relatedness(entry,b)-relatedness(entry,a))
    .map(candidate=>answerFor(candidate,mode));
  return unique([...misleadingHeadword,...ranked]).filter(option=>option!==answer).slice(0,2);
}

export function generateQuiz(entries:WordEntry[],mode:QuizMode,count=10,distractorEntries:WordEntry[]=entries):QuizQuestion[]{
  const eligible=entries.filter(entry=>eligibleForMode(entry,mode));
  return shuffle(eligible).flatMap((entry,index)=>{
    const answer=answerFor(entry,mode);
    const distractors=distractorsFor(entry,mode,distractorEntries,answer);
    if(distractors.length<2)return [];
    return [{
      id:`${entry.id}-${mode}-${index}`,
      entry,
      mode,
      prompt:mode==='jaToZh'?`「${entry.japanese.word}」を自然な中国語で言うと？`:`中国語「${entry.chinese.simplified} ${entry.chinese.pinyin}」の意味は？`,
      options:shuffle([answer,...distractors]),
      answer,
    }];
  }).slice(0,Math.min(count,eligible.length));
}
