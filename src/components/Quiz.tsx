import { useMemo,useState } from 'react';
import { ArrowRight,Check,RotateCcw,X } from 'lucide-react';
import type { WordEntry } from '../types/Word';
import type { QuizAnswer,QuizMode,QuizQuestion } from '../types/Quiz';
import { generateQuiz } from '../utils/generateQuiz';
import { ExampleSentence } from './ExampleSentence';
import { SimilarityBadge,similarityLabels } from './SimilarityBadge';
import { SpeakButton } from './SpeakButton';

export function Quiz({words}:{words:WordEntry[]}){
  const [mode,setMode]=useState<QuizMode|null>(null);
  const [questions,setQuestions]=useState<QuizQuestion[]>([]);
  const [index,setIndex]=useState(0);
  const [selected,setSelected]=useState<string|null>(null);
  const [answers,setAnswers]=useState<QuizAnswer[]>([]);
  const begin=(nextMode:QuizMode,source=words)=>{
    setMode(nextMode);
    setQuestions(generateQuiz(source,nextMode,10,words));
    setIndex(0);setSelected(null);setAnswers([]);
  };
  if(!mode)return <section className="quiz-start"><p className="section-kicker">学んだことばを確かめる</p><h1>どちらから答えますか？</h1><p>監修済みの辞書データから10問を出題します。選択肢はテンポよく解ける三択です。</p><div className="mode-buttons"><button onClick={()=>begin('jaToZh')}><span>日本語</span><ArrowRight/><strong>中国語</strong><small>「手紙」を自然な中国語で言うと？</small></button><button onClick={()=>begin('zhToJa')}><span>中国語</span><ArrowRight/><strong>日本語</strong><small>「手纸」の意味は？</small></button></div></section>;
  if(index>=questions.length)return <QuizResult answers={answers} mode={mode} restart={()=>begin(mode)} review={()=>begin(mode,answers.filter(answer=>!answer.correct).map(answer=>answer.question.entry))} exit={()=>setMode(null)}/>;
  const question=questions[index];
  const submit=(option:string)=>{if(selected)return;setSelected(option);setAnswers(current=>[...current,{question,selected:option,correct:option===question.answer}]);};
  const next=()=>{setIndex(current=>current+1);setSelected(null);};
  const explanationExample=question.mode==='jaToZh'?(question.entry.equivalentChinese?.example??question.entry.example):question.entry.example;
  const spokenChinese=question.mode==='jaToZh'?(question.entry.equivalentChinese?.simplified??question.entry.chinese.simplified):question.entry.chinese.simplified;
  return <section className="quiz-play"><div className="quiz-progress"><span>{index+1} / {questions.length}</span><div><i style={{width:`${((index+1)/questions.length)*100}%`}}/></div></div><SimilarityBadge type={question.entry.similarityType}/><div className="quiz-question"><h1>{question.prompt}</h1>{question.mode==='zhToJa'&&<SpeakButton text={spokenChinese} label={`${spokenChinese}の発音を聞く`}/>}</div><div className="quiz-options">{question.options.map(option=><button key={option} disabled={!!selected} className={selected?(option===question.answer?'correct':option===selected?'wrong':'muted'):''} onClick={()=>submit(option)}>{option}{selected&&option===question.answer&&<Check/>}{selected&&option===selected&&option!==question.answer&&<X/>}</button>)}</div>{selected&&<div className={`feedback ${selected===question.answer?'ok':'ng'}`}><h2>{selected===question.answer?'正解！':'もう一歩'}</h2><p className="feedback-answer"><strong>{question.answer}</strong>{question.mode==='jaToZh'&&question.entry.equivalentChinese&&`　${question.entry.equivalentChinese.pinyin}`}<SpeakButton text={spokenChinese} label={`${spokenChinese}の発音を聞く`}/></p><p>{question.entry.note}</p>{explanationExample&&<ExampleSentence example={explanationExample}/>}<button onClick={next}>{index+1===questions.length?'結果を見る':'次の問題'}<ArrowRight/></button></div>}</section>;
}

function QuizResult({answers,mode,restart,review,exit}:{answers:QuizAnswer[];mode:QuizMode;restart:()=>void;review:()=>void;exit:()=>void}){
  const correct=answers.filter(answer=>answer.correct).length;
  const wrong=answers.filter(answer=>!answer.correct);
  const scores=useMemo(()=>['same','overlap','different'].map(type=>{const rows=answers.filter(answer=>answer.question.entry.similarityType===type);return{type:type as WordEntry['similarityType'],correct:rows.filter(answer=>answer.correct).length,total:rows.length};}),[answers]);
  return <section className="quiz-result"><p className="section-kicker">クイズ結果</p><h1><strong>{correct}</strong><span> / {answers.length}</span> 正解</h1><p>{correct===answers.length?'全問正解です。すばらしい！':correct>=7?'よくできました。間違えたことばを復習しましょう。':'辞書カードで意味の違いをもう一度確認しましょう。'}</p><div className="score-grid">{scores.map(score=><div key={score.type}><SimilarityBadge type={score.type}/><strong>{score.correct} / {score.total}</strong><span>{similarityLabels[score.type]}</span></div>)}</div><div className="result-actions">{wrong.length>0&&<button className="primary" onClick={review}>間違えた{wrong.length}問だけもう一度</button>}<button onClick={restart}><RotateCcw/>新しい10問</button><button onClick={exit}>出題方法を変える</button></div></section>;
}
