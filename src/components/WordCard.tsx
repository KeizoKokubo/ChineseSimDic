import { ArrowRight,Info,Languages } from 'lucide-react';
import type { LexicalRelation,WordEntry } from '../types/Word';
import { ExampleSentence } from './ExampleSentence';
import { SimilarityBadge } from './SimilarityBadge';
import { SimilarityMeter } from './SimilarityMeter';

const relationLabels={identical:'完全同形',scriptVariant:'字体差',similar:'類似漢字語'};
const lexicalContent:Record<Exclude<LexicalRelation,'bothCommon'>,{label:string;description:string}>={
  chineseRareOrSpecialized:{label:'中国語では限定的',description:'この語は中国語にも存在しますが、日常的な標準語としては限定的です。'},
  chineseNotStandard:{label:'中国語では通常使わない',description:'現代標準中国語では、通常は別の語を使います。'},
};

function Equivalent({word}:{word:WordEntry}){
  const equivalent=word.equivalentChinese;
  if(!equivalent)return null;
  return <section className="equivalent">
    <p>🇨🇳 日本語の意味を中国語で言うなら</p>
    <div className="equivalent-word"><strong>{equivalent.simplified}</strong>{equivalent.traditional&&equivalent.traditional!==equivalent.simplified&&<small>繁 {equivalent.traditional}</small>}<span>{equivalent.pinyin}</span><ArrowRight aria-hidden="true"/><span>{equivalent.meaning}</span></div>
    <ExampleSentence example={equivalent.example}/>
  </section>;
}

export function WordCard({word}:{word:WordEntry}){
  const lexical=word.lexicalRelation==='bothCommon'?null:lexicalContent[word.lexicalRelation];
  const hasDifferentEquivalent=word.similarityType==='different'&&!!word.equivalentChinese;
  return <article className="word-card">
    <header className="word-head"><div><h2>{word.japanese.word}</h2><p>{word.japanese.reading}</p></div><div><SimilarityBadge type={word.similarityType}/><span className="relation"><Languages aria-hidden="true"/>{relationLabels[word.characterRelation]}</span></div></header>
    {lexical&&<section className={`lexical-status ${word.lexicalRelation}`}><Info aria-hidden="true"/><div><strong>{lexical.label}</strong><p>{lexical.description}</p></div></section>}
    <div className="language-compare"><section className="ja"><h3>日本語</h3><p>{word.japanese.meaning}</p></section><section className="zh"><h3>{hasDifferentEquivalent?'⚠ 同じ漢字の中国語':'中国語'}</h3><div className="chinese-word"><strong>{word.chinese.simplified}</strong>{word.chinese.traditional!==word.chinese.simplified&&<small>繁 {word.chinese.traditional}</small>}</div><em>{word.chinese.pinyin}</em><p>{word.chinese.meaning}</p></section></div>
    <SimilarityMeter value={word.similarity} type={word.similarityType}/>
    {word.example&&<ExampleSentence example={word.example}/>}<Equivalent word={word}/>
    <aside className="note"><h4>メモ・注意点</h4><p>{word.note}</p></aside>
  </article>;
}
