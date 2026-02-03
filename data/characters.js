const characters = [
  {
    name: "ここをクリック", chara: "", file: "../assets/sozai/ここをクリック.jpg", darkFile: "",
    VocalPercent: "", DancePercent: "", VisualPercent: "", VocalPercent3: "", DancePercent3: "", VisualPercent3: "",
    VocalIni: "", DanceIni: "", VisualIni: "", FirstType: "", SecondType: "", ThirdType: "", series: "", suteType:"",
    isDummy: true // ← NIA専用ダミーとして明示
  },
  {
    name: "咲季（FMW）", chara: "咲季", file: "../assets/chara/咲季（FMW）.png", darkFile: "../assets/charaan/咲季（FMW）.png",
    VocalPercent: 16.5, DancePercent: 16.5, VisualPercent: 20.5, VocalPercent3: 19.5, DancePercent3: 19.5, VisualPercent3: 22.5,
    VocalIni: 100, DanceIni: 100, VisualIni: 105, FirstType: "Visual", SecondType: "Dance", ThirdType: "Vocal", series: "恒常", suteType:"3極"
  },
  {
    name: "咲季（BBP）", chara: "咲季", file: "../assets/chara/咲季（BBP）.png", darkFile: "../assets/charaan/咲季（BBP）.png",
    VocalPercent: 16.5, DancePercent: 16.5, VisualPercent: 20.5, VocalPercent3: 19.5, DancePercent3: 19.5, VisualPercent3: 22.5,
    VocalIni: 100, DanceIni: 100, VisualIni: 105, FirstType: "Visual", SecondType: "Dance", ThirdType: "Vocal", series: "恒常", suteType:"3極"
  },
  {
    name: "咲季（冠菊）", chara: "咲季", file: "../assets/chara/咲季（冠菊）.png", darkFile: "../assets/charaan/咲季（冠菊）.png",
    VocalPercent: 16.5, DancePercent: 16.5, VisualPercent: 20.5, VocalPercent3: 19.5, DancePercent3: 19.5, VisualPercent3: 22.5,
    VocalIni: 100, DanceIni: 100, VisualIni: 105, FirstType: "Visual", SecondType: "Dance", ThirdType: "Vocal", series: "恒常", suteType:"3極"
  },
  {
    name: "咲季（アニメ）", chara: "咲季", file: "../assets/chara/咲季（アニメ）.png", darkFile: "../assets/charaan/咲季（アニメ）.png",
    VocalPercent: 16.5, DancePercent: 16.5, VisualPercent: 20.5, VocalPercent3: 19.5, DancePercent3: 19.5, VisualPercent3: 22.5,
    VocalIni: 100, DanceIni: 100, VisualIni: 105, FirstType: "Visual", SecondType: "Dance", ThirdType: "Vocal", series: "恒常", suteType:"3極"
  },
  {
    name: "咲季（CM）", chara: "咲季", file: "../assets/chara/咲季（CM）.png", darkFile: "../assets/charaan/咲季（CM）.png",
    VocalPercent: 16.5, DancePercent: 16.5, VisualPercent: 20.5, VocalPercent3: 19.5, DancePercent3: 19.5, VisualPercent3: 22.5,
    VocalIni: 100, DanceIni: 100, VisualIni: 105, FirstType: "Visual", SecondType: "Dance", ThirdType: "Vocal", series: "CM", suteType:"3極"
  },
  {
    name: "咲季（桜）", chara: "咲季", file: "../assets/chara/咲季（桜）.png", darkFile: "../assets/charaan/咲季（桜）.png",
    VocalPercent: 16.5, DancePercent: 16.5, VisualPercent: 20.5, VocalPercent3: 19.5, DancePercent3: 19.5, VisualPercent3: 22.5,
    VocalIni: 100, DanceIni: 100, VisualIni: 105, FirstType: "Visual", SecondType: "Dance", ThirdType: "Vocal", series: "限定", suteType:"3極"
  },
  {
    name: "咲季（アイリス）", chara: "咲季", file: "../assets/chara/咲季（アイリス）.png", darkFile: "../assets/charaan/咲季（アイリス）.png",
    VocalPercent: 16.5, DancePercent: 16.5, VisualPercent: 20.5, VocalPercent3: 19.5, DancePercent3: 19.5, VisualPercent3: 22.5,
    VocalIni: 100, DanceIni: 100, VisualIni: 105, FirstType: "Visual", SecondType: "Dance", ThirdType: "Vocal", series: "限定", suteType:"3極"
  },
  {
    name: "咲季（がむしゃら）", chara: "咲季", file: "../assets/chara/咲季（がむしゃら）.png", darkFile: "../assets/charaan/咲季（がむしゃら）.png",
    VocalPercent: 16.5, DancePercent: 16.5, VisualPercent: 20.5, VocalPercent3: 19.5, DancePercent3: 19.5, VisualPercent3: 22.5,
    VocalIni: 100, DanceIni: 100, VisualIni: 105, FirstType: "Visual", SecondType: "Dance", ThirdType: "Vocal", series: "限定", suteType:"3極"
  },
  {
    name: "手毬（LSM）", chara: "手毬", file: "../assets/chara/手毬（LSM）.png", darkFile: "../assets/charaan/手毬（LSM）.png",
    VocalPercent: 24, DancePercent: 21.5, VisualPercent: 8.5, VocalPercent3: 27, DancePercent3: 26.5, VisualPercent3: 8.5,
    VocalIni: 120, DanceIni: 100, VisualIni: 80, FirstType: "Vocal", SecondType: "Dance", ThirdType: "Visual", series: "恒常", suteType:"2極"
  },
  {
    name: "手毬（アイヴイ）", chara: "手毬", file: "../assets/chara/手毬（アイヴイ）.png", darkFile: "../assets/charaan/手毬（アイヴイ）.png",
    VocalPercent: 24, DancePercent: 21.5, VisualPercent: 8.5, VocalPercent3: 27, DancePercent3: 26.5, VisualPercent3: 8.5,
    VocalIni: 120, DanceIni: 100, VisualIni: 80, FirstType: "Vocal", SecondType: "Dance", ThirdType: "Visual", series: "恒常", suteType:"2極"
  },
  {
    name: "手毬（ハロ）", chara: "手毬", file: "../assets/chara/手毬（ハロ）.png", darkFile: "../assets/charaan/手毬（ハロ）.png",
    VocalPercent: 24, DancePercent: 21.5, VisualPercent: 8.5, VocalPercent3: 27, DancePercent3: 26.5, VisualPercent3: 8.5,
    VocalIni: 120, DanceIni: 100, VisualIni: 80, FirstType: "Vocal", SecondType: "Dance", ThirdType: "Visual", series: "限定", suteType:"2極"
  },
  {
    name: "手毬（CM）", chara: "手毬", file: "../assets/chara/手毬（CM）.png", darkFile: "../assets/charaan/手毬（CM）.png",
    VocalPercent: 24, DancePercent: 21.5, VisualPercent: 8.5, VocalPercent3: 27, DancePercent3: 26.5, VisualPercent3: 8.5,
    VocalIni: 120, DanceIni: 100, VisualIni: 80, FirstType: "Vocal", SecondType: "Dance", ThirdType: "Visual", series: "CM", suteType:"2極"
  },
  {
    name: "手毬（ひな）", chara: "手毬", file: "../assets/chara/手毬（ひな）.png", darkFile: "../assets/charaan/手毬（ひな）.png",
    VocalPercent: 24, DancePercent: 21.5, VisualPercent: 8.5, VocalPercent3: 27, DancePercent3: 26.5, VisualPercent3: 8.5,
    VocalIni: 120, DanceIni: 100, VisualIni: 80, FirstType: "Vocal", SecondType: "Dance", ThirdType: "Visual", series: "恒常", suteType:"2極"
  },
  {
    name: "手毬（アイリス）", chara: "手毬", file: "../assets/chara/手毬（アイリス）.png", darkFile: "../assets/charaan/手毬（アイリス）.png",
    VocalPercent: 24, DancePercent: 21.5, VisualPercent: 8.5, VocalPercent3: 27, DancePercent3: 26.5, VisualPercent3: 8.5,
    VocalIni: 120, DanceIni: 100, VisualIni: 80, FirstType: "Vocal", SecondType: "Dance", ThirdType: "Visual", series: "限定", suteType:"2極"
  },
  {
    name: "手毬（がむ）", chara: "手毬", file: "../assets/chara/手毬（がむ）.png", darkFile: "../assets/charaan/手毬（がむ）.png",
    VocalPercent: 24, DancePercent: 21.5, VisualPercent: 8.5, VocalPercent3: 27, DancePercent3: 26.5, VisualPercent3: 8.5,
    VocalIni: 120, DanceIni: 100, VisualIni: 80, FirstType: "Vocal", SecondType: "Dance", ThirdType: "Visual", series: "限定", suteType:"2極"
  },
  {
    name: "手毬（いつ）", chara: "手毬", file: "../assets/chara/手毬（いつ）.png", darkFile: "../assets/charaan/手毬（いつ）.png",
    VocalPercent: 24, DancePercent: 21.5, VisualPercent: 8.5, VocalPercent3: 27, DancePercent3: 26.5, VisualPercent3: 8.5,
    VocalIni: 120, DanceIni: 100, VisualIni: 80, FirstType: "Vocal", SecondType: "Dance", ThirdType: "Visual", series: "限定", suteType:"2極"
  },
  {
    name: "ことね（世界一）", chara: "ことね", file: "../assets/chara/ことね（世界一）.png", darkFile: "../assets/charaan/ことね（世界一）.png",
    VocalPercent: 8, DancePercent: 24.5, VisualPercent: 22.5, VocalPercent3: 8, DancePercent3: 29.5, VisualPercent3: 25.5,
    VocalIni: 90, DanceIni: 90, VisualIni: 120, FirstType: "Dance", SecondType: "Visual", ThirdType: "Vocal", series: "恒常", suteType:"2極"
  },
  {
    name: "ことね（YBB）", chara: "ことね", file: "../assets/chara/ことね（YBB）.png", darkFile: "../assets/charaan/ことね（YBB）.png",
    VocalPercent: 8, DancePercent: 24.5, VisualPercent: 22.5, VocalPercent3: 8, DancePercent3: 29.5, VisualPercent3: 25.5,
    VocalIni: 90, DanceIni: 90, VisualIni: 120, FirstType: "Dance", SecondType: "Visual", ThirdType: "Vocal", series: "恒常", suteType:"2極"
  },
  {
    name: "ことね（冠菊）", chara: "ことね", file: "../assets/chara/ことね（冠菊）.png", darkFile: "../assets/charaan/ことね（冠菊）.png",
    VocalPercent: 8, DancePercent: 24.5, VisualPercent: 22.5, VocalPercent3: 8, DancePercent3: 29.5, VisualPercent3: 25.5,
    VocalIni: 90, DanceIni: 90, VisualIni: 120, FirstType: "Dance", SecondType: "Visual", ThirdType: "Vocal", series: "限定", suteType:"2極"
  },
  {
    name: "ことね（クリ）", chara: "ことね", file: "../assets/chara/ことね（クリ）.png", darkFile: "../assets/charaan/ことね（クリ）.png",
    VocalPercent: 8, DancePercent: 24.5, VisualPercent: 22.5, VocalPercent3: 8, DancePercent3: 29.5, VisualPercent3: 25.5,
    VocalIni: 90, DanceIni: 90, VisualIni: 120, FirstType: "Dance", SecondType: "Visual", ThirdType: "Vocal", series: "恒常", suteType:"2極"
  },
  {
    name: "ことね（CM）", chara: "ことね", file: "../assets/chara/ことね（CM）.png", darkFile: "../assets/charaan/ことね（CM）.png",
    VocalPercent: 8, DancePercent: 24.5, VisualPercent: 22.5, VocalPercent3: 8, DancePercent3: 29.5, VisualPercent3: 25.5,
    VocalIni: 90, DanceIni: 90, VisualIni: 120, FirstType: "Dance", SecondType: "Visual", ThirdType: "Vocal", series: "CM", suteType:"2極"
  },
  {
    name: "ことね（アイリス）", chara: "ことね", file: "../assets/chara/ことね（アイリス）.png", darkFile: "../assets/charaan/ことね（アイリス）.png",
    VocalPercent: 8, DancePercent: 24.5, VisualPercent: 22.5, VocalPercent3: 8, DancePercent3: 29.5, VisualPercent3: 25.5,
    VocalIni: 90, DanceIni: 90, VisualIni: 120, FirstType: "Dance", SecondType: "Visual", ThirdType: "Vocal", series: "限定", suteType:"2極"
  },
  {
    name: "ことね（爆上げ）", chara: "ことね", file: "../assets/chara/ことね（爆上げ）.png", darkFile: "../assets/charaan/ことね（爆上げ）.png",
    VocalPercent: 8, DancePercent: 24.5, VisualPercent: 22.5, VocalPercent3: 8, DancePercent3: 29.5, VisualPercent3: 25.5,
    VocalIni: 90, DanceIni: 90, VisualIni: 120, FirstType: "Dance", SecondType: "Visual", ThirdType: "Vocal", series: "恒常", suteType:"2極"
  },
  {
    name: "ことね（がむ）", chara: "ことね", file: "../assets/chara/ことね（がむ）.png", darkFile: "../assets/charaan/ことね（がむ）.png",
    VocalPercent: 8, DancePercent: 24.5, VisualPercent: 22.5, VocalPercent3: 8, DancePercent3: 29.5, VisualPercent3: 25.5,
    VocalIni: 90, DanceIni: 90, VisualIni: 120, FirstType: "Dance", SecondType: "Visual", ThirdType: "Vocal", series: "限定", suteType:"2極"
  },
  {
    name: "燕（理論武装）", chara: "燕", file: "../assets/chara/燕（理論武装）.png", darkFile: "../assets/charaan/燕（理論武装）.png",
    VocalPercent: 8, DancePercent: 24.5, VisualPercent: 22.5, VocalPercent3: 8, DancePercent3: 29.5, VisualPercent3: 25.5,
    VocalIni: 90, DanceIni: 90, VisualIni: 120, FirstType: "Dance", SecondType: "Visual", ThirdType: "Vocal", series: "限定", suteType:"2極"
  },
  {
    name: "燕（CM）", chara: "燕", file: "../assets/chara/燕（CM）.png", darkFile: "../assets/charaan/燕（CM）.png",
    VocalPercent: 8, DancePercent: 24.5, VisualPercent: 22.5, VocalPercent3: 8, DancePercent3: 29.5, VisualPercent3: 25.5,
    VocalIni: 90, DanceIni: 90, VisualIni: 120, FirstType: "Dance", SecondType: "Visual", ThirdType: "Vocal", series: "限定", suteType:"2極"
  },
  {
    name: "麻央（Fluorite）", chara: "麻央", file: "../assets/chara/麻央（Fluorite）.png", darkFile: "../assets/charaan/麻央（Fluorite）.png",
    VocalPercent: 22, DancePercent: 8, VisualPercent: 23, VocalPercent3: 25, DancePercent3: 8, VisualPercent3: 28,
    VocalIni: 125, DanceIni: 90, VisualIni: 100, FirstType: "Vocal", SecondType: "Visual", ThirdType: "Dance", series: "恒常", suteType:"2極"
  },
  {
    name: "麻央（セミ）", chara: "麻央", file: "../assets/chara/麻央（セミ）.png", darkFile: "../assets/charaan/麻央（セミ）.png",
    VocalPercent: 22, DancePercent: 8, VisualPercent: 23, VocalPercent3: 25, DancePercent3: 8, VisualPercent3: 28,
    VocalIni: 125, DanceIni: 90, VisualIni: 100, FirstType: "Vocal", SecondType: "Visual", ThirdType: "Dance", series: "恒常", suteType:"2極"
  },
  {
    name: "麻央（FJD）", chara: "麻央", file: "../assets/chara/麻央（FJD）.png", darkFile: "../assets/charaan/麻央（FJD）.png",
    VocalPercent: 22, DancePercent: 8, VisualPercent: 23, VocalPercent3: 25, DancePercent3: 8, VisualPercent3: 28,
    VocalIni: 125, DanceIni: 90, VisualIni: 100, FirstType: "Vocal", SecondType: "Visual", ThirdType: "Dance", series: "恒常", suteType:"2極"
  },
  {
    name: "麻央（CM）", chara: "麻央", file: "../assets/chara/麻央（CM）.png", darkFile: "../assets/charaan/麻央（CM）.png",
    VocalPercent: 22, DancePercent: 8, VisualPercent: 23, VocalPercent3: 25, DancePercent3: 8, VisualPercent3: 28,
    VocalIni: 125, DanceIni: 90, VisualIni: 100, FirstType: "Vocal", SecondType: "Visual", ThirdType: "Dance", series: "CM", suteType:"2極"
  },
  {
    name: "麻央（ひな）", chara: "麻央", file: "../assets/chara/麻央（ひな）.png", darkFile: "../assets/charaan/麻央（ひな）.png",
    VocalPercent: 22, DancePercent: 8, VisualPercent: 23, VocalPercent3: 25, DancePercent3: 8, VisualPercent3: 28,
    VocalIni: 125, DanceIni: 90, VisualIni: 100, FirstType: "Vocal", SecondType: "Visual", ThirdType: "Dance", series: "限定", suteType:"2極"
  },
  {
    name: "麻央（ナナウ）", chara: "麻央", file: "../assets/chara/麻央（ナナウ）.png", darkFile: "../assets/charaan/麻央（ナナウ）.png",
    VocalPercent: 22, DancePercent: 8, VisualPercent: 23, VocalPercent3: 25, DancePercent3: 8, VisualPercent3: 28,
    VocalIni: 125, DanceIni: 90, VisualIni: 100, FirstType: "Vocal", SecondType: "Visual", ThirdType: "Dance", series: "限定", suteType:"2極"
  },
  {
    name: "麻央（見て）", chara: "麻央", file: "../assets/chara/麻央（見て）.png", darkFile: "../assets/charaan/麻央（見て）.png",
    VocalPercent: 22, DancePercent: 8, VisualPercent: 23, VocalPercent3: 25, DancePercent3: 8, VisualPercent3: 28,
    VocalIni: 125, DanceIni: 90, VisualIni: 100, FirstType: "Vocal", SecondType: "Visual", ThirdType: "Dance", series: "限定", suteType:"2極"
  },
  {
    name: "リーリヤ（白線）", chara: "リーリヤ", file: "../assets/chara/リーリヤ（白線）.png", darkFile: "../assets/charaan/リーリヤ（白線）.png",
    VocalPercent: 18, DancePercent: 20, VisualPercent: 18, VocalPercent3: 18, DancePercent3: 25, VisualPercent3: 21,
    VocalIni: 80, DanceIni: 100, VisualIni: 115, FirstType: "Visual", SecondType: "Dance", ThirdType: "Vocal", series: "恒常", suteType:"3極"
  },
  {
    name: "リーリヤ（冠菊）", chara: "リーリヤ", file: "../assets/chara/リーリヤ（冠菊）.png", darkFile: "../assets/charaan/リーリヤ（冠菊）.png",
    VocalPercent: 18, DancePercent: 20, VisualPercent: 18, VocalPercent3: 18, DancePercent3: 25, VisualPercent3: 21,
    VocalIni: 80, DanceIni: 100, VisualIni: 115, FirstType: "Visual", SecondType: "Dance", ThirdType: "Vocal", series: "限定", suteType:"3極"
  },
  {
    name: "リーリヤ（クリ）", chara: "リーリヤ", file: "../assets/chara/リーリヤ（クリ）.png", darkFile: "../assets/charaan/リーリヤ（クリ）.png",
    VocalPercent: 18, DancePercent: 20, VisualPercent: 18, VocalPercent3: 18, DancePercent3: 25, VisualPercent3: 21,
    VocalIni: 80, DanceIni: 100, VisualIni: 115, FirstType: "Visual", SecondType: "Dance", ThirdType: "Vocal", series: "限定", suteType:"3極"
  },
  {
    name: "リーリヤ（CM）", chara: "リーリヤ", file: "../assets/chara/リーリヤ（CM）.png", darkFile: "../assets/charaan/リーリヤ（CM）.png",
    VocalPercent: 18, DancePercent: 20, VisualPercent: 18, VocalPercent3: 18, DancePercent3: 25, VisualPercent3: 21,
    VocalIni: 80, DanceIni: 100, VisualIni: 115, FirstType: "Visual", SecondType: "Dance", ThirdType: "Vocal", series: "CM", suteType:"3極"
  },
  {
    name: "リーリヤ（極光）", chara: "リーリヤ", file: "../assets/chara/リーリヤ（極光）.png", darkFile: "../assets/charaan/リーリヤ（極光）.png",
    VocalPercent: 18, DancePercent: 20, VisualPercent: 18, VocalPercent3: 18, DancePercent3: 25, VisualPercent3: 21,
    VocalIni: 80, DanceIni: 100, VisualIni: 115, FirstType: "Visual", SecondType: "Dance", ThirdType: "Vocal", series: "恒常", suteType:"3極"
  },
  {
    name: "リーリヤ（桜）", chara: "リーリヤ", file: "../assets/chara/リーリヤ（桜）.png", darkFile: "../assets/charaan/リーリヤ（桜）.png",
    VocalPercent: 18, DancePercent: 20, VisualPercent: 18, VocalPercent3: 18, DancePercent3: 25, VisualPercent3: 21,
    VocalIni: 80, DanceIni: 100, VisualIni: 115, FirstType: "Visual", SecondType: "Dance", ThirdType: "Vocal", series: "限定", suteType:"3極"
  },
  {
    name: "リーリヤ（HotW）", chara: "リーリヤ", file: "../assets/chara/リーリヤ（HotW）.png", darkFile: "../assets/charaan/リーリヤ（HotW）.png",
    VocalPercent: 18, DancePercent: 20, VisualPercent: 18, VocalPercent3: 18, DancePercent3: 25, VisualPercent3: 21,
    VocalIni: 80, DanceIni: 100, VisualIni: 115, FirstType: "Visual", SecondType: "Dance", ThirdType: "Vocal", series: "限定", suteType:"3極"
  },
  {
    name: "リーリヤ（Atm）", chara: "リーリヤ", file: "../assets/chara/リーリヤ（Atm）.png", darkFile: "../assets/charaan/リーリヤ（Atm）.png",
    VocalPercent: 18, DancePercent: 20, VisualPercent: 18, VocalPercent3: 18, DancePercent3: 25, VisualPercent3: 21,
    VocalIni: 80, DanceIni: 100, VisualIni: 115, FirstType: "Visual", SecondType: "Dance", ThirdType: "Vocal", series: "限定", suteType:"3極"
  },
  {
    name: "千奈（ワンスケ）", chara: "千奈", file: "../assets/chara/千奈（ワンスケ）.png", darkFile: "../assets/charaan/千奈（ワンスケ）.png",
    VocalPercent: 10, DancePercent: 24, VisualPercent: 20.5, VocalPercent3: 10, DancePercent3: 29, VisualPercent3: 23.5,
    VocalIni: 75, DanceIni: 115, VisualIni: 125, FirstType: "Dance", SecondType: "Visual", ThirdType: "Vocal", series: "恒常", suteType:"2極"
  },
  {
    name: "千奈（日々）", chara: "千奈", file: "../assets/chara/千奈（日々）.png", darkFile: "../assets/charaan/千奈（日々）.png",
    VocalPercent: 10, DancePercent: 24, VisualPercent: 20.5, VocalPercent3: 10, DancePercent3: 29, VisualPercent3: 23.5,
    VocalIni: 75, DanceIni: 115, VisualIni: 125, FirstType: "Dance", SecondType: "Visual", ThirdType: "Vocal", series: "恒常", suteType:"2極"
  },
  {
    name: "千奈（温泉）", chara: "千奈", file: "../assets/chara/千奈（温泉）.png", darkFile: "../assets/charaan/千奈（温泉）.png",
    VocalPercent: 10, DancePercent: 24, VisualPercent: 20.5, VocalPercent3: 10, DancePercent3: 29, VisualPercent3: 23.5,
    VocalIni: 75, DanceIni: 115, VisualIni: 125, FirstType: "Dance", SecondType: "Visual", ThirdType: "Vocal", series: "恒常", suteType:"2極"
  },
  {
    name: "千奈（ハロ）", chara: "千奈", file: "../assets/chara/千奈（ハロ）.png", darkFile: "../assets/charaan/千奈（ハロ）.png",
    VocalPercent: 10, DancePercent: 24, VisualPercent: 20.5, VocalPercent3: 10, DancePercent3: 29, VisualPercent3: 23.5,
    VocalIni: 75, DanceIni: 115, VisualIni: 125, FirstType: "Dance", SecondType: "Visual", ThirdType: "Vocal", series: "恒常", suteType:"2極"
  },
  {
    name: "千奈（CM）", chara: "千奈", file: "../assets/chara/千奈（CM）.png", darkFile: "../assets/charaan/千奈（CM）.png",
    VocalPercent: 10, DancePercent: 24, VisualPercent: 20.5, VocalPercent3: 10, DancePercent3: 29, VisualPercent3: 23.5,
    VocalIni: 75, DanceIni: 115, VisualIni: 125, FirstType: "Dance", SecondType: "Visual", ThirdType: "Vocal", series: "CM", suteType:"2極"
  },
  {
    name: "千奈（ひな）", chara: "千奈", file: "../assets/chara/千奈（ひな）.png", darkFile: "../assets/charaan/千奈（ひな）.png",
    VocalPercent: 10, DancePercent: 24, VisualPercent: 20.5, VocalPercent3: 10, DancePercent3: 29, VisualPercent3: 23.5,
    VocalIni: 75, DanceIni: 115, VisualIni: 125, FirstType: "Dance", SecondType: "Visual", ThirdType: "Vocal", series: "限定", suteType:"2極"
  },
  {
    name: "千奈（HotW）", chara: "千奈", file: "../assets/chara/千奈（HotW）.png", darkFile: "../assets/charaan/千奈（HotW）.png",
    VocalPercent: 10, DancePercent: 24, VisualPercent: 20.5, VocalPercent3: 10, DancePercent3: 29, VisualPercent3: 23.5,
    VocalIni: 75, DanceIni: 115, VisualIni: 125, FirstType: "Dance", SecondType: "Visual", ThirdType: "Vocal", series: "限定", suteType:"2極"
  },
  {
    name: "千奈（空）", chara: "千奈", file: "../assets/chara/千奈（空）.png", darkFile: "../assets/charaan/千奈（空）.png",
    VocalPercent: 10, DancePercent: 24, VisualPercent: 20.5, VocalPercent3: 10, DancePercent3: 29, VisualPercent3: 23.5,
    VocalIni: 75, DanceIni: 115, VisualIni: 125, FirstType: "Dance", SecondType: "Visual", ThirdType: "Vocal", series: "恒常", suteType:"2極"
  },
  {
    name: "千奈（みち）", chara: "千奈", file: "../assets/chara/千奈（みち）.png", darkFile: "../assets/charaan/千奈（みち）.png",
    VocalPercent: 10, DancePercent: 24, VisualPercent: 20.5, VocalPercent3: 10, DancePercent3: 29, VisualPercent3: 23.5,
    VocalIni: 75, DanceIni: 115, VisualIni: 125, FirstType: "Dance", SecondType: "Visual", ThirdType: "Vocal", series: "恒常", suteType:"2極"
  },
  {
    name: "清夏（タメライ）", chara: "清夏", file: "../assets/chara/清夏（タメライ）.png", darkFile: "../assets/charaan/清夏（タメライ）.png",
    VocalPercent: 9, DancePercent: 23, VisualPercent: 23, VocalPercent3: 9, DancePercent3: 28, VisualPercent3: 26,
    VocalIni: 100, DanceIni: 115, VisualIni: 90, FirstType: "Dance", SecondType: "Visual", ThirdType: "Vocal", series: "恒常", suteType:"2極"
  },
  {
    name: "清夏（セミ）", chara: "清夏", file: "../assets/chara/清夏（セミ）.png", darkFile: "../assets/charaan/清夏（セミ）.png",
    VocalPercent: 9, DancePercent: 23, VisualPercent: 23, VocalPercent3: 9, DancePercent3: 28, VisualPercent3: 26,
    VocalIni: 100, DanceIni: 115, VisualIni: 90, FirstType: "Dance", SecondType: "Visual", ThirdType: "Vocal", series: "限定", suteType:"2極"
  },
  {
    name: "清夏（カクシタ）", chara: "清夏", file: "../assets/chara/清夏（カクシタ）.png", darkFile: "../assets/charaan/清夏（カクシタ）.png",
    VocalPercent: 9, DancePercent: 23, VisualPercent: 23, VocalPercent3: 9, DancePercent3: 28, VisualPercent3: 26,
    VocalIni: 100, DanceIni: 115, VisualIni: 90, FirstType: "Dance", SecondType: "Visual", ThirdType: "Vocal", series: "恒常", suteType:"2極"
  },
  {
    name: "清夏（CM）", chara: "清夏", file: "../assets/chara/清夏（CM）.png", darkFile: "../assets/charaan/清夏（CM）.png",
    VocalPercent: 9, DancePercent: 23, VisualPercent: 23, VocalPercent3: 9, DancePercent3: 28, VisualPercent3: 26,
    VocalIni: 100, DanceIni: 115, VisualIni: 90, FirstType: "Dance", SecondType: "Visual", ThirdType: "Vocal", series: "CM", suteType:"2極"
  },
  {
    name: "清夏（桜）", chara: "清夏", file: "../assets/chara/清夏（桜）.png", darkFile: "../assets/charaan/清夏（桜）.png",
    VocalPercent: 9, DancePercent: 23, VisualPercent: 23, VocalPercent3: 9, DancePercent3: 28, VisualPercent3: 26,
    VocalIni: 100, DanceIni: 115, VisualIni: 90, FirstType: "Dance", SecondType: "Visual", ThirdType: "Vocal", series: "限定", suteType:"2極"
  },
  {
    name: "清夏（LJ）", chara: "清夏", file: "../assets/chara/清夏（LJ）.png", darkFile: "../assets/charaan/清夏（LJ）.png",
    VocalPercent: 9, DancePercent: 23, VisualPercent: 23, VocalPercent3: 9, DancePercent3: 28, VisualPercent3: 26,
    VocalIni: 100, DanceIni: 115, VisualIni: 90, FirstType: "Dance", SecondType: "Visual", ThirdType: "Vocal", series: "恒常", suteType:"2極"
  },
  {
    name: "清夏（ナナウ）", chara: "清夏", file: "../assets/chara/清夏（ナナウ）.png", darkFile: "../assets/charaan/清夏（ナナウ）.png",
    VocalPercent: 9, DancePercent: 23, VisualPercent: 23, VocalPercent3: 9, DancePercent3: 28, VisualPercent3: 26,
    VocalIni: 100, DanceIni: 115, VisualIni: 90, FirstType: "Dance", SecondType: "Visual", ThirdType: "Vocal", series: "恒常", suteType:"2極"
  },
  {
    name: "広（光景）", chara: "広", file: "../assets/chara/広（光景）.png", darkFile: "../assets/charaan/広（光景）.png",
    VocalPercent: 23, DancePercent: 19.5, VisualPercent: 10, VocalPercent3: 28, DancePercent3: 24.5, VisualPercent3: 10,
    VocalIni: 125, DanceIni: 120, VisualIni: 80, FirstType: "Vocal", SecondType: "Dance", ThirdType: "Visual", series: "恒常", suteType:"3極"
  },
  {
    name: "広（コント）", chara: "広", file: "../assets/chara/広（コント）.png", darkFile: "../assets/charaan/広（コント）.png",
    VocalPercent: 23, DancePercent: 19.5, VisualPercent: 10, VocalPercent3: 28, DancePercent3: 24.5, VisualPercent3: 10,
    VocalIni: 125, DanceIni: 120, VisualIni: 80, FirstType: "Vocal", SecondType: "Dance", ThirdType: "Visual", series: "恒常", suteType:"3極"
  },
  {
    name: "広（ハロ）", chara: "広", file: "../assets/chara/広（ハロ）.png", darkFile: "../assets/charaan/広（ハロ）.png",
    VocalPercent: 23, DancePercent: 19.5, VisualPercent: 10, VocalPercent3: 28, DancePercent3: 24.5, VisualPercent3: 10,
    VocalIni: 125, DanceIni: 120, VisualIni: 80, FirstType: "Vocal", SecondType: "Dance", ThirdType: "Visual", series: "限定", suteType:"3極"
  },
  {
    name: "広（CM）", chara: "広", file: "../assets/chara/広（CM）.png", darkFile: "../assets/charaan/広（CM）.png",
    VocalPercent: 23, DancePercent: 19.5, VisualPercent: 10, VocalPercent3: 28, DancePercent3: 24.5, VisualPercent3: 10,
    VocalIni: 125, DanceIni: 120, VisualIni: 80, FirstType: "Vocal", SecondType: "Dance", ThirdType: "Visual", series: "CM", suteType:"3極"
  },
  {
    name: "広（バレ）", chara: "広", file: "../assets/chara/広（バレ）.png", darkFile: "../assets/charaan/広（バレ）.png",
    VocalPercent: 23, DancePercent: 19.5, VisualPercent: 10, VocalPercent3: 28, DancePercent3: 24.5, VisualPercent3: 10,
    VocalIni: 125, DanceIni: 120, VisualIni: 80, FirstType: "Vocal", SecondType: "Dance", ThirdType: "Visual", series: "恒常", suteType:"3極"
  },
  {
    name: "広（サン）", chara: "広", file: "../assets/chara/広（サン）.png", darkFile: "../assets/charaan/広（サン）.png",
    VocalPercent: 23, DancePercent: 19.5, VisualPercent: 10, VocalPercent3: 28, DancePercent3: 24.5, VisualPercent3: 10,
    VocalIni: 125, DanceIni: 120, VisualIni: 80, FirstType: "Vocal", SecondType: "Dance", ThirdType: "Visual", series: "恒常", suteType:"3極"
  },
  {
    name: "広（ナナウ）", chara: "広", file: "../assets/chara/広（ナナウ）.png", darkFile: "../assets/charaan/広（ナナウ）.png",
    VocalPercent: 23, DancePercent: 19.5, VisualPercent: 10, VocalPercent3: 28, DancePercent3: 24.5, VisualPercent3: 10,
    VocalIni: 125, DanceIni: 120, VisualIni: 80, FirstType: "Vocal", SecondType: "Dance", ThirdType: "Visual", series: "限定", suteType:"3極"
  },
  {
    name: "広（みち）", chara: "広", file: "../assets/chara/広（みち）.png", darkFile: "../assets/charaan/広（みち）.png",
    VocalPercent: 23, DancePercent: 19.5, VisualPercent: 10, VocalPercent3: 28, DancePercent3: 24.5, VisualPercent3: 10,
    VocalIni: 125, DanceIni: 120, VisualIni: 80, FirstType: "Vocal", SecondType: "Dance", ThirdType: "Visual", series: "限定", suteType:"3極"
  },
  {
    name: "星南（ちいやぼ）", chara: "星南", file: "../assets/chara/星南（ちいやぼ）.png", darkFile: "../assets/charaan/星南（ちいやぼ）.png",
    VocalPercent: 15, DancePercent: 8, VisualPercent: 20.5, VocalPercent3: 17, DancePercent3: 8, VisualPercent3: 24.5,
    VocalIni: 175, DanceIni: 125, VisualIni: 140, FirstType: "Visual", SecondType: "Vocal", ThirdType: "Dance", series: "恒常", suteType:"3極"
  },
  {
    name: "星南（CM）", chara: "星南", file: "../assets/chara/星南（CM）.png", darkFile: "../assets/charaan/星南（CM）.png",
    VocalPercent: 15, DancePercent: 8, VisualPercent: 20.5, VocalPercent3: 17, DancePercent3: 8, VisualPercent3: 24.5,
    VocalIni: 175, DanceIni: 125, VisualIni: 140, FirstType: "Visual", SecondType: "Vocal", ThirdType: "Dance", series: "CM", suteType:"3極"
  },
  {
    name: "星南（バレ）", chara: "星南", file: "../assets/chara/星南（バレ）.png", darkFile: "../assets/charaan/星南（バレ）.png",
    VocalPercent: 15, DancePercent: 8, VisualPercent: 20.5, VocalPercent3: 17, DancePercent3: 8, VisualPercent3: 24.5,
    VocalIni: 175, DanceIni: 125, VisualIni: 140, FirstType: "Visual", SecondType: "Vocal", ThirdType: "Dance", series: "限定", suteType:"3極"
  },
  {
    name: "星南（OC）", chara: "星南", file: "../assets/chara/星南（OC）.png", darkFile: "../assets/charaan/星南（OC）.png",
    VocalPercent: 15, DancePercent: 8, VisualPercent: 20.5, VocalPercent3: 17, DancePercent3: 8, VisualPercent3: 24.5,
    VocalIni: 175, DanceIni: 125, VisualIni: 140, FirstType: "Visual", SecondType: "Vocal", ThirdType: "Dance", series: "恒常", suteType:"3極"
  },
    {
    name: "星南（SM）", chara: "星南", file: "../assets/chara/星南（SM）.png", darkFile: "../assets/charaan/星南（SM）.png",
    VocalPercent: 15, DancePercent: 8, VisualPercent: 20.5, VocalPercent3: 17, DancePercent3: 8, VisualPercent3: 24.5,
    VocalIni: 175, DanceIni: 125, VisualIni: 140, FirstType: "Visual", SecondType: "Vocal", ThirdType: "Dance", series: "限定", suteType:"3極"
  },
  {
    name: "美鈴（ツキノカメ）", chara: "美鈴", file: "../assets/chara/美鈴（ツキノカメ）.png", darkFile: "../assets/charaan/美鈴（ツキノカメ）.png",
    VocalPercent: 26, DancePercent: 10, VisualPercent: 16, VocalPercent3: 30, DancePercent3: 10, VisualPercent3: 18,
    VocalIni: 85, DanceIni: 115, VisualIni: 125, FirstType: "Vocal", SecondType: "Visual", ThirdType: "Dance", series: "恒常", suteType:"3極"
  },
  {
    name: "美鈴（CM）", chara: "美鈴", file: "../assets/chara/美鈴（CM）.png", darkFile: "../assets/charaan/美鈴（CM）.png",
    VocalPercent: 26, DancePercent: 10, VisualPercent: 16, VocalPercent3: 30, DancePercent3: 10, VisualPercent3: 18,
    VocalIni: 85, DanceIni: 115, VisualIni: 125, FirstType: "Vocal", SecondType: "Visual", ThirdType: "Dance", series: "CM", suteType:"3極"
  },
  {
    name: "美鈴（SM）", chara: "美鈴", file: "../assets/chara/美鈴（SM）.png", darkFile: "../assets/charaan/美鈴（SM）.png",
    VocalPercent: 26, DancePercent: 10, VisualPercent: 16, VocalPercent3: 30, DancePercent3: 10, VisualPercent3: 18,
    VocalIni: 85, DanceIni: 115, VisualIni: 125, FirstType: "Vocal", SecondType: "Visual", ThirdType: "Dance", series: "CM", suteType:"3極"
  },
  {
    name: "美鈴（スパラ）", chara: "美鈴", file: "../assets/chara/美鈴（スパラ）.png", darkFile: "../assets/charaan/美鈴（スパラ）.png",
    VocalPercent: 26, DancePercent: 10, VisualPercent: 16, VocalPercent3: 30, DancePercent3: 10, VisualPercent3: 18,
    VocalIni: 85, DanceIni: 115, VisualIni: 125, FirstType: "Vocal", SecondType: "Visual", ThirdType: "Dance", series: "CM", suteType:"3極"
  },
  {
    name: "佑芽（おにぎり）", chara: "佑芽", file: "../assets/chara/佑芽（おにぎり）.png", darkFile: "../assets/charaan/佑芽（おにぎり）.png",
    VocalPercent: 20, DancePercent: 23, VisualPercent: 15, VocalPercent3: 23, DancePercent3: 28, VisualPercent3: 15,
    VocalIni: 90, DanceIni: 95, VisualIni: 100, FirstType: "Dance", SecondType: "Vocal", ThirdType: "Visual", series: "恒常", suteType:"3極"
  },
  {
    name: "佑芽（クリ）", chara: "佑芽", file: "../assets/chara/佑芽（クリ）.png", darkFile: "../assets/charaan/佑芽（クリ）.png",
    VocalPercent: 20, DancePercent: 23, VisualPercent: 15, VocalPercent3: 23, DancePercent3: 28, VisualPercent3: 15,
    VocalIni: 90, DanceIni: 95, VisualIni: 100, FirstType: "Dance", SecondType: "Vocal", ThirdType: "Visual", series: "限定", suteType:"3極"
  },
  {
    name: "佑芽（CM）", chara: "佑芽", file: "../assets/chara/佑芽（CM）.png", darkFile: "../assets/charaan/佑芽（CM）.png",
    VocalPercent: 20, DancePercent: 23, VisualPercent: 15, VocalPercent3: 23, DancePercent3: 28, VisualPercent3: 15,
    VocalIni: 90, DanceIni: 95, VisualIni: 100, FirstType: "Dance", SecondType: "Vocal", ThirdType: "Visual", series: "CM", suteType:"3極"
  },
  {
    name: "佑芽（SM）", chara: "佑芽", file: "../assets/chara/佑芽（SM）.png", darkFile: "../assets/charaan/佑芽（SM）.png",
    VocalPercent: 20, DancePercent: 23, VisualPercent: 15, VocalPercent3: 23, DancePercent3: 28, VisualPercent3: 15,
    VocalIni: 90, DanceIni: 95, VisualIni: 100, FirstType: "Dance", SecondType: "Vocal", ThirdType: "Visual", series: "限定", suteType:"3極"
  },
  {
    name: "佑芽（グースーピー）", chara: "佑芽", file: "../assets/chara/佑芽（グースーピー）.png", darkFile: "../assets/charaan/佑芽（グースーピー）.png",
    VocalPercent: 20, DancePercent: 23, VisualPercent: 15, VocalPercent3: 23, DancePercent3: 28, VisualPercent3: 15,
    VocalIni: 90, DanceIni: 95, VisualIni: 100, FirstType: "Dance", SecondType: "Vocal", ThirdType: "Visual", series: "限定", suteType:"3極"
  },
  {
    name: "莉波（ct）", chara: "莉波", file: "../assets/chara/莉波（ct）.png", darkFile: "../assets/charaan/莉波（ct）.png",
    VocalPercent: 11, DancePercent: 21.5, VisualPercent: 23.5, VocalPercent3: 11, DancePercent3: 24.5, VisualPercent3: 28.5,
    VocalIni: 85, DanceIni: 110, VisualIni: 110, FirstType: "Visual", SecondType: "Dance", ThirdType: "Vocal", series: "恒常", suteType:"3極"
  },
  {
    name: "莉波（セミ）", chara: "莉波", file: "../assets/chara/莉波（セミ）.png", darkFile: "../assets/charaan/莉波（セミ）.png",
    VocalPercent: 11, DancePercent: 21.5, VisualPercent: 23.5, VocalPercent3: 11, DancePercent3: 24.5, VisualPercent3: 28.5,
    VocalIni: 85, DanceIni: 110, VisualIni: 110, FirstType: "Visual", SecondType: "Dance", ThirdType: "Vocal", series: "限定", suteType:"3極"
  },
  {
    name: "莉波（温泉）", chara: "莉波", file: "../assets/chara/莉波（温泉）.png", darkFile: "../assets/charaan/莉波（温泉）.png",
    VocalPercent: 11, DancePercent: 21.5, VisualPercent: 23.5, VocalPercent3: 11, DancePercent3: 24.5, VisualPercent3: 28.5,
    VocalIni: 85, DanceIni: 110, VisualIni: 110, FirstType: "Visual", SecondType: "Dance", ThirdType: "Vocal", series: "恒常", suteType:"3極"
  },
  {
    name: "莉波（LUV）", chara: "莉波", file: "../assets/chara/莉波（LUV）.png", darkFile: "../assets/charaan/莉波（LUV）.png",
    VocalPercent: 11, DancePercent: 21.5, VisualPercent: 23.5, VocalPercent3: 11, DancePercent3: 24.5, VisualPercent3: 28.5,
    VocalIni: 85, DanceIni: 110, VisualIni: 110, FirstType: "Visual", SecondType: "Dance", ThirdType: "Vocal", series: "恒常", suteType:"3極"
  },
  {
    name: "莉波（CM）", chara: "莉波", file: "../assets/chara/莉波（CM）.png", darkFile: "../assets/charaan/莉波（CM）.png",
    VocalPercent: 11, DancePercent: 21.5, VisualPercent: 23.5, VocalPercent3: 11, DancePercent3: 24.5, VisualPercent3: 28.5,
    VocalIni: 85, DanceIni: 110, VisualIni: 110, FirstType: "Visual", SecondType: "Dance", ThirdType: "Vocal", series: "CM", suteType:"3極"
  },
  {
    name: "莉波（バレ）", chara: "莉波", file: "../assets/chara/莉波（バレ）.png", darkFile: "../assets/charaan/莉波（バレ）.png",
    VocalPercent: 11, DancePercent: 21.5, VisualPercent: 23.5, VocalPercent3: 11, DancePercent3: 24.5, VisualPercent3: 28.5,
    VocalIni: 85, DanceIni: 110, VisualIni: 110, FirstType: "Visual", SecondType: "Dance", ThirdType: "Vocal", series: "限定", suteType:"3極"
  },
  {
    name: "莉波（HotW）", chara: "莉波", file: "../assets/chara/莉波（HotW）.png", darkFile: "../assets/charaan/莉波（HotW）.png",
    VocalPercent: 11, DancePercent: 21.5, VisualPercent: 23.5, VocalPercent3: 11, DancePercent3: 24.5, VisualPercent3: 28.5,
    VocalIni: 85, DanceIni: 110, VisualIni: 110, FirstType: "Visual", SecondType: "Dance", ThirdType: "Vocal", series: "限定", suteType:"3極"
  },
  {
    name: "莉波（微熱）", chara: "莉波", file: "../assets/chara/莉波（微熱）.png", darkFile: "../assets/charaan/莉波（微熱）.png",
    VocalPercent: 11, DancePercent: 21.5, VisualPercent: 23.5, VocalPercent3: 11, DancePercent3: 24.5, VisualPercent3: 28.5,
    VocalIni: 85, DanceIni: 110, VisualIni: 110, FirstType: "Visual", SecondType: "Dance", ThirdType: "Vocal", series: "恒常", suteType:"3極"
  }
  // 他のキャラもここに追加
];