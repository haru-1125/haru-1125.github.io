const supports = [
  {
    name: "ここをクリック", type: "", rarity: "",
    Aability: "", Bability: "", Cability: "", Dability: "",
    file: "../assets/sozai/ここをクリック.jpg", darkFile: "",
    isDummy: true // ← NIA専用ダミーとして明示
  },
  {
    name: "次の桜の季節には。", type: "vocal", rarity: "SSR",
    Aability: "レスボ", Bability: "", Cability: "レッスン", Dability: "スキル強化", SP: "",
    file: "../assets/sup/次の桜の季節には。.png", darkFile: "../assets/supan/次の桜の季節には。.png"
  },
  {
    name: "可愛いと可愛いで可愛い！", type: "vocal", rarity: "SSR",
    Aability: "固定値", Bability: "", Cability: "SPレッスン", Dability: "A獲得", SP: "SP",
    file: "../assets/sup/可愛いと可愛いで可愛い！.png", darkFile: "../assets/supan/可愛いと可愛いで可愛い！.png"
  },
  {
    name: "また、あんなに無理をして", type: "vocal", rarity: "SSR",
    Aability: "レスボ", Bability: "", Cability: "お出かけ", Dability: "M獲得", SP: "",
    file: "../assets/sup/また、あんなに無理をして.png", darkFile: "../assets/supan/また、あんなに無理をして.png"
  },
  {
    name: "あら、奇遇ね", type: "vocal", rarity: "SSR",
    Aability: "固定値", Bability: "", Cability: "レッスン", Dability: "授業", SP: "",
    file: "../assets/sup/あら、奇遇ね.png", darkFile: "../assets/supan/あら、奇遇ね.png"
  },
  {
    name: "こいつらめんどくさー", type: "vocal", rarity: "配布SSR",
    Aability: "レスボ", Bability: "", Cability: "SPレッスン", Dability: "Mスキル強化", SP: "",
    file: "../assets/sup/こいつらめんどくさー.png", darkFile: "../assets/supan/こいつらめんどくさー.png"
  },
  {
    name: "何やってるんだろう、", type: "vocal", rarity: "SSR",
    Aability: "固定値", Bability: "", Cability: "レッスン", Dability: "スキル強化", SP: "SP",
    file: "../assets/sup/何やってるんだろう、.png", darkFile: "../assets/supan/何やってるんだろう、.png"
  },
  {
    name: "まだ上がりませんように！", type: "vocal", rarity: "SSR",
    Aability: "レスボ", Bability: "", Cability: "SPレッスン", Dability: "Mスキル強化", SP: "",
    file: "../assets/sup/まだ上がりませんように！.png", darkFile: "../assets/supan/まだ上がりませんように！.png"
  },
  {
    name: "一時休戦です", type: "vocal", rarity: "SSR",
    Aability: "レスボ", Bability: "", Cability: "SPレッスン", Dability: "活動支給", SP: "",
    file: "../assets/sup/一時休戦です.png", darkFile: "../assets/supan/一時休戦です.png"
  },
  {
    name: "夏を楽しみましょう！", type: "vocal", rarity: "SSR",
    Aability: "レスボ", Bability: "", Cability: "SPレッスン", Dability: "Pドリンク交換", SP: "",
    file: "../assets/sup/夏を楽しみましょう！.png", darkFile: "../assets/supan/夏を楽しみましょう！.png"
  },
  {
    name: "1人たりとも欠ける事なく", type: "vocal", rarity: "配布SSR",
    Aability: "固定値", Bability: "", Cability: "", Dability: "相談", SP: "SP",
    file: "../assets/sup/1人たりとも欠ける事なく.png", darkFile: "../assets/supan/1人たりとも欠ける事なく.png"
  },
  {
    name: "二人ならあっという間だね", type: "vocal", rarity: "SSR",
    Aability: "レスボ", Bability: "授業", Cability: "スキル強化", Dability: "SPレッスン", SP: "",
    file: "../assets/sup/二人ならあっという間だね.png", darkFile: "../assets/supan/二人ならあっという間だね.png"
  },
  {
    name: "すっかり秋色ですわね！", type: "vocal", rarity: "SSR",
    Aability: "固定値", Bability: "", Cability: "好調or好印象or温存獲得", Dability: "活動支給", SP: "SP",
    file: "../assets/sup/すっかり秋色ですわね！.png", darkFile: "../assets/supan/すっかり秋色ですわね！.png"
  },
  {
    name: "もう一度、最初から！", type: "vocal", rarity: "SSR",
    Aability: "レスボ", Bability: "", Cability: "SPレッスン", Dability: "授業", SP: "SP",
    file: "../assets/sup/もう一度、最初から！.png", darkFile: "../assets/supan/もう一度、最初から！.png"
  },
  {
    name: "はいっ、みんなも一緒に♪", type: "vocal", rarity: "SSR",
    Aability: "レスボ", Bability: "", Cability: "", Dability: "お出かけ", SP: "SP",
    file: "../assets/sup/はいっ、みんなも一緒に♪.png", darkFile: "../assets/supan/はいっ、みんなも一緒に♪.png"
  },
  {
    name: "絶対にお渡ししますわっ！", type: "vocal", rarity: "SSR",
    Aability: "固定値", Bability: "", Cability: "レッスン", Dability: "お出かけ", SP: "SP",
    file: "../assets/sup/絶対にお渡ししますわっ！.png", darkFile: "../assets/supan/絶対にお渡ししますわっ！.png"
  },
  {
    name: "さあ、もう一戦！", type: "vocal", rarity: "配布SSR",
    Aability: "レスボ", Bability: "", Cability: "SPレッスン", Dability: "M獲得", SP: "",
    file: "../assets/sup/さあ、もう一戦！.png", darkFile: "../assets/supan/さあ、もう一戦！.png"
  },
  {
    name: "相変わらず不器用ね", type: "vocal", rarity: "SSR",
    Aability: "固定値", Bability: "好調or好印象or温存獲得", Cability: "SPレッスン", Dability: "お出かけ", SP: "",
    file: "../assets/sup/相変わらず不器用ね.png", darkFile: "../assets/supan/相変わらず不器用ね.png"
  },
  {
    name: "みんなの意見を聞かせて♪", type: "vocal", rarity: "配布SSR",
    Aability: "固定値", Bability: "", Cability: "授業", Dability: "A強化", SP: "",
    file: "../assets/sup/みんなの意見を聞かせて♪.png", darkFile: "../assets/supan/みんなの意見を聞かせて♪.png"
  },
  {
    name: "どんな関係なんですか？", type: "vocal", rarity: "SSR",
    Aability: "固定値", Bability: "", Cability: "授業", Dability: "A強化", SP: "",
    file: "../assets/sup/どんな関係なんですか？.png", darkFile: "../assets/supan/どんな関係なんですか？.png"
  },
  {
    name: "放っておけない気になる子", type: "vocal", rarity: "SSR",
    Aability: "固定値", Bability: "削除", Cability: "Pドリンク交換", Dability: "活動支給", SP: "",
    file: "../assets/sup/放っておけない気になる子.png", darkFile: "../assets/supan/放っておけない気になる子.png"
  },
  {
    name: "仲直りしましょう", type: "vocal", rarity: "配布SSR",
    Aability: "固定値", Bability: "", Cability: "", Dability: "", SP: "",
    file: "../assets/sup/仲直りしましょう.png", darkFile: "../assets/supan/仲直りしましょう.png"
  },
  {
    name: "おっと、危ないよ", type: "vocal", rarity: "SSR",
    Aability: "固定値", Bability: "", Cability: "", Dability: "", SP: "",
    file: "../assets/sup/おっと、危ないよ.png", darkFile: "../assets/supan/おっと、危ないよ.png"
  },
  {
    name: "ぐぬぬぬぬ…………！", type: "dance", rarity: "SSR",
    Aability: "レスボ", Bability: "", Cability: "活動支給", Dability: "M獲得", SP: "",
    file: "../assets/sup/ぐぬぬぬぬ…………！.png", darkFile: "../assets/supan/ぐぬぬぬぬ…………！.png"
  },
  {
    name: "おいしい顔、いただき～！", type: "dance", rarity: "SSR",
    Aability: "固定値", Bability: "", Cability: "SPレッスン", Dability: "スキル強化", SP: "SP",
    file: "../assets/sup/おいしい顔、いただき～！.png", darkFile: "../assets/supan/おいしい顔、いただき～！.png"
  },
  {
    name: "まじか。", type: "dance", rarity: "SSR",
    Aability: "固定値", Bability: "", Cability: "レッスン", Dability: "相談", SP: "",
    file: "../assets/sup/まじか。.png", darkFile: "../assets/supan/まじか。.png"
  },
  {
    name: "ほら、一緒に持と♪", type: "dance", rarity: "SSR",
    Aability: "レスボ", Bability: "", Cability: "レッスン", Dability: "A獲得", SP: "",
    file: "../assets/sup/ほら、一緒に持と♪.png", darkFile: "../assets/supan/ほら、一緒に持と♪.png"
  },
  {
    name: "わたしたち、やればできる", type: "dance", rarity: "配布SSR",
    Aability: "レスボ", Bability: "", Cability: "SPレッスン", Dability: "Mスキル強化", SP: "",
    file: "../assets/sup/わたしたち、やればできる.png", darkFile: "../assets/supan/わたしたち、やればできる.png"
  },
  {
    name: "晴れたね", type: "dance", rarity: "SSR",
    Aability: "レスボ", Bability: "", Cability: "休む", Dability: "お出かけ", SP: "",
    file: "../assets/sup/晴れたね.png", darkFile: "../assets/supan/晴れたね.png"
  },
  {
    name: "もうっ！冷たいよ！", type: "dance", rarity: "SSR",
    Aability: "固定値", Bability: "", Cability: "SPレッスン", Dability: "試験終了時", SP: "SP",
    file: "../assets/sup/もうっ！冷たいよ！.png", darkFile: "../assets/supan/もうっ！冷たいよ！.png"
  },
  {
    name: "夏を満喫するわよ！", type: "dance", rarity: "SSR",
    Aability: "レスボ", Bability: "Mスキル強化", Cability: "SPレッスン", Dability: "授業", SP: "",
    file: "../assets/sup/夏を満喫するわよ！.png", darkFile: "../assets/supan/夏を満喫するわよ！.png"
  },
  {
    name: "あっちも行きたいですわ！", type: "dance", rarity: "SSR",
    Aability: "固定値", Bability: "", Cability: "SPレッスン", Dability: "A獲得", SP: "SP",
    file: "../assets/sup/あっちも行きたいですわ！.png", darkFile: "../assets/supan/あっちも行きたいですわ！.png"
  },
  {
    name: "似合うんじゃない？", type: "dance", rarity: "SSR",
    Aability: "レスボ", Bability: "", Cability: "SPレッスン", Dability: "お出かけ", SP: "",
    file: "../assets/sup/似合うんじゃない？.png", darkFile: "../assets/supan/似合うんじゃない？.png"
  },
  {
    name: "そろそろ焼けたかな？", type: "dance", rarity: "SSR",
    Aability: "固定値", Bability: "", Cability: "SPレッスン", Dability: "活動支給", SP: "SP",
    file: "../assets/sup/そろそろ焼けたかな？.png", darkFile: "../assets/supan/そろそろ焼けたかな？.png"
  },
  {
    name: "プロデュースって大変ね", type: "dance", rarity: "配布SSR",
    Aability: "固定値", Bability: "", Cability: "", Dability: "試験終了時", SP: "SP",
    file: "../assets/sup/プロデュースって大変ね.png", darkFile: "../assets/supan/プロデュースって大変ね.png"
  },
  {
    name: "キラキラして綺麗～っ！", type: "dance", rarity: "SSR",
    Aability: "レスボ", Bability: "相談", Cability: "SPレッスン", Dability: "試験終了時", SP: "",
    file: "../assets/sup/キラキラして綺麗～っ！.png", darkFile: "../assets/supan/キラキラして綺麗～っ！.png"
  },
  {
    name: "待ちなさーい！", type: "dance", rarity: "SSR",
    Aability: "固定値", Bability: "", Cability: "SPレッスン", Dability: "A獲得", SP: "SP",
    file: "../assets/sup/待ちなさーい！.png", darkFile: "../assets/supan/待ちなさーい！.png"
  },
  {
    name: "これが私達の、3年間", type: "dance", rarity: "SSR",
    Aability: "レスボ", Bability: "", Cability: "SPレッスン", Dability: "授業", SP: "",
    file: "../assets/sup/これが私達の、3年間.png", darkFile: "../assets/supan/これが私達の、3年間.png"
  },
  {
    name: "あなたたちのことが好き", type: "dance", rarity: "SSR",
    Aability: "固定値", Bability: "", Cability: "SPレッスン", Dability: "Mスキル強化", SP: "SP",
    file: "../assets/sup/あなたたちのことが好き.png", darkFile: "../assets/supan/あなたたちのことが好き.png"
  },
  {
    name: "ひとりで立てますか？", type: "dance", rarity: "SSR",
    Aability: "固定値", Bability: "", Cability: "SPレッスン", Dability: "M獲得", SP: "SP",
    file: "../assets/sup/ひとりで立てますか？.png", darkFile: "../assets/supan/ひとりで立てますか？.png"
  },
  {
    name: "ここから始まるんだね！", type: "dance", rarity: "SSR",
    Aability: "レスボ", Bability: "削除", Cability: "SPレッスン", Dability: "授業", SP: "",
    file: "../assets/sup/ここから始まるんだね！.png", darkFile: "../assets/supan/ここから始まるんだね！.png"
  },
  {
    name: "利用し合うのが友達！", type: "dance", rarity: "SSR",
    Aability: "初期値", Bability: "試験終了時", Cability: "チェンジ", Dability: "授業", SP: "",
    file: "../assets/sup/利用し合うのが友達！.png", darkFile: "../assets/supan/利用し合うのが友達！.png"
  },
  {
    name: "よくやったな、倉本。", type: "dance", rarity: "SSR",
    Aability: "初期値", Bability: "", Cability: "SPレッスン", Dability: "Pドリンク獲得", SP: "SP",
    file: "../assets/sup/よくやったな、倉本。.png", darkFile: "../assets/supan/よくやったな、倉本。.png"
  },
  {
    name: "すっかり仲良しって感じ♪", type: "dance", rarity: "配布SSR",
    Aability: "初期値", Bability: "", Cability: "SPレッスン", Dability: "試験終了時", SP: "SP",
    file: "../assets/sup/すっかり仲良しって感じ♪.png", darkFile: "../assets/supan/すっかり仲良しって感じ♪.png"
  },
  {
    name: "お母さんか！", type: "dance", rarity: "配布SSR",
    Aability: "レスボ", Bability: "", Cability: "SPレッスン", Dability: "相談", SP: "",
    file: "../assets/sup/お母さんか！.png", darkFile: "../assets/supan/お母さんか！.png"
  },
  {
    name: "盛り上げてこー！", type: "dance", rarity: "配布SSR",
    Aability: "初期値", Bability: "", Cability: "SPレッスン", Dability: "授業", SP: "",
    file: "../assets/sup/盛り上げてこー！.png", darkFile: "../assets/supan/盛り上げてこー！.png"
  },
  {
    name: "いつまでも続けばいいのに", type: "dance", rarity: "SSR",
    Aability: "初期値", Bability: "Pドリンク獲得", Cability: "SPレッスン", Dability: "SSR獲得", SP: "",
    file: "../assets/sup/いつまでも続けばいいのに.png", darkFile: "../assets/supan/いつまでも続けばいいのに.png"
  }, 
  {
    name: "おい、来てやったぞ！", type: "dance", rarity: "SSR",
    Aability: "", Bability: "", Cability: "", Dability: "", SP: "",
    file: "../assets/sup/おい、来てやったぞ！.png", darkFile: "../assets/supan/いつまでも続おい、来てやったぞ！けばいいのに.png"
  },
  {
    name: "あなたにも作ってあげる！", type: "visual", rarity: "SSR",
    Aability: "初期値", Bability: "", Cability: "レッスン", Dability: "休む", SP: "",
    file: "../assets/sup/あなたにも作ってあげる！.png", darkFile: "../assets/supan/あなたにも作ってあげる！.png"
  },
  {
    name: "お姉ちゃんに任せなさい！", type: "visual", rarity: "SSR",
    Aability: "レスボ", Bability: "", Cability: "SPレッスン", Dability: "スキル強化", SP: "",
    file: "../assets/sup/お姉ちゃんに任せなさい！.png", darkFile: "../assets/supan/お姉ちゃんに任せなさい！.png"
  },
  {
    name: "お疲れ様、千奈ちゃん。", type: "visual", rarity: "SSR",
    Aability: "レスボ", Bability: "", Cability: "レッスン", Dability: "A獲得", SP: "",
    file: "../assets/sup/お疲れ様、千奈ちゃん。.png", darkFile: "../assets/supan/お疲れ様、千奈ちゃん。.png"
  },
  {
    name: "まるで王子様みたいな", type: "visual", rarity: "SSR",
    Aability: "固定値", Bability: "", Cability: "SPレッスン", Dability: "M獲得", SP: "SP",
    file: "../assets/sup/まるで王子様みたいな.png", darkFile: "../assets/supan/まるで王子様みたいな.png"
  },
  {
    name: "私の目に狂いはない", type: "visual", rarity: "SSR",
    Aability: "レスボ", Bability: "", Cability: "授業", Dability: "スキル強化", SP: "",
    file: "../assets/sup/私の目に狂いはない.png", darkFile: "../assets/supan/私の目に狂いはない.png"
  },
  {
    name: "仕事のつもりで臨みなさい", type: "visual", rarity: "配布SSR",
    Aability: "固定値", Bability: "", Cability: "レッスン", Dability: "M獲得", SP: "",
    file: "../assets/sup/仕事のつもりで臨みなさい.png", darkFile: "../assets/supan/仕事のつもりで臨みなさい.png"
  },
  {
    name: "第2回教室パーティー！", type: "visual", rarity: "配布SSR",
    Aability: "固定値", Bability: "", Cability: "レッスン", Dability: "試験終了時", SP: "SP",
    file: "../assets/sup/第2回教室パーティー！.png", darkFile: "../assets/supan/第2回教室パーティー！.png"
  },
  {
    name: "「ア」じゃなくて「エ」！", type: "visual", rarity: "SSR",
    Aability: "固定値", Bability: "", Cability: "レッスン", Dability: "M獲得", SP: "SP",
    file: "../assets/sup/「ア」じゃなくて「エ」！.png", darkFile: "../assets/supan/「ア」じゃなくて「エ」！.png"
  },
  {
    name: "花火、やりませんか……？", type: "visual", rarity: "SSR",
    Aability: "レスボ", Bability: "A獲得", Cability: "SPレッスン", Dability: "相談", SP: "",
    file: "../assets/sup/花火、やりませんか……？.png", darkFile: "../assets/supan/花火、やりませんか……？.png"
  },
  {
    name: "ゆっくりと過ごしましょう", type: "visual", rarity: "SSR",
    Aability: "固定値", Bability: "", Cability: "SPレッスン", Dability: "Pドリンク交換", SP: "",
    file: "../assets/sup/ゆっくりと過ごしましょう.png", darkFile: "../assets/supan/ゆっくりと過ごしましょう.png"
  },
  {
    name: "新たな挑戦の成功ですわ！", type: "visual", rarity: "SSR",
    Aability: "固定値", Bability: "", Cability: "レッスン", Dability: "A獲得", SP: "SP",
    file: "../assets/sup/新たな挑戦の成功ですわ！.png", darkFile: "../assets/supan/新たな挑戦の成功ですわ！.png"
  },
  {
    name: "会長、準備は万端です", type: "visual", rarity: "SSR",
    Aability: "レスボ", Bability: "", Cability: "Mスキル強化", Dability: "お出かけ", SP: "",
    file: "../assets/sup/会長、準備は万端です.png", darkFile: "../assets/supan/会長、準備は万端です.png"
  },
  {
    name: "さみだれ", type: "visual", rarity: "配布SSR",
    Aability: "レスボ", Bability: "", Cability: "SPレッスン", Dability: "Mスキル強化", SP: "",
    file: "../assets/sup/さみだれ.png", darkFile: "../assets/supan/さみだれ.png"
  },
  {
    name: "ぜったい追いついてやる！", type: "visual", rarity: "SSR",
    Aability: "レスボ", Bability: "授業", Cability: "スキル強化", Dability: "SPレッスン", SP: "",
    file: "../assets/sup/ぜったい追いついてやる！.png", darkFile: "../assets/supan/ぜったい追いついてやる！.png"
  },
  {
    name: "あったかいね", type: "visual", rarity: "SSR",
    Aability: "レスボ", Bability: "", Cability: "M獲得", Dability: "相談", SP: "SP",
    file: "../assets/sup/あったかいね.png", darkFile: "../assets/supan/あったかいね.png"
  },
  {
    name: "バレンタイン♡会議中ーっ！", type: "visual", rarity: "SSR",
    Aability: "レスボ", Bability: "削除", Cability: "Mスキル強化", Dability: "SPレッスン", SP: "",
    file: "../assets/sup/バレンタイン♡会議中ーっ！.png", darkFile: "../assets/supan/バレンタイン♡会議中ーっ！.png"
  },
  {
    name: "新生活のはじまりだね", type: "visual", rarity: "SSR",
    Aability: "固定値", Bability: "", Cability: "レッスン", Dability: "好調or好印象or温存獲得", SP: "SP",
    file: "../assets/sup/新生活のはじまりだね.png", darkFile: "../assets/supan/新生活のはじまりだね.png"
  },
  {
    name: "相手にとって不足なしよ！", type: "visual", rarity: "SSR",
    Aability: "固定値", Bability: "", Cability: "SPレッスン", Dability: "M削除", SP: "SP",
    file: "../assets/sup/相手にとって不足なしよ！.png", darkFile: "../assets/supan/相手にとって不足なしよ！.png"
  },
  {
    name: "わたしと美鈴、超仲良し", type: "visual", rarity: "配布SSR",
    Aability: "レスボ", Bability: "", Cability: "SPレッスン", Dability: "A獲得", SP: "",
    file: "../assets/sup/わたしと美鈴、超仲良し.png", darkFile: "../assets/supan/わたしと美鈴、超仲良し.png"
  },
  {
    name: "ひとりごとです", type: "visual", rarity: "SSR",
    Aability: "固定値", Bability: "チェンジ", Cability: "SPレッスン", Dability: "A削除", SP: "",
    file: "../assets/sup/ひとりごとです.png", darkFile: "../assets/supan/ひとりごとです.png"
  },
  {
    name: "迷子のおしらせです", type: "visual", rarity: "配布SSR",
    Aability: "固定値", Bability: "", Cability: "M獲得", Dability: "M強化", SP: "SP",
    file: "../assets/sup/迷子のおしらせです.png", darkFile: "../assets/supan/迷子のおしらせです.png"
  },
  {
    name: "推し活なひととき、だね！", type: "visual", rarity: "SSR",
    Aability: "", Bability: "", Cability: "", Dability: "", SP: "全SP",
    file: "../assets/sup/推し活なひととき、だね！.png", darkFile: "../assets/supan/推し活なひととき、だね！.png"
  },
    {
    name: "いつも頑張ってるね。", type: "visual", rarity: "SSR",
    Aability: "", Bability: "", Cability: "", Dability: "", SP: "全SP",
    file: "../assets/sup/いつも頑張ってるね。.png", darkFile: "../assets/supan/いつも頑張ってるね。.png"
  },
  {
    name: "きみは、自慢の生徒です", type: "assist", rarity: "SSR",
    Aability: "", Bability: "", Cability: "", Dability: "", SP: "全SP",
    file: "../assets/sup/きみは、自慢の生徒です.png", darkFile: "../assets/supan/きみは、自慢の生徒です.png"
  },
  {
    name: "食欲の秋なんです", type: "assist", rarity: "SSR",
    Aability: "", Bability: "", Cability: "", Dability: "", SP: "全SP",
    file: "../assets/sup/食欲の秋なんです.png", darkFile: "../assets/supan/食欲の秋なんです.png"
  },
  {
    name: "今はあえて、背を向けて", type: "vocal", rarity: "SR",
    Aability: "レスボ", Bability: "", Cability: "SPレッスン", Dability: "試験終了時", SP: "SP",
    file: "../assets/supsr/今はあえて、背を向けて.png", darkFile: ""
  },
  {
    name: "ふわふわなお面？", type: "dance", rarity: "SR",
    Aability: "固定値", Bability: "", Cability: "SPレッスン", Dability: "お出かけ", SP: "SP",
    file: "../assets/supsr/ふわふわなお面？.png", darkFile: ""
  },
  {
    name: "まだまだのばしてー", type: "visual", rarity: "SR",
    Aability: "固定値", Bability: "", Cability: "", Dability: "お出かけ", SP: "SP",
    file: "../assets/supsr/まだまだのばしてー.png", darkFile: ""
  },
  {
    name: "2名様、ご案内～♪", type: "vocal", rarity: "SR",
    Aability: "固定値", Bability: "お出かけ", Cability: "スキル強化", Dability: "授業", SP: "",
    file: "../assets/supsr/2名様、ご案内～♪.png", darkFile: ""
  },
  // 他のキャラもここに追加
];