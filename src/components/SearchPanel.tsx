import { Search,RotateCcw } from 'lucide-react';
import type { CharacterRelation,LexicalRelation,SimilarityType } from '../types/Word';
import type { SearchOptions,SortKey } from '../utils/searchWords';

interface Props{options:SearchOptions;setOptions:(options:SearchOptions)=>void;resultCount:number;total:number}
const Select=({label,value,onChange,children}:{label:string;value:string;onChange:(value:string)=>void;children:React.ReactNode})=><label className="select-wrap"><span>{label}</span><select value={value} onChange={event=>onChange(event.target.value)}>{children}</select></label>;

export function SearchPanel({options,setOptions,resultCount,total}:Props){
  const set=<K extends keyof SearchOptions>(key:K,value:SearchOptions[K])=>setOptions({...options,[key]:value});
  const reset=()=>setOptions({query:'',similarity:'all',relation:'all',lexical:'all',sort:'caution'});
  return <section className="search-panel" aria-label="辞書検索">
    <label className="search"><Search aria-hidden="true"/><span className="sr-only">検索</span><input value={options.query} onChange={event=>set('query',event.target.value)} placeholder="単語・意味・ピンインで検索"/></label>
    <div className="result-count"><strong>{resultCount}</strong><span> / {total}語</span></div>
    <div className="filters">
      <Select label="類似度" value={options.similarity} onChange={value=>set('similarity',value as 'all'|SimilarityType)}><option value="all">すべて</option><option value="same">ほぼ同じ</option><option value="overlap">微妙に違う</option><option value="different">要注意</option></Select>
      <Select label="漢字の関係" value={options.relation} onChange={value=>set('relation',value as 'all'|CharacterRelation)}><option value="all">すべて</option><option value="identical">完全同形</option><option value="scriptVariant">字体差</option><option value="similar">類似漢字語</option></Select>
      <Select label="語としての関係" value={options.lexical} onChange={value=>set('lexical',value as 'all'|LexicalRelation)}><option value="all">すべて</option><option value="bothCommon">日中とも一般語</option><option value="chineseRareOrSpecialized">中国語では限定的</option><option value="chineseNotStandard">中国語では通常使わない</option></Select>
      <Select label="並び順" value={options.sort} onChange={value=>set('sort',value as SortKey)}><option value="caution">注意順</option><option value="high">類似度が高い順</option><option value="low">類似度が低い順</option><option value="kana">日本語かな順</option><option value="pinyin">ピンイン順</option></Select>
      <button className="reset" onClick={reset} aria-label="検索条件をリセット"><RotateCcw aria-hidden="true"/></button>
    </div>
  </section>;
}
