import { useState } from 'react';
import { Volume2 } from 'lucide-react';

interface Props{ text:string; label?:string; className?:string }

export function SpeakButton({text,label='中国語の発音を聞く',className=''}:Props){
  const [speaking,setSpeaking]=useState(false);
  const supported=typeof window!=='undefined'&&'speechSynthesis' in window;
  const speak=()=>{
    if(!supported)return;
    window.speechSynthesis.cancel();
    const utterance=new SpeechSynthesisUtterance(text);
    const voices=window.speechSynthesis.getVoices();
    utterance.voice=voices.find(voice=>voice.lang.toLowerCase()==='zh-cn')??voices.find(voice=>voice.lang.toLowerCase().startsWith('zh'))??null;
    utterance.lang='zh-CN';
    utterance.rate=.85;
    utterance.onstart=()=>setSpeaking(true);
    utterance.onend=()=>setSpeaking(false);
    utterance.onerror=()=>setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };
  return <button type="button" className={`speak-button ${speaking?'speaking':''} ${className}`.trim()} onClick={speak} disabled={!supported} aria-label={label} title={supported?label:'このブラウザは音声再生に対応していません'}><Volume2 aria-hidden="true"/></button>;
}
