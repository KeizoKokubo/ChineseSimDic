import type { ExampleSentence as Example } from '../types/Word';
export function ExampleSentence({example}:{example:Example}){return <section className="example"><h4>例文</h4><p><b>中</b><span>{example.chinese}</span></p><p className="pinyin-line"><b>音</b><span>{example.pinyin}</span></p><p><b>日</b><span>{example.japanese}</span></p></section>}
