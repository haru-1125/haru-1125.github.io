document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('input', updateCalculation);
    });
    updateCalculation();
});

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
    const finalRank = parseInt(document.getElementById('finalRank').value);

    // --- 1. パラメータ計算 (G4, H4, I4) ---
    // 順位による加算値
    let rankAdd = 0;
    if (finalRank === 1) rankAdd = 120;
    else if (finalRank === 2) rankAdd = 100;
    else if (finalRank === 3) rankAdd = 80;
    else rankAdd = 0;

    const g4 = Math.min(2800, preVo + abiVo + rankAdd);
    const h4 = Math.min(2800, preDa + abiDa + rankAdd);
    const i4 = Math.min(2800, preVi + abiVi + rankAdd);
    const statSum = g4 + h4 + i4;

    // --- 2. 各種評価値の計算 ---

    // ステータス評価値: ROUNDDOWN(2.1 * 合計)
    const statEval = Math.floor(2.1 * statSum);

    // 中間試験評価値 (B11)
    let midEval = 0;
    if (midScore < 10000) midEval = 0.11 * midScore;
    else if (midScore < 20000) midEval = 1100 + 0.08 * (midScore - 10000);
    else if (midScore < 30000) midEval = 1900 + 0.05 * (midScore - 20000);
    else if (midScore < 40000) midEval = 2400 + 0.008 * (midScore - 30000);
    else if (midScore < 50000) midEval = 2480 + 0.003 * (midScore - 40000);
    else if (midScore < 60000) midEval = 2510 + 0.002 * (midScore - 50000);
    else if (midScore <= 200000) midEval = 2530 + 0.001 * (midScore - 60000);
    else midEval = 2530 + 0.001 * (200000 - 60000);
    midEval = Math.floor(midEval);

    // 最終試験評価値 (C11)
    let finalEval = 0;
    if (finalScore < 300000) finalEval = 0.015 * finalScore;
    else if (finalScore < 500000) finalEval = 4500 + 0.01 * (finalScore - 300000);
    else if (finalScore < 600000) finalEval = 6500 + 0.008 * (finalScore - 500000);
    else if (finalScore <= 2000000) finalEval = 7300 + 0.001 * (finalScore - 600000);
    else finalEval = 7300 + 0.001 * (2000000 - 600000);
    finalEval = Math.floor(finalEval);

    // 順位評価値 (D11)
    let rankEval = 0;
    switch (finalRank) {
        case 1: rankEval = 1700; break;
        case 2: rankEval = 900; break;
        case 3: rankEval = 500; break;
        default: rankEval = 0;
    }

    // 合計評価値
    const totalEvaluation = statEval + midEval + finalEval + rankEval;

    // --- 3. 目標スコア計算 (targetS4など) ---
    // H16: 最終試験スコアを除いた評価値合計
    const h16 = statEval + midEval + rankEval;

    const calcNeededFinalScore = (basePoints) => {
        const target = basePoints - h16;
        if (target <= 0) return "達成済み";
        
        let score = 0;
        if (target <= 4500) {
            score = target / 0.015;
        } else if (target <= 6500) {
            score = (target - 4500) / 0.01 + 300000;
        } else if (target <= 7300) {
            score = (target - 6500) / 0.008 + 500000;
        } else if (target <= 8700) {
            score = (target - 7300) / 0.001 + 600000;
        } else {
            return "不可能";
        }
        return Math.ceil(score).toLocaleString() + " pt";
    };

    // --- ランク判定関数の追加 ---
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
        if (score >= 8000)  return "B+";
        if (score >= 6000)  return "B";
        if (score >= 4500)  return "C+";
        if (score >= 3000)  return "C";
        return "F";
    };

    // --- 結果の表示反映 ---
    document.getElementById('totalEvaluation').textContent = totalEvaluation.toLocaleString();
    
    // 評価値とランクの更新
    document.getElementById('totalEvaluation').textContent = totalEvaluation.toLocaleString();
    const rankElement = document.getElementById('evalRank');
    rankElement.textContent = getRank(totalEvaluation);
    
    // ランクに応じた色の変更（任意）
    if (totalEvaluation >= 20000) {
        rankElement.style.backgroundColor = "#ffbc00"; // 金色系
    } else {
        rankElement.style.backgroundColor = "#4364f7"; // 青色系
    }

    // スプシの計算式に基づき、SSS=20000, SSS+=23000, S4=26000 で計算
    document.getElementById('targetSSS').textContent = calcNeededFinalScore(20000);
    document.getElementById('targetSSSPlus').textContent = calcNeededFinalScore(23000);
    document.getElementById('targetS4').textContent = calcNeededFinalScore(26000);
}