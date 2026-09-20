import type { CharacterRelation, SimilarityType, WordEntry } from '../types/Word';

// 監修版データ。similarity は日本人中国語学習者向けの学習上の目安であり、言語学的な絶対尺度ではありません。
export type ReviewedCharacterRelation = CharacterRelation | 'scriptVariant';
export type LexicalRelation = 'bothCommon' | 'chineseRareOrSpecialized' | 'chineseNotStandard';

export type ReviewedWordEntry = Omit<WordEntry, 'characterRelation' | 'example'> & {
  characterRelation: ReviewedCharacterRelation;
  lexicalRelation: LexicalRelation;
  example?: { chinese: string; pinyin: string; japanese: string };
};

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
  '真面目': { simplified: '认真', traditional: '認真', pinyin: 'rèn zhēn', meaning: '真面目である、真剣だ',
    example: { chinese: '他学习非常认真。', pinyin: 'Tā xuéxí fēicháng rènzhēn.', japanese: '彼はとても真面目に勉強します。' } },
  '顔色': { simplified: '脸色', traditional: '臉色', pinyin: 'liǎn sè', meaning: '顔色、顔つき',
    example: { chinese: '他的脸色不太好。', pinyin: 'Tā de liǎnsè bú tài hǎo.', japanese: '彼は顔色があまりよくありません。' } },
  '出世': { simplified: '出人头地', traditional: '出人頭地', pinyin: 'chū rén tóu dì', meaning: '出世する、頭角を現す',
    example: { chinese: '他希望通过努力出人头地。', pinyin: 'Tā xīwàng tōngguò nǔlì chūrén-tóudì.', japanese: '彼は努力して出世したいと思っています。' } },
  '人間': { simplified: '人', traditional: '人', pinyin: 'rén', meaning: '人、人間',
    example: { chinese: '他是一个很有趣的人。', pinyin: 'Tā shì yí ge hěn yǒuqù de rén.', japanese: '彼はとても面白い人です。' } },
  '心中': { simplified: '殉情', traditional: '殉情', pinyin: 'xùn qíng', meaning: '恋愛関係で心中する',
    example: { chinese: '新闻报道了一起殉情事件。', pinyin: 'Xīnwén bàodào le yì qǐ xùnqíng shìjiàn.', japanese: 'ニュースは心中事件を報じました。' } },
  '邪魔': { simplified: '打扰', traditional: '打擾', pinyin: 'dǎ rǎo', meaning: '邪魔する、迷惑をかける',
    example: { chinese: '不好意思，打扰一下。', pinyin: 'Bù hǎoyìsi, dǎrǎo yíxià.', japanese: 'すみません、ちょっと失礼します。' } },
  '結束': { simplified: '团结', traditional: '團結', pinyin: 'tuán jié', meaning: '結束する、団結する',
    example: { chinese: '大家团结起来解决问题。', pinyin: 'Dàjiā tuánjié qǐlái jiějué wèntí.', japanese: 'みんなで結束して問題を解決します。' } },
  '交代': { simplified: '换班', traditional: '換班', pinyin: 'huàn bān', meaning: '勤務を交代する',
    example: { chinese: '我们六点换班。', pinyin: 'Wǒmen liù diǎn huànbān.', japanese: '私たちは6時に勤務交代します。' } },
  '小人': { simplified: '小矮人', traditional: '小矮人', pinyin: 'xiǎo ǎi rén', meaning: '小人、小さな人',
    example: { chinese: '故事里有七个小矮人。', pinyin: 'Gùshi lǐ yǒu qī ge xiǎo\'ǎirén.', japanese: '物語には7人の小人がいます。' } },
};

type Seed = {
  ja: [word: string, reading: string, meaning: string];
  zh: [simplified: string, traditional: string, pinyin: string, meaning: string];
  similarity: number; type: SimilarityType; characters: ReviewedCharacterRelation; lexical: LexicalRelation;
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
  {
    ja: ['政治', 'せいじ', '国家や社会を運営する活動'],
    zh: ['政治', '政治', 'zhèng zhì', '政治'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['他对国际政治很感兴趣。', 'Tā duì guójì zhèngzhì hěn gǎn xìngqù.', '彼は国際政治にとても関心があります。'],
    note: '意味はほぼ同じ。'
  },
  {
    ja: ['歴史', 'れきし', '過去の出来事やその変遷'],
    zh: ['历史', '歷史', 'lì shǐ', '歴史'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['我喜欢学习中国历史。', 'Wǒ xǐhuan xuéxí Zhōngguó lìshǐ.', '私は中国の歴史を学ぶのが好きです。'],
    note: '意味はほぼ同じ。'
  },
  {
    ja: ['科学', 'かがく', '体系的に自然や社会を研究する学問'],
    zh: ['科学', '科學', 'kē xué', '科学'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['科学改变了我们的生活。', 'Kēxué gǎibiàn le wǒmen de shēnghuó.', '科学は私たちの生活を変えました。'],
    note: '意味はほぼ同じ。'
  },
  {
    ja: ['技術', 'ぎじゅつ', '物事を実現するための技法や方法'],
    zh: ['技术', '技術', 'jì shù', '技術、テクノロジー'],
    similarity: 98, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['这项技术很先进。', 'Zhè xiàng jìshù hěn xiānjìn.', 'この技術はとても進んでいます。'],
    note: '意味はほぼ同じ。'
  },
  {
    ja: ['世界', 'せかい', '人間社会や地球全体'],
    zh: ['世界', '世界', 'shì jiè', '世界'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['世界正在快速变化。', 'Shìjiè zhèngzài kuàisù biànhuà.', '世界は急速に変化しています。'],
    note: '意味は同じ。'
  },
  {
    ja: ['自由', 'じゆう', '束縛されず自分で選べること'],
    zh: ['自由', '自由', 'zì yóu', '自由'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['每个人都希望拥有自由。', 'Měi ge rén dōu xīwàng yǒngyǒu zìyóu.', '誰もが自由を持つことを望みます。'],
    note: '意味は同じ。'
  },
  {
    ja: ['幸福', 'こうふく', '満ち足りて幸せな状態'],
    zh: ['幸福', '幸福', 'xìng fú', '幸福、幸せ'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['我希望家人幸福。', 'Wǒ xīwàng jiārén xìngfú.', '家族が幸せであることを願っています。'],
    note: '意味は同じ。'
  },
  {
    ja: ['努力', 'どりょく', '目標のために力を尽くすこと'],
    zh: ['努力', '努力', 'nǔ lì', '努力する、努力'],
    similarity: 98, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['只要努力，就会有进步。', 'Zhǐyào nǔlì, jiù huì yǒu jìnbù.', '努力すれば進歩があります。'],
    note: '中国語では動詞として非常によく使う。'
  },
  {
    ja: ['経験', 'けいけん', '実際に見聞きし行ったこと'],
    zh: ['经验', '經驗', 'jīng yàn', '経験、経験する'],
    similarity: 96, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['他有丰富的工作经验。', 'Tā yǒu fēngfù de gōngzuò jīngyàn.', '彼には豊富な仕事経験があります。'],
    note: '意味はほぼ同じ。'
  },
  {
    ja: ['目的', 'もくてき', '目指す事柄'],
    zh: ['目的', '目的', 'mù dì', '目的'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['我们的目的很明确。', 'Wǒmen de mùdì hěn míngquè.', '私たちの目的は明確です。'],
    note: '意味は同じ。'
  },
  {
    ja: ['方法', 'ほうほう', '物事を行うやり方'],
    zh: ['方法', '方法', 'fāng fǎ', '方法、やり方'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['这个方法很简单。', 'Zhège fāngfǎ hěn jiǎndān.', 'この方法はとても簡単です。'],
    note: '意味は同じ。'
  },
  {
    ja: ['理由', 'りゆう', 'そう判断する根拠やわけ'],
    zh: ['理由', '理由', 'lǐ yóu', '理由'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['请告诉我理由。', 'Qǐng gàosu wǒ lǐyóu.', '理由を教えてください。'],
    note: '意味は同じ。'
  },
  {
    ja: ['原因', 'げんいん', '物事を引き起こすもと'],
    zh: ['原因', '原因', 'yuán yīn', '原因'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['我们还不知道事故的原因。', 'Wǒmen hái bù zhīdào shìgù de yuányīn.', '私たちはまだ事故の原因を知りません。'],
    note: '意味は同じ。'
  },
  {
    ja: ['結果', 'けっか', '物事が進んだ末に生じた状態'],
    zh: ['结果', '結果', 'jié guǒ', '結果、結果として'],
    similarity: 98, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['考试结果明天公布。', 'Kǎoshì jiéguǒ míngtiān gōngbù.', '試験結果は明日発表されます。'],
    note: '中国語では動詞的に「結果として〜になる」の用法もある。'
  },
  {
    ja: ['思想', 'しそう', '物事についての考え方'],
    zh: ['思想', '思想', 'sī xiǎng', '思想、考え'],
    similarity: 97, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['他的思想很开放。', 'Tā de sīxiǎng hěn kāifàng.', '彼の考え方はとても開放的です。'],
    note: '意味はかなり近い。'
  },
  {
    ja: ['男女', 'だんじょ', '男性と女性'],
    zh: ['男女', '男女', 'nán nǚ', '男性と女性'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['男女都可以参加。', 'Nánnǚ dōu kěyǐ cānjiā.', '男女とも参加できます。'],
    note: '意味は同じ。'
  },
  {
    ja: ['父母', 'ふぼ', '父と母'],
    zh: ['父母', '父母', 'fù mǔ', '父母、両親'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['他的父母住在北京。', 'Tā de fùmǔ zhù zài Běijīng.', '彼の両親は北京に住んでいます。'],
    note: '意味は同じ。日常会話では「爸妈」も多い。'
  },
  {
    ja: ['参加', 'さんか', '集まりや活動に加わること'],
    zh: ['参加', '參加', 'cān jiā', '参加する'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['我想参加这个活动。', 'Wǒ xiǎng cānjiā zhège huódòng.', '私はこの活動に参加したいです。'],
    note: '意味は同じ。'
  },
  {
    ja: ['感謝', 'かんしゃ', 'ありがたく思うこと'],
    zh: ['感谢', '感謝', 'gǎn xiè', '感謝する'],
    similarity: 98, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['非常感谢你的帮助。', 'Fēicháng gǎnxiè nǐ de bāngzhù.', 'あなたの助けにとても感謝します。'],
    note: '中国語では動詞としてよく使う。'
  },
  {
    ja: ['交流', 'こうりゅう', '互いに行き来し情報や気持ちを交わすこと'],
    zh: ['交流', '交流', 'jiāo liú', '交流する、意見を交わす'],
    similarity: 98, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['我们经常交流学习方法。', 'Wǒmen jīngcháng jiāoliú xuéxí fāngfǎ.', '私たちはよく学習方法について交流します。'],
    note: '意味はほぼ同じ。'
  },
  {
    ja: ['留学', 'りゅうがく', '外国などで学ぶこと'],
    zh: ['留学', '留學', 'liú xué', '留学する'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['她明年去日本留学。', 'Tā míngnián qù Rìběn liúxué.', '彼女は来年日本へ留学します。'],
    note: '意味は同じ。'
  },
  {
    ja: ['理解', 'りかい', '意味や事情をわかること'],
    zh: ['理解', '理解', 'lǐ jiě', '理解する'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['我能理解你的想法。', 'Wǒ néng lǐjiě nǐ de xiǎngfǎ.', 'あなたの考えを理解できます。'],
    note: '意味は同じ。'
  },
  {
    ja: ['生活', 'せいかつ', '日々暮らすこと'],
    zh: ['生活', '生活', 'shēng huó', '生活、暮らす'],
    similarity: 98, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['这里的生活很方便。', 'Zhèlǐ de shēnghuó hěn fāngbiàn.', 'ここの生活はとても便利です。'],
    note: '中国語では動詞「生活する」としても使う。'
  },
  {
    ja: ['空間', 'くうかん', '物が存在できる広がり'],
    zh: ['空间', '空間', 'kōng jiān', '空間、スペース'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['这个房间的空间很大。', 'Zhège fángjiān de kōngjiān hěn dà.', 'この部屋は空間が広いです。'],
    note: '意味は同じ。'
  },
  {
    ja: ['教育', 'きょういく', '知識や技能などを教え育てること'],
    zh: ['教育', '教育', 'jiào yù', '教育、教育する'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['教育对孩子很重要。', 'Jiàoyù duì háizi hěn zhòngyào.', '教育は子どもにとって重要です。'],
    note: '意味は同じ。'
  },
  {
    ja: ['大学', 'だいがく', '高等教育を行う学校'],
    zh: ['大学', '大學', 'dà xué', '大学'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['他在北京上大学。', 'Tā zài Běijīng shàng dàxué.', '彼は北京で大学に通っています。'],
    note: '意味は同じ。'
  },
  {
    ja: ['教室', 'きょうしつ', '授業を行う部屋'],
    zh: ['教室', '教室', 'jiào shì', '教室'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['学生们已经进教室了。', 'Xuéshengmen yǐjīng jìn jiàoshì le.', '学生たちはもう教室に入りました。'],
    note: '意味は同じ。'
  },
  {
    ja: ['学習', 'がくしゅう', '知識や技能を学ぶこと'],
    zh: ['学习', '學習', 'xué xí', '学ぶ、勉強する'],
    similarity: 98, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['学习语言需要时间。', 'Xuéxí yǔyán xūyào shíjiān.', '言語学習には時間が必要です。'],
    note: '中国語では動詞として非常によく使う。'
  },
  {
    ja: ['開始', 'かいし', '始めること'],
    zh: ['开始', '開始', 'kāi shǐ', '開始する、始まる'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['会议九点开始。', 'Huìyì jiǔ diǎn kāishǐ.', '会議は9時に始まります。'],
    note: '意味は同じ。'
  },
  {
    ja: ['利用', 'りよう', '役立つように使うこと'],
    zh: ['利用', '利用', 'lì yòng', '利用する'],
    similarity: 98, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['我们可以利用这段时间学习。', 'Wǒmen kěyǐ lìyòng zhè duàn shíjiān xuéxí.', 'この時間を利用して勉強できます。'],
    note: '意味はほぼ同じ。'
  },
  {
    ja: ['使用', 'しよう', '道具などを使うこと'],
    zh: ['使用', '使用', 'shǐ yòng', '使用する'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['请正确使用这个设备。', 'Qǐng zhèngquè shǐyòng zhège shèbèi.', 'この機器を正しく使用してください。'],
    note: '意味は同じ。'
  },
  {
    ja: ['必要', 'ひつよう', 'なくてはならないこと'],
    zh: ['必要', '必要', 'bì yào', '必要である'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['没有必要担心。', 'Méiyǒu bìyào dānxīn.', '心配する必要はありません。'],
    note: '意味は同じ。'
  },
  {
    ja: ['重要', 'じゅうよう', '大切で価値が高いこと'],
    zh: ['重要', '重要', 'zhòng yào', '重要である'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['这是一个重要的问题。', 'Zhè shì yí ge zhòngyào de wèntí.', 'これは重要な問題です。'],
    note: '意味は同じ。'
  },
  {
    ja: ['特別', 'とくべつ', '普通とは違って特に扱うこと'],
    zh: ['特别', '特別', 'tè bié', '特別、とても'],
    similarity: 92, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['今天特别冷。', 'Jīntiān tèbié lěng.', '今日は特に寒いです。'],
    note: '中国語では副詞「とても・特に」として非常によく使う。'
  },
  {
    ja: ['普通', 'ふつう', '一般的で特別でないこと'],
    zh: ['普通', '普通', 'pǔ tōng', '普通、一般的'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['这是很普通的现象。', 'Zhè shì hěn pǔtōng de xiànxiàng.', 'これはごく普通の現象です。'],
    note: '意味は同じ。'
  },
  {
    ja: ['可能', 'かのう', '実現する見込みがあること'],
    zh: ['可能', '可能', 'kě néng', '可能、かもしれない'],
    similarity: 94, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['明天可能下雨。', 'Míngtiān kěnéng xiàyǔ.', '明日は雨が降るかもしれません。'],
    note: '中国語では副詞的に「〜かもしれない」と頻繁に使う。'
  },
  {
    ja: ['直接', 'ちょくせつ', '間に他のものを介さないこと'],
    zh: ['直接', '直接', 'zhí jiē', '直接'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['你可以直接问他。', 'Nǐ kěyǐ zhíjiē wèn tā.', '彼に直接聞いてよいです。'],
    note: '意味は同じ。'
  },
  {
    ja: ['間接', 'かんせつ', '他のものを介すること'],
    zh: ['间接', '間接', 'jiàn jiē', '間接'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['这是间接的影响。', 'Zhè shì jiànjiē de yǐngxiǎng.', 'これは間接的な影響です。'],
    note: '意味は同じ。'
  },
  {
    ja: ['簡単', 'かんたん', '複雑でなく容易なこと'],
    zh: ['简单', '簡單', 'jiǎn dān', '簡単、単純'],
    similarity: 96, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['这个问题很简单。', 'Zhège wèntí hěn jiǎndān.', 'この問題は簡単です。'],
    note: '意味はほぼ同じ。中国語では「単純だ」の意味も強い。'
  },
  {
    ja: ['困難', 'こんなん', '実現や処理が難しいこと'],
    zh: ['困难', '困難', 'kùn nan', '困難、難しい'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['我们遇到了一些困难。', 'Wǒmen yùdào le yìxiē kùnnan.', '私たちはいくつかの困難に直面しました。'],
    note: '意味は同じ。'
  },
  {
    ja: ['便利', 'べんり', '都合よく役立つこと'],
    zh: ['便利', '便利', 'biàn lì', '便利、都合がよい'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['坐地铁很便利。', 'Zuò dìtiě hěn biànlì.', '地下鉄はとても便利です。'],
    note: '意味は同じ。'
  },
  {
    ja: ['正確', 'せいかく', '間違いがなく確かなこと'],
    zh: ['正确', '正確', 'zhèng què', '正しい、正確な'],
    similarity: 94, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['请给我正确的地址。', 'Qǐng gěi wǒ zhèngquè de dìzhǐ.', '正確な住所を教えてください。'],
    note: '中国語では「正しい」の意味まで広くカバーする。'
  },
  {
    ja: ['基本', 'きほん', '物事の土台となるもの'],
    zh: ['基本', '基本', 'jī běn', '基本、基本的に'],
    similarity: 98, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['我基本同意你的意见。', 'Wǒ jīběn tóngyì nǐ de yìjiàn.', '私は基本的にあなたの意見に賛成です。'],
    note: '中国語では副詞「だいたい、基本的に」としても頻用。'
  },
  {
    ja: ['一般', 'いっぱん', '広く共通していること'],
    zh: ['一般', '一般', 'yì bān', '一般、普通、同じくらい'],
    similarity: 90, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['一般情况下不会有问题。', 'Yìbān qíngkuàng xià bú huì yǒu wèntí.', '一般的な状況では問題ありません。'],
    note: '中心義は近いが、中国語では比較の「〜と同じくらい」にも使う。'
  },
  {
    ja: ['個人', 'こじん', '一人の人間'],
    zh: ['个人', '個人', 'gè rén', '個人、個人的'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['这是我的个人意见。', 'Zhè shì wǒ de gèrén yìjiàn.', 'これは私個人の意見です。'],
    note: '意味は同じ。'
  },
  {
    ja: ['国家', 'こっか', '政治的に組織された国'],
    zh: ['国家', '國家', 'guó jiā', '国家、国'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['每个国家都有自己的法律。', 'Měi ge guójiā dōu yǒu zìjǐ de fǎlǜ.', 'どの国にも独自の法律があります。'],
    note: '意味は同じ。'
  },
  {
    ja: ['国際', 'こくさい', '国と国との間に関すること'],
    zh: ['国际', '國際', 'guó jì', '国際'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['这是一个国际会议。', 'Zhè shì yí ge guójì huìyì.', 'これは国際会議です。'],
    note: '意味は同じ。'
  },
  {
    ja: ['中央', 'ちゅうおう', '中心となる場所'],
    zh: ['中央', '中央', 'zhōng yāng', '中央、中心部'],
    similarity: 98, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['广场中央有一座雕像。', 'Guǎngchǎng zhōngyāng yǒu yí zuò diāoxiàng.', '広場の中央に彫像があります。'],
    note: '意味はほぼ同じ。'
  },
  {
    ja: ['公共', 'こうきょう', '社会全体に関係すること'],
    zh: ['公共', '公共', 'gōng gòng', '公共の'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['请保持公共场所安静。', 'Qǐng bǎochí gōnggòng chǎngsuǒ ānjìng.', '公共の場所では静かにしてください。'],
    note: '意味は同じ。'
  },
  {
    ja: ['公園', 'こうえん', '一般に開放された庭園'],
    zh: ['公园', '公園', 'gōng yuán', '公園'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['孩子们在公园里玩。', 'Háizimen zài gōngyuán lǐ wán.', '子どもたちは公園で遊んでいます。'],
    note: '意味は同じ。'
  },
  {
    ja: ['動物', 'どうぶつ', '動物界に属する生物'],
    zh: ['动物', '動物', 'dòng wù', '動物'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['孩子喜欢看动物。', 'Háizi xǐhuan kàn dòngwù.', '子どもは動物を見るのが好きです。'],
    note: '意味は同じ。'
  },
  {
    ja: ['植物', 'しょくぶつ', '植物界に属する生物'],
    zh: ['植物', '植物', 'zhí wù', '植物'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['这种植物需要很多阳光。', 'Zhè zhǒng zhíwù xūyào hěn duō yángguāng.', 'この植物には多くの日光が必要です。'],
    note: '意味は同じ。'
  },
  {
    ja: ['海洋', 'かいよう', '広大な海'],
    zh: ['海洋', '海洋', 'hǎi yáng', '海洋'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['我们应该保护海洋环境。', 'Wǒmen yīnggāi bǎohù hǎiyáng huánjìng.', '私たちは海洋環境を守るべきです。'],
    note: '意味は同じ。'
  },
  {
    ja: ['地球', 'ちきゅう', '人類が暮らす惑星'],
    zh: ['地球', '地球', 'dì qiú', '地球'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['地球围绕太阳运行。', 'Dìqiú wéirào tàiyáng yùnxíng.', '地球は太陽の周りを回っています。'],
    note: '意味は同じ。'
  },
  {
    ja: ['宇宙', 'うちゅう', '天体を含む空間全体'],
    zh: ['宇宙', '宇宙', 'yǔ zhòu', '宇宙'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['人类一直在探索宇宙。', 'Rénlèi yìzhí zài tànsuǒ yǔzhòu.', '人類はずっと宇宙を探査しています。'],
    note: '意味は同じ。'
  },
  {
    ja: ['太陽', 'たいよう', '太陽系の中心にある恒星'],
    zh: ['太阳', '太陽', 'tài yáng', '太陽'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['太阳已经出来了。', 'Tàiyáng yǐjīng chūlái le.', '太陽がもう出ました。'],
    note: '意味は同じ。'
  },
  {
    ja: ['季節', 'きせつ', '一年を気候などで分けた時期'],
    zh: ['季节', '季節', 'jì jié', '季節'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['春天是我最喜欢的季节。', 'Chūntiān shì wǒ zuì xǐhuan de jìjié.', '春は私が最も好きな季節です。'],
    note: '意味は同じ。'
  },
  {
    ja: ['法律', 'ほうりつ', '国家が定める法規範'],
    zh: ['法律', '法律', 'fǎ lǜ', '法律'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['每个人都应该遵守法律。', 'Měi ge rén dōu yīnggāi zūnshǒu fǎlǜ.', '誰もが法律を守るべきです。'],
    note: '意味は同じ。'
  },
  {
    ja: ['規則', 'きそく', '守るべき決まり'],
    zh: ['规则', '規則', 'guī zé', '規則、ルール'],
    similarity: 98, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['请遵守这里的规则。', 'Qǐng zūnshǒu zhèlǐ de guīzé.', 'ここの規則を守ってください。'],
    note: '意味はほぼ同じ。'
  },
  {
    ja: ['制度', 'せいど', '社会や組織の仕組み'],
    zh: ['制度', '制度', 'zhì dù', '制度、仕組み'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['这个制度需要改革。', 'Zhège zhìdù xūyào gǎigé.', 'この制度は改革が必要です。'],
    note: '意味は同じ。'
  },
  {
    ja: ['計画', 'けいかく', '物事の進め方をあらかじめ定めること'],
    zh: ['计划', '計劃', 'jì huà', '計画、計画する'],
    similarity: 98, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['我们正在制定旅行计划。', 'Wǒmen zhèngzài zhìdìng lǚxíng jìhuà.', '私たちは旅行計画を立てています。'],
    note: '意味はほぼ同じ。'
  },
  {
    ja: ['活動', 'かつどう', 'ある目的で行動すること'],
    zh: ['活动', '活動', 'huó dòng', '活動、活動する'],
    similarity: 96, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['学校举办了很多活动。', 'Xuéxiào jǔbàn le hěn duō huódòng.', '学校は多くの活動を行いました。'],
    note: '中国語では動詞としても使う。'
  },
  {
    ja: ['会議', 'かいぎ', '複数人で話し合う集まり'],
    zh: ['会议', '會議', 'huì yì', '会議'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['会议下午三点结束。', 'Huìyì xiàwǔ sān diǎn jiéshù.', '会議は午後3時に終わります。'],
    note: '意味は同じ。'
  },
  {
    ja: ['企業', 'きぎょう', '事業活動を行う組織'],
    zh: ['企业', '企業', 'qǐ yè', '企業'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['这是一家国际企业。', 'Zhè shì yì jiā guójì qǐyè.', 'これは国際企業です。'],
    note: '意味は同じ。'
  },
  {
    ja: ['紹介', 'しょうかい', '人や物を他者に知らせること'],
    zh: ['介绍', '介紹', 'jiè shào', '紹介する、紹介'],
    similarity: 98, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['我来介绍一下我的朋友。', 'Wǒ lái jièshào yíxià wǒ de péngyou.', '友達を紹介します。'],
    note: '意味はほぼ同じ。'
  },
  {
    ja: ['説明', 'せつめい', '内容や理由をわかるように述べること'],
    zh: ['说明', '說明', 'shuō míng', '説明する、説明'],
    similarity: 98, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['请说明一下原因。', 'Qǐng shuōmíng yíxià yuányīn.', '理由を説明してください。'],
    note: '意味はほぼ同じ。'
  },
  {
    ja: ['結論', 'けつろん', '議論や考察の最終的な判断'],
    zh: ['结论', '結論', 'jié lùn', '結論'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['我们得出了相同的结论。', 'Wǒmen déchū le xiāngtóng de jiélùn.', '私たちは同じ結論に達しました。'],
    note: '意味は同じ。'
  },
  {
    ja: ['評価', 'ひょうか', '価値や成果を判断すること'],
    zh: ['评价', '評價', 'píng jià', '評価する、評価'],
    similarity: 98, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['大家对这部电影评价很高。', 'Dàjiā duì zhè bù diànyǐng píngjià hěn gāo.', 'みんなこの映画を高く評価しています。'],
    note: '意味はほぼ同じ。'
  },
  {
    ja: ['批判', 'ひはん', '問題点などを検討し評価すること'],
    zh: ['批判', '批判', 'pī pàn', '批判する'],
    similarity: 95, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['他公开批判了这个决定。', 'Tā gōngkāi pīpàn le zhège juédìng.', '彼はこの決定を公に批判しました。'],
    note: '意味はかなり近い。'
  },
  {
    ja: ['家族', 'かぞく', '同じ家庭を構成する人々'],
    zh: ['家族', '家族', 'jiā zú', '家族、一族'],
    similarity: 82, type: 'overlap' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['他们家族很大。', 'Tāmen jiāzú hěn dà.', '彼らの一族は大きいです。'],
    note: '中国語でも家族を指すが、一族・家系寄りの響きもある。日常の家族は「家人」が非常によく使われる。'
  },
  {
    ja: ['感情', 'かんじょう', '喜怒哀楽などの気持ち'],
    zh: ['感情', '感情', 'gǎn qíng', '感情、愛情、関係の親密さ'],
    similarity: 82, type: 'overlap' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['他们两个人感情很好。', 'Tāmen liǎng ge rén gǎnqíng hěn hǎo.', '二人はとても仲が良いです。'],
    note: '中国語では人間関係の親密さ・愛情の意味にも広く使う。'
  },
  {
    ja: ['準備', 'じゅんび', '前もって用意すること'],
    zh: ['准备', '準備', 'zhǔn bèi', '準備する、〜するつもりだ'],
    similarity: 85, type: 'overlap' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['我准备明年去中国。', 'Wǒ zhǔnbèi míngnián qù Zhōngguó.', '私は来年中国へ行くつもりです。'],
    note: '中国語では「〜するつもりだ」という予定・意図の用法も非常によく使う。'
  },
  {
    ja: ['意識', 'いしき', '心に感じたり認識したりする働き'],
    zh: ['意识', '意識', 'yì shí', '意識、気づく、認識する'],
    similarity: 84, type: 'overlap' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['他已经意识到问题的严重性。', 'Tā yǐjīng yìshí dào wèntí de yánzhòngxìng.', '彼はすでに問題の深刻さに気づきました。'],
    note: '中国語では動詞「気づく・認識する」としてよく使う。'
  },
  {
    ja: ['主任', 'しゅにん', 'ある部署や業務の責任者'],
    zh: ['主任', '主任', 'zhǔ rèn', '主任、責任者、部門の長'],
    similarity: 82, type: 'overlap' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['王主任今天不在办公室。', 'Wáng zhǔrèn jīntiān bú zài bàngōngshì.', '王主任は今日はオフィスにいません。'],
    note: '意味は近いが、中国語では病院・学校・行政など幅広い組織の責任者の肩書きとして使う。'
  },
  {
    ja: ['部長', 'ぶちょう', '会社などの部門の責任者'],
    zh: ['部长', '部長', 'bù zhǎng', '大臣、部門の長'],
    similarity: 62, type: 'overlap' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['部长今天出席了会议。', 'Bùzhǎng jīntiān chūxí le huìyì.', '部長／大臣は今日会議に出席しました。'],
    note: '中国語では政府の「大臣」に当たる肩書きとして非常に重要。組織内の部門長を指す場合もある。'
  },
  {
    ja: ['中学', 'ちゅうがく', '中学校の略称'],
    zh: ['中学', '中學', 'zhōng xué', '中等教育の学校。初級中学・高級中学を含む'],
    similarity: 72, type: 'overlap' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['他在一所中学教数学。', 'Tā zài yì suǒ zhōngxué jiāo shùxué.', '彼はある中学校・中等学校で数学を教えています。'],
    note: '中国語「中学」は日本の中学校だけでなく、高校段階を含む中等教育機関を広く指す。'
  },
  {
    ja: ['関係', 'かんけい', '物事や人どうしのつながり'],
    zh: ['关系', '關係', 'guān xi', '関係、つながり、人脈'],
    similarity: 88, type: 'overlap' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['这件事跟我没有关系。', 'Zhè jiàn shì gēn wǒ méiyǒu guānxi.', 'この件は私には関係ありません。'],
    note: '基本義は近い。中国語では人脈・コネを表す「关系」の用法も重要。'
  },
  {
    ja: ['対象', 'たいしょう', '働きかけや研究などの相手となるもの'],
    zh: ['对象', '對象', 'duì xiàng', '対象、相手、恋愛・結婚相手'],
    similarity: 72, type: 'overlap' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['他还没有对象。', 'Tā hái méiyǒu duìxiàng.', '彼にはまだ恋人・交際相手がいません。'],
    note: '中国語では「恋愛・結婚相手」の意味で日常的に使う。'
  },
  {
    ja: ['単位', 'たんい', '数量を測る基準、学習成果の単位'],
    zh: ['单位', '單位', 'dān wèi', '単位、勤務先・組織'],
    similarity: 65, type: 'overlap' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['你在哪个单位工作？', 'Nǐ zài nǎ ge dānwèi gōngzuò?', 'どの勤務先・組織で働いていますか。'],
    note: '数量の単位の意味に加え、中国語では勤務先や組織を「单位」と呼ぶ用法が非常に重要。'
  },
  {
    ja: ['単純', 'たんじゅん', '複雑でないこと'],
    zh: ['单纯', '單純', 'dān chún', '単純、純粋、世間慣れしていない'],
    similarity: 70, type: 'overlap' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['她的想法很单纯。', 'Tā de xiǎngfǎ hěn dānchún.', '彼女の考えはとても純粋です。'],
    note: '中国語では「純粋だ・素朴だ」という人物評価にもよく使う。'
  },
  {
    ja: ['無事', 'ぶじ', '事故や問題がなく安全であること'],
    zh: ['无事', '無事', 'wú shì', '用事がない、何事もない'],
    similarity: 68, type: 'overlap' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['今天无事，我就在家休息。', 'Jīntiān wúshì, wǒ jiù zài jiā xiūxi.', '今日は用事がないので家で休みます。'],
    note: '「何事もない」は共通するが、中国語では「用事がない・暇だ」の意味にもなる。'
  },
  {
    ja: ['用心', 'ようじん', '注意して気をつけること'],
    zh: ['用心', '用心', 'yòng xīn', '心を込める、注意深く取り組む、意図'],
    similarity: 48, type: 'overlap' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['他做事很用心。', 'Tā zuòshì hěn yòngxīn.', '彼はとても丁寧に仕事をします。'],
    note: '中国語は「心を込めて・注意深く」の意味が中心。日本語の「用心する」は「小心」「注意」など。'
  },
  {
    ja: ['心得', 'こころえ', '知識や心構え、規則など'],
    zh: ['心得', '心得', 'xīn dé', '体験から得た感想・学び・心得'],
    similarity: 58, type: 'overlap' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['请分享一下你的学习心得。', 'Qǐng fēnxiǎng yíxià nǐ de xuéxí xīndé.', 'あなたの学習で得た気づきや心得を共有してください。'],
    note: '日本語の「心得」は知識・心構え、中国語は経験から得た感想や学びの意味が強い。'
  },
  {
    ja: ['大事', 'だいじ', '重要なこと、大切なこと'],
    zh: ['大事', '大事', 'dà shì', '重大な出来事、大きな問題'],
    similarity: 62, type: 'overlap' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['这是关系到大家的大事。', 'Zhè shì guānxì dào dàjiā de dàshì.', 'これは皆に関わる重大なことです。'],
    note: '中国語では「大切」という形容動詞的な使い方より「重大な事柄」の名詞用法が中心。'
  },
  {
    ja: ['自信', 'じしん', '自分の能力や判断を信じる気持ち'],
    zh: ['自信', '自信', 'zì xìn', '自信、自信がある'],
    similarity: 96, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['他对自己很有自信。', 'Tā duì zìjǐ hěn yǒu zìxìn.', '彼は自分にとても自信があります。'],
    note: '意味はほぼ同じ。中国語では「有自信」の形がよく使われる。'
  },
  {
    ja: ['得意', 'とくい', '上手であること、誇らしく思うこと'],
    zh: ['得意', '得意', 'dé yì', '満足して得意になる、有頂天になる'],
    similarity: 48, type: 'overlap' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['他考试得了第一名，非常得意。', 'Tā kǎoshì dé le dì-yī míng, fēicháng déyì.', '彼は試験で1位になり、とても得意になっています。'],
    note: '「得意げ」の意味は重なるが、日本語の「得意科目＝上手な分野」は通常「擅长」などで表す。'
  },
  {
    ja: ['無理', 'むり', '実現が難しいこと、道理に合わないこと'],
    zh: ['无理', '無理', 'wú lǐ', '道理がない、理不尽である'],
    similarity: 45, type: 'overlap' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['这个要求太无理了。', 'Zhège yāoqiú tài wúlǐ le.', 'この要求はあまりに理不尽です。'],
    note: '中国語では「不可能」の意味ではなく、主に「道理に合わない・理不尽」。'
  },
  {
    ja: ['意見', 'いけん', '考えや主張'],
    zh: ['意见', '意見', 'yì jiàn', '意見、不満、異議'],
    similarity: 82, type: 'overlap' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['你有什么意见吗？', 'Nǐ yǒu shénme yìjiàn ma?', '何か意見がありますか。'],
    note: '意味は近いが、中国語では「不満・異議」のニュアンスでもよく使う。'
  },
  {
    ja: ['反省', 'はんせい', '自分の行動を振り返り改めること'],
    zh: ['反省', '反省', 'fǎn xǐng', '反省する、省みる'],
    similarity: 95, type: 'same' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['他认真反省了自己的错误。', 'Tā rènzhēn fǎnxǐng le zìjǐ de cuòwù.', '彼は自分の誤りを真剣に反省しました。'],
    note: '意味はほぼ同じ。'
  },
  {
    ja: ['議論', 'ぎろん', '意見を出し合って論じること'],
    zh: ['议论', '議論', 'yì lùn', '論じる、取り沙汰する、批評する'],
    similarity: 68, type: 'overlap' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['大家都在议论这件事。', 'Dàjiā dōu zài yìlùn zhè jiàn shì.', 'みんなこの件についてあれこれ話しています。'],
    note: '中国語では正式な討論より「話題にして論評する・取り沙汰する」意味でも多い。'
  },
  {
    ja: ['交際', 'こうさい', '人と付き合うこと、特に恋愛関係'],
    zh: ['交际', '交際', 'jiāo jì', '人付き合い、社交'],
    similarity: 62, type: 'overlap' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['他很擅长人际交际。', 'Tā hěn shàncháng rénjì jiāojì.', '彼は人付き合いが得意です。'],
    note: '中国語では社交・人付き合いが中心。日本語ほど恋愛交際を直接意味しない。'
  },
  {
    ja: ['親友', 'しんゆう', '非常に親しい友人'],
    zh: ['亲友', '親友', 'qīn yǒu', '親戚と友人、親しい友人'],
    similarity: 50, type: 'overlap' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['婚礼上来了很多亲友。', 'Hūnlǐ shàng lái le hěn duō qīnyǒu.', '結婚式には多くの親戚や友人が来ました。'],
    note: '中国語では一般に「親戚と友人」の意味が中心。日本語の「親友」は「好友」「挚友」などが自然。'
  },
  {
    ja: ['関心', 'かんしん', '興味を持ち気にかけること'],
    zh: ['关心', '關心', 'guān xīn', '気にかける、関心を持つ'],
    similarity: 78, type: 'overlap' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['谢谢你一直关心我。', 'Xièxie nǐ yìzhí guānxīn wǒ.', 'ずっと私を気にかけてくれてありがとう。'],
    note: '日本語は「興味を持つ」、中国語は「気にかける・世話を焼く」の意味が強い。'
  },
  {
    ja: ['冷静', 'れいせい', '落ち着いて感情に左右されないこと'],
    zh: ['冷静', '冷靜', 'lěng jìng', '冷静、落ち着いている'],
    similarity: 100, type: 'same' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['遇到问题要保持冷静。', 'Yùdào wèntí yào bǎochí lěngjìng.', '問題が起きたら冷静さを保つ必要があります。'],
    note: '意味は同じ。'
  },
  {
    ja: ['表情', 'ひょうじょう', '顔に表れた感情や様子'],
    zh: ['表情', '表情', 'biǎo qíng', '表情、感情を表す'],
    similarity: 88, type: 'overlap' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['她脸上的表情很复杂。', 'Tā liǎn shàng de biǎoqíng hěn fùzá.', '彼女の顔の表情は複雑です。'],
    note: '基本義は同じ。中国語では「感情を表す」意味の語法もある。'
  },
  {
    ja: ['上下', 'じょうげ', '上と下、上がることと下がること'],
    zh: ['上下', '上下', 'shàng xià', '上と下、およそ〜前後'],
    similarity: 72, type: 'overlap' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['他三十岁上下。', 'Tā sānshí suì shàngxià.', '彼は30歳前後です。'],
    note: '中国語では数量の後ろで「〜前後、およそ」を表す用法がある。'
  },
  {
    ja: ['左右', 'さゆう', '左と右、影響を与えること'],
    zh: ['左右', '左右', 'zuǒ yòu', '左と右、およそ、左右する'],
    similarity: 82, type: 'overlap' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['会议三点左右结束。', 'Huìyì sān diǎn zuǒyòu jiéshù.', '会議は3時ごろ終わります。'],
    note: '中国語では数量・時刻の後ろで「〜ごろ」の意味に非常によく使う。'
  },
  {
    ja: ['入口', 'いりぐち', '建物などへ入る場所'],
    zh: ['入口', '入口', 'rù kǒu', '入口、口に入れること'],
    similarity: 82, type: 'overlap' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['入口在大楼的右边。', 'Rùkǒu zài dàlóu de yòubian.', '入口は建物の右側です。'],
    note: '基本義は同じ。中国語では「入口できる＝口に入る」のような語法もある。'
  },
  {
    ja: ['差別', 'さべつ', '区別すること、不当に異なる扱いをすること'],
    zh: ['差别', '差別', 'chā bié', '違い、差異、区別'],
    similarity: 55, type: 'overlap' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['这两个方案没有太大差别。', 'Zhè liǎng ge fāng\'àn méiyǒu tài dà chābié.', 'この二つの案には大きな違いがありません。'],
    note: '中国語ではまず中立的な「違い・差異」。不当な差別は「歧视」などで表す。'
  },
  {
    ja: ['了解', 'りょうかい', '事情を理解して承認すること'],
    zh: ['了解', '了解', 'liǎo jiě', '理解する、詳しく知る、調べる'],
    similarity: 72, type: 'overlap' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['我想了解一下具体情况。', 'Wǒ xiǎng liǎojiě yíxià jùtǐ qíngkuàng.', '具体的な状況を少し知りたいです。'],
    note: '中国語では「調べて知る・詳しく把握する」の意味で非常によく使う。'
  },
  {
    ja: ['多少', 'たしょう', '多いことと少ないこと、少し'],
    zh: ['多少', '多少', 'duō shao', 'どのくらい、いくつ、いくら'],
    similarity: 35, type: 'different' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['这个多少钱？', 'Zhège duōshao qián?', 'これはいくらですか。'],
    note: '中国語では基本的な疑問詞「どのくらい・いくつ・いくら」。日本語の「多少＝少し」は通常「多少有一点」など文脈が必要。'
  },
  {
    ja: ['真面目', 'まじめ', '誠実でふざけず、真剣であること'],
    zh: ['真面目', '真面目', 'zhēn miàn mù', '本当の顔、本当の姿'],
    similarity: 8, type: 'different' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['终于看清了事情的真面目。', 'Zhōngyú kànqīng le shìqing de zhēn miànmù.', 'ついに物事の真相・本当の姿が見えました。'],
    note: '中国語「真面目」は「本当の顔・正体」。日本語の「真面目」は「认真」「老实」など。', equivalentKey: '真面目'
  },
  {
    ja: ['顔色', 'かおいろ', '顔の色つや、顔つき'],
    zh: ['颜色', '顏色', 'yán sè', '色、カラー'],
    similarity: 12, type: 'different' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['你喜欢什么颜色？', 'Nǐ xǐhuan shénme yánsè?', '何色が好きですか。'],
    note: '中国語「颜色」は一般的な「色」。日本語の顔色・顔つきは「脸色」。', equivalentKey: '顔色'
  },
  {
    ja: ['出世', 'しゅっせ', '社会的に高い地位や成功を得ること'],
    zh: ['出世', '出世', 'chū shì', '世に生まれる、世に出る（書面・古風）'],
    similarity: 12, type: 'different' as SimilarityType, characters: 'identical', lexical: 'chineseRareOrSpecialized',
    example: ['这个说法带有较强的书面色彩。', 'Zhège shuōfǎ dàiyǒu jiào qiáng de shūmiàn sècǎi.', 'この言い方にはかなり書き言葉的な色合いがあります。'],
    note: '中国語「出世」は現代日常語の「昇進して成功する」の意味ではない。日本語の「出世する」は「出人头地」「升迁」など。', equivalentKey: '出世'
  },
  {
    ja: ['人間', 'にんげん', '人、人類の一員'],
    zh: ['人间', '人間', 'rén jiān', 'この世、人間社会'],
    similarity: 18, type: 'different' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['人间有很多美好的事情。', 'Rénjiān yǒu hěn duō měihǎo de shìqing.', 'この世には多くの美しいことがあります。'],
    note: '中国語「人间」は「この世・人間社会」。個々の人間なら「人」、人類なら「人类」。', equivalentKey: '人間'
  },
  {
    ja: ['心中', 'しんじゅう', '男女などが一緒に自殺すること'],
    zh: ['心中', '心中', 'xīn zhōng', '心の中'],
    similarity: 4, type: 'different' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['我心中一直记得这句话。', 'Wǒ xīnzhōng yìzhí jìde zhè jù huà.', '私は心の中でずっとこの言葉を覚えています。'],
    note: '中国語ではごく普通に「心の中」。日本語の「心中」の意味とは大きく異なる。', equivalentKey: '心中'
  },
  {
    ja: ['彼岸', 'ひがん', '春分・秋分を中心とする仏教行事の時期'],
    zh: ['彼岸', '彼岸', 'bǐ àn', '向こう岸、理想の境地'],
    similarity: 28, type: 'different' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['他们终于到达了河的彼岸。', 'Tāmen zhōngyú dàodá le hé de bǐ\'àn.', '彼らはついに川の向こう岸に着きました。'],
    note: '仏教的語源は共通するが、中国語では「向こう岸・到達すべき境地」の意味。日本の季節行事としての彼岸とは違う。'
  },
  {
    ja: ['大方', 'おおかた', 'だいたい、大部分'],
    zh: ['大方', '大方', 'dà fang', '気前がよい、自然で堂々としている'],
    similarity: 20, type: 'different' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['她说话很大方。', 'Tā shuōhuà hěn dàfang.', '彼女は話し方が自然で堂々としています。'],
    note: '中国語では「気前がよい・堂々としている」。なお dàfāng には「専門家・識者」など別の読みと語義もある。'
  },
  {
    ja: ['邪魔', 'じゃま', '行動の妨げになること'],
    zh: ['邪魔', '邪魔', 'xié mó', '邪悪な魔物、悪魔'],
    similarity: 4, type: 'different' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['故事里出现了一个邪魔。', 'Gùshi lǐ chūxiàn le yí ge xiémó.', '物語に邪悪な魔物が登場しました。'],
    note: '中国語では魔物・邪悪なもの。日本語の「邪魔する」は「打扰」「妨碍」など。', equivalentKey: '邪魔'
  },
  {
    ja: ['結束', 'けっそく', '志などを同じくしてまとまること'],
    zh: ['结束', '結束', 'jié shù', '終わる、終了する'],
    similarity: 5, type: 'different' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['会议已经结束了。', 'Huìyì yǐjīng jiéshù le.', '会議はもう終わりました。'],
    note: '典型的な同形異義語。日本語の「結束」は「团结」など。', equivalentKey: '結束'
  },
  {
    ja: ['作風', 'さくふう', '芸術家や作品に見られる特徴的なスタイル'],
    zh: ['作风', '作風', 'zuò fēng', '仕事ぶり、態度、気風、スタイル'],
    similarity: 42, type: 'overlap' as SimilarityType, characters: 'scriptVariant', lexical: 'bothCommon',
    example: ['他的工作作风很认真。', 'Tā de gōngzuò zuòfēng hěn rènzhēn.', '彼の仕事ぶりはとても真面目です。'],
    note: '中国語では芸術作品に限らず、仕事ぶり・生活態度・組織風土など広く使う。'
  },
  {
    ja: ['交代', 'こうたい', '人や役割が入れ替わること'],
    zh: ['交代', '交代', 'jiāo dài', '引き継ぐ、説明する、言い渡す'],
    similarity: 18, type: 'different' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['请把事情交代清楚。', 'Qǐng bǎ shìqing jiāodài qīngchu.', '事情をきちんと説明・申し送りしてください。'],
    note: '中国語は「引き継ぐ・説明する・言い渡す」など。日本語の勤務交代は「换班」「轮班」など。', equivalentKey: '交代'
  },
  {
    ja: ['小人', 'こびと', '非常に背の低い人、物語上の小人'],
    zh: ['小人', '小人', 'xiǎo rén', '卑劣な人、器の小さい人'],
    similarity: 5, type: 'different' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['不要听信小人的话。', 'Bú yào tīngxìn xiǎorén de huà.', '卑劣な人の言葉を信じないでください。'],
    note: '中国語では強い否定的評価。「小さな人」という意味で安易に使わない。日本語の小人なら「小矮人」など。', equivalentKey: '小人'
  },
  {
    ja: ['是非', 'ぜひ', 'どうしても、必ず。善悪・正邪'],
    zh: ['是非', '是非', 'shì fēi', '是非、善悪、もめ事'],
    similarity: 38, type: 'overlap' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['不要卷入这些是非。', 'Bú yào juǎnrù zhèxiē shìfēi.', 'こうしたもめ事に巻き込まれないでください。'],
    note: '善悪・正邪の意味は共通するが、日本語の副詞「ぜひ」に当たる用法はない。'
  },
  {
    ja: ['清楚', 'せいそ', '飾り気がなく清らかで上品なこと'],
    zh: ['清楚', '清楚', 'qīng chu', 'はっきりしている、明確である'],
    similarity: 8, type: 'different' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['我听得很清楚。', 'Wǒ tīng de hěn qīngchu.', '私ははっきり聞こえます。'],
    note: '日本語の「清楚」と中国語の「清楚」は現代語で意味が大きく異なる。日本語の清楚な雰囲気は「清秀」「素雅」など文脈次第。'
  },
  {
    ja: ['地道', 'じみち', '派手ではないが着実に進めること'],
    zh: ['地道', '地道', 'dì dao', '本場の、正真正銘の、自然な'],
    similarity: 8, type: 'different' as SimilarityType, characters: 'identical', lexical: 'bothCommon',
    example: ['这家店的北京菜很地道。', 'Zhè jiā diàn de Běijīngcài hěn dìdao.', 'この店の北京料理はとても本場らしいです。'],
    note: '中国語 dìdao は「本場の・正真正銘の」。別読み dìdào は「地下道」。日本語の地道とは異なる。'
  },
];

export const words: ReviewedWordEntry[] = seeds.map((s, i) => ({
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
