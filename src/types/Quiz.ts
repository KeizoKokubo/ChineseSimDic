import type { SimilarityType, WordEntry } from './Word';
export type QuizMode='jaToZh'|'zhToJa';
export interface QuizQuestion { id:string; entry:WordEntry; mode:QuizMode; prompt:string; options:string[]; answer:string }
export interface QuizAnswer { question:QuizQuestion; selected:string; correct:boolean }
export interface CategoryScore { type:SimilarityType; correct:number; total:number }
