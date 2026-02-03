document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input, select');

    inputs.forEach(input => {
        // 数値が入力されるたびに計算を実行
        input.addEventListener('input', updateCalculation);

        // --- 追加：最大値を超えた場合に自動修正する処理 ---
        if (input.type === 'number') {
            input.addEventListener('blur', function () { // 入力欄からフォーカスが外れた時
                validateMax(this);
            });
            input.addEventListener('keydown', function (e) { // Enterキーを押した時
                if (e.key === 'Enter') validateMax(this);
            });
        }
    });

    updateCalculation();
});

let currentMode = 'normal';

// ページ読み込み時の設定
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input, select');

    inputs.forEach(input => {
        // 数値や選択が変わるたびに再計算
        input.addEventListener('input', updateCalculation);

        // 数値入力欄の上限チェック設定
        if (input.type === 'number') {
            input.addEventListener('blur', function () {
                validateMax(this);
            });
            input.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') validateMax(this);
            });
        }
    });

    // 初回計算
    updateCalculation();
});

// モード切替関数
function setMode(mode) {
    currentMode = mode;
    // ボタンのスタイル切り替え
    document.getElementById('modeNormal').classList.toggle('active', mode === 'normal');
    document.getElementById('modeIntensive').classList.toggle('active', mode === 'intensive');

    // 「ほしのきらめき」入力欄の表示/非表示
    const sparkleGroup = document.getElementById('sparkleGroup');
    if (sparkleGroup) {
        sparkleGroup.style.display = (mode === 'intensive') ? 'block' : 'none';
    }

    updateCalculation();
}

// 最大値をチェックして修正する関数
function validateMax(input) {
    const val = parseInt(input.value);
    const max = parseInt(input.getAttribute('max'));

    if (max && val > max) {
        input.value = max;
        updateCalculation();
    }
}

// メイン計算関数
function updateCalculation() {
    // --- 入力値の取得 ---
    const preVo = parseInt(document.getElementById('preVo').value) || 0;
    const preDa = parseInt(document.getElementById('preDa').value) || 0;
    const preVi = parseInt(document.getElementById('preVi').value) || 0;
    const abiVo = parseInt(document.getElementById('abiVo').value) || 0;
    const abiDa = parseInt(document.getElementById('abiDa').value) || 0;
    const abiVi = parseInt(document.getElementById('abiVi').value) || 0;
    const midScore = parseInt(document.getElementById('midScore').value) || 0;
    const finalScore = parseInt(document.getElementById('finalScore').value) || 0;
    const finalRank = parseInt(document.getElementById('finalRank').value) || 0;
    const sparkle = parseInt(document.getElementById('sparkle')?.value) || 0;

    // --- 追加：合計値の計算と表示 ---
    const preTotal = preVo + preDa + preVi;
    document.getElementById('preTotal').textContent = preTotal.toLocaleString();

    // --- すべての項目が0なら表示を0にして終了 ---
    if (preVo === 0 && preDa === 0 && preVi === 0 &&
        abiVo === 0 && abiDa === 0 && abiVi === 0 &&
        midScore === 0 && finalScore === 0 && sparkle === 0) {

        document.getElementById('totalEvaluation').textContent = "0";
        document.getElementById('evalRank').textContent = "F";
        document.getElementById('targetSSS').textContent = "-";
        document.getElementById('targetSSSPlus').textContent = "-";
        document.getElementById('targetS4').textContent = "-";
        return;
    }

    // --- 1. パラメータ計算 ---
    // 順位による加算値（ステータス加算）
    let rankAdd = 0;
    if (finalRank === 1) rankAdd = 120;
    else if (finalRank === 2) rankAdd = 60;
    else if (finalRank === 3) rankAdd = 30;

    const g4 = Math.min(2800, preVo + abiVo + rankAdd);
    const h4 = Math.min(2800, preDa + abiDa + rankAdd);
    const i4 = Math.min(2800, preVi + abiVi + rankAdd);
    const statSum = g4 + h4 + i4;

    // --- 2. 各種評価値の計算 ---

    // ステータス評価値
    const statEval = Math.floor(2.1 * statSum);

    // 中間試験評価値
    let midEval = 0;
    if (midScore < 10000) midEval = 0.11 * midScore;
    else if (midScore < 20000) midEval = 1100 + 0.08 * (midScore - 10000);
    else if (midScore < 30000) midEval = 1900 + 0.05 * (midScore - 20000);
    else if (midScore < 40000) midEval = 2400 + 0.008 * (midScore - 30000);
    else if (midScore < 50000) midEval = 2480 + 0.003 * (midScore - 40000);
    else if (midScore < 60000) midEval = 2510 + 0.002 * (midScore - 50000);
    else if (midScore <= 200000) midEval = 2530 + 0.001 * (midScore - 60000);
    else midEval = 2670;
    midEval = Math.floor(midEval);

    // 最終試験評価値の計算ロジック
    const getFinalEvalBase = (score) => {
        let res = 0;
        if (score < 300000) res = 0.015 * score;
        else if (score < 500000) res = 4500 + 0.01 * (score - 300000);
        else if (score < 600000) res = 6500 + 0.008 * (score - 500000);
        else if (score <= 2000000) res = 7300 + 0.001 * (score - 600000);
        else res = 8700;
        return Math.floor(res);
    };

    const finalEval = getFinalEvalBase(finalScore);

    // 最終順位評価点
    let rankEval = 0;
    switch (finalRank) {
        case 1: rankEval = 1700; break;
        case 2: rankEval = 900; break;
        case 3: rankEval = 500; break;
        default: rankEval = 0;
    }

    // モード別 最終評価値の合計計算
    let totalEvaluation = 0;
    const baseEvalSum = statEval + midEval + finalEval + rankEval;

    if (currentMode === 'normal') {
        totalEvaluation = baseEvalSum;
    } else {
        // 強化月間: floor(通常評価 × 0.72 + きらめき × 11.016)
        totalEvaluation = Math.floor(baseEvalSum * 0.72 + (sparkle + 190) * 11.016);
    }

    // --- 3. 逆算（目標スコア）計算 ---
    const currentBaseWithoutFinal = statEval + midEval + rankEval;

    const calcNeededFinalScore = (targetEval) => {
        let neededFinalEval = 0;
        if (currentMode === 'normal') {
            neededFinalEval = targetEval - currentBaseWithoutFinal;
        } else {
            // targetEval <= (基礎評価合計 + 最終試験評価) * 0.72 + きらめき * 11.016
            neededFinalEval = Math.ceil(((targetEval - ((sparkle + 190) * 11.016)) / 0.72) - currentBaseWithoutFinal);
        }

        if (neededFinalEval <= 0) return "達成済み";

        let score = 0;
        if (neededFinalEval <= 4500) score = neededFinalEval / 0.015;
        else if (neededFinalEval <= 6500) score = (neededFinalEval - 4500) / 0.01 + 300000;
        else if (neededFinalEval <= 7300) score = (neededFinalEval - 6500) / 0.008 + 500000;
        else if (neededFinalEval <= 8700) score = (neededFinalEval - 7300) / 0.001 + 600000;
        else return "不可能";

        return Math.ceil(score).toLocaleString() + " pt";
    };

    // --- 4. ランク判定 ---
    const getRank = (score) => {
        if (score >= 26000) return "S4";
        if (score >= 23000) return "SSS+";
        if (score >= 20000) return "SSS";
        if (score >= 18000) return "SS+";
        if (score >= 16000) return "SS";
        if (score >= 14500) return "S+";
        if (score >= 13000) return "S";
        if (score >= 11500) return "A+";
        if (score >= 10000) return "A";
        if (score >= 8000) return "B+";
        if (score >= 6000) return "B";
        if (score >= 4500) return "C+";
        if (score >= 3000) return "C";
        return "F";
    };

    // --- 5. 表示への反映 ---
    const totalEvalElement = document.getElementById('totalEvaluation');
    const rankElement = document.getElementById('evalRank');

    totalEvalElement.textContent = totalEvaluation.toLocaleString();
    rankElement.textContent = getRank(totalEvaluation);

    // ランクに応じた色の変更
    if (totalEvaluation >= 20000) {
        rankElement.style.backgroundColor = "#ffbc00"; // 金色
    } else {
        rankElement.style.backgroundColor = "#4364f7"; // 青色
    }

    // 各目標ランクへの必要スコア
    document.getElementById('targetSSS').textContent = calcNeededFinalScore(20000);
    document.getElementById('targetSSSPlus').textContent = calcNeededFinalScore(23000);
    document.getElementById('targetS4').textContent = calcNeededFinalScore(26000);
}