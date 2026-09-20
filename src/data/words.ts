import type { CharacterRelation, LexicalRelation, SimilarityType, WordEntry } from '../types/Word';

// 監修版データ。similarity は日本人中国語学習者向けの学習上の目安であり、言語学的な絶対尺度ではありません。
type EquivalentSeed = {
  simplified: string; traditional: string; pinyin: string; meaning: string;
  example: { chinese: string; pinyin: string; japanese: string };
};

const equivalents: Record<string, EquivalentSeed> = {
  '手紙': { simplified: '信', traditional: '信', pinyin: 'xìn', meaning: '手紙',
    example: { chinese: '我给朋友写了一封信。', pinyin: 'Wǒ gěi péngyou xiě le yì fēng xìn.', japanese: '友達に手紙を書きました。' } },
  '愛人': { simplified: '情人', traditional: '情人', pinyin: 'qíng rén', meaning: '恋人・愛人（文脈による）',
    example: { chinese: '他瞒着家人和情人见面。', pinyin: 'Tā mánzhe jiārén hé qíngrén jiànmiàn.', japanese: '彼は家族に隠れて愛人と会いました。' } },
  '経理': { simplified: '会计', traditional: '會計', pinyin: 'kuài jì', meaning: '経理、会計',
    example: { chinese: '她在公司做会计。', pinyin: 'Tā zài gōngsī zuò kuàijì.', japanese: '彼女は会社で経理をしています。' } },
  '階段': { simplified: '楼梯', traditional: '樓梯', pinyin: 'lóu tī', meaning: '階段',
    example: { chinese: '请走楼梯上二楼。', pinyin: 'Qǐng zǒu lóutī shàng èr lóu.', japanese: '階段で2階へ上がってください。' } },
  '娘': { simplified: '女儿', traditional: '女兒', pinyin: 'nǚ ér', meaning: '娘',
    example: { chinese: '我女儿今年十岁。', pinyin: 'Wǒ nǚ\'ér jīnnián shí suì.', japanese: '私の娘は今年10歳です。' } },
  '外人': { simplified: '外国人', traditional: '外國人', pinyin: 'wài guó rén', meaning: '外国人',
    example: { chinese: '这里有很多外国游客。', pinyin: 'Zhèlǐ yǒu hěn duō wàiguó yóukè.', japanese: 'ここには外国人観光客がたくさんいます。' } },
  '工夫': { simplified: '想办法', traditional: '想辦法', pinyin: 'xiǎng bàn fǎ', meaning: '工夫する、方法を考える',
    example: { chinese: '我们得想办法解决这个问题。', pinyin: 'Wǒmen děi xiǎng bànfǎ jiějué zhège wèntí.', japanese: 'この問題を解決する方法を工夫しなければなりません。' } },
  '厳重': { simplified: '严格', traditional: '嚴格', pinyin: 'yán gé', meaning: '厳しく、厳重に（文脈による）',
    example: { chinese: '入口处有严格的安全检查。', pinyin: 'Rùkǒuchù yǒu yángé de ānquán jiǎnchá.', japanese: '入口では厳重な安全検査があります。' } },
  '先生': { simplified: '老师', traditional: '老師', pinyin: 'lǎo shī', meaning: '先生、教師',
    example: { chinese: '老师正在给学生上课。', pinyin: 'Lǎoshī zhèngzài gěi xuésheng shàngkè.', japanese: '先生は学生に授業をしています。' } },
  '勉強': { simplified: '学习', traditional: '學習', pinyin: 'xué xí', meaning: '勉強する',
    example: { chinese: '我每天学习汉语。', pinyin: 'Wǒ měitiān xuéxí Hànyǔ.', japanese: '私は毎日中国語を勉強します。' } },
  '汽車': { simplified: '火车', traditional: '火車', pinyin: 'huǒ chē', meaning: '列車',
    example: { chinese: '我们坐火车去上海。', pinyin: 'Wǒmen zuò huǒchē qù Shànghǎi.', japanese: '私たちは列車で上海へ行きます。' } },
  '丈夫': { simplified: '结实', traditional: '結實', pinyin: 'jiē shi', meaning: '丈夫な、頑丈な',
    example: { chinese: '这个箱子很结实。', pinyin: 'Zhège xiāngzi hěn jiēshi.', japanese: 'この箱はとても丈夫です。' } },
  '老婆': { simplified: '老太太', traditional: '老太太', pinyin: 'lǎo tài tai', meaning: '老婦人',
    example: { chinese: '那位老太太每天来公园散步。', pinyin: 'Nà wèi lǎotàitai měitiān lái gōngyuán sànbù.', japanese: 'あの老婦人は毎日公園へ散歩に来ます。' } },
  '大家': { simplified: '大师', traditional: '大師', pinyin: 'dà shī', meaning: '大家、巨匠',
    example: { chinese: '他是著名的书法大师。', pinyin: 'Tā shì zhùmíng de shūfǎ dàshī.', japanese: '彼は著名な書道の大家です。' } },
  '新聞': { simplified: '报纸', traditional: '報紙', pinyin: 'bào zhǐ', meaning: '新聞紙',
    example: { chinese: '爸爸每天早上看报纸。', pinyin: 'Bàba měitiān zǎoshang kàn bàozhǐ.', japanese: '父は毎朝新聞を読みます。' } },
  '合同': { simplified: '联合', traditional: '聯合', pinyin: 'lián hé', meaning: '合同の、共同の',
    example: { chinese: '两家公司联合举办了活动。', pinyin: 'Liǎng jiā gōngsī liánhé jǔbàn le huódòng.', japanese: '2社が合同でイベントを開催しました。' } },
  '便宜': { simplified: '方便', traditional: '方便', pinyin: 'fāng biàn', meaning: '都合がよい、便利だ',
    example: { chinese: '你什么时候方便？', pinyin: 'Nǐ shénme shíhou fāngbiàn?', japanese: 'いつご都合がよいですか。' } },
  '放心': { simplified: '发呆', traditional: '發呆', pinyin: 'fā dāi', meaning: '放心する、ぼんやりする',
    example: { chinese: '他一个人坐在那里发呆。', pinyin: 'Tā yí ge rén zuò zài nàli fādāi.', japanese: '彼は一人でそこに座ってぼんやりしていました。' } },
  '小心': { simplified: '胆小', traditional: '膽小', pinyin: 'dǎn xiǎo', meaning: '小心な、臆病な',
    example: { chinese: '他从小就比较胆小。', pinyin: 'Tā cóngxiǎo jiù bǐjiào dǎnxiǎo.', japanese: '彼は小さいころから比較的臆病です。' } },
  '走': { simplified: '跑', traditional: '跑', pinyin: 'pǎo', meaning: '走る',
    example: { chinese: '他每天早上跑五公里。', pinyin: 'Tā měitiān zǎoshang pǎo wǔ gōnglǐ.', japanese: '彼は毎朝5キロ走ります。' } },
  '湯': { simplified: '热水', traditional: '熱水', pinyin: 'rè shuǐ', meaning: 'お湯',
    example: { chinese: '请给我一杯热水。', pinyin: 'Qǐng gěi wǒ yì bēi rèshuǐ.', japanese: 'お湯を一杯ください。' } },
  '机': { simplified: '桌子', traditional: '桌子', pinyin: 'zhuō zi', meaning: '机、テーブル',
    example: { chinese: '书放在桌子上。', pinyin: 'Shū fàng zài zhuōzi shàng.', japanese: '本は机の上にあります。' } },
  '前年': { simplified: '去年', traditional: '去年', pinyin: 'qù nián', meaning: '前年・去年（現在を基準にする場合）',
    example: { chinese: '去年我去了北京。', pinyin: 'Qùnián wǒ qù le Běijīng.', japanese: '去年、私は北京へ行きました。' } },
  '前年同期': { simplified: '去年同期', traditional: '去年同期', pinyin: 'qù nián tóng qī', meaning: '前年同期（現在年との比較）',
    example: { chinese: '销售额比去年同期增长了。', pinyin: 'Xiāoshòu\'é bǐ qùnián tóngqī zēngzhǎng le.', japanese: '売上高は前年同期より増加しました。' } },
  '前年以前': { simplified: '去年以前', traditional: '去年以前', pinyin: 'qù nián yǐ qián', meaning: '前年以前（現在を基準にする場合）',
    example: { chinese: '这些资料都是去年以前的。', pinyin: 'Zhèxiē zīliào dōu shì qùnián yǐqián de.', japanese: 'これらの資料はすべて前年以前のものです。' } },
  '看病': { simplified: '照顾病人', traditional: '照顧病人', pinyin: 'zhào gù bìng rén', meaning: '病人を看病する',
    example: { chinese: '她请假在家照顾病人。', pinyin: 'Tā qǐngjià zài jiā zhàogù bìngrén.', japanese: '彼女は休みを取って家で病人を看病しています。' } },
  '告訴': { simplified: '控告', traditional: '控告', pinyin: 'kòng gào', meaning: '告訴する、訴える',
    example: { chinese: '受害者决定控告对方。', pinyin: 'Shòuhàizhě juédìng kònggào duìfāng.', japanese: '被害者は相手を告訴することにしました。' } },
  '迷惑': { simplified: '添麻烦', traditional: '添麻煩', pinyin: 'tiān má fan', meaning: '迷惑をかける',
    example: { chinese: '给你添麻烦了。', pinyin: 'Gěi nǐ tiān máfan le.', japanese: 'ご迷惑をおかけしました。' } },
  '麻雀': { simplified: '麻将', traditional: '麻將', pinyin: 'má jiàng', meaning: '麻雀ゲーム',
    example: { chinese: '他们周末一起打麻将。', pinyin: 'Tāmen zhōumò yìqǐ dǎ májiàng.', japanese: '彼らは週末に一緒に麻雀をします。' } },
  '怪我': { simplified: '受伤', traditional: '受傷', pinyin: 'shòu shāng', meaning: 'けがをする',
    example: { chinese: '他在比赛中受伤了。', pinyin: 'Tā zài bǐsài zhōng shòushāng le.', japanese: '彼は試合中にけがをしました。' } },
  '切手': { simplified: '邮票', traditional: '郵票', pinyin: 'yóu piào', meaning: '郵便切手',
    example: { chinese: '我买了两张邮票。', pinyin: 'Wǒ mǎi le liǎng zhāng yóupiào.', japanese: '切手を2枚買いました。' } },
  '無料': { simplified: '免费', traditional: '免費', pinyin: 'miǎn fèi', meaning: '無料',
    example: { chinese: '这个展览免费开放。', pinyin: 'Zhège zhǎnlǎn miǎnfèi kāifàng.', japanese: 'この展覧会は無料で公開されています。' } },
  '人参': { simplified: '胡萝卜', traditional: '胡蘿蔔', pinyin: 'hú luó bo', meaning: 'ニンジン',
    example: { chinese: '我买了两根胡萝卜。', pinyin: 'Wǒ mǎi le liǎng gēn húluóbo.', japanese: 'ニンジンを2本買いました。' } },
  '汽水': { simplified: '咸淡水', traditional: '鹹淡水', pinyin: 'xián dàn shuǐ', meaning: '汽水、塩分を含む淡水',
    example: { chinese: '河口地区常有咸淡水。', pinyin: 'Hékǒu dìqū cháng yǒu xiándànshuǐ.', japanese: '河口地域には汽水がよく見られます。' } },
  '料理': { simplified: '饭菜', traditional: '飯菜', pinyin: 'fàn cài', meaning: '料理、食事',
    example: { chinese: '妈妈做的饭菜很好吃。', pinyin: 'Māma zuò de fàncài hěn hǎochī.', japanese: '母の作る料理はとてもおいしいです。' } },
  '大丈夫': { simplified: '没事', traditional: '沒事', pinyin: 'méi shì', meaning: '大丈夫、問題ない',
    example: { chinese: '别担心，我没事。', pinyin: 'Bié dānxīn, wǒ méi shì.', japanese: '心配しないで、私は大丈夫です。' } },
  '文句': { simplified: '抱怨', traditional: '抱怨', pinyin: 'bào yuàn', meaning: '文句を言う、不平を言う',
    example: { chinese: '他总是抱怨工作太多。', pinyin: 'Tā zǒngshì bàoyuàn gōngzuò tài duō.', japanese: '彼はいつも仕事が多すぎると文句を言います。' } },
  '検討': { simplified: '考虑', traditional: '考慮', pinyin: 'kǎo lǜ', meaning: '検討する、考慮する',
    example: { chinese: '我们再考虑一下这个方案。', pinyin: 'Wǒmen zài kǎolǜ yíxià zhège fāng\'àn.', japanese: 'この案をもう一度検討しましょう。' } },
  '商売': { simplified: '生意', traditional: '生意', pinyin: 'shēng yi', meaning: '商売',
    example: { chinese: '这家店的生意很好。', pinyin: 'Zhè jiā diàn de shēngyi hěn hǎo.', japanese: 'この店は商売が繁盛しています。' } },
  '仕事': { simplified: '工作', traditional: '工作', pinyin: 'gōng zuò', meaning: '仕事、働く',
    example: { chinese: '我今天有很多工作。', pinyin: 'Wǒ jīntiān yǒu hěn duō gōngzuò.', japanese: '今日は仕事がたくさんあります。' } },
  '約束': { simplified: '约定', traditional: '約定', pinyin: 'yuē dìng', meaning: '約束、取り決め',
    example: { chinese: '我们约定明天再见。', pinyin: 'Wǒmen yuēdìng míngtiān zàijiàn.', japanese: '私たちは明日また会うと約束しました。' } },
  '心配': { simplified: '担心', traditional: '擔心', pinyin: 'dān xīn', meaning: '心配する',
    example: { chinese: '别担心，我会准时回来。', pinyin: 'Bié dānxīn, wǒ huì zhǔnshí huílái.', japanese: '心配しないで、時間どおり戻ります。' } },
  '野菜': { simplified: '蔬菜', traditional: '蔬菜', pinyin: 'shū cài', meaning: '野菜',
    example: { chinese: '多吃蔬菜对身体有好处。', pinyin: 'Duō chī shūcài duì shēntǐ yǒu hǎochu.', japanese: '野菜を多く食べることは体によいです。' } },
  '運転': { simplified: '开车', traditional: '開車', pinyin: 'kāi chē', meaning: '車を運転する',
    example: { chinese: '他每天开车上班。', pinyin: 'Tā měitiān kāichē shàngbān.', japanese: '彼は毎日車を運転して出勤します。' } },
  '到着': { simplified: '到达', traditional: '到達', pinyin: 'dào dá', meaning: '到着する',
    example: { chinese: '火车已经到达北京了。', pinyin: 'Huǒchē yǐjīng dàodá Běijīng le.', japanese: '列車はすでに北京に到着しました。' } },
  '写真': { simplified: '照片', traditional: '照片', pinyin: 'zhào piàn', meaning: '写真、写真画像',
    example: { chinese: '这张照片是去年拍的。', pinyin: 'Zhè zhāng zhàopiàn shì qùnián pāi de.', japanese: 'この写真は去年撮ったものです。' } },
  '携帯': { simplified: '手机', traditional: '手機', pinyin: 'shǒu jī', meaning: '携帯電話',
    example: { chinese: '我的手机没电了。', pinyin: 'Wǒ de shǒujī méi diàn le.', japanese: '私の携帯電話は充電が切れました。' } },
  '情報': { simplified: '信息', traditional: '信息', pinyin: 'xìn xī', meaning: '情報',
    example: { chinese: '请把最新信息发给我。', pinyin: 'Qǐng bǎ zuìxīn xìnxī fā gěi wǒ.', japanese: '最新の情報を送ってください。' } },
  '時計': { simplified: '钟表', traditional: '鐘錶', pinyin: 'zhōng biǎo', meaning: '時計一般',
    example: { chinese: '这家店卖各种钟表。', pinyin: 'Zhè jiā diàn mài gèzhǒng zhōngbiǎo.', japanese: 'この店はいろいろな時計を売っています。' } },
  '映画': { simplified: '电影', traditional: '電影', pinyin: 'diàn yǐng', meaning: '映画',
    example: { chinese: '我们晚上去看电影吧。', pinyin: 'Wǒmen wǎnshang qù kàn diànyǐng ba.', japanese: '今晩、映画を見に行きましょう。' } },
  '病院': { simplified: '医院', traditional: '醫院', pinyin: 'yī yuàn', meaning: '病院',
    example: { chinese: '他在医院工作。', pinyin: 'Tā zài yīyuàn gōngzuò.', japanese: '彼は病院で働いています。' } },
  '貯金': { simplified: '存钱', traditional: '存錢', pinyin: 'cún qián', meaning: '貯金する',
    example: { chinese: '我每个月都会存一点钱。', pinyin: 'Wǒ měi ge yuè dōu huì cún yìdiǎn qián.', japanese: '私は毎月少しずつ貯金します。' } },
  '注文': { simplified: '订购', traditional: '訂購', pinyin: 'dìng gòu', meaning: '商品を注文する',
    example: { chinese: '我在网上订购了一本书。', pinyin: 'Wǒ zài wǎngshàng dìnggòu le yì běn shū.', japanese: '私はネットで本を1冊注文しました。' } },
};

type Seed = {
  ja: [word: string, reading: string, meaning: string];
  zh: [simplified: string, traditional: string, pinyin: string, meaning: string];
  similarity: number; type: SimilarityType; characters: CharacterRelation; lexical: LexicalRelation;
  example?: [chinese: string, pinyin: string, japanese: string];
  note: string; equivalentKey?: string;
};

const seeds: Seed[] = [
  {
    ja: ['図書館', 'としょかん', '本や資料を収集・公開する施設'],
    zh: ['图书馆', '圖書館', 'tú shū guǎn', '図書館'],
    similarity: 98, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['我常去图书馆学习。', 'Wǒ cháng qù túshūguǎn xuéxí.', '私はよく図書館へ勉強に行きます。'],
    note: '意味はほぼ同じ。',
  },
  {
    ja: ['問題', 'もんだい', '解決すべき事柄、問い'],
    zh: ['问题', '問題', 'wèn tí', '問題、質問'],
    similarity: 88, type: 'overlap' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['我想问一个问题。', 'Wǒ xiǎng wèn yí ge wèntí.', '一つ質問したいです。'],
    note: '中国語では「質問」の意味でも非常によく使う。',
  },
  {
    ja: ['手紙', 'てがみ', '書いて人に送る文書'],
    zh: ['手纸', '手紙', 'shǒu zhǐ', 'トイレットペーパー、ちり紙'],
    similarity: 5, type: 'different' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['厕所里没有手纸了。', 'Cèsuǒ lǐ méiyǒu shǒuzhǐ le.', 'トイレにトイレットペーパーがありません。'],
    note: '日本語の意味とは大きく異なる要注意語。', equivalentKey: '手紙'
  },
  {
    ja: ['愛人', 'あいじん', '配偶者以外の恋愛関係の相手'],
    zh: ['爱人', '愛人', 'ài ren', '配偶者、恋人'],
    similarity: 18, type: 'different' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['他爱人是医生。', 'Tā àiren shì yīshēng.', '彼の配偶者は医師です。'],
    note: '中国大陸では配偶者を指す用法が一般的。地域・世代・文脈に注意。', equivalentKey: '愛人'
  },
  {
    ja: ['経理', 'けいり', '会計や財務を扱う業務・担当者'],
    zh: ['经理', '經理', 'jīng lǐ', '経営管理者、マネージャー'],
    similarity: 12, type: 'different' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['她是这家公司的经理。', 'Tā shì zhè jiā gōngsī de jīnglǐ.', '彼女はこの会社のマネージャーです。'],
    note: '日本語の「経理」は中国語では通常「会计」。', equivalentKey: '経理'
  },
  {
    ja: ['階段', 'かいだん', '上下階を結ぶ段状の通路'],
    zh: ['阶段', '階段', 'jiē duàn', '段階、時期'],
    similarity: 8, type: 'different' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['项目进入了新阶段。', 'Xiàngmù jìnrù le xīn jiēduàn.', 'プロジェクトは新しい段階に入りました。'],
    note: '中国語の「阶段」は物理的な階段ではない。', equivalentKey: '階段'
  },
  {
    ja: ['結構', 'けっこう', '構造。または十分・不要の意'],
    zh: ['结构', '結構', 'jié gòu', '構造、構成'],
    similarity: 34, type: 'overlap' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['这座桥的结构很特别。', 'Zhè zuò qiáo de jiégòu hěn tèbié.', 'この橋の構造はとても独特です。'],
    note: '「構造」の意味は重なるが、日本語の副詞・断り表現には使わない。',
  },
  {
    ja: ['娘', 'むすめ', '自分の女の子ども'],
    zh: ['娘', '娘', 'niáng', '母親、年長の女性など（語や地域による）'],
    similarity: 4, type: 'different' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['新娘笑得很开心。', 'Xīnniáng xiào de hěn kāixīn.', '花嫁は嬉しそうに笑っています。'],
    note: '単独では古風・方言的用法もある。娘は通常「女儿」。', equivalentKey: '娘'
  },
  {
    ja: ['外人', 'がいじん', '外国人（略称）'],
    zh: ['外人', '外人', 'wài rén', '部外者、身内でない人。文脈によって外国人を指すこともある'],
    similarity: 42, type: 'overlap' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['这件事不能告诉外人。', 'Zhè jiàn shì bù néng gàosu wàirén.', 'このことは部外者に話せません。'],
    note: '中国語では「部外者・身内でない人」が中心。外国人の意味もあり得るが、現代標準中国語で国籍上の外国人を明確に言うなら「外国人」が普通。', equivalentKey: '外人'
  },
  {
    ja: ['工夫', 'くふう', '方法を考え改善すること'],
    zh: ['工夫', '工夫', 'gōng fu', '時間、手間、労力、技能'],
    similarity: 22, type: 'different' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['我没工夫跟你聊天。', 'Wǒ méi gōngfu gēn nǐ liáotiān.', '私はあなたとおしゃべりする暇がありません。'],
    note: '中国語の「工夫」は時間・手間・技能など。日本語の「工夫する」は通常「想办法」などで表す。「功夫」も時間・技能の意味で使われる。', equivalentKey: '工夫'
  },
  {
    ja: ['厳重', 'げんじゅう', '非常に厳しいこと'],
    zh: ['严重', '嚴重', 'yán zhòng', '深刻である、重大である'],
    similarity: 28, type: 'different' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['污染问题很严重。', 'Wūrǎn wèntí hěn yánzhòng.', '汚染問題は深刻です。'],
    note: '字形は対応するが意味は大きくずれる。中国語「严重」は「深刻・重大」の意味。日本語の「厳重に」は文脈により「严格地」「严密地」など。', equivalentKey: '厳重'
  },
  {
    ja: ['文化', 'ぶんか', '社会が生み出した生活様式や価値'],
    zh: ['文化', '文化', 'wén huà', '文化'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['我对中国文化很感兴趣。', 'Wǒ duì Zhōngguó wénhuà hěn gǎn xìngqù.', '私は中国文化にとても興味があります。'],
    note: '意味はほぼ同じ。',
  },
  {
    ja: ['経済', 'けいざい', '生産・流通・消費の活動'],
    zh: ['经济', '經濟', 'jīng jì', '経済'],
    similarity: 99, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['这里的经济发展很快。', 'Zhèlǐ de jīngjì fāzhǎn hěn kuài.', 'ここの経済は急速に発展しています。'],
    note: '意味はほぼ同じ。',
  },
  {
    ja: ['社会', 'しゃかい', '人々が共同生活を営む集団'],
    zh: ['社会', '社會', 'shè huì', '社会'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['社会正在发生变化。', 'Shèhuì zhèngzài fāshēng biànhuà.', '社会は変化しつつあります。'],
    note: '意味はほぼ同じ。',
  },
  {
    ja: ['学校', 'がっこう', '教育を行う施設'],
    zh: ['学校', '學校', 'xué xiào', '学校'],
    similarity: 99, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['学校离我家很近。', 'Xuéxiào lí wǒ jiā hěn jìn.', '学校は私の家から近いです。'],
    note: '意味はほぼ同じ。',
  },
  {
    ja: ['学生', 'がくせい', '学校で学ぶ人'],
    zh: ['学生', '學生', 'xué sheng', '学生'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['她是一名大学生。', 'Tā shì yì míng dàxuéshēng.', '彼女は大学生です。'],
    note: '意味はほぼ同じ。',
  },
  {
    ja: ['先生', 'せんせい', '教師、専門家への敬称'],
    zh: ['先生', '先生', 'xiān sheng', '男性への敬称、夫'],
    similarity: 35, type: 'overlap' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['王先生今天不在。', 'Wáng xiānsheng jīntiān bú zài.', '王さんは今日不在です。'],
    note: '中国語では一般に男性への「〜さん」。教師は「老师」。', equivalentKey: '先生'
  },
  {
    ja: ['勉強', 'べんきょう', '学習すること'],
    zh: ['勉强', '勉強', 'miǎn qiǎng', '無理をする、しぶしぶ'],
    similarity: 8, type: 'different' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['别勉强自己。', 'Bié miǎnqiǎng zìjǐ.', '無理をしないでください。'],
    note: '日本語の「勉強する」は中国語で「学习」。', equivalentKey: '勉強'
  },
  {
    ja: ['汽車', 'きしゃ', '蒸気機関車、列車'],
    zh: ['汽车', '汽車', 'qì chē', '自動車'],
    similarity: 10, type: 'different' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['我们开汽车去吧。', 'Wǒmen kāi qìchē qù ba.', '自動車で行きましょう。'],
    note: '中国語では自動車。列車は「火车」。', equivalentKey: '汽車'
  },
  {
    ja: ['丈夫', 'じょうぶ', '強くて壊れにくい'],
    zh: ['丈夫', '丈夫', 'zhàng fu', '夫'],
    similarity: 5, type: 'different' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['她丈夫在银行工作。', 'Tā zhàngfu zài yínháng gōngzuò.', '彼女の夫は銀行で働いています。'],
    note: '中国語では名詞「夫」。', equivalentKey: '丈夫'
  },
  {
    ja: ['老婆', 'ろうば', '年老いた女性'],
    zh: ['老婆', '老婆', 'lǎo po', '妻（口語）'],
    similarity: 7, type: 'different' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['我老婆很会做饭。', 'Wǒ lǎopo hěn huì zuòfàn.', '私の妻は料理が得意です。'],
    note: '中国語ではくだけた「妻」。', equivalentKey: '老婆'
  },
  {
    ja: ['大家', 'たいか', 'その道の優れた専門家'],
    zh: ['大家', '大家', 'dà jiā', 'みなさん、みんな'],
    similarity: 12, type: 'different' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['大家好！', 'Dàjiā hǎo!', 'みなさん、こんにちは。'],
    note: '中国語の日常会話では「みなさん」が中心。', equivalentKey: '大家'
  },
  {
    ja: ['新聞', 'しんぶん', 'ニュースを載せる定期刊行物'],
    zh: ['新闻', '新聞', 'xīn wén', 'ニュース、報道'],
    similarity: 45, type: 'overlap' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['我每天看新闻。', 'Wǒ měitiān kàn xīnwén.', '私は毎日ニュースを見ます。'],
    note: '中国語は媒体ではなく内容の「ニュース」が中心。', equivalentKey: '新聞'
  },
  {
    ja: ['合同', 'ごうどう', '複数が一緒になること'],
    zh: ['合同', '合同', 'hé tong', '契約、契約書'],
    similarity: 9, type: 'different' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['请在合同上签字。', 'Qǐng zài hétong shàng qiānzì.', '契約書に署名してください。'],
    note: '日本語の「合同」と意味が異なる。', equivalentKey: '合同'
  },
  {
    ja: ['便宜', 'べんぎ', '都合がよいこと'],
    zh: ['便宜', '便宜', 'pián yi', '値段が安い'],
    similarity: 20, type: 'different' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['这个很便宜。', 'Zhège hěn piányi.', 'これはとても安いです。'],
    note: '発音にも注意。日本語の「便宜」は「方便」など。', equivalentKey: '便宜'
  },
  {
    ja: ['放心', 'ほうしん', '心を解き放つこと（主に熟語内）'],
    zh: ['放心', '放心', 'fàng xīn', '安心する'],
    similarity: 28, type: 'different' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['请放心。', 'Qǐng fàngxīn.', 'どうぞご安心ください。'],
    note: '中国語では非常によく使う動詞。', equivalentKey: '放心'
  },
  {
    ja: ['小心', 'しょうしん', '臆病で気が小さいこと'],
    zh: ['小心', '小心', 'xiǎo xīn', '気をつける、注意深い'],
    similarity: 18, type: 'different' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['路上小心！', 'Lùshang xiǎoxīn!', '道中気をつけて！'],
    note: '中国語では注意を促す日常表現。', equivalentKey: '小心'
  },
  {
    ja: ['走', 'そう', '走ること（熟語で使用）'],
    zh: ['走', '走', 'zǒu', '歩く、立ち去る'],
    similarity: 10, type: 'different' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['我们走吧。', 'Wǒmen zǒu ba.', '行きましょう。'],
    note: '中国語では「歩く・行く」。走るは「跑」。', equivalentKey: '走'
  },
  {
    ja: ['湯', 'ゆ', '温めた水、入浴用のお湯'],
    zh: ['汤', '湯', 'tāng', 'スープ'],
    similarity: 12, type: 'different' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['这个汤很好喝。', 'Zhège tāng hěn hǎohē.', 'このスープはおいしいです。'],
    note: '中国語では液体料理のスープ。', equivalentKey: '湯'
  },
  {
    ja: ['机', 'つくえ', '机、テーブル'],
    zh: ['机', '機', 'jī', '機械、飛行機などの構成要素'],
    similarity: 20, type: 'different' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['飞机马上起飞。', 'Fēijī mǎshàng qǐfēi.', '飛行機はまもなく離陸します。'],
    note: '簡体字の中国語「机」は繁体字「機」に対応し、「機械」などの「機」。日本語の「机（つくえ）」とは意味が異なる。机・テーブルは「桌子」。', equivalentKey: '机'
  },
  {
    ja: ['前年', 'ぜんねん', 'ある年の一つ前の年'],
    zh: ['前年', '前年', 'qián nián', '一昨年'],
    similarity: 18, type: 'different' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['我前年去过北京。', 'Wǒ qiánnián qùguo Běijīng.', '私は一昨年北京へ行きました。'],
    note: '中国語「前年」は通常「一昨年」。現在から見た「前年・去年」は「去年」。基準年の一つ前なら「前一年」「上一年」など文脈に応じて表す。', equivalentKey: '前年'
  },
  {
    ja: ['前年同期', 'ぜんねんどうき', '前年の同じ期間'],
    zh: ['前年同期', '前年同期', 'qián nián tóng qī', '一昨年の同じ時期'],
    similarity: 20, type: 'different' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['今年的销量比前年同期高。', 'Jīnnián de xiāoliàng bǐ qiánnián tóngqī gāo.', '今年の販売量は一昨年の同時期より多いです。'],
    note: '中国語の「前年」が通常「一昨年」なので、日本語の「前年同期」と同じつもりで使うと基準年がずれる。日本語の意味なら文脈により「去年同期」「上年同期」が自然。', equivalentKey: '前年同期'
  },
  {
    ja: ['前年以前', 'ぜんねんいぜん', '前年より前'],
    zh: ['前年以前', '前年以前', 'qián nián yǐ qián', '一昨年以前'],
    similarity: 25, type: 'different' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['这些资料都是前年以前的。', 'Zhèxiē zīliào dōu shì qiánnián yǐqián de.', 'これらの資料はすべて一昨年以前のものです。'],
    note: '中国語「前年」は通常「一昨年」なので、日本語より一年前にずれる。', equivalentKey: '前年以前'
  },
  {
    ja: ['看病', 'かんびょう', '病人の世話をすること'],
    zh: ['看病', '看病', 'kàn bìng', '診察を受ける、診察する'],
    similarity: 18, type: 'different' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['我下午去医院看病。', 'Wǒ xiàwǔ qù yīyuàn kànbìng.', '午後、病院へ診察を受けに行きます。'],
    note: '日本語の看病は中国語で「照顾病人」。', equivalentKey: '看病'
  },
  {
    ja: ['告訴', 'こくそ', '犯罪などを訴えること'],
    zh: ['告诉', '告訴', 'gào su', '伝える、教える'],
    similarity: 12, type: 'different' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['请告诉我你的名字。', 'Qǐng gàosu wǒ nǐ de míngzi.', 'あなたの名前を教えてください。'],
    note: '中国語では日常的な「伝える」。', equivalentKey: '告訴'
  },
  {
    ja: ['迷惑', 'めいわく', '困らされること'],
    zh: ['迷惑', '迷惑', 'mí huo', '戸惑う、判断できない'],
    similarity: 15, type: 'different' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['这个问题让我很迷惑。', 'Zhège wèntí ràng wǒ hěn míhuo.', 'この問題にとても戸惑っています。'],
    note: '日本語の「迷惑をかける」は「添麻烦」。', equivalentKey: '迷惑'
  },
  {
    ja: ['麻雀', 'まーじゃん', '卓上ゲーム'],
    zh: ['麻雀', '麻雀', 'má què', 'スズメ'],
    similarity: 12, type: 'different' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['树上有一只麻雀。', 'Shù shang yǒu yì zhī máquè.', '木にスズメが一羽います。'],
    note: 'ゲームは中国語で通常「麻将」。', equivalentKey: '麻雀'
  },
  {
    ja: ['怪我', 'けが', '傷を負うこと'],
    zh: ['怪我', '怪我', 'guài wǒ', '私を責める'],
    similarity: 3, type: 'different' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['这件事不能怪我。', 'Zhè jiàn shì bù néng guài wǒ.', 'この件で私を責めないでください。'],
    note: '中国語では「怪＋我」という動詞句。', equivalentKey: '怪我'
  },
  {
    ja: ['切手', 'きって', '郵便料金を示す証票'],
    zh: ['切手', '切手', 'qiē shǒu', '「手を切る」という語の並び、または特殊・古い語義。郵便切手の意味にはならない'],
    similarity: 2, type: 'different' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['小心别切手。', 'Xiǎoxīn bié qiēshǒu.', '手を切らないよう気をつけて。'],
    note: '現代標準中国語で日本語の「切手」の意味には使わない。郵便切手は「邮票」。字面の「切＋手」は「手を切る」と解釈できる。', equivalentKey: '切手'
  },
  {
    ja: ['無料', 'むりょう', '料金がかからないこと'],
    zh: ['无聊', '無聊', 'wú liáo', '退屈だ、つまらない'],
    similarity: 8, type: 'different' as SimilarityType, characters: 'similar', lexical: 'bothCommon',
    example: ['一个人在家很无聊。', 'Yí ge rén zài jiā hěn wúliáo.', '一人で家にいると退屈です。'],
    note: '同音ではなく字も異なる類似語。', equivalentKey: '無料'
  },
  {
    ja: ['人参', 'にんじん', '野菜のニンジン'],
    zh: ['人参', '人參', 'rén shēn', '薬用植物の高麗人参'],
    similarity: 25, type: 'different' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['人参是一种中药材。', 'Rénshēn shì yì zhǒng zhōngyàocái.', '人参は漢方薬の材料です。'],
    note: '野菜のニンジンは「胡萝卜」。', equivalentKey: '人参'
  },
  {
    ja: ['糖', 'とう', '砂糖などの糖類'],
    zh: ['糖', '糖', 'táng', '砂糖、あめ、糖類'],
    similarity: 82, type: 'overlap' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['咖啡里别放糖。', 'Kāfēi lǐ bié fàng táng.', 'コーヒーに砂糖を入れないでください。'],
    note: '中国語では「あめ」の意味にも使う。',
  },
  {
    ja: ['料理', 'りょうり', '食べ物を調理したもの、調理'],
    zh: ['料理', '料理', 'liào lǐ', '処理する、取り扱う'],
    similarity: 22, type: 'different' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['这件事由我来料理。', 'Zhè jiàn shì yóu wǒ lái liàolǐ.', 'この件は私が処理します。'],
    note: '食事や料理は中国語で「菜」「饭菜」。', equivalentKey: '料理'
  },
  {
    ja: ['大丈夫', 'だいじょうぶ', '問題ない、安心できる'],
    zh: ['大丈夫', '大丈夫', 'dà zhàng fu', '立派な男、男らしい人物'],
    similarity: 8, type: 'different' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['男子汉大丈夫要有担当。', 'Nánzǐhàn dàzhàngfu yào yǒu dāndāng.', '立派な男は責任感を持つべきです。'],
    note: '「大丈夫？」の意味では「没事吧？」。', equivalentKey: '大丈夫'
  },
  {
    ja: ['輸入', 'ゆにゅう', '外国から商品などを入れること'],
    zh: ['输入', '輸入', 'shū rù', '入力する'],
    similarity: 48, type: 'overlap' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['请输入密码。', 'Qǐng shūrù mìmǎ.', 'パスワードを入力してください。'],
    note: '貿易の輸入は中国語でも使うが、ITの入力にも頻用。',
  },
  {
    ja: ['文句', 'もんく', '不平・不満の言葉'],
    zh: ['文句', '文句', 'wén jù', '文、フレーズ'],
    similarity: 12, type: 'different' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['请分析这个文句。', 'Qǐng fēnxī zhège wénjù.', 'この文を分析してください。'],
    note: '日本語の不平は「抱怨」。', equivalentKey: '文句'
  },
  {
    ja: ['緊張', 'きんちょう', '心身が張り詰めること'],
    zh: ['紧张', '緊張', 'jǐn zhāng', '緊張する、逼迫している'],
    similarity: 85, type: 'overlap' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['面试时我很紧张。', 'Miànshì shí wǒ hěn jǐnzhāng.', '面接の時とても緊張しました。'],
    note: '時間・物資が足りず逼迫する意味にも使う。',
  },
  {
    ja: ['検討', 'けんとう', '詳しく調べ考えること'],
    zh: ['检讨', '檢討', 'jiǎn tǎo', '反省する、自己批判する'],
    similarity: 18, type: 'different' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['我需要认真检讨。', 'Wǒ xūyào rènzhēn jiǎntǎo.', '私は真剣に反省する必要があります。'],
    note: '日本語の検討は「研究・考虑」など。', equivalentKey: '検討'
  },
  {
    ja: ['研究', 'けんきゅう', '詳しく調べ明らかにすること'],
    zh: ['研究', '研究', 'yán jiū', '研究する、検討する'],
    similarity: 92, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['他在研究人工智能。', 'Tā zài yánjiū réngōng zhìnéng.', '彼は人工知能を研究しています。'],
    note: '中国語では日常的な「検討する」にも使う。',
  },
  {
    ja: ['商売', 'しょうばい', '品物やサービスを売る仕事'],
    zh: ['商卖', '商賣', 'shāng mài', '現代標準中国語の一般語ではない'],
    similarity: 5, type: 'different' as SimilarityType, characters: 'similar', lexical: 'chineseNotStandard',
    note: '日本語「商売」に相当する中国語は通常「生意」。見た目から「商卖」と作らないよう注意。', equivalentKey: '商売'
  },
  {
    ja: ['仕事', 'しごと', '職業、作業'],
    zh: ['仕事', '仕事', 'shì gù', '現代標準中国語では通常この語を「仕事」の意味で使わない'],
    similarity: 3, type: 'different' as SimilarityType, characters: 'identical', lexical: 'chineseNotStandard',
    note: '日本語の「仕事」は中国語で「工作」。同じ漢字列「仕事」をそのまま中国語の一般語として使わない。', equivalentKey: '仕事'
  },
  {
    ja: ['作業', 'さぎょう', '仕事、操作'],
    zh: ['作业', '作業', 'zuò yè', '宿題、作業'],
    similarity: 72, type: 'overlap' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['今天的作业很多。', 'Jīntiān de zuòyè hěn duō.', '今日の宿題は多いです。'],
    note: '中国語では学校の宿題を指すことが多い。',
  },
  {
    ja: ['約束', 'やくそく', '取り決め、誓い'],
    zh: ['约束', '約束', 'yuē shù', '制約する、束縛する'],
    similarity: 28, type: 'different' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['规则约束着每个人。', 'Guīzé yuēshùzhe měi ge rén.', '規則は一人ひとりを拘束しています。'],
    note: '日本語の約束は「约定」。', equivalentKey: '約束'
  },
  {
    ja: ['親切', 'しんせつ', '思いやりがあり親身なこと'],
    zh: ['亲切', '親切', 'qīn qiè', '親しみ深い、親切だ'],
    similarity: 78, type: 'overlap' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['老师对学生很亲切。', 'Lǎoshī duì xuésheng hěn qīnqiè.', '先生は学生にとても親切です。'],
    note: '意味は近いが「親しみを感じる」の用法もある。',
  },
  {
    ja: ['熱心', 'ねっしん', '一生懸命に取り組むこと'],
    zh: ['热心', '熱心', 'rè xīn', '熱心である、世話好き'],
    similarity: 82, type: 'overlap' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['她很热心地帮助我。', 'Tā hěn rèxīn de bāngzhù wǒ.', '彼女は熱心に私を助けてくれました。'],
    note: '意味はかなり近い。',
  },
  {
    ja: ['心配', 'しんぱい', '気がかりに思うこと'],
    zh: ['心配', '心配', 'xīn pèi', '現代標準中国語では通常「心配する」の意味で使わない'],
    similarity: 3, type: 'different' as SimilarityType, characters: 'identical', lexical: 'chineseNotStandard',
    note: '日本語の「心配する」は中国語で「担心」。漢字から「心配」と作らないよう注意。', equivalentKey: '心配'
  },
  {
    ja: ['野菜', 'やさい', '食用に栽培する植物'],
    zh: ['野菜', '野菜', 'yě cài', '野生の食用植物、山菜'],
    similarity: 18, type: 'different' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['春天可以采野菜。', 'Chūntiān kěyǐ cǎi yěcài.', '春には山菜を採れます。'],
    note: '一般の野菜は中国語で「蔬菜」。', equivalentKey: '野菜'
  },
  {
    ja: ['汽水', 'きすい', '海水と淡水が混じった水'],
    zh: ['汽水', '汽水', 'qì shuǐ', '炭酸飲料、ソーダ'],
    similarity: 5, type: 'different' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['天气热的时候，我喜欢喝冰汽水。', 'Tiānqì rè de shíhou, wǒ xǐhuan hē bīng qìshuǐ.', '暑いとき、私は冷たい炭酸飲料を飲むのが好きです。'],
    note: '典型的な同形異義語。日本語の「汽水」は海水と淡水が混じった水。中国語「汽水」は炭酸飲料。', equivalentKey: '汽水'
  },
  {
    ja: ['高速', 'こうそく', '速度が速いこと、高速道路'],
    zh: ['高速', '高速', 'gāo sù', '高速、高速道路'],
    similarity: 92, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['我们走高速吧。', 'Wǒmen zǒu gāosù ba.', '高速道路で行きましょう。'],
    note: '口語で高速道路を略して言う用法も共通。',
  },
  {
    ja: ['交通', 'こうつう', '人や物の移動、行き来'],
    zh: ['交通', '交通', 'jiāo tōng', '交通、移動'],
    similarity: 96, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['这里交通很方便。', 'Zhèlǐ jiāotōng hěn fāngbiàn.', 'ここは交通が便利です。'],
    note: '意味はほぼ同じ。',
  },
  {
    ja: ['事故', 'じこ', '思いがけない悪い出来事'],
    zh: ['事故', '事故', 'shì gù', '事故'],
    similarity: 98, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['路上发生了交通事故。', 'Lùshang fāshēng le jiāotōng shìgù.', '道路で交通事故が起きました。'],
    note: '意味はほぼ同じ。',
  },
  {
    ja: ['運転', 'うんてん', '車や機械を動かすこと'],
    zh: ['运转', '運轉', 'yùn zhuǎn', '稼働する、運行する'],
    similarity: 52, type: 'overlap' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['机器运转正常。', 'Jīqì yùnzhuǎn zhèngcháng.', '機械は正常に稼働しています。'],
    note: '車を運転するは中国語で「开车」。', equivalentKey: '運転'
  },
  {
    ja: ['到着', 'とうちゃく', '目的地に着くこと'],
    zh: ['到着', '到著', 'dào zhe', '現代標準中国語では通常一語として使わない'],
    similarity: 8, type: 'different' as SimilarityType, characters: 'identical', lexical: 'chineseNotStandard',
    note: '中国語では「到达」「抵达」「到了」などを使う。日本語の「到着」をそのまま使わない。', equivalentKey: '到着'
  },
  {
    ja: ['出発', 'しゅっぱつ', '目的地へ向けて出ること'],
    zh: ['出发', '出發', 'chū fā', '出発する'],
    similarity: 98, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['我们八点出发。', 'Wǒmen bā diǎn chūfā.', '私たちは8時に出発します。'],
    note: '意味はほぼ同じ。',
  },
  {
    ja: ['旅行', 'りょこう', 'よその土地へ出かけること'],
    zh: ['旅行', '旅行', 'lǚ xíng', '旅行する'],
    similarity: 97, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['我想去中国旅行。', 'Wǒ xiǎng qù Zhōngguó lǚxíng.', '中国へ旅行に行きたいです。'],
    note: '意味はほぼ同じ。',
  },
  {
    ja: ['写真', 'しゃしん', 'カメラで撮影した画像'],
    zh: ['写真', '寫真', 'xiě zhēn', '人物写真・写真集用の写真、写実的な描写など'],
    similarity: 38, type: 'overlap' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['她拍了一套个人写真。', 'Tā pāi le yí tào gèrén xiězhēn.', '彼女は個人の写真集用の写真を撮りました。'],
    note: '中国語「写真」は一般的な「写真」全般ではなく、人物写真・写真集や写実的表現などで使われる。一般的な写真は「照片」。', equivalentKey: '写真'
  },
  {
    ja: ['撮影', 'さつえい', '写真や映像を撮ること'],
    zh: ['摄影', '攝影', 'shè yǐng', '写真撮影、撮影技術'],
    similarity: 82, type: 'overlap' as SimilarityType, characters: 'similar', lexical: 'bothCommon',
    example: ['他喜欢摄影。', 'Tā xǐhuan shèyǐng.', '彼は写真撮影が好きです。'],
    note: '字順・字形が異なる。動詞は「拍摄」も一般的。',
  },
  {
    ja: ['電話', 'でんわ', '音声を送受信する通信手段'],
    zh: ['电话', '電話', 'diàn huà', '電話'],
    similarity: 99, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['我给你打电话。', 'Wǒ gěi nǐ dǎ diànhuà.', 'あなたに電話します。'],
    note: '電話するは「打电话」。',
  },
  {
    ja: ['携帯', 'けいたい', '携帯電話の略'],
    zh: ['携带', '攜帶', 'xié dài', '携帯する、持ち歩く'],
    similarity: 32, type: 'overlap' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['请勿携带食品入内。', 'Qǐng wù xiédài shípǐn rùnèi.', '食品を持ち込まないでください。'],
    note: '中国語では動詞「携帯する」。携帯電話は「手机」。', equivalentKey: '携帯'
  },
  {
    ja: ['電脳', 'でんのう', 'コンピューター（やや特殊な表現）'],
    zh: ['电脑', '電腦', 'diàn nǎo', 'コンピューター'],
    similarity: 88, type: 'overlap' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['我的电脑坏了。', 'Wǒ de diànnǎo huài le.', '私のパソコンは壊れました。'],
    note: '中国語では日常的な「パソコン」。',
  },
  {
    ja: ['情報', 'じょうほう', '知らせ、判断材料となる知識'],
    zh: ['情报', '情報', 'qíng bào', '諜報、機密情報'],
    similarity: 38, type: 'overlap' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['他们正在收集情报。', 'Tāmen zhèngzài shōují qíngbào.', '彼らは情報を収集しています。'],
    note: '中国語では諜報・インテリジェンスのニュアンスが強い。', equivalentKey: '情報'
  },
  {
    ja: ['消息', 'しょうそく', 'たより、安否'],
    zh: ['消息', '消息', 'xiāo xi', '知らせ、ニュース'],
    similarity: 78, type: 'overlap' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['我有一个好消息。', 'Wǒ yǒu yí ge hǎo xiāoxi.', '良い知らせがあります。'],
    note: '中国語では日常的な「知らせ」。',
  },
  {
    ja: ['連絡', 'れんらく', '情報を伝え合うこと'],
    zh: ['联络', '聯絡', 'lián luò', '連絡する'],
    similarity: 94, type: 'same' as SimilarityType, characters: 'similar', lexical: 'bothCommon',
    example: ['请随时联络我。', 'Qǐng suíshí liánluò wǒ.', 'いつでも私に連絡してください。'],
    note: '意味はほぼ同じ。',
  },
  {
    ja: ['住所', 'じゅうしょ', '住んでいる場所'],
    zh: ['住所', '住所', 'zhù suǒ', '住居、住む場所（やや書面語）'],
    similarity: 85, type: 'overlap' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['请填写住所。', 'Qǐng tiánxiě zhùsuǒ.', '住所を記入してください。'],
    note: '日常では「地址」がより一般的。',
  },
  {
    ja: ['場所', 'ばしょ', 'ところ、位置'],
    zh: ['场所', '場所', 'chǎng suǒ', '場所、施設'],
    similarity: 82, type: 'overlap' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['这里是公共场所。', 'Zhèlǐ shì gōnggòng chǎngsuǒ.', 'ここは公共の場所です。'],
    note: '字形が異なり、中国語はやや改まった語。',
  },
  {
    ja: ['時間', 'じかん', '時の長さ、時刻'],
    zh: ['时间', '時間', 'shí jiān', '時間'],
    similarity: 99, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['我没有时间。', 'Wǒ méiyǒu shíjiān.', '私は時間がありません。'],
    note: '意味はほぼ同じ。',
  },
  {
    ja: ['時計', 'とけい', '時刻を示す器具'],
    zh: ['时计', '時計', 'shí jì', '計時器、時計装置（専門的・限定的）'],
    similarity: 42, type: 'overlap' as SimilarityType, characters: 'similar', lexical: 'chineseRareOrSpecialized',
    example: ['比赛使用电子时计。', 'Bǐsài shǐyòng diànzǐ shíjì.', '試合では電子計時器を使います。'],
    note: '中国語「时计」は専門的・限定的。日常の時計一般は「钟表」、腕時計は「手表」、置き時計・掛け時計は「钟」などを使う。', equivalentKey: '時計'
  },
  {
    ja: ['午前', 'ごぜん', '正午より前'],
    zh: ['午前', '午前', 'wǔ qián', '午前'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['会议上午九点开始。', 'Huìyì shàngwǔ jiǔ diǎn kāishǐ.', '会議は午前9時に始まります。'],
    note: '中国語では日常的に「上午」を使う。',
  },
  {
    ja: ['午後', 'ごご', '正午より後'],
    zh: ['午后', '午後', 'wǔ hòu', '午後（やや書面語）'],
    similarity: 93, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['午后下起了雨。', 'Wǔhòu xiàqǐ le yǔ.', '午後、雨が降り始めました。'],
    note: '日常では「下午」が一般的。',
  },
  {
    ja: ['毎日', 'まいにち', '一日一日、日ごと'],
    zh: ['每日', '每日', 'měi rì', '毎日（書面語）'],
    similarity: 96, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['他每日坚持运动。', 'Tā měirì jiānchí yùndòng.', '彼は毎日運動を続けます。'],
    note: '口語では「每天」が一般的。',
  },
  {
    ja: ['最近', 'さいきん', '現在に近い過去・未来'],
    zh: ['最近', '最近', 'zuì jìn', '最近、近ごろ'],
    similarity: 84, type: 'overlap' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['你最近怎么样？', 'Nǐ zuìjìn zěnmeyàng?', '最近どうですか。'],
    note: '意味は近いが、中国語「最近」は近い過去だけでなく近い未来にも使える。例：「我最近要去北京」＝近いうち北京へ行く。',
  },
  {
    ja: ['現在', 'げんざい', '今、この時点'],
    zh: ['现在', '現在', 'xiàn zài', '現在、今'],
    similarity: 99, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['我现在很忙。', 'Wǒ xiànzài hěn máng.', '私は今忙しいです。'],
    note: '意味はほぼ同じ。',
  },
  {
    ja: ['未来', 'みらい', 'これから先'],
    zh: ['未来', '未來', 'wèi lái', '未来'],
    similarity: 98, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['我们要考虑未来。', 'Wǒmen yào kǎolǜ wèilái.', '私たちは未来を考える必要があります。'],
    note: '意味はほぼ同じ。',
  },
  {
    ja: ['以前', 'いぜん', 'その時より前'],
    zh: ['以前', '以前', 'yǐ qián', '以前、前に'],
    similarity: 99, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['我以前住在上海。', 'Wǒ yǐqián zhù zài Shànghǎi.', '私は以前上海に住んでいました。'],
    note: '意味はほぼ同じ。',
  },
  {
    ja: ['以後', 'いご', 'その時より後'],
    zh: ['以后', '以後', 'yǐ hòu', '今後、その後'],
    similarity: 98, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['以后请多关照。', 'Yǐhòu qǐng duō guānzhào.', '今後ともよろしくお願いします。'],
    note: '意味はほぼ同じ。',
  },
  {
    ja: ['音楽', 'おんがく', '音による芸術'],
    zh: ['音乐', '音樂', 'yīn yuè', '音楽'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['我喜欢听音乐。', 'Wǒ xǐhuan tīng yīnyuè.', '私は音楽を聴くのが好きです。'],
    note: '意味は同じ。',
  },
  {
    ja: ['映画', 'えいが', '映像作品'],
    zh: ['映画', '映畫', 'yìng huà', '現代標準中国語では通常使わない'],
    similarity: 5, type: 'different' as SimilarityType, characters: 'scriptVariant', lexical: 'chineseNotStandard',
    note: '中国語で映画は「电影」。日本語の漢字をそのまま「映画」として使わない。', equivalentKey: '映画'
  },
  {
    ja: ['運動', 'うんどう', '体を動かすこと、社会活動'],
    zh: ['运动', '運動', 'yùn dòng', '運動、スポーツ、運動する'],
    similarity: 94, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['我每天运动。', 'Wǒ měitiān yùndòng.', '私は毎日運動します。'],
    note: '意味はかなり近い。',
  },
  {
    ja: ['体育', 'たいいく', '身体運動に関する教育'],
    zh: ['体育', '體育', 'tǐ yù', '体育、スポーツ'],
    similarity: 92, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['他很喜欢体育。', 'Tā hěn xǐhuan tǐyù.', '彼はスポーツが好きです。'],
    note: '中国語ではスポーツ全般も指す。',
  },
  {
    ja: ['選手', 'せんしゅ', '競技に出場する人'],
    zh: ['选手', '選手', 'xuǎn shǒu', '選手、競技者'],
    similarity: 98, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['她是一名网球选手。', 'Tā shì yì míng wǎngqiú xuǎnshǒu.', '彼女はテニス選手です。'],
    note: '意味はほぼ同じ。',
  },
  {
    ja: ['勝利', 'しょうり', '戦いや競争に勝つこと'],
    zh: ['胜利', '勝利', 'shèng lì', '勝利、勝つ'],
    similarity: 99, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['我们取得了胜利。', 'Wǒmen qǔdé le shènglì.', '私たちは勝利を収めました。'],
    note: '意味はほぼ同じ。',
  },
  {
    ja: ['健康', 'けんこう', '心身の状態がよいこと'],
    zh: ['健康', '健康', 'jiàn kāng', '健康'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['健康最重要。', 'Jiànkāng zuì zhòngyào.', '健康が最も大切です。'],
    note: '意味は同じ。',
  },
  {
    ja: ['病院', 'びょういん', '病人を診療する施設'],
    zh: ['病院', '病院', 'bìng yuàn', '標準中国語では通常使わない。方言・歴史的用例はある'],
    similarity: 5, type: 'different' as SimilarityType, characters: 'identical', lexical: 'chineseRareOrSpecialized',
    example: ['他在医院工作。', 'Tā zài yīyuàn gōngzuò.', '彼は病院で働いています。'],
    note: '現代標準中国語で病院は「医院」。中国語圏の一部方言・歴史的用法に「病院」が見られるため、完全な「存在しない語」とは扱わない。', equivalentKey: '病院'
  },
  {
    ja: ['薬', 'くすり', '病気の治療に使うもの'],
    zh: ['药', '藥', 'yào', '薬'],
    similarity: 99, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['记得按时吃药。', 'Jìde ànshí chī yào.', '時間どおり薬を飲んでください。'],
    note: '中国語では薬を飲むことを「吃药」と言う。',
  },
  {
    ja: ['休息', 'きゅうそく', '休むこと'],
    zh: ['休息', '休息', 'xiū xi', '休む、休息'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['你应该好好休息。', 'Nǐ yīnggāi hǎohāo xiūxi.', 'ゆっくり休むべきです。'],
    note: '意味は同じ。',
  },
  {
    ja: ['睡眠', 'すいみん', '眠ること'],
    zh: ['睡眠', '睡眠', 'shuì mián', '睡眠'],
    similarity: 98, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['充足的睡眠很重要。', 'Chōngzú de shuìmián hěn zhòngyào.', '十分な睡眠は大切です。'],
    note: '意味はほぼ同じ。',
  },
  {
    ja: ['安心', 'あんしん', '心配がないこと'],
    zh: ['安心', '安心', 'ān xīn', '安心する、心置きなく'],
    similarity: 86, type: 'overlap' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['你可以安心工作。', 'Nǐ kěyǐ ānxīn gōngzuò.', '安心して仕事ができます。'],
    note: '意味は近い。中国語では動詞・副詞的にも使う。',
  },
  {
    ja: ['安全', 'あんぜん', '危険がないこと'],
    zh: ['安全', '安全', 'ān quán', '安全'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['安全第一。', 'Ānquán dì-yī.', '安全第一。'],
    note: '意味は同じ。',
  },
  {
    ja: ['危険', 'きけん', '危ないこと'],
    zh: ['危险', '危險', 'wēi xiǎn', '危険'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['这里很危险。', 'Zhèlǐ hěn wēixiǎn.', 'ここはとても危険です。'],
    note: '意味は同じ。',
  },
  {
    ja: ['注意', 'ちゅうい', '気をつけること'],
    zh: ['注意', '注意', 'zhù yì', '注意する、気をつける'],
    similarity: 98, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['请注意安全。', 'Qǐng zhùyì ānquán.', '安全に注意してください。'],
    note: '意味はほぼ同じ。',
  },
  {
    ja: ['自然', 'しぜん', '人為によらないもの'],
    zh: ['自然', '自然', 'zì rán', '自然、当然'],
    similarity: 87, type: 'overlap' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['这里的自然环境很好。', 'Zhèlǐ de zìrán huánjìng hěn hǎo.', 'ここの自然環境はとても良いです。'],
    note: '「当然・自然に」の意味でも使う。',
  },
  {
    ja: ['環境', 'かんきょう', '周囲の状態や条件'],
    zh: ['环境', '環境', 'huán jìng', '環境'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['我们要保护环境。', 'Wǒmen yào bǎohù huánjìng.', '私たちは環境を守る必要があります。'],
    note: '意味は同じ。',
  },
  {
    ja: ['空気', 'くうき', '地球を覆う気体、場の雰囲気'],
    zh: ['空气', '空氣', 'kōng qì', '空気'],
    similarity: 88, type: 'overlap' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['这里的空气很新鲜。', 'Zhèlǐ de kōngqì hěn xīnxiān.', 'ここの空気は新鮮です。'],
    note: '場の雰囲気には通常「气氛」を使う。',
  },
  {
    ja: ['天気', 'てんき', '気象の状態'],
    zh: ['天气', '天氣', 'tiān qì', '天気'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['今天天气很好。', 'Jīntiān tiānqì hěn hǎo.', '今日は天気が良いです。'],
    note: '意味は同じ。',
  },
  {
    ja: ['温度', 'おんど', '暖かさ・冷たさの度合い'],
    zh: ['温度', '溫度', 'wēn dù', '温度'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['今天温度很低。', 'Jīntiān wēndù hěn dī.', '今日は気温が低いです。'],
    note: '意味は同じ。',
  },
  {
    ja: ['台風', 'たいふう', '熱帯低気圧'],
    zh: ['台风', '颱風', 'tái fēng', '台風'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['台风快来了。', 'Táifēng kuài lái le.', '台風がもうすぐ来ます。'],
    note: '意味は同じ。',
  },
  {
    ja: ['地震', 'じしん', '地面の揺れ'],
    zh: ['地震', '地震', 'dì zhèn', '地震'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['昨晚发生了地震。', 'Zuówǎn fāshēng le dìzhèn.', '昨夜地震が起きました。'],
    note: '意味は同じ。',
  },
  {
    ja: ['銀行', 'ぎんこう', '預金や融資を扱う金融機関'],
    zh: ['银行', '銀行', 'yín háng', '銀行'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['银行几点关门？', 'Yínháng jǐ diǎn guānmén?', '銀行は何時に閉まりますか。'],
    note: '意味は同じ。',
  },
  {
    ja: ['貯金', 'ちょきん', '金銭をためること'],
    zh: ['储金', '儲金', 'chǔ jīn', '貯蓄金（やや専門的）'],
    similarity: 58, type: 'overlap' as SimilarityType, characters: 'similar', lexical: 'bothCommon',
    example: ['我每月都存钱。', 'Wǒ měiyuè dōu cúnqián.', '私は毎月貯金します。'],
    note: '日常の貯金は「存钱」。', equivalentKey: '貯金'
  },
  {
    ja: ['価格', 'かかく', '物の値段'],
    zh: ['价格', '價格', 'jià gé', '価格、値段'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['这个价格可以接受。', 'Zhège jiàgé kěyǐ jiēshòu.', 'この価格なら受け入れられます。'],
    note: '意味は同じ。',
  },
  {
    ja: ['市場', 'しじょう', '商品を売買する場、マーケット'],
    zh: ['市场', '市場', 'shì chǎng', '市場、マーケット'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['这个市场很热闹。', 'Zhège shìchǎng hěn rènào.', 'この市場はとてもにぎやかです。'],
    note: '意味は同じ。',
  },
  {
    ja: ['商品', 'しょうひん', '売買の対象となる品物'],
    zh: ['商品', '商品', 'shāng pǐn', '商品'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['这件商品正在打折。', 'Zhè jiàn shāngpǐn zhèngzài dǎzhé.', 'この商品は値引き中です。'],
    note: '意味は同じ。',
  },
  {
    ja: ['注文', 'ちゅうもん', '品物や料理を頼むこと'],
    zh: ['注文', '注文', 'zhù wén', '注釈・注解の文章など（まれ・書面語）'],
    similarity: 4, type: 'different' as SimilarityType, characters: 'identical', lexical: 'chineseRareOrSpecialized',
    example: ['我想点菜。', 'Wǒ xiǎng diǎncài.', '料理を注文したいです。'],
    note: '中国語「注文」は日常の「注文する」の意味ではない。料理なら「点菜」、商品なら「订购」「下单」などを使う。', equivalentKey: '注文'
  },
  {
    ja: ['予約', 'よやく', '前もって約束・確保すること'],
    zh: ['预约', '預約', 'yù yuē', '予約する'],
    similarity: 98, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['我预约了下午的门诊。', 'Wǒ yùyuē le xiàwǔ de ménzhěn.', '午後の診察を予約しました。'],
    note: '意味はほぼ同じ。',
  },
  {
    ja: ['確認', 'かくにん', '確かめること'],
    zh: ['确认', '確認', 'què rèn', '確認する'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['请确认一下时间。', 'Qǐng quèrèn yíxià shíjiān.', '時間を確認してください。'],
    note: '意味は同じ。',
  },
  {
    ja: ['取消', 'とりけし', '取り消すこと'],
    zh: ['取消', '取消', 'qǔ xiāo', '取り消す、中止する'],
    similarity: 96, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['航班被取消了。', 'Hángbān bèi qǔxiāo le.', '便は欠航になりました。'],
    note: '意味はほぼ同じ。',
  },
  {
    ja: ['成功', 'せいこう', '目的を達成すること'],
    zh: ['成功', '成功', 'chéng gōng', '成功する'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['手术很成功。', 'Shǒushù hěn chénggōng.', '手術は成功しました。'],
    note: '意味は同じ。',
  },
  {
    ja: ['失敗', 'しっぱい', 'うまくいかないこと'],
    zh: ['失败', '失敗', 'shī bài', '失敗する、敗北する'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['失败并不可怕。', 'Shībài bìng bù kěpà.', '失敗は怖いものではありません。'],
    note: '意味は同じ。',
  },
];

export const words: WordEntry[] = seeds.map((s, i) => ({
  id: i + 1,
  japanese: { word: s.ja[0], reading: s.ja[1], meaning: s.ja[2] },
  chinese: { simplified: s.zh[0], traditional: s.zh[1], pinyin: s.zh[2], meaning: s.zh[3] },
  similarity: s.similarity,
  similarityType: s.type,
  characterRelation: s.characters,
  lexicalRelation: s.lexical,
  ...(s.example ? { example: { chinese: s.example[0], pinyin: s.example[1], japanese: s.example[2] } } : {}),
  note: s.note,
  ...(s.equivalentKey ? { equivalentChinese: equivalents[s.equivalentKey] } : {}),
}));

