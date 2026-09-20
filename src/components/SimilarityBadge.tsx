import type { SimilarityType } from '../types/Word';
export const similarityLabels:Record<SimilarityType,string>={same:'ほぼ同じ',overlap:'微妙に違う',different:'要注意'};
export function SimilarityBadge({type}:{type:SimilarityType}){return <span className={`similarity-badge ${type}`}><i aria-hidden="true"/>{similarityLabels[type]}</span>}
