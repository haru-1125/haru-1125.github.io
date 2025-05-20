const nstats = document.getElementById("nstats");

window.addEventListener("DOMContentLoaded", () => {
    // キャラ初期表示
    const selectedCharacter = document.getElementById("selected-character");
    const characterNameDisplay = document.getElementById("character-name-display");
    const defaultCharacter = characters.find(c => c.name === "ここをクリック");
    selectedCharacter.src = defaultCharacter.file;
    characterNameDisplay.textContent = defaultCharacter.name;
    characterNameDisplay.dataset.series = defaultCharacter.series; // 初期シリーズを保存
    selectedCharacterData = defaultCharacter;

    selectedCharacter.onclick = () => openModal("character-modal");

    // サポカ初期表示（6枚とも「ここをクリック」に）
    const supportContainer = document.getElementById("support-container");
    const defaultSupport = supports.find(support => support.name === "ここをクリック");

    supportContainer.innerHTML = ""; // 初期化

    for (let index = 0; index < 6; index++) {
        const card = document.createElement("div");
        card.classList.add("support-card");
        card.dataset.index = index;

        const img = document.createElement("img");
        img.src = defaultSupport ? defaultSupport.file : "";
        img.classList.add("support-image");
        img.dataset.index = index;
        img.onclick = () => openModal("support-modal", index);
        card.appendChild(img);

        const controlDiv = document.createElement("div");
        controlDiv.className = "limit-break-control";

        const minus = document.createElement("button");
        minus.className = "limit-btn-kuro";
        minus.textContent = "-";
        minus.onclick = () => changeSupportLimit(index, -1);

        const span = document.createElement("span");
        span.id = `support-limit-${index}`;
        span.className = "limit-kuro-display";
        span.textContent = "0凸";

        const plus = document.createElement("button");
        plus.className = "limit-btn-kuro";
        plus.textContent = "+";
        plus.onclick = () => changeSupportLimit(index, 1);

        controlDiv.appendChild(minus);
        controlDiv.appendChild(span);
        controlDiv.appendChild(plus);
        card.appendChild(controlDiv);

        supportContainer.appendChild(card);

        // 名前と属性の初期表示（空欄にリセット）
        updateSupportAttributes({ name: "-", type: "-", rarity: "-", Aability: "-", Bability: "-", Cability: "-", Dability: "-" }, index + 1);
    }

    // 初期表示後に色変更を呼び出す
    updateSupportLimitButtonColors();

    // キャラモーダル構築
    const characterGrid = document.getElementById("character-grid");
    const characterFilterContainer = document.getElementById("character-filter");
    const characterNames = ["咲季", "手毬", "ことね", "麻央", "リーリヤ", "千奈", "清夏", "広", "星南", "佑芽", "莉波"];

    // フィルターボタンの作成（キャラ）
    characterNames.forEach(name => {
        const filterButton = document.createElement("img");
        filterButton.src = `../assets/sozai/${name}アイコン.png`; // アイコン画像
        filterButton.alt = name;
        filterButton.classList.add("filter-button");
        filterButton.dataset.name = name;
        filterButton.onclick = () => filterCharacter(name);
        characterFilterContainer.appendChild(filterButton);
    });

    // 初期フィルタは咲季
    filterCharacter("咲季");

    // キャラフィルタリング関数
    function filterCharacter(name) {
        characterGrid.innerHTML = ""; // モーダル初期化

        // ここをクリックは常に表示
        const defaultCharacter = characters.find(c => c.name === "ここをクリック");
        const defaultImg = document.createElement("img");
        defaultImg.src = defaultCharacter.file;
        defaultImg.alt = defaultCharacter.name;
        defaultImg.classList.add("character-modal-image");
        defaultImg.onclick = () => {
            selectedCharacter.src = defaultCharacter.file;
            selectedCharacterData = defaultCharacter;
            characterNameDisplay.textContent = defaultCharacter.name;
            characterNameDisplay.dataset.series = defaultCharacter.series;
            updateVocalPercent();
            updateDancePercent();
            updateVisualPercent();
            updateVocalIni();
            updateDanceIni();
            updateVisualIni();
            updateFirstType();
            updateSecondType();
            updateThirdType();
            updateCharacterSP();
            updateTestCounts();
            updateFinalResonance();
            updateFinalStatus();
            updateFinalStatusTotal();
            updateEvaluationValue();
            updateEvaluationImage(parseInt(document.getElementById("評価値").textContent) || 0);
            updateFinalSPRates();
            updateCharacterLimitButtonColor();
            updateSupportLimitButtonColors();
            closeModal("character-modal");
        };
        characterGrid.appendChild(defaultImg);

        // 選択されたキャラのみをフィルタリング
        characters.forEach(char => {
            if (char.chara === name) {
                const img = document.createElement("img");
                img.src = char.file;
                img.alt = char.name;
                img.classList.add("character-modal-image");
                img.onclick = () => {
                    selectedCharacter.src = char.file;
                    selectedCharacterData = char;
                    characterNameDisplay.textContent = char.name;
                    characterNameDisplay.dataset.series = char.series;
                    updateVocalPercent();
                    updateDancePercent();
                    updateVisualPercent();
                    updateVocalIni();
                    updateDanceIni();
                    updateVisualIni();
                    updateFirstType();
                    updateSecondType();
                    updateThirdType();
                    updateCharacterSP();
                    updateTestCounts();
                    updateFinalResonance();
                    updateFinalStatus();
                    updateFinalStatusTotal();
                    updateEvaluationValue();
                    updateEvaluationImage(parseInt(document.getElementById("評価値").textContent) || 0);
                    updateFinalSPRates();
                    updateCharacterLimitButtonColor();
                    updateSupportLimitButtonColors();
                    closeModal("character-modal");
                };
                characterGrid.appendChild(img);
            }
        });

        // フィルタボタンのスタイル変更
        document.querySelectorAll(".filter-button").forEach(button => {
            if (button.dataset.name === name) {
                button.classList.add("active");
            } else {
                button.classList.remove("active");
            }
        });
    }


    // サポカモーダル構築
    const supportGrid = document.getElementById("support-grid");
    const supportModal = document.getElementById("support-modal");

    // フィルターボタンの作成（画像）
    const filterContainer = document.getElementById("support-filter");
    const filterTypes = ["Vocal", "Dance", "Visual", "Assist"];
    filterTypes.forEach(type => {
        const filterButton = document.createElement("img");
        filterButton.src = `../assets/sozai/${type.toLowerCase()}.png`;
        filterButton.alt = type;
        filterButton.classList.add("filter-button");
        filterButton.dataset.type = type.toLowerCase();
        filterButton.onclick = () => filterSupportType(type.toLowerCase());
        filterContainer.appendChild(filterButton);
    });

    // 初期フィルタはVocal
    filterSupportType("vocal");

    // サポカフィルタリング関数
    function filterSupportType(type) {
        supportGrid.innerHTML = ""; // モーダル初期化

        // ここをクリックは常に表示
        const dummySupport = supports.find(support => support.name === "ここをクリック");
        if (dummySupport) {
            const img = document.createElement("img");
            img.src = dummySupport.file;
            img.alt = dummySupport.name;
            img.classList.add("support-modal-image");
            img.onclick = () => {
                const targetIndex = parseInt(supportModal.dataset.targetIndex, 10);
                if (isNaN(targetIndex)) return; // 例外防止

                const targetImage = document.querySelector(`.support-image[data-index='${targetIndex}']`);
                if (targetImage) {
                    targetImage.src = dummySupport.file;
                    updateSelectedSupport(dummySupport, targetIndex);
                }
                closeModal("support-modal");
            };
            supportGrid.appendChild(img);
        }

        supports.forEach(support => {
            if ((type === "assist" && support.type === "assist") || support.type === type) {
                const img = document.createElement("img");
                img.src = support.file;
                img.alt = support.name;
                img.classList.add("support-modal-image");
                img.onclick = () => {
                    const targetIndex = parseInt(supportModal.dataset.targetIndex, 10);
                    if (isNaN(targetIndex)) return; // 例外防止

                    // サポカの画像変更
                    const targetImage = document.querySelector(`.support-image[data-index='${targetIndex}']`);
                    if (targetImage) {
                        targetImage.src = support.file;
                        updateSelectedSupport(support, targetIndex);
                    }
                    closeModal("support-modal");
                };
                supportGrid.appendChild(img);
            }
        });

        // フィルタボタンのスタイルを変更
        document.querySelectorAll(".filter-button").forEach(button => {
            if (button.dataset.type === type) {
                button.classList.add("active");
            } else {
                button.classList.remove("active");
            }
        });
    }



    // モーダル外クリックで閉じる
    document.querySelectorAll(".modal").forEach(modal => {
        modal.addEventListener("click", (event) => {
            if (event.target === modal) closeModal(modal.id);
        });
    });
});

let limitBreak = 0;
let selectedCharacterData = null;  // ← キャラのデータを保存

const supportLimits = Array(6).fill(0);

function changeLimitBreak(delta) {
    limitBreak = Math.min(4, Math.max(0, limitBreak + delta));
    document.getElementById("limit-break-display").textContent = `${limitBreak}凸`;
    // 追加：別表示用
    document.getElementById("character-limit-display").textContent = limitBreak;

    updateVocalPercent(); // ← 凸変更に合わせて表示更新
    updateDancePercent();
    updateVisualPercent();
    updateVocalIni();
    updateDanceIni();
    updateVisualIni();
    updateFirstType();
    updateSecondType();
    updateThirdType();
    updateCharacterSP();
    updateTestCounts();
    updateFinalResonance();
    updateFinalStatus();
    updateFinalStatusTotal();
    updateEvaluationValue();
    updateEvaluationImage(parseInt(document.getElementById("評価値").textContent) || 0); // 画像も更新
    updateFinalSPRates();
    updateCharacterLimitButtonColor();
    updateSupportLimitButtonColors();
}

// キャラのVocal%表示
function updateVocalPercent() {
    const VocalPercentDisplay = document.getElementById("vocal-percent-display");

    if (!selectedCharacterData || !VocalPercentDisplay) return;

    const value = limitBreak <= 2
        ? selectedCharacterData.VocalPercent
        : selectedCharacterData.VocalPercent3;

    VocalPercentDisplay.textContent = `${value}%`;
}

// キャラのDance%表示
function updateDancePercent() {
    const DancePercentDisplay = document.getElementById("dance-percent-display");
    if (!selectedCharacterData || !DancePercentDisplay) return;

    const value = limitBreak <= 2
        ? selectedCharacterData.DancePercent
        : selectedCharacterData.DancePercent3;

    DancePercentDisplay.textContent = `${value}%`;
}

// キャラのVisual%表示
function updateVisualPercent() {
    const VisualPercentDisplay = document.getElementById("visual-percent-display");
    if (!selectedCharacterData || !VisualPercentDisplay) return;

    const value = limitBreak <= 2
        ? selectedCharacterData.VisualPercent
        : selectedCharacterData.VisualPercent3;

    VisualPercentDisplay.textContent = `${value}%`;
}

// キャラのVocal初期値表示
function updateVocalIni() {
    const VocalIniDisplay = document.getElementById("vocal-ini-display");
    if (!selectedCharacterData || !VocalIniDisplay) return;

    VocalIniDisplay.textContent = selectedCharacterData.VocalIni;
}

// キャラのDance初期値表示
function updateDanceIni() {
    const DanceIniDisplay = document.getElementById("dance-ini-display");
    if (!selectedCharacterData || !DanceIniDisplay) return;

    DanceIniDisplay.textContent = selectedCharacterData.DanceIni;
}

// キャラのVisual初期値表示
function updateVisualIni() {
    const VisualIniDisplay = document.getElementById("visual-ini-display");
    if (!selectedCharacterData || !VisualIniDisplay) return;

    VisualIniDisplay.textContent = selectedCharacterData.VisualIni;
}

// キャラのSPを更新する関数
function updateCharacterSP() {
    const characterNameDisplay = document.getElementById("character-name-display");
    const series = characterNameDisplay.dataset.series; // キャラのシリーズ (恒常, CM, 限定)
    const firstType = document.getElementById("first-type-display").textContent; // ファーストタイプ
    const limitDisplay = document.getElementById("character-limit-display");
    const limit = parseInt(limitDisplay.textContent) || 0; // 凸数（0～4）

    let vocalSP = 0;
    let danceSP = 0;
    let visualSP = 0;

    // シリーズに応じたSPの計算
    if (series === "恒常") {
        vocalSP = 10;
        danceSP = 10;
        visualSP = 10;
    } else if (series === "CM") {
        vocalSP = 15;
        danceSP = 15;
        visualSP = 15;
    } else if (series === "限定") {
        if (limit === 0) {
            // 凸0の場合は固定値
            vocalSP = 10;
            danceSP = 10;
            visualSP = 10;
        } else {
            // 凸1以上の場合はタイプに応じたSP
            if (firstType === "Vocal") {
                vocalSP = 25;
                danceSP = 10;
                visualSP = 10;
            } else if (firstType === "Dance") {
                vocalSP = 10;
                danceSP = 25;
                visualSP = 10;
            } else if (firstType === "Visual") {
                vocalSP = 10;
                danceSP = 10;
                visualSP = 25;
            }
        }
    }

    // SPを表示
    document.getElementById("vocal-sp-display").textContent = vocalSP;
    document.getElementById("dance-sp-display").textContent = danceSP;
    document.getElementById("visual-sp-display").textContent = visualSP;
}

// キャラの第1流行表示
function updateFirstType() {
    const FirstTypeDisplay = document.getElementById("first-type-display");
    if (!selectedCharacterData || !FirstTypeDisplay) return;

    FirstTypeDisplay.textContent = selectedCharacterData.FirstType;
}

// キャラの第2流行表示
function updateSecondType() {
    const SecondTypeDisplay = document.getElementById("second-type-display");
    if (!selectedCharacterData || !SecondTypeDisplay) return;

    SecondTypeDisplay.textContent = selectedCharacterData.SecondType;
}

// キャラの第3流行表示
function updateThirdType() {
    const ThirdTypeDisplay = document.getElementById("third-type-display");
    if (!selectedCharacterData || !ThirdTypeDisplay) return;

    ThirdTypeDisplay.textContent = selectedCharacterData.ThirdType;
}

// Aアビ効果量を更新する関数
function updateSupportEffectA(index) {
    const abilityTypeA = document.getElementById(`support-a-ability-${index + 1}`).textContent;
    const limit = supportLimitBreaks[index];
    const effectSpanA = document.getElementById(`support-a-effect-${index + 1}`);
    const rarity = document.getElementById(`support-rarity-${index + 1}`).textContent; // rarityを取得

    if (!effectSpanA) return; // 要素が存在しない場合は処理をスキップ

    if (abilityTypeA === "レスボ") {
        if (rarity === "SR") {
            // SRの場合に新しい値を適用
            switch (limit) {
                case 0: effectSpanA.textContent = "4.4"; break;
                case 1: effectSpanA.textContent = "4.9"; break;
                case 2: effectSpanA.textContent = "5.4"; break;
                case 3: effectSpanA.textContent = "5.9"; break;
                case 4: effectSpanA.textContent = "6.4"; break;
                default: effectSpanA.textContent = "-";
            }
        } else if (rarity === "SSR" || rarity === "配布SSR") {
            // SSRまたは配布SSRの場合は元の値を適用
            switch (limit) {
                case 0: effectSpanA.textContent = "6.5"; break;
                case 1: effectSpanA.textContent = "7"; break;
                case 2: effectSpanA.textContent = "7.5"; break;
                case 3: effectSpanA.textContent = "8"; break;
                case 4: effectSpanA.textContent = "8.5"; break;
                default: effectSpanA.textContent = "-";
            }
        }
    } else if (abilityTypeA === "固定値") {
        if (rarity === "SR") {
            // SRの場合に新しい値を適用
            switch (limit) {
                case 0: effectSpanA.textContent = "33"; break;
                case 1: effectSpanA.textContent = "36"; break;
                case 2: effectSpanA.textContent = "39"; break;
                case 3: effectSpanA.textContent = "42"; break;
                case 4: effectSpanA.textContent = "45"; break;
                default: effectSpanA.textContent = "-";
            }
        } else if (rarity === "SSR" || rarity === "配布SSR") {
            // SSRまたは配布SSRの場合は元の値を適用
            switch (limit) {
                case 0: effectSpanA.textContent = "48"; break;
                case 1: effectSpanA.textContent = "51"; break;
                case 2: effectSpanA.textContent = "54"; break;
                case 3: effectSpanA.textContent = "57"; break;
                case 4: effectSpanA.textContent = "60"; break;
                default: effectSpanA.textContent = "-";
            }
        }
    } else {
        effectSpanA.textContent = "-";
    }
}


// Bアビ効果量を更新する関数
function updateSupportEffectB(index) {
    const abilityTypeB = document.getElementById(`support-b-ability-${index + 1}`).textContent;
    const type = document.getElementById(`support-type-${index + 1}`).textContent.trim().toLowerCase(); // タイプを取得
    const rarity = document.getElementById(`support-rarity-${index + 1}`).textContent;
    const limit = supportLimitBreaks[index];
    const effectSpanB = document.getElementById(`support-b-effect-${index + 1}`);

    if (!effectSpanB) return; // 要素が存在しない場合は処理をスキップ

    let effectValueB = "-"; // デフォルトは表示なし

    // 条件に基づいてBアビ効果量を設定
    if (abilityTypeB === "レッスン") {
        if (rarity === "SSR") {
            if (limit <= 1) {
                effectValueB = 4;
            } else if (limit >= 2) {
                effectValueB = 6;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 1) {
                effectValueB = 3;
            } else if (limit >= 2) {
                effectValueB = 4;
            }
        } else if (rarity === "SR") {
            if (limit === 0) {
                effectValueB = 2;
            } else if (limit >= 1) {
                effectValueB = 4;
            }
        }
        // レッスン効果の倍率をかける
        if (type === "vocal") {
            const ressonmultiplier = parseFloat(document.getElementById("vocal-resson-times").textContent) || 0;
            effectValueB *= ressonmultiplier;
        } else if (type === "dance") {
            const ressonmultiplier = parseFloat(document.getElementById("dance-resson-times").textContent) || 0;
            effectValueB *= ressonmultiplier;
        } else if (type === "visual") {
            const ressonmultiplier = parseFloat(document.getElementById("visual-resson-times").textContent) || 0;
            effectValueB *= ressonmultiplier;
        }
    } else if (abilityTypeB === "SPレッスン") {
        if (rarity === "SSR") {
            if (limit <= 1) {
                effectValueB = 13;
            } else if (limit >= 2) {
                effectValueB = 17;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 1) {
                effectValueB = 9;
            } else if (limit >= 2) {
                effectValueB = 13;
            }
        } else if (rarity === "SR") {
            if (limit === 0) {
                effectValueB = 7;
            } else if (limit >= 1) {
                effectValueB = 13;
            }
        }
        // SPレッスン効果の倍率をかける
        if (type === "vocal") {
            const spressonmultiplier = parseFloat(document.getElementById("sp-vocal-resson-times").textContent) || 0;
            effectValueB *= spressonmultiplier;
        } else if (type === "dance") {
            const spressonmultiplier = parseFloat(document.getElementById("sp-dance-resson-times").textContent) || 0;
            effectValueB *= spressonmultiplier;
        } else if (type === "visual") {
            const spressonmultiplier = parseFloat(document.getElementById("sp-visual-resson-times").textContent) || 0;
            effectValueB *= spressonmultiplier;
        }
    } else if (abilityTypeB === "通常レッスン") {
        if (rarity === "SSR") {
            if (limit <= 1) {
                effectValueB = "";
            } else if (limit >= 2) {
                effectValueB = "";
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 1) {
                effectValueB = "";
            } else if (limit >= 2) {
                effectValueB = "";
            }
        } else if (rarity === "SR") {
            if (limit === 0) {
                effectValueB = 7;
            } else if (limit >= 1) {
                effectValueB = 13;
            }
        }
        // 通常レッスン効果の倍率をかける
        if (type === "vocal") {
            const normalressonmultiplier = parseFloat(document.getElementById("normal-vocal-resson-times").textContent) || 0;
            effectValueB *= normalressonmultiplier;
        } else if (type === "dance") {
            const normalressonmultiplier = parseFloat(document.getElementById("normal-dance-resson-times").textContent) || 0;
            effectValueB *= normalressonmultiplier;
        } else if (type === "visual") {
            const normalressonmultiplier = parseFloat(document.getElementById("normal-visual-resson-times").textContent) || 0;
            effectValueB *= normalressonmultiplier;
        }
    } else if (abilityTypeB === "カード獲得") {
        if (rarity === "SSR") {
            if (limit <= 1) {
                effectValueB = 100;
            } else if (limit >= 2) {
                effectValueB = 200;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 1) {
                effectValueB = "";
            } else if (limit >= 2) {
                effectValueB = "";
            }
        } else if (rarity === "SR") {
            if (limit === 0) {
                effectValueB = 1;
            } else if (limit >= 1) {
                effectValueB = 2;
            }
        }
        // Aカード取得とMカード取得の合計を取得
        const AGet = parseInt(document.getElementById("disp-Aカード取得").textContent) || 0;
        const MGet = parseInt(document.getElementById("disp-Mカード取得").textContent) || 0;
        const totalCards = AGet + MGet;
        // 効果量に乗算
        effectValueB *= totalCards;
    } else if (abilityTypeB === "A獲得") {
        if (rarity === "SSR") {
            if (limit <= 1) {
                effectValueB = 2;
            } else if (limit >= 2) {
                effectValueB = 3;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 1) {
                effectValueB = "";
            } else if (limit >= 2) {
                effectValueB = "";
            }
        } else if (rarity === "SR") {
            if (limit === 0) {
                effectValueB = "";
            } else if (limit >= 1) {
                effectValueB = "";
            }
        }
        const AGet = parseInt(document.getElementById("disp-Aカード取得").textContent) || 0;
        effectValueB *= AGet;
    } else if (abilityTypeB === "M獲得") {
        if (rarity === "SSR") {
            if (limit <= 1) {
                effectValueB = 2;
            } else if (limit >= 2) {
                effectValueB = 3;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 1) {
                effectValueB = 1;
            } else if (limit >= 2) {
                effectValueB = 2;
            }
        } else if (rarity === "SR") {
            if (limit === 0) {
                effectValueB = "";
            } else if (limit >= 1) {
                effectValueB = "";
            }
        }
        const MGet = parseInt(document.getElementById("disp-Mカード取得").textContent) || 0;
        effectValueB *= MGet;
    } else if (abilityTypeB === "スキル強化") {
        if (rarity === "SSR") {
            if (limit <= 1) {
                effectValueB = 3;
            } else if (limit >= 2) {
                effectValueB = 4;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 1) {
                effectValueB = "";
            } else if (limit >= 2) {
                effectValueB = "";
            }
        } else if (rarity === "SR") {
            if (limit === 0) {
                effectValueB = 2;
            } else if (limit >= 1) {
                effectValueB = 3;
            }
        }
        // Aカード強化とMカード強化の合計
        const AUp = parseInt(document.getElementById("disp-Aカード強化").textContent) || 0;
        const MUp = parseInt(document.getElementById("disp-Mカード強化").textContent) || 0;
        const totalUp = AUp + MUp;
        // 効果量に乗算
        effectValueB *= totalUp;
    } else if (abilityTypeB === "Aスキル強化") {
        if (rarity === "SSR") {
            if (limit <= 1) {
                effectValueB = 7;
            } else if (limit >= 2) {
                effectValueB = 9;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 1) {
                effectValueB = 5;
            } else if (limit >= 2) {
                effectValueB = 7;
            }
        } else if (rarity === "SR") {
            if (limit === 0) {
                effectValueB = "";
            } else if (limit >= 1) {
                effectValueB = "";
            }
        }
        const AUp = parseInt(document.getElementById("disp-Aカード強化").textContent) || 0;
        effectValueB *= AUp;
    } else if (abilityTypeB === "Mスキル強化") {
        if (rarity === "SSR") {
            if (limit <= 1) {
                effectValueB = 7;
            } else if (limit >= 2) {
                effectValueB = 9;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 1) {
                effectValueB = 5;
            } else if (limit >= 2) {
                effectValueB = 7;
            }
        } else if (rarity === "SR") {
            if (limit === 0) {
                effectValueB = "";
            } else if (limit >= 1) {
                effectValueB = "";
            }
        }
        const MUp = parseInt(document.getElementById("disp-Mカード強化").textContent) || 0;
        effectValueB *= MUp;
    } else if (abilityTypeB === "授業") {
        if (rarity === "SSR") {
            if (limit <= 1) {
                effectValueB = 5;
            } else if (limit >= 2) {
                effectValueB = 7;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 1) {
                effectValueB = "";
            } else if (limit >= 2) {
                effectValueB = "";
            }
        } else if (rarity === "SR") {
            if (limit === 0) {
                effectValueB = 3;
            } else if (limit >= 1) {
                effectValueB = 5;
            }
        }
        const Class = parseInt(document.getElementById("営業回数").textContent) || 0;
        effectValueB *= Class;
    } else if (abilityTypeB === "お出かけ") {
        if (rarity === "SSR") {
            if (limit <= 1) {
                effectValueB = 11;
            } else if (limit >= 2) {
                effectValueB = 15;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 1) {
                effectValueB = "";
            } else if (limit >= 2) {
                effectValueB = "";
            }
        } else if (rarity === "SR") {
            if (limit === 0) {
                effectValueB = 5;
            } else if (limit >= 1) {
                effectValueB = 10;
            }
        }
        const Odekake = parseInt(document.getElementById("お出かけ回数").textContent) || 0;
        effectValueB *= Odekake;
    } else if (abilityTypeB === "活動支給") {
        if (rarity === "SSR") {
            if (limit <= 1) {
                effectValueB = 12;
            } else if (limit >= 2) {
                effectValueB = 17;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 1) {
                effectValueB = "";
            } else if (limit >= 2) {
                effectValueB = "";
            }
        } else if (rarity === "SR") {
            if (limit === 0) {
                effectValueB = 6;
            } else if (limit >= 1) {
                effectValueB = 11;
            }
        }
        const Katudou = parseInt(document.getElementById("差し入れ回数").textContent) || 0;
        effectValueB *= Katudou;
    } else if (abilityTypeB === "相談") {
        if (rarity === "SSR") {
            if (limit <= 1) {
                effectValueB = 8;
            } else if (limit >= 2) {
                effectValueB = 11;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 1) {
                effectValueB = 6;
            } else if (limit >= 2) {
                effectValueB = 8;
            }
        } else if (rarity === "SR") {
            if (limit === 0) {
                effectValueB = 4;
            } else if (limit >= 1) {
                effectValueB = 8;
            }
        }
        const Soudan = parseInt(document.getElementById("相談回数").textContent) || 0;
        effectValueB *= Soudan;
    } else if (abilityTypeB === "休む") {
        if (rarity === "SSR") {
            if (limit <= 1) {
                effectValueB = 17;
            } else if (limit >= 2) {
                effectValueB = 22;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 1) {
                effectValueB = "";
            } else if (limit >= 2) {
                effectValueB = "";
            }
        } else if (rarity === "SR") {
            if (limit === 0) {
                effectValueB = 9;
            } else if (limit >= 1) {
                effectValueB = 17;
            }
        }
        const Oyasumi = parseInt(document.getElementById("お休み回数").textContent) || 0;
        effectValueB *= Oyasumi;
    } else if (abilityTypeB === "試験終了時") {
        if (rarity === "SSR") {
            if (limit <= 1) {
                effectValueB = 17;
            } else if (limit >= 2) {
                effectValueB = 22;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 1) {
                effectValueB = 11;
            } else if (limit >= 2) {
                effectValueB = 17;
            }
        } else if (rarity === "SR") {
            if (limit === 0) {
                effectValueB = 9;
            } else if (limit >= 1) {
                effectValueB = 17;
            }
        }
        const Test = parseInt(document.getElementById("試験回数").textContent) || 0;
        effectValueB *= Test;
    } else if (abilityTypeB === "Pドリンク交換") {
        if (rarity === "SSR") {
            if (limit <= 1) {
                effectValueB = 8;
            } else if (limit >= 2) {
                effectValueB = 11;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 1) {
                effectValueB = "";
            } else if (limit >= 2) {
                effectValueB = "";
            }
        } else if (rarity === "SR") {
            if (limit === 0) {
                effectValueB = 4;
            } else if (limit >= 1) {
                effectValueB = 8;
            }
        }
        const Pdori = parseInt(document.getElementById("disp-Pドリンク交換").textContent) || 0;
        effectValueB *= Pdori;
    } else if (abilityTypeB === "削除") {
        if (rarity === "SSR") {
            if (limit <= 1) {
                effectValueB = 6;
            } else if (limit >= 2) {
                effectValueB = 11;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 1) {
                effectValueB = "";
            } else if (limit >= 2) {
                effectValueB = "";
            }
        } else if (rarity === "SR") {
            if (limit === 0) {
                effectValueB = 4;
            } else if (limit >= 1) {
                effectValueB = 8;
            }
        }
        const ASakujo = parseInt(document.getElementById("disp-Aカード削除").textContent) || 0;
        const MSakujo = parseInt(document.getElementById("disp-Mカード削除").textContent) || 0;
        const Sakujo = ASakujo + MSakujo;
        effectValueB *= Sakujo;
    } else if (abilityTypeB === "A削除") {
        if (rarity === "SSR") {
            if (limit <= 1) {
                effectValueB = 17;
            } else if (limit >= 2) {
                effectValueB = 22;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 1) {
                effectValueB = "";
            } else if (limit >= 2) {
                effectValueB = "";
            }
        } else if (rarity === "SR") {
            if (limit === 0) {
                effectValueB = "";
            } else if (limit >= 1) {
                effectValueB = "";
            }
        }
        // Aカード削除の数を取得し、最大3に制限
        const ASakujo = Math.min(3, parseInt(document.getElementById("disp-Aカード削除").textContent) || 0);
        effectValueB *= ASakujo;
    } else if (abilityTypeB === "M削除") {
        if (rarity === "SSR") {
            if (limit <= 1) {
                effectValueB = 17;
            } else if (limit >= 2) {
                effectValueB = 22;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 1) {
                effectValueB = "";
            } else if (limit >= 2) {
                effectValueB = "";
            }
        } else if (rarity === "SR") {
            if (limit === 0) {
                effectValueB = "";
            } else if (limit >= 1) {
                effectValueB = "";
            }
        }
        // Mカード削除の数を取得し、最大3に制限
        const MSakujo = Math.min(3, parseInt(document.getElementById("disp-Mカード削除").textContent) || 0);
        effectValueB *= MSakujo;
    } else if (abilityTypeB === "好調or好印象or温存獲得") {
        if (rarity === "SSR") {
            if (limit <= 1) {
                effectValueB = 3;
            } else if (limit >= 2) {
                effectValueB = 4;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 1) {
                effectValueB = "";
            } else if (limit >= 2) {
                effectValueB = "";
            }
        } else if (rarity === "SR") {
            if (limit === 0) {
                effectValueB = "";
            } else if (limit >= 1) {
                effectValueB = "";
            }
        }
        const KoutyouKouinsyouOnzonGet = parseInt(document.getElementById("disp-好調or好印象or温存獲得").textContent) || 0;
        effectValueB *= KoutyouKouinsyouOnzonGet;
    } else if (abilityTypeB === "チェンジ") {
        if (rarity === "SSR") {
            if (limit <= 1) {
                effectValueB = 16;
            } else if (limit >= 2) {
                effectValueB = 21;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 1) {
                effectValueB = "";
            } else if (limit >= 2) {
                effectValueB = "";
            }
        } else if (rarity === "SR") {
            if (limit === 0) {
                effectValueB = "";
            } else if (limit >= 1) {
                effectValueB = "";
            }
        }
        // チェンジの数を取得し、最大3に制限
        const Change = Math.min(3, parseInt(document.getElementById("disp-カードチェンジ").textContent) || 0);
        effectValueB *= Change;
    }
    // 効果量を表示
    effectSpanB.textContent = effectValueB;
}

// Cアビ効果量を更新する関数
function updateSupportEffectC(index) {
    const abilityTypeC = document.getElementById(`support-c-ability-${index + 1}`).textContent;
    const type = document.getElementById(`support-type-${index + 1}`).textContent.trim().toLowerCase(); // タイプを取得
    const rarity = document.getElementById(`support-rarity-${index + 1}`).textContent;
    const limit = supportLimitBreaks[index];
    const effectSpanC = document.getElementById(`support-c-effect-${index + 1}`);

    if (!effectSpanC) return; // 要素が存在しない場合は処理をスキップ

    let effectValueC = "-"; // デフォルトは表示なし

    // 条件に基づいてCアビ効果量を設定
    if (abilityTypeC === "レッスン") {
        if (rarity === "SSR") {
            if (limit <= 2) {
                effectValueC = 4;
            } else if (limit >= 3) {
                effectValueC = 6;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 3) {
                effectValueC = 3;
            } else if (limit >= 4) {
                effectValueC = 4;
            }
        } else if (rarity === "SR") {
            if (limit <= 3) {
                effectValueC = 2;
            } else if (limit >= 4) {
                effectValueC = 4;
            }
        }
        // レッスン効果の倍率をかける
        if (type === "vocal") {
            const ressonmultiplier = parseFloat(document.getElementById("vocal-resson-times").textContent) || 0;
            effectValueC *= ressonmultiplier;
        } else if (type === "dance") {
            const ressonmultiplier = parseFloat(document.getElementById("dance-resson-times").textContent) || 0;
            effectValueC *= ressonmultiplier;
        } else if (type === "visual") {
            const ressonmultiplier = parseFloat(document.getElementById("visual-resson-times").textContent) || 0;
            effectValueC *= ressonmultiplier;
        }
    } else if (abilityTypeC === "SPレッスン") {
        if (rarity === "SSR") {
            if (limit <= 2) {
                effectValueC = 13;
            } else if (limit >= 3) {
                effectValueC = 17;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 3) {
                effectValueC = 9;
            } else if (limit >= 4) {
                effectValueC = 13;
            }
        } else if (rarity === "SR") {
            if (limit <= 3) {
                effectValueC = 7;
            } else if (limit >= 4) {
                effectValueC = 13;
            }
        }
        // SPレッスン効果の倍率をかける
        if (type === "vocal") {
            const spressonmultiplier = parseFloat(document.getElementById("sp-vocal-resson-times").textContent) || 0;
            effectValueC *= spressonmultiplier;
        } else if (type === "dance") {
            const spressonmultiplier = parseFloat(document.getElementById("sp-dance-resson-times").textContent) || 0;
            effectValueC *= spressonmultiplier;
        } else if (type === "visual") {
            const spressonmultiplier = parseFloat(document.getElementById("sp-visual-resson-times").textContent) || 0;
            effectValueC *= spressonmultiplier;
        }
    } else if (abilityTypeC === "通常レッスン") {
        if (rarity === "SSR") {
            if (limit <= 2) {
                effectValueC = "";
            } else if (limit >= 3) {
                effectValueC = "";
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 3) {
                effectValueC = "";
            } else if (limit >= 4) {
                effectValueC = "";
            }
        } else if (rarity === "SR") {
            if (limit <= 3) {
                effectValueC = 7;
            } else if (limit >= 4) {
                effectValueC = 13;
            }
        }
        // 通常レッスン効果の倍率をかける
        if (type === "vocal") {
            const normalressonmultiplier = parseFloat(document.getElementById("normal-vocal-resson-times").textContent) || 0;
            effectValueC *= normalressonmultiplier;
        } else if (type === "dance") {
            const normalressonmultiplier = parseFloat(document.getElementById("normal-dance-resson-times").textContent) || 0;
            effectValueC *= normalressonmultiplier;
        } else if (type === "visual") {
            const normalressonmultiplier = parseFloat(document.getElementById("normal-visual-resson-times").textContent) || 0;
            effectValueC *= normalressonmultiplier;
        }
    } else if (abilityTypeC === "カード獲得") {
        if (rarity === "SSR") {
            if (limit <= 2) {
                effectValueC = 100;
            } else if (limit >= 3) {
                effectValueC = 200;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 3) {
                effectValueC = "";
            } else if (limit >= 4) {
                effectValueC = "";
            }
        } else if (rarity === "SR") {
            if (limit <= 3) {
                effectValueC = 1;
            } else if (limit >= 4) {
                effectValueC = 2;
            }
        }
        // Aカード取得とMカード取得の合計を取得
        const AGet = parseInt(document.getElementById("disp-Aカード取得").textContent) || 0;
        const MGet = parseInt(document.getElementById("disp-Mカード取得").textContent) || 0;
        const totalCards = AGet + MGet;
        // 効果量に乗算
        effectValueC *= totalCards;
    } else if (abilityTypeC === "A獲得") {
        if (rarity === "SSR") {
            if (limit <= 2) {
                effectValueC = 2;
            } else if (limit >= 3) {
                effectValueC = 3;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 3) {
                effectValueC = "";
            } else if (limit >= 4) {
                effectValueC = "";
            }
        } else if (rarity === "SR") {
            if (limit <= 3) {
                effectValueC = "";
            } else if (limit >= 4) {
                effectValueC = "";
            }
        }
        const AGet = parseInt(document.getElementById("disp-Aカード取得").textContent) || 0;
        effectValueC *= AGet;
    } else if (abilityTypeC === "M獲得") {
        if (rarity === "SSR") {
            if (limit <= 2) {
                effectValueC = 2;
            } else if (limit >= 3) {
                effectValueC = 3;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 3) {
                effectValueC = 1;
            } else if (limit >= 4) {
                effectValueC = 2;
            }
        } else if (rarity === "SR") {
            if (limit <= 3) {
                effectValueC = "";
            } else if (limit >= 4) {
                effectValueC = "";
            }
        }
        const MGet = parseInt(document.getElementById("disp-Mカード取得").textContent) || 0;
        effectValueC *= MGet;
    } else if (abilityTypeC === "スキル強化") {
        if (rarity === "SSR") {
            if (limit <= 2) {
                effectValueC = 3;
            } else if (limit >= 3) {
                effectValueC = 4;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 3) {
                effectValueC = "";
            } else if (limit >= 4) {
                effectValueC = "";
            }
        } else if (rarity === "SR") {
            if (limit <= 3) {
                effectValueC = 2;
            } else if (limit >= 4) {
                effectValueC = 3;
            }
        }
        // Aカード強化とMカード強化の合計
        const AUp = parseInt(document.getElementById("disp-Aカード強化").textContent) || 0;
        const MUp = parseInt(document.getElementById("disp-Mカード強化").textContent) || 0;
        const totalUp = AUp + MUp;
        // 効果量に乗算
        effectValueC *= totalUp;
    } else if (abilityTypeC === "Aスキル強化") {
        if (rarity === "SSR") {
            if (limit <= 2) {
                effectValueC = 7;
            } else if (limit >= 3) {
                effectValueC = 9;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 3) {
                effectValueC = 5;
            } else if (limit >= 4) {
                effectValueC = 7;
            }
        } else if (rarity === "SR") {
            if (limit <= 3) {
                effectValueC = "";
            } else if (limit >= 4) {
                effectValueC = "";
            }
        }
        const AUp = parseInt(document.getElementById("disp-Aカード強化").textContent) || 0;
        effectValueC *= AUp;
    } else if (abilityTypeC === "Mスキル強化") {
        if (rarity === "SSR") {
            if (limit <= 2) {
                effectValueC = 7;
            } else if (limit >= 3) {
                effectValueC = 9;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 3) {
                effectValueC = 5;
            } else if (limit >= 4) {
                effectValueC = 7;
            }
        } else if (rarity === "SR") {
            if (limit <= 3) {
                effectValueC = "";
            } else if (limit >= 4) {
                effectValueC = "";
            }
        }
        const MUp = parseInt(document.getElementById("disp-Mカード強化").textContent) || 0;
        effectValueC *= MUp;
    } else if (abilityTypeC === "授業") {
        if (rarity === "SSR") {
            if (limit <= 2) {
                effectValueC = 5;
            } else if (limit >= 3) {
                effectValueC = 7;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 3) {
                effectValueC = "";
            } else if (limit >= 4) {
                effectValueC = "";
            }
        } else if (rarity === "SR") {
            if (limit <= 3) {
                effectValueC = 3;
            } else if (limit >= 4) {
                effectValueC = 5;
            }
        }
        const Class = parseInt(document.getElementById("営業回数").textContent) || 0;
        effectValueC *= Class;
    } else if (abilityTypeC === "お出かけ") {
        if (rarity === "SSR") {
            if (limit <= 2) {
                effectValueC = 11;
            } else if (limit >= 3) {
                effectValueC = 15;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 3) {
                effectValueC = "";
            } else if (limit >= 4) {
                effectValueC = "";
            }
        } else if (rarity === "SR") {
            if (limit <= 3) {
                effectValueC = 5;
            } else if (limit >= 4) {
                effectValueC = 10;
            }
        }
        const Odekake = parseInt(document.getElementById("お出かけ回数").textContent) || 0;
        effectValueC *= Odekake;
    } else if (abilityTypeC === "活動支給") {
        if (rarity === "SSR") {
            if (limit <= 2) {
                effectValueC = 12;
            } else if (limit >= 3) {
                effectValueC = 17;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 3) {
                effectValueC = "";
            } else if (limit >= 4) {
                effectValueC = "";
            }
        } else if (rarity === "SR") {
            if (limit <= 3) {
                effectValueC = 6;
            } else if (limit >= 4) {
                effectValueC = 11;
            }
        }
        const Katudou = parseInt(document.getElementById("差し入れ回数").textContent) || 0;
        effectValueC *= Katudou;
    } else if (abilityTypeC === "相談") {
        if (rarity === "SSR") {
            if (limit <= 2) {
                effectValueC = 8;
            } else if (limit >= 3) {
                effectValueC = 11;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 3) {
                effectValueC = 6;
            } else if (limit >= 4) {
                effectValueC = 8;
            }
        } else if (rarity === "SR") {
            if (limit <= 3) {
                effectValueC = 4;
            } else if (limit >= 4) {
                effectValueC = 8;
            }
        }
        const Soudan = parseInt(document.getElementById("相談回数").textContent) || 0;
        effectValueC *= Soudan;
    } else if (abilityTypeC === "休む") {
        if (rarity === "SSR") {
            if (limit <= 2) {
                effectValueC = 17;
            } else if (limit >= 3) {
                effectValueC = 22;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 3) {
                effectValueC = "";
            } else if (limit >= 4) {
                effectValueC = "";
            }
        } else if (rarity === "SR") {
            if (limit <= 3) {
                effectValueC = 9;
            } else if (limit >= 4) {
                effectValueC = 17;
            }
        }
        const Oyasumi = parseInt(document.getElementById("お休み回数").textContent) || 0;
        effectValueC *= Oyasumi;
    } else if (abilityTypeC === "試験終了時") {
        if (rarity === "SSR") {
            if (limit <= 2) {
                effectValueC = 17;
            } else if (limit >= 3) {
                effectValueC = 22;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 3) {
                effectValueC = 11;
            } else if (limit >= 4) {
                effectValueC = 17;
            }
        } else if (rarity === "SR") {
            if (limit <= 3) {
                effectValueC = 9;
            } else if (limit >= 4) {
                effectValueC = 17;
            }
        }
        const Test = parseInt(document.getElementById("試験回数").textContent) || 0;
        effectValueC *= Test;
    } else if (abilityTypeC === "Pドリンク交換") {
        if (rarity === "SSR") {
            if (limit <= 2) {
                effectValueC = 8;
            } else if (limit >= 3) {
                effectValueC = 11;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 3) {
                effectValueC = "";
            } else if (limit >= 4) {
                effectValueC = "";
            }
        } else if (rarity === "SR") {
            if (limit <= 3) {
                effectValueC = 4;
            } else if (limit >= 4) {
                effectValueC = 8;
            }
        }
        const Pdori = parseInt(document.getElementById("disp-Pドリンク交換").textContent) || 0;
        effectValueC *= Pdori;
    } else if (abilityTypeC === "削除") {
        if (rarity === "SSR") {
            if (limit <= 2) {
                effectValueC = 6;
            } else if (limit >= 3) {
                effectValueC = 11;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 3) {
                effectValueC = "";
            } else if (limit >= 4) {
                effectValueC = "";
            }
        } else if (rarity === "SR") {
            if (limit <= 3) {
                effectValueC = 4;
            } else if (limit >= 4) {
                effectValueC = 8;
            }
        }
        const ASakujo = parseInt(document.getElementById("disp-Aカード削除").textContent) || 0;
        const MSakujo = parseInt(document.getElementById("disp-Mカード削除").textContent) || 0;
        const Sakujo = ASakujo + MSakujo;
        effectValueC *= Sakujo;
    } else if (abilityTypeC === "A削除") {
        if (rarity === "SSR") {
            if (limit <= 1) {
                effectValueC = 17;
            } else if (limit >= 2) {
                effectValueC = 22;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 1) {
                effectValueC = "";
            } else if (limit >= 2) {
                effectValueC = "";
            }
        } else if (rarity === "SR") {
            if (limit === 0) {
                effectValueC = "";
            } else if (limit >= 1) {
                effectValueC = "";
            }
        }
        // Aカード削除の数を取得し、最大3に制限
        const ASakujo = Math.min(3, parseInt(document.getElementById("disp-Aカード削除").textContent) || 0);
        effectValueC *= ASakujo;
    } else if (abilityTypeC === "M削除") {
        if (rarity === "SSR") {
            if (limit <= 2) {
                effectValueC = 17;
            } else if (limit >= 3) {
                effectValueC = 22;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 3) {
                effectValueC = "";
            } else if (limit >= 4) {
                effectValueC = "";
            }
        } else if (rarity === "SR") {
            if (limit <= 3) {
                effectValueC = "";
            } else if (limit >= 4) {
                effectValueC = "";
            }
        }
        // Mカード削除の数を取得し、最大3に制限
        const MSakujo = Math.min(3, parseInt(document.getElementById("disp-Mカード削除").textContent) || 0);
        effectValueC *= MSakujo;
    } else if (abilityTypeC === "好調or好印象or温存獲得") {
        if (rarity === "SSR") {
            if (limit <= 2) {
                effectValueC = 3;
            } else if (limit >= 3) {
                effectValueC = 4;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 3) {
                effectValueC = "";
            } else if (limit >= 4) {
                effectValueC = "";
            }
        } else if (rarity === "SR") {
            if (limit <= 3) {
                effectValueC = "";
            } else if (limit >= 4) {
                effectValueC = "";
            }
        }
        const KoutyouKouinsyouOnzonGet = parseInt(document.getElementById("disp-好調or好印象or温存獲得").textContent) || 0;
        effectValueC *= KoutyouKouinsyouOnzonGet;
    } else if (abilityTypeC === "チェンジ") {
        if (rarity === "SSR") {
            if (limit <= 2) {
                effectValueC = 16;
            } else if (limit >= 3) {
                effectValueC = 21;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 3) {
                effectValueC = "";
            } else if (limit >= 4) {
                effectValueC = "";
            }
        } else if (rarity === "SR") {
            if (limit <= 3) {
                effectValueC = "";
            } else if (limit >= 4) {
                effectValueC = "";
            }
        }
        // チェンジの数を取得し、最大3に制限
        const Change = Math.min(3, parseInt(document.getElementById("disp-カードチェンジ").textContent) || 0);
        effectValueC *= Change;
    }
    // 効果量を表示
    effectSpanC.textContent = effectValueC;
}

// Dアビ効果量を更新する関数
function updateSupportEffectD(index) {
    const abilityTypeD = document.getElementById(`support-d-ability-${index + 1}`).textContent;
    const type = document.getElementById(`support-type-${index + 1}`).textContent.trim().toLowerCase(); // タイプを取得
    const rarity = document.getElementById(`support-rarity-${index + 1}`).textContent;
    const limit = supportLimitBreaks[index];
    const effectSpanD = document.getElementById(`support-d-effect-${index + 1}`);

    if (!effectSpanD) return; // 要素が存在しない場合は処理をスキップ

    let effectValueD = "-"; // デフォルトは表示なし

    // 条件に基づいてDアビ効果量を設定
    if (abilityTypeD === "レッスン") {
        if (rarity === "SSR") {
            if (limit <= 3) {
                effectValueD = 4;
            } else if (limit >= 4) {
                effectValueD = 6;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 2) {
                effectValueD = 3;
            } else if (limit >= 3) {
                effectValueD = 4;
            }
        } else if (rarity === "SR") {
            if (limit <= 2) {
                effectValueD = 2;
            } else if (limit >= 3) {
                effectValueD = 4;
            }
        }
        // レッスン効果の倍率をかける
        if (type === "vocal") {
            const ressonmultiplier = parseFloat(document.getElementById("vocal-resson-times").textContent) || 0;
            effectValueD *= ressonmultiplier;
        } else if (type === "dance") {
            const ressonmultiplier = parseFloat(document.getElementById("dance-resson-times").textContent) || 0;
            effectValueD *= ressonmultiplier;
        } else if (type === "visual") {
            const ressonmultiplier = parseFloat(document.getElementById("visual-resson-times").textContent) || 0;
            effectValueD *= ressonmultiplier;
        }
    } else if (abilityTypeD === "SPレッスン") {
        if (rarity === "SSR") {
            if (limit <= 3) {
                effectValueD = 13;
            } else if (limit >= 4) {
                effectValueD = 17;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 2) {
                effectValueD = 9;
            } else if (limit >= 3) {
                effectValueD = 13;
            }
        } else if (rarity === "SR") {
            if (limit <= 2) {
                effectValueD = 7;
            } else if (limit >= 3) {
                effectValueD = 13;
            }
        }
        // SPレッスン効果の倍率をかける
        if (type === "vocal") {
            const spressonmultiplier = parseFloat(document.getElementById("sp-vocal-resson-times").textContent) || 0;
            effectValueD *= spressonmultiplier;
        } else if (type === "dance") {
            const spressonmultiplier = parseFloat(document.getElementById("sp-dance-resson-times").textContent) || 0;
            effectValueD *= spressonmultiplier;
        } else if (type === "visual") {
            const spressonmultiplier = parseFloat(document.getElementById("sp-visual-resson-times").textContent) || 0;
            effectValueD *= spressonmultiplier;
        }
    } else if (abilityTypeD === "通常レッスン") {
        if (rarity === "SSR") {
            if (limit <= 3) {
                effectValueD = "";
            } else if (limit >= 4) {
                effectValueD = "";
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 2) {
                effectValueD = "";
            } else if (limit >= 3) {
                effectValueD = "";
            }
        } else if (rarity === "SR") {
            if (limit <= 2) {
                effectValueD = 7;
            } else if (limit >= 3) {
                effectValueD = 13;
            }
        }
        // 通常レッスン効果の倍率をかける
        if (type === "vocal") {
            const normalressonmultiplier = parseFloat(document.getElementById("normal-vocal-resson-times").textContent) || 0;
            effectValueD *= normalressonmultiplier;
        } else if (type === "dance") {
            const normalressonmultiplier = parseFloat(document.getElementById("normal-dance-resson-times").textContent) || 0;
            effectValueD *= normalressonmultiplier;
        } else if (type === "visual") {
            const normalressonmultiplier = parseFloat(document.getElementById("normal-visual-resson-times").textContent) || 0;
            effectValueD *= normalressonmultiplier;
        }
    } else if (abilityTypeD === "カード獲得") {
        if (rarity === "SSR") {
            if (limit <= 3) {
                effectValueD = 100;
            } else if (limit >= 4) {
                effectValueD = 200;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 2) {
                effectValueD = "";
            } else if (limit >= 3) {
                effectValueD = "";
            }
        } else if (rarity === "SR") {
            if (limit <= 2) {
                effectValueD = 1;
            } else if (limit >= 3) {
                effectValueD = 2;
            }
        }
        // Aカード取得とMカード取得の合計を取得
        const AGet = parseInt(document.getElementById("disp-Aカード取得").textContent) || 0;
        const MGet = parseInt(document.getElementById("disp-Mカード取得").textContent) || 0;
        const totalCards = AGet + MGet;
        // 効果量に乗算
        effectValueD *= totalCards;
    } else if (abilityTypeD === "A獲得") {
        if (rarity === "SSR") {
            if (limit <= 3) {
                effectValueD = 2;
            } else if (limit >= 4) {
                effectValueD = 3;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 2) {
                effectValueD = "";
            } else if (limit >= 3) {
                effectValueD = "";
            }
        } else if (rarity === "SR") {
            if (limit <= 2) {
                effectValueD = "";
            } else if (limit >= 3) {
                effectValueD = "";
            }
        }
        const AGet = parseInt(document.getElementById("disp-Aカード取得").textContent) || 0;
        effectValueD *= AGet;
    } else if (abilityTypeD === "M獲得") {
        if (rarity === "SSR") {
            if (limit <= 3) {
                effectValueD = 2;
            } else if (limit >= 4) {
                effectValueD = 3;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 2) {
                effectValueD = 1;
            } else if (limit >= 3) {
                effectValueD = 2;
            }
        } else if (rarity === "SR") {
            if (limit <= 2) {
                effectValueD = "";
            } else if (limit >= 3) {
                effectValueD = "";
            }
        }
        const MGet = parseInt(document.getElementById("disp-Mカード取得").textContent) || 0;
        effectValueD *= MGet;
    } else if (abilityTypeD === "スキル強化") {
        if (rarity === "SSR") {
            if (limit <= 3) {
                effectValueD = 3;
            } else if (limit >= 4) {
                effectValueD = 4;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 2) {
                effectValueD = "";
            } else if (limit >= 3) {
                effectValueD = "";
            }
        } else if (rarity === "SR") {
            if (limit <= 2) {
                effectValueD = 2;
            } else if (limit >= 3) {
                effectValueD = 3;
            }
        }
        // Aカード強化とMカード強化の合計
        const AUp = parseInt(document.getElementById("disp-Aカード強化").textContent) || 0;
        const MUp = parseInt(document.getElementById("disp-Mカード強化").textContent) || 0;
        const totalUp = AUp + MUp;
        // 効果量に乗算
        effectValueD *= totalUp;
    } else if (abilityTypeD === "Aスキル強化") {
        if (rarity === "SSR") {
            if (limit <= 3) {
                effectValueD = 7;
            } else if (limit >= 4) {
                effectValueD = 9;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 2) {
                effectValueD = 5;
            } else if (limit >= 3) {
                effectValueD = 7;
            }
        } else if (rarity === "SR") {
            if (limit <= 2) {
                effectValueD = "";
            } else if (limit >= 3) {
                effectValueD = "";
            }
        }
        const AUp = parseInt(document.getElementById("disp-Aカード強化").textContent) || 0;
        effectValueD *= AUp;
    } else if (abilityTypeD === "Mスキル強化") {
        if (rarity === "SSR") {
            if (limit <= 3) {
                effectValueD = 7;
            } else if (limit >= 4) {
                effectValueD = 9;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 2) {
                effectValueD = 5;
            } else if (limit >= 3) {
                effectValueD = 7;
            }
        } else if (rarity === "SR") {
            if (limit <= 2) {
                effectValueD = "";
            } else if (limit >= 3) {
                effectValueD = "";
            }
        }
        const MUp = parseInt(document.getElementById("disp-Mカード強化").textContent) || 0;
        effectValueD *= MUp;
    } else if (abilityTypeD === "授業") {
        if (rarity === "SSR") {
            if (limit <= 3) {
                effectValueD = 5;
            } else if (limit >= 4) {
                effectValueD = 7;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 2) {
                effectValueD = "";
            } else if (limit >= 3) {
                effectValueD = "";
            }
        } else if (rarity === "SR") {
            if (limit <= 2) {
                effectValueD = 3;
            } else if (limit >= 3) {
                effectValueD = 5;
            }
        }
        const Class = parseInt(document.getElementById("営業回数").textContent) || 0;
        effectValueD *= Class;
    } else if (abilityTypeD === "お出かけ") {
        if (rarity === "SSR") {
            if (limit <= 3) {
                effectValueD = 11;
            } else if (limit >= 4) {
                effectValueD = 15;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 2) {
                effectValueD = "";
            } else if (limit >= 3) {
                effectValueD = "";
            }
        } else if (rarity === "SR") {
            if (limit <= 2) {
                effectValueD = 5;
            } else if (limit >= 3) {
                effectValueD = 10;
            }
        }
        const Odekake = parseInt(document.getElementById("お出かけ回数").textContent) || 0;
        effectValueD *= Odekake;
    } else if (abilityTypeD === "活動支給") {
        if (rarity === "SSR") {
            if (limit <= 3) {
                effectValueD = 12;
            } else if (limit >= 4) {
                effectValueD = 17;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 2) {
                effectValueD = "";
            } else if (limit >= 3) {
                effectValueD = "";
            }
        } else if (rarity === "SR") {
            if (limit <= 2) {
                effectValueD = 6;
            } else if (limit >= 3) {
                effectValueD = 11;
            }
        }
        const Katudou = parseInt(document.getElementById("差し入れ回数").textContent) || 0;
        effectValueD *= Katudou;
    } else if (abilityTypeD === "相談") {
        if (rarity === "SSR") {
            if (limit <= 3) {
                effectValueD = 8;
            } else if (limit >= 4) {
                effectValueD = 11;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 2) {
                effectValueD = 6;
            } else if (limit >= 3) {
                effectValueD = 8;
            }
        } else if (rarity === "SR") {
            if (limit <= 2) {
                effectValueD = 4;
            } else if (limit >= 3) {
                effectValueD = 8;
            }
        }
        const Soudan = parseInt(document.getElementById("相談回数").textContent) || 0;
        effectValueD *= Soudan;
    } else if (abilityTypeD === "休む") {
        if (rarity === "SSR") {
            if (limit <= 3) {
                effectValueD = 17;
            } else if (limit >= 4) {
                effectValueD = 22;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 2) {
                effectValueD = "";
            } else if (limit >= 3) {
                effectValueD = "";
            }
        } else if (rarity === "SR") {
            if (limit <= 2) {
                effectValueD = 9;
            } else if (limit >= 3) {
                effectValueD = 17;
            }
        }
        const Oyasumi = parseInt(document.getElementById("お休み回数").textContent) || 0;
        effectValueD *= Oyasumi;
    } else if (abilityTypeD === "試験終了時") {
        if (rarity === "SSR") {
            if (limit <= 3) {
                effectValueD = 17;
            } else if (limit >= 4) {
                effectValueD = 22;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 2) {
                effectValueD = 11;
            } else if (limit >= 3) {
                effectValueD = 17;
            }
        } else if (rarity === "SR") {
            if (limit <= 2) {
                effectValueD = 9;
            } else if (limit >= 3) {
                effectValueD = 17;
            }
        }
        const Test = parseInt(document.getElementById("試験回数").textContent) || 0;
        effectValueD *= Test;
    } else if (abilityTypeD === "Pドリンク交換") {
        if (rarity === "SSR") {
            if (limit <= 3) {
                effectValueD = 8;
            } else if (limit >= 4) {
                effectValueD = 11;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 2) {
                effectValueD = "";
            } else if (limit >= 3) {
                effectValueD = "";
            }
        } else if (rarity === "SR") {
            if (limit <= 2) {
                effectValueD = 4;
            } else if (limit >= 3) {
                effectValueD = 8;
            }
        }
        const Pdori = parseInt(document.getElementById("disp-Pドリンク交換").textContent) || 0;
        effectValueD *= Pdori;
    } else if (abilityTypeD === "削除") {
        if (rarity === "SSR") {
            if (limit <= 3) {
                effectValueD = 6;
            } else if (limit >= 4) {
                effectValueD = 11;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 2) {
                effectValueD = "";
            } else if (limit >= 3) {
                effectValueD = "";
            }
        } else if (rarity === "SR") {
            if (limit <= 2) {
                effectValueD = 4;
            } else if (limit >= 3) {
                effectValueD = 8;
            }
        }
        const ASakujo = parseInt(document.getElementById("disp-Aカード削除").textContent) || 0;
        const MSakujo = parseInt(document.getElementById("disp-Mカード削除").textContent) || 0;
        const Sakujo = ASakujo + MSakujo;
        effectValueD *= Sakujo;
    } else if (abilityTypeD === "A削除") {
        if (rarity === "SSR") {
            if (limit <= 1) {
                effectValueD = 17;
            } else if (limit >= 2) {
                effectValueD = 22;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 1) {
                effectValueD = "";
            } else if (limit >= 2) {
                effectValueD = "";
            }
        } else if (rarity === "SR") {
            if (limit === 0) {
                effectValueD = "";
            } else if (limit >= 1) {
                effectValueD = "";
            }
        }
        // Aカード削除の数を取得し、最大3に制限
        const ASakujo = Math.min(3, parseInt(document.getElementById("disp-Aカード削除").textContent) || 0);
        effectValueD *= ASakujo;
    } else if (abilityTypeD === "M削除") {
        if (rarity === "SSR") {
            if (limit <= 3) {
                effectValueD = 17;
            } else if (limit >= 4) {
                effectValueD = 22;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 2) {
                effectValueD = "";
            } else if (limit >= 3) {
                effectValueD = "";
            }
        } else if (rarity === "SR") {
            if (limit <= 2) {
                effectValueD = "";
            } else if (limit >= 3) {
                effectValueD = "";
            }
        }
        // Mカード削除の数を取得し、最大3に制限
        const MSakujo = Math.min(3, parseInt(document.getElementById("disp-Mカード削除").textContent) || 0);
        effectValueD *= MSakujo;
    } else if (abilityTypeD === "好調or好印象or温存獲得") {
        if (rarity === "SSR") {
            if (limit <= 3) {
                effectValueD = 3;
            } else if (limit >= 4) {
                effectValueD = 4;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 2) {
                effectValueD = "";
            } else if (limit >= 3) {
                effectValueD = "";
            }
        } else if (rarity === "SR") {
            if (limit <= 2) {
                effectValueD = "";
            } else if (limit >= 3) {
                effectValueD = "";
            }
        }
        const KoutyouKouinsyouOnzonGet = parseInt(document.getElementById("disp-好調or好印象or温存獲得").textContent) || 0;
        effectValueD *= KoutyouKouinsyouOnzonGet;
    } else if (abilityTypeD === "チェンジ") {
        if (rarity === "SSR") {
            if (limit <= 3) {
                effectValueD = 16;
            } else if (limit >= 4) {
                effectValueD = 21;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 2) {
                effectValueD = "";
            } else if (limit >= 3) {
                effectValueD = "";
            }
        } else if (rarity === "SR") {
            if (limit <= 2) {
                effectValueD = "";
            } else if (limit >= 3) {
                effectValueD = "";
            }
        }
        // チェンジの数を取得し、最大3に制限
        const Change = Math.min(3, parseInt(document.getElementById("disp-カードチェンジ").textContent) || 0);
        effectValueD *= Change;
    }
    // 効果量を表示
    effectSpanD.textContent = effectValueD;
}

// Eアビ効果量を更新する関数
function updateSupportEffectE(index) {
    const rarity = document.getElementById(`support-rarity-${index + 1}`).textContent;
    const type = document.getElementById(`support-type-${index + 1}`).textContent.trim().toLowerCase();
    const limit = supportLimitBreaks[index];
    const effectSpanE = document.getElementById(`support-e-effect-${index + 1}`);

    if (!effectSpanE) return;

    let effectValueE = 0; // 初期値は0

    // 条件に基づいてEアビ効果量を設定
    if (type === "assist") {
        effectValueE = 0;
    } else {
        // 条件に基づいてEアビ効果量を設定
        if (rarity === "SSR" || rarity === "配布SSR") {
            if (limit === 0) {
                effectValueE = 30;
            } else if (limit >= 1 && limit <= 3) {
                effectValueE = 35;
            } else if (limit === 4) {
                effectValueE = 40;
            }
        } else if (rarity === "SR") {
            if (limit === 0) {
                effectValueE = 23;
            } else if (limit >= 1 && limit <= 3) {
                effectValueE = 27;
            } else if (limit === 4) {
                effectValueE = 30;
            }
        }
    }

    // 効果量を表示
    effectSpanE.textContent = effectValueE;
    effectSpanE.dataset.value = effectValueE; // データ属性に保存（数値）
}

// SP効果量を更新する関数
function updateSupportEffectSP(index) {
    const abilityTypeSP = document.getElementById(`support-sp-ability-${index + 1}`).textContent;
    const rarity = document.getElementById(`support-rarity-${index + 1}`).textContent;
    const limit = supportLimitBreaks[index];
    const effectSpanSP = document.getElementById(`support-sp-effect-${index + 1}`);

    if (!effectSpanSP) return; // 要素が存在しない場合は処理をスキップ

    let effectValueSP = "-"; // デフォルトは表示なし

    // 条件に基づいてEアビ効果量を設定
    if (abilityTypeSP === "SP") {
        if (rarity === "SSR") {
            if (limit <= 1) {
                effectValueSP = 21;
            } else if (limit >= 2) {
                effectValueSP = 28;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 1) {
                effectValueSP = 14;
            } else if (limit >= 2) {
                effectValueSP = 21;
            }
        } else if (rarity === "SR") {
            if (limit === 0) {
                effectValueSP = 10.5;
            } else if (limit >= 1) {
                effectValueSP = 21;
            }
        }
    } else if (abilityTypeSP === "全SP") {
        if (rarity === "SSR") {
            if (limit <= 1) {
                effectValueSP = 10.5;
            } else if (limit >= 2) {
                effectValueSP = 14;
            }
        } else if (rarity === "配布SSR") {
            if (limit <= 1) {
                effectValueSP = "";
            } else if (limit >= 2) {
                effectValueSP = "";
            }
        } else if (rarity === "SR") {
            if (limit === 0) {
                effectValueSP = "";
            } else if (limit >= 1) {
                effectValueSP = "";
            }
        }
    }

    // 効果量を表示
    effectSpanSP.textContent = effectValueSP;
}

// 最終レスボ計算関数
function updateFinalResonance() {
    // Vocal レスボ計算
    let finalVocalResson = parseFloat(document.getElementById("vocal-percent-display").textContent) || 0;
    finalVocalResson += parseFloat(document.getElementById("メモリvoレスボ").textContent) || 0;

    // サポカによる追加
    for (let i = 1; i <= 6; i++) {
        const type = document.getElementById(`support-type-${i}`).textContent.trim().toLowerCase();
        const effect = parseFloat(document.getElementById(`support-a-effect-${i}`).textContent) || 0;

        // デバッグ用にタイプとエフェクトをログに出力
        console.log(`support-type-${i}:`, type);  // サポカタイプ
        console.log(`support-a-effect-${i}:`, effect);  // サポカエフェクト

        if (type === "vocal" && effect <= 10) {
            finalVocalResson += effect;
        }
    }

    // Dance レスボ計算
    let finalDanceResson = parseFloat(document.getElementById("dance-percent-display").textContent) || 0;
    finalDanceResson += parseFloat(document.getElementById("メモリdaレスボ").textContent) || 0;

    for (let i = 1; i <= 6; i++) {
        const type = document.getElementById(`support-type-${i}`).textContent.trim().toLowerCase();
        const effect = parseFloat(document.getElementById(`support-a-effect-${i}`).textContent) || 0;

        if (type === "dance" && effect <= 10) {
            finalDanceResson += effect;
        }
    }

    // Visual レスボ計算
    let finalVisualResson = parseFloat(document.getElementById("visual-percent-display").textContent) || 0;
    finalVisualResson += parseFloat(document.getElementById("メモリviレスボ").textContent) || 0;

    for (let i = 1; i <= 6; i++) {
        const type = document.getElementById(`support-type-${i}`).textContent.trim().toLowerCase();
        const effect = parseFloat(document.getElementById(`support-a-effect-${i}`).textContent) || 0;

        if (type === "visual" && effect <= 10) {
            finalVisualResson += effect;
        }
    }

    // 結果を表示
    document.getElementById("最終Vocalレスボ").textContent = finalVocalResson.toFixed(1);
    document.getElementById("最終Danceレスボ").textContent = finalDanceResson.toFixed(1);
    document.getElementById("最終Visualレスボ").textContent = finalVisualResson.toFixed(1);
}

// 最終ステータス計算関数
function updateFinalStatus() {
    // Vocal
    let finalVocal = 0;
    let vocalInit = parseFloat(document.getElementById("vocal-ini-display").textContent) || 0;
    vocalInit += parseFloat(document.getElementById("メモリvo初期値").textContent) || 0;

    const itemVocal = parseFloat(document.getElementById("disp-PアイテムVocalステ").textContent) || 0;
    vocalInit += itemVocal;

    // サポカ A効果 + Eアビ効果（チェックされているもののみ）
    for (let i = 1; i <= 6; i++) {
        const type = document.getElementById(`support-type-${i}`).textContent.trim().toLowerCase();
        const effectA = parseFloat(document.getElementById(`support-a-effect-${i}`).textContent) || 0;
        const effectE = parseFloat(document.getElementById(`support-e-effect-${i}`).textContent) || 0;

        if (type === "vocal") {
            if (effectA >= 10) {
                vocalInit += effectA;
            }

            // Eアビ効果（チェックありの時のみ）
            const checkbox = document.querySelector(`.box.sp[data-index="${i}"]`);
            if (checkbox && checkbox.classList.contains("checked")) {
                vocalInit += effectE;
            }
        }
    }

    // レッスン + 試験計算
    const ressonVocal = parseFloat(document.getElementById("resson-vocal").textContent) || 0;
    const finalVocalResson = parseFloat(document.getElementById("最終Vocalレスボ").textContent) / 100 || 0;
    const finalVocalScore = parseFloat(document.getElementById("最終的なVocal").textContent) || 0;
    finalVocal += vocalInit + ressonVocal + finalVocalScore;

    // 試験結果の加算（レスボ計算）
    const testValues = ["1次試験", "2次試験", "最終試験"];
    testValues.forEach(test => {
        const testValue = parseFloat(document.getElementById(`disp-${test}-vo`).textContent) || 0;
        const challengePItem = parseFloat(document.getElementById("disp-チャレンジPアイテム").textContent) || 0;
        const testResult = Math.floor(testValue * (1 + finalVocalResson));
        const challengeBonus = Math.floor(testValue * challengePItem * 0.01);
        finalVocal += testResult + challengeBonus;
    });

    // サポカ B, C, D 効果
    for (let i = 1; i <= 6; i++) {
        const type = document.getElementById(`support-type-${i}`).textContent.trim().toLowerCase();
        if (type === "vocal") {
            finalVocal += parseFloat(document.getElementById(`support-b-effect-${i}`).textContent) || 0;
            finalVocal += parseFloat(document.getElementById(`support-c-effect-${i}`).textContent) || 0;
            finalVocal += parseFloat(document.getElementById(`support-d-effect-${i}`).textContent) || 0;
        }
    }
    // 2300を超えた場合は2300と表示、残りはマイナスも考慮
    const displayedVocal = Math.min(finalVocal, 2300);
    const remainingVocal = 2300 - finalVocal;

    // 最終値表示
    document.getElementById("最終Vocal").textContent = displayedVocal;
    document.getElementById("残りVocal").textContent = remainingVocal;

    // Dance と Visual も同様に計算
    updateFinalDance();
    updateFinalVisual();
}

// 最終Dance計算関数
function updateFinalDance() {
    let finalDance = 0;
    let danceInit = parseFloat(document.getElementById("dance-ini-display").textContent) || 0;
    danceInit += parseFloat(document.getElementById("メモリda初期値").textContent) || 0;

    const itemDance = parseFloat(document.getElementById("disp-PアイテムDanceステ").textContent) || 0;
    danceInit += itemDance;

    // サポカ A効果 + Eアビ効果（チェックされているもののみ）
    for (let i = 1; i <= 6; i++) {
        const type = document.getElementById(`support-type-${i}`).textContent.trim().toLowerCase();
        const effectA = parseFloat(document.getElementById(`support-a-effect-${i}`).textContent) || 0;
        const effectE = parseFloat(document.getElementById(`support-e-effect-${i}`).textContent) || 0;

        if (type === "dance") {
            if (effectA >= 10) {
                danceInit += effectA;
            }

            // Eアビ効果（チェックありの時のみ）
            const checkbox = document.querySelector(`.box.sp[data-index="${i}"]`);
            if (checkbox && checkbox.classList.contains("checked")) {
                danceInit += effectE;
            }
        }
    }

    const ressonDance = parseFloat(document.getElementById("resson-dance").textContent) || 0;
    const finalDanceResson = parseFloat(document.getElementById("最終Danceレスボ").textContent) / 100 || 0;
    const finalDanceScore = parseFloat(document.getElementById("最終的なDance").textContent) || 0;
    finalDance += danceInit + ressonDance + finalDanceScore;

    // 試験結果（レスボ計算 + チャレンジPアイテム）
    ["1次試験", "2次試験", "最終試験"].forEach(test => {
        const testValue = parseFloat(document.getElementById(`disp-${test}-da`).textContent) || 0;
        const challengePItem = parseFloat(document.getElementById("disp-チャレンジPアイテム").textContent) || 0;

        // レスボ計算
        const testResult = Math.floor(testValue * (1 + finalDanceResson));

        // チャレンジPアイテム効果計算
        const challengeBonus = Math.floor(testValue * challengePItem * 0.01);

        // 試験結果 + チャレンジPアイテム効果
        finalDance += testResult + challengeBonus;
    });


    // サポカ B, C, D 効果
    for (let i = 1; i <= 6; i++) {
        const type = document.getElementById(`support-type-${i}`).textContent.trim().toLowerCase();
        if (type === "dance") {
            finalDance += parseFloat(document.getElementById(`support-b-effect-${i}`).textContent) || 0;
            finalDance += parseFloat(document.getElementById(`support-c-effect-${i}`).textContent) || 0;
            finalDance += parseFloat(document.getElementById(`support-d-effect-${i}`).textContent) || 0;
        }
    }
    // 2300を超えた場合は2300と表示、残りはマイナスも考慮
    const displayedDance = Math.min(finalDance, 2300);
    const remainingDance = 2300 - finalDance;

    // 最終値表示
    document.getElementById("最終Dance").textContent = displayedDance;
    document.getElementById("残りDance").textContent = remainingDance;
}

// 最終Visual計算関数
function updateFinalVisual() {
    let finalVisual = 0;
    let visualInit = parseFloat(document.getElementById("visual-ini-display").textContent) || 0;
    visualInit += parseFloat(document.getElementById("メモリvi初期値").textContent) || 0;

    const itemVisual = parseFloat(document.getElementById("disp-PアイテムVisualステ").textContent) || 0;
    visualInit += itemVisual;

    // サポカ A効果 + Eアビ効果（チェックされているもののみ）
    for (let i = 1; i <= 6; i++) {
        const type = document.getElementById(`support-type-${i}`).textContent.trim().toLowerCase();
        const effectA = parseFloat(document.getElementById(`support-a-effect-${i}`).textContent) || 0;
        const effectE = parseFloat(document.getElementById(`support-e-effect-${i}`).textContent) || 0;

        if (type === "visual") {
            if (effectA >= 10) {
                visualInit += effectA;
            }

            // Eアビ効果（チェックありの時のみ）
            const checkbox = document.querySelector(`.box.sp[data-index="${i}"]`);
            if (checkbox && checkbox.classList.contains("checked")) {
                visualInit += effectE;
            }
        }
    }

    const ressonVisual = parseFloat(document.getElementById("resson-visual").textContent) || 0;
    const finalVisualResson = parseFloat(document.getElementById("最終Visualレスボ").textContent) / 100 || 0;
    const finalVisualScore = parseFloat(document.getElementById("最終的なVisual").textContent) || 0;
    finalVisual += visualInit + ressonVisual + finalVisualScore;

    // 試験結果（レスボ計算 + チャレンジPアイテム）
    ["1次試験", "2次試験", "最終試験"].forEach(test => {
        const testValue = parseFloat(document.getElementById(`disp-${test}-vi`).textContent) || 0;
        const challengePItem = parseFloat(document.getElementById("disp-チャレンジPアイテム").textContent) || 0;

        // レスボ計算
        const testResult = Math.floor(testValue * (1 + finalVisualResson));

        // チャレンジPアイテム効果計算
        const challengeBonus = Math.floor(testValue * challengePItem * 0.01);

        // 試験結果 + チャレンジPアイテム効果
        finalVisual += testResult + challengeBonus;
    });


    // サポカ B, C, D 効果
    for (let i = 1; i <= 6; i++) {
        const type = document.getElementById(`support-type-${i}`).textContent.trim().toLowerCase();
        if (type === "visual") {
            finalVisual += parseFloat(document.getElementById(`support-b-effect-${i}`).textContent) || 0;
            finalVisual += parseFloat(document.getElementById(`support-c-effect-${i}`).textContent) || 0;
            finalVisual += parseFloat(document.getElementById(`support-d-effect-${i}`).textContent) || 0;
        }
    }
    // 2300を超えた場合は2300と表示、残りはマイナスも考慮
    const displayedVisual = Math.min(finalVisual, 2300);
    const remainingVisual = 2300 - finalVisual;

    // 最終値表示
    document.getElementById("最終Visual").textContent = displayedVisual;
    document.getElementById("残りVisual").textContent = remainingVisual;
}

// ステータス合計を更新する関数
function updateFinalStatusTotal() {
    const finalVocal = parseFloat(document.getElementById("最終Vocal").textContent) || 0;
    const finalDance = parseFloat(document.getElementById("最終Dance").textContent) || 0;
    const finalVisual = parseFloat(document.getElementById("最終Visual").textContent) || 0;

    const totalStatus = finalVocal + finalDance + finalVisual;

    document.getElementById("ステータス合計").textContent = totalStatus;
}

// 最終ファン数計算関数
function updateFinalFans() {
    // 各ファン数の取得
    const fansBase = parseFloat(document.getElementById("ファン数").textContent) || 0;
    const itemFans = parseFloat(document.getElementById("disp-Pアイテムファン数").textContent) || 0;
    const fansTest1 = parseFloat(document.getElementById("disp-1次試験-ファン").textContent) || 0;
    const fansTest2 = parseFloat(document.getElementById("disp-2次試験-ファン").textContent) || 0;
    const fansTestFinal = parseFloat(document.getElementById("disp-最終試験-ファン").textContent) || 0;
    // Aカード取得とMカード取得の取得と加算
    const cardA = parseFloat(document.getElementById("disp-Aカード取得").textContent) || 0;
    const cardM = parseFloat(document.getElementById("disp-Mカード取得").textContent) || 0;
    const cardBonus = Math.floor((cardA + cardM) / 2) * 3000;

    // 最終ファン数計算
    const totalFans = fansBase + itemFans + fansTest1 + fansTest2 + fansTestFinal + cardBonus;

    // 表示
    document.getElementById("最終ファン").textContent = totalFans;
}

// 評価値計算関数
function updateEvaluationValue() {
    // ステータス合計取得
    const totalStatus = parseInt(document.getElementById("ステータス合計").textContent) || 0;
    const finalFans = parseInt(document.getElementById("最終ファン").textContent) || 0;

    // ステータス評価値（2.3倍して切り下げ）
    const statusScore = Math.floor(totalStatus * 2.3);

    // ファン数評価値
    let fanScore = 0;
    if (finalFans > 140000) {
        fanScore = Math.floor(finalFans * 0.03 + 5200);
    } else if (finalFans > 120000) {
        fanScore = Math.floor(finalFans * 0.04 + 3800);
    } else if (finalFans > 100000) {
        fanScore = Math.floor(finalFans * 0.055 + 2100);
    } else if (finalFans > 80000) {
        fanScore = Math.floor(finalFans * 0.06 + 1600);
    } else if (finalFans > 60000) {
        fanScore = Math.floor(finalFans * 0.065 + 1200);
    } else if (finalFans > 40000) {
        fanScore = Math.floor(finalFans * 0.07 + 900);
    } else if (finalFans > 20000) {
        fanScore = Math.floor(finalFans * 0.085 + 300);
    } else if (finalFans > 0) {
        fanScore = Math.floor(finalFans * 0.1);
    }

    // 総合評価値（ステータス + ファン）
    const evaluationValue = statusScore + fanScore;

    // 結果表示
    document.getElementById("評価値").textContent = evaluationValue;
}

// 初期画像を設定（最初は "c.png" ）
window.addEventListener("DOMContentLoaded", () => {
    const imageElement = document.getElementById("dynamic-image");
    imageElement.src = "../assets/sozai/c.png";
});

// 評価値に応じた画像を切り替える関数
function updateEvaluationImage(value) {
    const imageElement = document.getElementById("dynamic-image");
    let imagePath = "";

    if (value >= 23000) {
        imagePath = "../assets/sozai/sss+.png";
    } else if (value >= 20000) {
        imagePath = "../assets/sozai/sss.png";
    } else if (value >= 18000) {
        imagePath = "../assets/sozai/ss+.png";
    } else if (value >= 16000) {
        imagePath = "../assets/sozai/ss.png";
    } else if (value >= 14500) {
        imagePath = "../assets/sozai/s+.png";
    } else if (value >= 13000) {
        imagePath = "../assets/sozai/s.png";
    } else if (value >= 11500) {
        imagePath = "../assets/sozai/a+.png";
    } else if (value >= 10000) {
        imagePath = "../assets/sozai/a.png";
    } else if (value >= 8000) {
        imagePath = "../assets/sozai/b+.png";
    } else if (value >= 6000) {
        imagePath = "../assets/sozai/b.png";
    } else if (value >= 4000) {
        imagePath = "../assets/sozai/c+.png";
    } else {
        imagePath = "../assets/sozai/c.png";
    }

    // 画像パスを更新
    imageElement.src = imagePath;
}

// 最終SP率計算関数
function updateFinalSPRates() {
    // Vocal率計算
    let finalVocalRate = parseFloat(document.getElementById("vocal-sp-display").textContent) || 0;

    for (let i = 1; i <= 6; i++) {
        const spAbility = document.getElementById(`support-sp-ability-${i}`).textContent.trim();
        const spEffect = parseFloat(document.getElementById(`support-sp-effect-${i}`).textContent) || 0;
        const type = document.getElementById(`support-type-${i}`).textContent.trim().toLowerCase();

        if ((spAbility === "SP" && type === "vocal") || spAbility === "全SP") {
            finalVocalRate += spEffect;
        }
    }

    // Dance率計算
    let finalDanceRate = parseFloat(document.getElementById("dance-sp-display").textContent) || 0;

    for (let i = 1; i <= 6; i++) {
        const spAbility = document.getElementById(`support-sp-ability-${i}`).textContent.trim();
        const spEffect = parseFloat(document.getElementById(`support-sp-effect-${i}`).textContent) || 0;
        const type = document.getElementById(`support-type-${i}`).textContent.trim().toLowerCase();

        if ((spAbility === "SP" && type === "dance") || spAbility === "全SP") {
            finalDanceRate += spEffect;
        }
    }

    // Visual率計算
    let finalVisualRate = parseFloat(document.getElementById("visual-sp-display").textContent) || 0;

    for (let i = 1; i <= 6; i++) {
        const spAbility = document.getElementById(`support-sp-ability-${i}`).textContent.trim();
        const spEffect = parseFloat(document.getElementById(`support-sp-effect-${i}`).textContent) || 0;
        const type = document.getElementById(`support-type-${i}`).textContent.trim().toLowerCase();

        if ((spAbility === "SP" && type === "visual") || spAbility === "全SP") {
            finalVisualRate += spEffect;
        }
    }

    // 結果を表示
    document.getElementById("Vocal率").textContent = finalVocalRate.toFixed(1);
    document.getElementById("Dance率").textContent = finalDanceRate.toFixed(1);
    document.getElementById("Visual率").textContent = finalVisualRate.toFixed(1);
}

// SP率計算を各操作後に更新
updateFinalSPRates();

// 凸数変更
const supportLimitBreaks = [0, 0, 0, 0, 0, 0]; // 6枚分の初期凸数

// 全4凸ボタンの動作関数
function setAllLimitToFour() {
    for (let i = 0; i < supportLimitBreaks.length; i++) {
        supportLimitBreaks[i] = 4; // 4凸に設定
        document.getElementById(`support-limit-${i}`).textContent = "4凸";
        updateSupportEffectA(i);
        updateSupportEffectB(i);
        updateSupportEffectC(i);
        updateSupportEffectD(i);
        updateSupportEffectE(i);
        updateSupportEffectSP(i);
    }

    updateAllSupportEffects();
    updateFinalResonance();
    updateFinalStatus();
    updateFinalStatusTotal();
    updateEvaluationValue();
    updateEvaluationImage(parseInt(document.getElementById("評価値").textContent) || 0); // 画像も更新
    updateFinalSPRates();
    updateCharacterLimitButtonColor();
    updateSupportLimitButtonColors();
}

function changeSupportLimit(index, delta) {
    supportLimitBreaks[index] = Math.min(4, Math.max(0, supportLimitBreaks[index] + delta));
    document.getElementById(`support-limit-${index}`).textContent = `${supportLimitBreaks[index]}凸`;
    // 凸数変更時のアビ効果量更新
    updateSupportEffectA(index);
    updateSupportEffectB(index);
    updateSupportEffectC(index);
    updateSupportEffectD(index);
    updateSupportEffectE(index);
    updateSupportEffectSP(index);
    // results にある凸数表示を更新
    const displaySpan = document.getElementById(`support-limit-display-${index + 1}`);
    if (displaySpan) {
        displaySpan.textContent = supportLimitBreaks[index];
    }
    // 凸数変更時にレスボも再計算
    updateFinalResonance();
    updateFinalStatus();
    updateFinalStatusTotal();
    updateEvaluationValue();
    updateEvaluationImage(parseInt(document.getElementById("評価値").textContent) || 0); // 画像も更新
    updateFinalSPRates();
    updateSupportLimitButtonColors();
}

// キャラ凸ボタンの色変更
function updateCharacterLimitButtonColor() {
    const firstType = document.getElementById("first-type-display").textContent.trim();
    const characterButtons = document.querySelectorAll(".character-container .limit-btn-kuro");

    characterButtons.forEach(button => {
        // 既存のカラークラスを削除
        button.classList.remove("limit-btn-vo", "limit-btn-da", "limit-btn-vi");

        // タイプに応じてクラスを追加
        if (firstType === "Vocal") {
            button.classList.add("limit-btn-vo");
        } else if (firstType === "Dance") {
            button.classList.add("limit-btn-da");
        } else if (firstType === "Visual") {
            button.classList.add("limit-btn-vi");
        } else {
            button.classList.add("limit-btn-kuro"); // デフォルトは黒
        }
    });
}

// サポカ凸ボタンと表示の色変更
function updateSupportLimitButtonColors() {
    for (let i = 0; i < 6; i++) {
        const supportCard = document.querySelector(`.support-card[data-index="${i}"]`);
        if (!supportCard) continue;

        // ここでタイプを取得
        const type = document.getElementById(`support-type-${i + 1}`)?.textContent.trim().toLowerCase();
        if (!type) continue;

        // ボタンのクラスを変更
        const buttons = supportCard.querySelectorAll("button");
        buttons.forEach(button => {
            // 既存のカラークラスを削除
            button.classList.remove("limit-btn-vo", "limit-btn-da", "limit-btn-vi", "limit-btn-kuro");

            // タイプに応じたクラスを追加
            if (type === "vocal") {
                button.classList.add("limit-btn-vo");
            } else if (type === "dance") {
                button.classList.add("limit-btn-da");
            } else if (type === "visual") {
                button.classList.add("limit-btn-vi");
            } else {
                button.classList.add("limit-btn-kuro");
            }
        });
    }
}


// サポカが変更されたときに凸ボタンの色を更新
function updateSelectedSupport(support, index) {





    updateSupportAttributes(support, index + 1);
    updateSupportEffectA(index);
    updateSupportEffectB(index);
    updateSupportEffectC(index);
    updateSupportEffectD(index);
    updateSupportEffectE(index);
    updateSupportEffectSP(index);

    // 色を更新
    setTimeout(() => {
        updateSupportLimitButtonColors();
    }, 10);
}


// 初期表示時にキャラとサポカボタンの色を設定
window.addEventListener("DOMContentLoaded", () => {
    updateCharacterLimitButtonColor();
    updateSupportLimitButtonColors();
});








// サポカ属性を更新する関数
function updateSupportAttributes(support, index) {
    document.getElementById(`support-name-${index}`).textContent = support.name || "-";
    document.getElementById(`support-type-${index}`).textContent = support.type || "-";
    document.getElementById(`support-rarity-${index}`).textContent = support.rarity || "-";
    document.getElementById(`support-a-ability-${index}`).textContent = support.Aability || "-";
    document.getElementById(`support-b-ability-${index}`).textContent = support.Bability || "-";
    document.getElementById(`support-c-ability-${index}`).textContent = support.Cability || "-";
    document.getElementById(`support-d-ability-${index}`).textContent = support.Dability || "-";
    document.getElementById(`support-sp-ability-${index}`).textContent = support.SP || "-";
}

// モーダルで選択されたサポカの属性を更新
function updateSelectedSupport(support, index) {
    updateSupportAttributes(support, index + 1);
    // サポカ選択時のAアビ効果量更新
    updateSupportEffectA(index);
    updateSupportEffectB(index);
    updateSupportEffectC(index);
    updateSupportEffectD(index);
    updateSupportEffectE(index);
    updateSupportEffectSP(index);
    // サポカ選択時にレスボも再計算
    updateFinalResonance();
    updateFinalStatus();
    updateFinalStatusTotal();
    updateEvaluationValue();
    updateEvaluationImage(parseInt(document.getElementById("評価値").textContent) || 0); // 画像も更新
    updateFinalSPRates();
    updateSupportLimitButtonColors();
}

function openModal(id, index = null) {
    const modal = document.getElementById(id);
    modal.style.display = "block";
    if (id === "support-modal" && index !== null) {
        modal.dataset.targetIndex = index;
    }
}

function closeModal(id) {
    document.getElementById(id).style.display = "none";
}


function toggle(el) {
    el.classList.toggle('checked');
    updateCounts();          // ← 1つ目のレッスン集計
    updateSalesCounts();     // ← 2つ目の営業集計
    updateActionCounts();    // ← 3つ目の行動集計
    updateSuteibeCounts();    // ← 4.5つ目のステイベ集計
    updateMemoryCounts();    // ← 6つ目

    // アビリティ効果量を更新（6枚分）
    updateAllSupportEffects();
    updateFinalResonance();
    updateFinalStatus();
    updateFinalStatusTotal();
    updateFinalFans();
    updateEvaluationValue();
    updateEvaluationImage(parseInt(document.getElementById("評価値").textContent) || 0); // 画像も更新
}

// 全サポカのアビリティ効果量を一括更新
function updateAllSupportEffects() {
    for (let i = 0; i < supportLimitBreaks.length; i++) {
        updateSupportEffectA(i);
        updateSupportEffectB(i);
        updateSupportEffectC(i);
        updateSupportEffectD(i);
        updateSupportEffectE(i);
        updateSupportEffectSP(i);
    }
}

// ← 1つ目のレッスン表
function updateCounts() {
    const weeks = [1, 4, 11, 14, 20, 23, 25];
    let vocalTimes = 0, normalVocal = 0, spVocal = 0, sourceVocal = 0;
    let danceTimes = 0, normalDance = 0, spDance = 0, sourceDance = 0;
    let visualTimes = 0, normalVisual = 0, spVisual = 0, sourceVisual = 0;

    // 最終レスボの取得
    const vocalResonance = parseFloat(document.getElementById("最終Vocalレスボ").textContent) / 100 || 0;
    const danceResonance = parseFloat(document.getElementById("最終Danceレスボ").textContent) / 100 || 0;
    const visualResonance = parseFloat(document.getElementById("最終Visualレスボ").textContent) / 100 || 0;

    const getValues = (week, sp) => {
        if ([1, 4].includes(week)) return sp ? 100 : 80;
        if ([11, 14].includes(week)) return sp ? 120 : 100;
        if ([20, 23, 25].includes(week)) return sp ? 150 : 120;
        return 0;
    };

    // 一時的な加算用配列
    let vocalValues = [];
    let danceValues = [];
    let visualValues = [];

    weeks.forEach(week => {
        const vo = document.getElementById(`week${week}-vo`).classList.contains('checked');
        const da = document.getElementById(`week${week}-da`).classList.contains('checked');
        const vi = document.getElementById(`week${week}-vi`).classList.contains('checked');
        const sp = document.getElementById(`week${week}-sp`).classList.contains('checked');

        if (vo) {
            vocalTimes++;
            sp ? spVocal++ : normalVocal++;
            const value = getValues(week, sp);
            const adjustedValue = Math.floor(value * (1 + vocalResonance)); // レスボ乗算の切りsage
            vocalValues.push(adjustedValue);
        }

        if (da) {
            danceTimes++;
            sp ? spDance++ : normalDance++;
            const value = getValues(week, sp);
            const adjustedValue = Math.floor(value * (1 + danceResonance)); // レスボ乗算の切りsage
            danceValues.push(adjustedValue);
        }

        if (vi) {
            visualTimes++;
            sp ? spVisual++ : normalVisual++;
            const value = getValues(week, sp);
            const adjustedValue = Math.floor(value * (1 + visualResonance)); // レスボ乗算の切りsage
            visualValues.push(adjustedValue);
        }
    });

    // すべてのレスボ乗算後に加算
    sourceVocal = vocalValues.reduce((acc, val) => acc + val, 0);
    sourceDance = danceValues.reduce((acc, val) => acc + val, 0);
    sourceVisual = visualValues.reduce((acc, val) => acc + val, 0);

    // 集計表示
    set('vocal-resson-times', vocalTimes);
    set('normal-vocal-resson-times', normalVocal);
    set('sp-vocal-resson-times', spVocal);
    set('resson-vocal', sourceVocal);

    set('dance-resson-times', danceTimes);
    set('normal-dance-resson-times', normalDance);
    set('sp-dance-resson-times', spDance);
    set('resson-dance', sourceDance);

    set('visual-resson-times', visualTimes);
    set('normal-visual-resson-times', normalVisual);
    set('sp-visual-resson-times', spVisual);
    set('resson-visual', sourceVisual);
}


// ← 2つ目の営業表
function updateSalesCounts() {
    const weeks = [2, 5, 7, 12, 15, 21, 24];
    let sales = 0, fans = 0;
    let finalVocal = 0, finalDance = 0, finalVisual = 0;

    const getFans = (week, big) => {
        if ([2, 5, 7].includes(week)) return big ? 4680 : 3600;
        if ([12, 15].includes(week)) return big ? 6240 : 4800;
        if ([21, 24].includes(week)) return big ? 7800 : 6000;
        return 0;
    };

    const getScore = (week) => {
        if ([2, 5, 7].includes(week)) return 80;
        if ([12, 15].includes(week)) return 110;
        if ([21, 24].includes(week)) return 130;
        return 0;
    };

    weeks.forEach(week => {
        const vo = document.getElementById(`sales-week${week}-vo`).classList.contains('checked');
        const da = document.getElementById(`sales-week${week}-da`).classList.contains('checked');
        const vi = document.getElementById(`sales-week${week}-vi`).classList.contains('checked');
        const big = document.getElementById(`sales-week${week}-big`).classList.contains('checked');

        if (vo) {
            sales++;
            finalVocal += getScore(week);
            fans += getFans(week, big);
        }

        if (da) {
            sales++;
            finalDance += getScore(week);
            fans += getFans(week, big);
        }

        if (vi) {
            sales++;
            finalVisual += getScore(week);
            fans += getFans(week, big);
        }
    });

    // 集計表示
    set('営業回数', sales);
    set('ファン数', fans);
    set('最終的なVocal', finalVocal);
    set('最終的なDance', finalDance);
    set('最終的なVisual', finalVisual);
}

// ← 3つ目の行動表
function updateActionCounts() {
    const weeks = [3, 6, 8, 10, 13, 17, 19, 22, 26];
    let goingout = 0, consultation = 0, present = 0, guidance = 0, goodnight = 0, trialCount = 0;

    weeks.forEach(week => {
        const 出 = document.getElementById(`action-week${week}-出`);
        const 相 = document.getElementById(`action-week${week}-相`);
        const 差 = document.getElementById(`action-week${week}-差`);
        const 特 = document.getElementById(`action-week${week}-特`);
        const 休 = document.getElementById(`action-week${week}-休`);

        if (week === 8 || week === 10) {
            const 試験 = document.getElementById(`action-week${week}-試験`);
            if (試験 && 試験.classList.contains('checked')) { // チェックがついている場合
                trialCount++;
            }
        }

        if (出 && 出.classList.contains('checked')) {
            goingout++;
        }

        if (相 && 相.classList.contains('checked')) {
            consultation++;
        }

        if (差 && 差.classList.contains('checked')) {
            present++;
        }

        if (特 && 特.classList.contains('checked')) {
            guidance++;
        }

        if (休 && 休.classList.contains('checked')) {
            goodnight++;
        }
    });

    // 試験回数を保存や表示に使用する場合
    set('試験回数', trialCount);
    set('お出かけ回数', goingout);
    set('相談回数', consultation);
    set('差し入れ回数', present);
    set('特別指導回数', guidance);
    set('お休み回数', goodnight);
}


// ← 4つ目のカウント表
function updateManualCounts() {
    const items = [
        "チャレンジPアイテム", "Aカード取得", "Mカード取得", "Aカード強化", "Mカード強化",
        "Pドリンク交換", "好調or好印象or温存獲得",
        "Aカード削除","Mカード削除", "カードチェンジ", "Pアイテムファン数",
        "PアイテムVocalステ", "PアイテムDanceステ", "PアイテムVisualステ",
    ];

    items.forEach(item => {
        const input = document.getElementById(item);
        const display = document.getElementById("disp-" + item);
        if (input && display) {
            display.textContent = parseInt(input.value || "0", 10);
        }
    });
    // 入力変更時にアビリティ効果量を更新
    updateAllSupportEffects();
    updateFinalStatus();
    updateFinalStatusTotal();
    updateFinalFans();
    updateEvaluationValue();
    updateEvaluationImage(parseInt(document.getElementById("評価値").textContent) || 0); // 画像も更新
}

// ← 4.5つ目のステイベ表
function updateSuteibeCounts() {
    for (let i = 1; i <= 6; i++) {
        const checkbox = document.querySelector(`.box.sp[data-index="${i}"]`);
        const effectSpan = document.getElementById(`support-e-effect-${i}`);

        if (checkbox && checkbox.classList.contains("checked")) {
            const effectValue = parseFloat(effectSpan.dataset.value) || 0;
            effectSpan.textContent = effectValue;
        } else {
            effectSpan.textContent = "0";
        }
    }
}

// ← 5つ目の試験表
function updateTestCounts() {
    const tests = ["1次試験", "2次試験", "最終試験"];
    tests.forEach(test => {
        const vo = parseInt(document.getElementById(`${test}-vo`).value || "0", 10);
        const da = parseInt(document.getElementById(`${test}-da`).value || "0", 10);
        const vi = parseInt(document.getElementById(`${test}-vi`).value || "0", 10);
        const total = vo + da + vi;

        // 表に合計値を反映
        document.getElementById(`${test}-計`).textContent = total;

        // 各試験ごとの特別計算
        if (test === "1次試験") {
            calculateFirstTest("vo", vo);
            calculateFirstTest("da", da);
            calculateFirstTest("vi", vi);
        } else if (test === "2次試験") {
            calculateSecondTest("vo", vo);
            calculateSecondTest("da", da);
            calculateSecondTest("vi", vi);
        } else if (test === "最終試験") {
            calculateFinalTest("vo", vo);
            calculateFinalTest("da", da);
            calculateFinalTest("vi", vi);
        }

        // 合計も結果欄に反映
        document.getElementById(`disp-${test}-計`).textContent = total;
        // ファン数計算
        calculateTestFans(test, total);
    });

    // 入力変更時にアビリティ効果量を更新
    updateAllSupportEffects();
    updateFinalStatus();
    updateFinalStatusTotal();
    updateFinalFans();
    updateEvaluationValue();
    updateEvaluationImage(parseInt(document.getElementById("評価値").textContent) || 0); // 画像も更新
}

// 1次試験の特別計算
function calculateFirstTest(stat, value) {
    // valueが0の場合は計算せず、0を返す
    if (value === 0) {
        document.getElementById(`disp-1次試験-${stat}`).textContent = 0;
        return;
    }

    // キャラのタイプ確認（2極の場合）
    const selectedCharacter = characters.find(char => char.name === selectedCharacterData?.name);
    const isTwoPole = selectedCharacter?.suteType === "2極";

    // 2極の場合は特別な設定に変更
    const testParameters = isTwoPole
        ? {
            first: [0.0654, 0.48, 0.00532, 77.92352, 116],
            second: [0.0654, 0.4376, 0.00532, 64.3388, 69],
            third: [0.0654, 0.4522, 0.00532, 53.03588, 46]
        }
        : {
            first: [0.0654, 0.48, 0.00532, 77.92352, 92],
            second: [0.0654, 0.4376, 0.00532, 64.3388, 76],
            third: [0.0654, 0.4522, 0.00532, 53.03588, 62]
        };

    // 試験値計算
    const calculatedValue = calculateTest(stat, value, testParameters);
    document.getElementById(`disp-1次試験-${stat}`).textContent = Math.round(calculatedValue);
}

// 2次試験の特別計算
function calculateSecondTest(stat, value) {
    // valueが0の場合は計算せず、0を返す
    if (value === 0) {
        document.getElementById(`disp-2次試験-${stat}`).textContent = 0;
        return;
    }

    // キャラのタイプ確認（2極の場合）
    const selectedCharacter = characters.find(char => char.name === selectedCharacterData?.name);
    const isTwoPole = selectedCharacter?.suteType === "2極";

    // 2極の場合は特別な設定に変更
    const testParameters = isTwoPole
        ? {
            first: [0.00875, 0.49875, 0.00079, 98.73671, 149],
            second: [0.00875, 0.49875, 0.00079, 81.69921, 89],
            third: [0.00875, 0.49875, 0.00079, 66.90977, 59]
        }
        : {
            first: [0.00875, 0.49875, 0.00079, 98.73671, 119],
            second: [0.00875, 0.49875, 0.00079, 81.69921, 98],
            third: [0.00875, 0.49875, 0.00079, 66.90977, 80]
        };

    // 試験値計算
    const calculatedValue = calculateTest(stat, value, testParameters);
    document.getElementById(`disp-2次試験-${stat}`).textContent = Math.round(calculatedValue);
}


// 最終試験の特別計算
function calculateFinalTest(stat, value) {
    // valueが0の場合は計算せず、0を返す
    if (value === 0) {
        document.getElementById(`disp-最終試験-${stat}`).textContent = 0;
        return;
    }

    // キャラのタイプ確認（2極の場合）
    const selectedCharacter = characters.find(char => char.name === selectedCharacterData?.name);
    const isTwoPole = selectedCharacter?.suteType === "2極";

    // 2極の場合は特別な設定に変更
    const testParameters = isTwoPole
        ? {
            first: [0.00407, 2.07484, 0.000367, 143.00025, 215],
            second: [0.00407, 1.5624, 0.000367, 118, 129],
            third: [0.00407, 1.551, 0.000367, 106.036538, 86]
        }
        : {
            first: [0.00407, 2.07484, 0.000367, 143.00025, 172],
            second: [0.00407, 1.5624, 0.000367, 118, 142],
            third: [0.00407, 1.551, 0.000367, 106.036538, 116]
        };

    // 試験値計算
    const calculatedValue = calculateTest(stat, value, testParameters);
    document.getElementById(`disp-最終試験-${stat}`).textContent = Math.round(calculatedValue);
}


// 汎用試験計算関数
function calculateTest(stat, value, coefficients) {
    const firstType = document.getElementById("first-type-display").textContent;
    const secondType = document.getElementById("second-type-display").textContent;
    const thirdType = document.getElementById("third-type-display").textContent;

    let calculatedValue = value; // 初期値はそのまま

    // Vocal, Dance, Visual に応じた計算
    if ((stat === "vo" && firstType === "Vocal") ||
        (stat === "da" && firstType === "Dance") ||
        (stat === "vi" && firstType === "Visual")) {
        calculatedValue = Math.min(
            value * coefficients.first[0] + coefficients.first[1],
            value * coefficients.first[2] + coefficients.first[3],
            coefficients.first[4]
        );
    } else if ((stat === "vo" && secondType === "Vocal") ||
        (stat === "da" && secondType === "Dance") ||
        (stat === "vi" && secondType === "Visual")) {
        calculatedValue = Math.min(
            value * coefficients.second[0] + coefficients.second[1],
            value * coefficients.second[2] + coefficients.second[3],
            coefficients.second[4]
        );
    } else if ((stat === "vo" && thirdType === "Vocal") ||
        (stat === "da" && thirdType === "Dance") ||
        (stat === "vi" && thirdType === "Visual")) {
        calculatedValue = Math.min(
            value * coefficients.third[0] + coefficients.third[1],
            value * coefficients.third[2] + coefficients.third[3],
            coefficients.third[4]
        );
    }

    return calculatedValue;
}

// 各試験のファン数を計算
function calculateTestFans(test, total) {
    let fans = 0;

    if (total === 0) {
        fans = 0;
    } else {
        if (test === "1次試験") {
            fans = Math.min(
                total * 1.94867 + 784.82082,
                total * 0.146 + 10437.8,
                12000
            );
        } else if (test === "2次試験") {
            fans = Math.min(
                total * 0.180393 + 3363.60071,
                total * 0.0054 + 14610.5758,
                15999
            );
        } else if (test === "最終試験") {
            fans = Math.min(
                total * 0.160061 + 3248,
                total * 0.0048 + 34178,
                38001
            );
        }
    }

    // 四捨五入して表示
    document.getElementById(`disp-${test}-ファン`).textContent = Math.round(fans);
}

// ← 6つ目のメモリ表
function updateMemoryCounts() {
    let voResTotal = 0;
    let voInitTotal = 0;
    let daResTotal = 0;
    let daInitTotal = 0;
    let viResTotal = 0;
    let viInitTotal = 0;

    // チェックされたボックスを全て取得し、合計を計算
    document.querySelectorAll(".memory-box.checked").forEach(box => {
        const value = parseFloat(box.dataset.value);
        if (box.classList.contains("vo")) {
            // Vo レスボと初期値を分ける
            if ([1.4, 2.1, 2.8, 3.5].includes(value)) {
                voResTotal += value;
            } else if ([10, 15, 20, 25].includes(value)) {
                voInitTotal += value;
            }
        } else if (box.classList.contains("da")) {
            // Da レスボと初期値を分ける
            if ([1.4, 2.1, 2.8, 3.5].includes(value)) {
                daResTotal += value;
            } else if ([10, 15, 20, 25].includes(value)) {
                daInitTotal += value;
            }
        } else if (box.classList.contains("vi")) {
            // Vi レスボと初期値を分ける
            if ([1.4, 2.1, 2.8, 3.5].includes(value)) {
                viResTotal += value;
            } else if ([10, 15, 20, 25].includes(value)) {
                viInitTotal += value;
            }
        }
    });

    // 計算結果を表示
    document.getElementById("メモリvoレスボ").textContent = voResTotal.toFixed(1);
    document.getElementById("メモリvo初期値").textContent = voInitTotal;
    document.getElementById("メモリdaレスボ").textContent = daResTotal.toFixed(1);
    document.getElementById("メモリda初期値").textContent = daInitTotal;
    document.getElementById("メモリviレスボ").textContent = viResTotal.toFixed(1);
    document.getElementById("メモリvi初期値").textContent = viInitTotal;
}





function set(id, value) {
    document.getElementById(id).textContent = value;
}

window.addEventListener('DOMContentLoaded', updateCounts);
