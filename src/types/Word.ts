export type SimilarityType = 'same' | 'overlap' | 'different';
export type CharacterRelation = 'identical' | 'scriptVariant' | 'similar';
export type LexicalRelation = 'bothCommon' | 'chineseRareOrSpecialized' | 'chineseNotStandard';
export interface ExampleSentence { chinese:string; pinyin:string; japanese:string }
export interface ChineseEquivalent { simplified:string; traditional?:string; pinyin:string; meaning:string; example:ExampleSentence }
export interface WordEntry { id:number; japanese:{word:string;reading:string;meaning:string}; chinese:{simplified:string;traditional:string;pinyin:string;meaning:string}; similarity:number; similarityType:SimilarityType; characterRelation:CharacterRelation; lexicalRelation:LexicalRelation; example?:ExampleSentence; equivalentChinese?:ChineseEquivalent; note:string }
