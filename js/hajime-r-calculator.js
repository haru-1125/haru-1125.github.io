document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input, select');

    inputs.forEach(input => {
        input.addEventListener('input', updateCalculation);
        if (input.type === 'number') {
            input.addEventListener('blur', function () { validateMax(this); });
            input.addEventListener('keydown', function (e) { if (e.key === 'Enter') validateMax(this); });
        }
    });
    setCalcType('hif');
    updateCalculation();
});

let currentMode = 'normal';
let calcType = 'hif';
let scoreInputMode = 'total'; // 'total' or 'split'

function setMode(mode) {
    currentMode = mode;
    document.getElementById('modeNormal').classList.toggle('active', mode === 'normal');
    document.getElementById('modeIntensive').classList.toggle('active', mode === 'intensive');
    const sparkleGroup = document.getElementById('sparkleGroup');
    if (sparkleGroup) sparkleGroup.style.display = (mode === 'intensive') ? 'block' : 'none';
    updateCalculation();
}

function setCalcType(type) {
    calcType = type;
    document.getElementById('calcTypeHajime').classList.toggle('active', type === 'hajime');
    document.getElementById('calcTypeHIF').classList.toggle('active', type === 'hif');
    const hifInputs = document.getElementById('hifInputs');
    if (hifInputs) hifInputs.style.display = (type === 'hif') ? 'block' : 'none';
    const modeSelector = document.getElementById('modeSelectorContainer');
    if (modeSelector) modeSelector.style.display = (type === 'hif') ? 'none' : 'flex';
    const abiInputSection = document.getElementById('abiInputSection');
    if (abiInputSection) abiInputSection.style.display = (type === 'hif') ? 'none' : 'block';
    const hajimeExtraSection = document.getElementById('hajimeExtraSection');
    if (hajimeExtraSection) hajimeExtraSection.style.display = (type === 'hif') ? 'none' : 'block';
    const sparkleGroup2 = document.getElementById('sparkleGroup');
    if (sparkleGroup2) sparkleGroup2.style.display = (type === 'hif' ? 'none' : (currentMode === 'intensive' ? 'block' : 'none'));
    const maxStat = (type === 'hif') ? 3200 : 3000;
    ['preVo','preDa','preVi','abiVo','abiDa','abiVi'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.max = maxStat;
    });
    const targetRowS5 = document.getElementById('targetRowS5');
    const targetRowS4Plus = document.getElementById('targetRowS4Plus');
    if (targetRowS5) targetRowS5.style.display = (type === 'hif') ? 'flex' : 'none';
    if (targetRowS4Plus) targetRowS4Plus.style.display = (type === 'hif') ? 'flex' : 'none';
    const targetScoresTitle = document.getElementById('targetScoresTitle');
    if (targetScoresTitle) {
        targetScoresTitle.textContent = type === 'hif'
            ? '目標ランク別 必要ラウンド2スコア'
            : '目標ランク別 必要最終スコア';
    }
    const preParamsTitle = document.getElementById('preParamsTitle');
    if (preParamsTitle) {
        preParamsTitle.textContent = type === 'hif'
            ? 'ラウンド2前パラメータ'
            : '最終試験前パラメータ';
    }
    updateCalculation();
}

function toggleRound1ScoreHelp() {
    const panel = document.getElementById('round1ScoreHelp');
    const btn = document.getElementById('round1ScoreHelpBtn');
    if (!panel || !btn) return;
    const open = panel.hidden;
    panel.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
}

function updateRound1ScoreHelpVisibility(mode) {
    const btn = document.getElementById('round1ScoreHelpBtn');
    const panel = document.getElementById('round1ScoreHelp');
    const show = mode === 'split';
    if (btn) {
        btn.hidden = !show;
        btn.setAttribute('aria-expanded', 'false');
    }
    if (panel) panel.hidden = true;
}

function setScoreInputMode(mode) {
    const prevMode = scoreInputMode;
    scoreInputMode = mode;
    document.getElementById('scoreModeTotal').classList.toggle('active', mode === 'total');
    document.getElementById('scoreModeSplit').classList.toggle('active', mode === 'split');

    const leftLabel = document.getElementById('leftScoreLabel');
    const leftInput = document.getElementById('hifTotalScore');
    const r2 = parseInt(document.getElementById('hifRound2')?.value) || 0;

    if (mode === 'total') {
        if (leftLabel) leftLabel.textContent = '合計スコア';
        if (leftInput) leftInput.max = 4080000;
        // No change in value when switching modes if not explicitly set by the user
    } else {
        if (leftLabel) leftLabel.textContent = 'ラウンド1(補正後)';
        if (leftInput) leftInput.max = 1680000;
        // No change in value when switching modes if not explicitly set by the user
    }

    updateRound1ScoreHelpVisibility(mode);
    updateCalculation();
}

function setMaxLeft() {
    if (scoreInputMode === 'total') setMax('hifTotalScore', 4080000);
    else setMax('hifTotalScore', 1680000);
}

function setMax(id, value) {
    const el = document.getElementById(id);
    if (!el) return;
    const maxAttr = el.getAttribute('max');
    if (maxAttr) el.removeAttribute('max');
    el.value = String(value);
    if (maxAttr) el.setAttribute('max', maxAttr);
    el.dispatchEvent(new Event('input', { bubbles: true }));
    updateCalculation();
}

function resetPreParams() {
    document.getElementById('preVo').value = '';
    document.getElementById('preDa').value = '';
    document.getElementById('preVi').value = '';
    document.getElementById('midScore').value = '';
    document.getElementById('finalScore').value = '';
    const hifTotalScore = document.getElementById('hifTotalScore');
    const hifRound2 = document.getElementById('hifRound2');
    const hifStar = document.getElementById('hifStar');
    if (hifTotalScore) hifTotalScore.value = '';
    if (hifRound2) hifRound2.value = '';
    if (hifStar) hifStar.value = '';
    updateHifRound2StarGainDisplay(0);
    updateCalculation();
}

function toggleAbiSection() {
    const abiSection = document.getElementById('abiSection');
    const toggleButton = document.getElementById('toggleAbiBtn');
    if (!abiSection || !toggleButton) return;
    const isHidden = abiSection.style.display === 'none';
    abiSection.style.display = isHidden ? 'block' : 'none';
    toggleButton.textContent = isHidden ? '閉じる' : '表示';
}

/** HIF試験スコアのみ上限超過でも入力値を書き換えない（上限ボタンのみで設定） */
const HIF_SCORE_INPUT_IDS = new Set(['hifTotalScore', 'hifRound2']);

function validateMax(input) {
    if (!input || HIF_SCORE_INPUT_IDS.has(input.id)) return;
    const val = parseInt(input.value, 10);
    if (Number.isNaN(val)) return;
    const max = parseInt(input.getAttribute('max'), 10);
    if (max && val > max) {
        input.value = String(max);
        updateCalculation();
    }
}

function getHifRound1Eval(score) {
    const adjusted = Math.floor((score || 0) / 1.2);
    let res = 0;
    if (adjusted <= 300000) res = 0;
    else if (adjusted <= 700000) res = (adjusted - 300000) * 0.01;
    else if (adjusted <= 1000000) res = 4000 + (adjusted - 700000) * 0.003;
    else if (adjusted <= 1200000) res = 4900 + (adjusted - 1000000) * 0.002;
    else if (adjusted <= 1400000) res = 5300 + (adjusted - 1200000) * 0.001;
    else res = 5500;
    return Math.floor(res);
}

function getHifRound2Eval(score) {
    let s = score || 0;
    let res = 0;
    if (s <= 600000) res = 0;
    else if (s <= 900000) res = (s - 600000) * 0.004;
    else if (s <= 1500000) res = 1200 + (s - 900000) * 0.008;
    else if (s <= 2000000) res = 6000 + (s - 1500000) * 0.002;
    else if (s <= 2400000) res = 7000 + (s - 2000000) * 0.001;
    else res = 7400;
    return Math.floor(res);
}

/** ラウンド2獲得スコアから獲得するスター性（スプシの ROUNDUP 相当） */
function getHifStarGainFromRound2(round2Score) {
    const score = round2Score || 0;
    let value;
    if (score <= 400000) value = score * 0.0001875;
    else if (score <= 600000) value = 75 + (score - 400000) * 0.000225;
    else if (score <= 1000000) value = 120 + (score - 600000) * 0.000075;
    else value = 150;
    return Math.ceil(value);
}

function updateHifRound2StarGainDisplay(gain) {
    const el = document.getElementById('hifRound2StarGain');
    if (el) el.textContent = `スター性+${gain}`;
}

function updateHifDerivedScoreDisplay() {
    if (calcType !== 'hif') return;
    const el = document.getElementById('hifDerivedScore');
    if (!el) return;
    const hifTotalScore = parseInt(document.getElementById('hifTotalScore')?.value) || 0;
    const hifRound2 = parseInt(document.getElementById('hifRound2')?.value) || 0;
    if (scoreInputMode === 'total') {
        el.textContent = `ラウンド1(補正後)=${hifTotalScore - hifRound2}`;
    } else {
        el.textContent = `合計スコア=${hifTotalScore + hifRound2}`;
    }
}

function updateFinalRankParamBonusDisplay(rank) {
    const el = document.getElementById('finalRankParamBonus');
    if (!el) return;
    const labels = {
        1: 'パラメータ+160',
        2: 'パラメータ+60(不明な為未更新)',
        3: 'パラメータ+30(不明な為未更新)',
    };
    el.textContent = labels[rank] || 'パラメータ+0';
}

function updateCalculation() {
    const preVo = parseInt(document.getElementById('preVo').value) || 0;
    const preDa = parseInt(document.getElementById('preDa').value) || 0;
    const preVi = parseInt(document.getElementById('preVi').value) || 0;
    const abiVo = parseInt(document.getElementById('abiVo')?.value) || 0;
    const abiDa = parseInt(document.getElementById('abiDa')?.value) || 0;
    const abiVi = parseInt(document.getElementById('abiVi')?.value) || 0;
    const midScore = parseInt(document.getElementById('midScore')?.value) || 0;
    const finalScore = parseInt(document.getElementById('finalScore')?.value) || 0;
    const finalRank = parseInt(document.getElementById('finalRank')?.value) || 0;
    const sparkle = parseInt(document.getElementById('sparkle')?.value) || 0;
    const hifTotalScore = parseInt(document.getElementById('hifTotalScore')?.value) || 0;
    const hifRound2 = parseInt(document.getElementById('hifRound2')?.value) || 0;
    let hifStar = parseInt(document.getElementById('hifStar')?.value) || 0;

    if (hifStar > 1110) hifStar = 1110;

    let hifRound1 = 0;
    if (scoreInputMode === 'total') {
        hifRound1 = hifTotalScore - hifRound2;
    } else {
        hifRound1 = hifTotalScore;
    }

    updateHifDerivedScoreDisplay();
    updateFinalRankParamBonusDisplay(finalRank);

    const allZero = (preVo===0 && preDa===0 && preVi===0 && abiVo===0 && abiDa===0 && abiVi===0 && midScore===0 && finalScore===0 && sparkle===0 && hifTotalScore===0 && hifRound2===0 && hifStar===0);
    if (allZero) {
        document.getElementById('preTotal').textContent = "0";
        document.getElementById('totalEvaluation').textContent = "0";
        document.getElementById('evalRank').textContent = "F";
        updateHifRound2StarGainDisplay(0);
        updateHifDerivedScoreDisplay();
        const tIds = ['targetS5','targetS4Plus','targetS4','targetSSSPlus','targetSSS','targetSSPlus','targetSS'];
        tIds.forEach(id => { const e = document.getElementById(id); if (e) e.textContent = '-'; });
        return;
    }

    if (calcType === 'hajime') {
        let rankAdd = 0;
        if (finalRank === 1) rankAdd = 160;
        else if (finalRank === 2) rankAdd = 60;
        else if (finalRank === 3) rankAdd = 30;

        const finalStatTotal = Math.min(3000, preVo + abiVo) + Math.min(3000, preDa + abiDa) + Math.min(3000, preVi + abiVi);
        document.getElementById('preTotal').textContent = finalStatTotal.toLocaleString();

        const g4 = Math.min(3000, preVo + abiVo + rankAdd);
        const h4 = Math.min(3000, preDa + abiDa + rankAdd);
        const i4 = Math.min(3000, preVi + abiVi + rankAdd);
        const statSum = g4 + h4 + i4;
        const statEval = Math.floor(2.1 * statSum);

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

        let rankEval = 0;
        switch (finalRank) {
            case 1: rankEval = 1700; break;
            case 2: rankEval = 900; break;
            case 3: rankEval = 500; break;
            default: rankEval = 0;
        }

        const baseEvalSum = statEval + midEval + finalEval + rankEval;
        let totalEvaluation = 0;
        if (currentMode === 'normal') totalEvaluation = baseEvalSum;
        else totalEvaluation = Math.floor(baseEvalSum * 0.72 + (sparkle + 190) * 11.016);

        const currentBaseWithoutFinal = statEval + midEval + rankEval;
        const calcNeededFinalScore = (targetEval) => {
            let neededFinalEval = 0;
            if (currentMode === 'normal') neededFinalEval = targetEval - currentBaseWithoutFinal;
            else neededFinalEval = Math.ceil(((targetEval - ((sparkle + 190) * 11.016)) / 0.72) - currentBaseWithoutFinal);

            if (neededFinalEval <= 0) return "達成済み";

            let score = 0;
            if (neededFinalEval <= 4500) score = neededFinalEval / 0.015;
            else if (neededFinalEval <= 6500) score = (neededFinalEval - 4500) / 0.01 + 300000;
            else if (neededFinalEval <= 7300) score = (neededFinalEval - 6500) / 0.008 + 500000;
            else if (neededFinalEval <= 8700) score = (neededFinalEval - 7300) / 0.001 + 600000;
            else return "不可能";
            return Math.ceil(score).toLocaleString() + " pt";
        };

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

        document.getElementById('totalEvaluation').textContent = totalEvaluation.toLocaleString();
        document.getElementById('evalRank').textContent = getRank(totalEvaluation);
        document.getElementById('evalRank').style.backgroundColor = totalEvaluation >= 20000 ? '#ffbc00' : '#4364f7';
        document.getElementById('targetS5') && (document.getElementById('targetS5').textContent = '-');
        document.getElementById('targetS4Plus') && (document.getElementById('targetS4Plus').textContent = '-');
        document.getElementById('targetS4') && (document.getElementById('targetS4').textContent = calcNeededFinalScore(26000));
        document.getElementById('targetSSSPlus') && (document.getElementById('targetSSSPlus').textContent = calcNeededFinalScore(23000));
        document.getElementById('targetSSS') && (document.getElementById('targetSSS').textContent = calcNeededFinalScore(20000));
        document.getElementById('targetSSPlus') && (document.getElementById('targetSSPlus').textContent = calcNeededFinalScore(18000));
        document.getElementById('targetSS') && (document.getElementById('targetSS').textContent = calcNeededFinalScore(16000));

    } else if (calcType === 'hif') {
        const cap = (v) => Math.min(3200, v);
        const g = cap(preVo);
        const h = cap(preDa);
        const i = cap(preVi);
        const totalStats = g + h + i;
        document.getElementById('preTotal').textContent = totalStats.toLocaleString();

        const round2StarGainBase = getHifStarGainFromRound2(hifRound2);
        const round2StarGain = Math.floor(round2StarGainBase * 1.5);
        updateHifRound2StarGainDisplay(round2StarGain);
        const statStarPart = Math.floor(totalStats * 2 + (round2StarGain + hifStar) * 7.5);
        const r1Eval = getHifRound1Eval(hifRound1);
        const r2Eval = getHifRound2Eval(hifRound2);
        const totalEvaluation = statStarPart + r1Eval + r2Eval - 2000;

        document.getElementById('totalEvaluation').textContent = totalEvaluation.toLocaleString();
        const getRank = (score) => {
            if (score >= 35000) return 'S5';
            if (score >= 30000) return 'S4+';
            if (score >= 26000) return 'S4';
            if (score >= 23000) return 'SSS+';
            if (score >= 20000) return 'SSS';
            return 'F';
        };
        document.getElementById('evalRank').textContent = getRank(totalEvaluation);
        document.getElementById('evalRank').style.backgroundColor = totalEvaluation >= 20000 ? '#ffbc00' : '#4364f7';

        const calcTotalEvalAtRound2 = (round2Score) => {
            const gain = Math.floor(getHifStarGainFromRound2(round2Score) * 1.5);
            const starPart = Math.floor(totalStats * 2 + (gain + hifStar) * 7.5);
            return starPart + getHifRound1Eval(hifRound1) + getHifRound2Eval(round2Score) - 2000;
        };

        const calcNeededRound2ScoreForTarget = (targetEval) => {
            if (calcTotalEvalAtRound2(hifRound2) >= targetEval) return '達成済み';

            let lo = 0, hi = 2400000, ans = -1;
            while (lo <= hi) {
                const mid = Math.floor((lo + hi) / 2);
                if (calcTotalEvalAtRound2(mid) >= targetEval) {
                    ans = mid;
                    hi = mid - 1;
                } else {
                    lo = mid + 1;
                }
            }
            return ans === -1 ? '不可能' : Math.ceil(ans).toLocaleString() + ' pt';
        };
        document.getElementById('targetS5') && (document.getElementById('targetS5').textContent = calcNeededRound2ScoreForTarget(35000));
        document.getElementById('targetS4Plus') && (document.getElementById('targetS4Plus').textContent = calcNeededRound2ScoreForTarget(30000));
        document.getElementById('targetS4') && (document.getElementById('targetS4').textContent = calcNeededRound2ScoreForTarget(26000));
        document.getElementById('targetSSSPlus') && (document.getElementById('targetSSSPlus').textContent = calcNeededRound2ScoreForTarget(23000));
        document.getElementById('targetSSS') && (document.getElementById('targetSSS').textContent = calcNeededRound2ScoreForTarget(20000));
        document.getElementById('targetSSPlus') && (document.getElementById('targetSSPlus').textContent = calcNeededRound2ScoreForTarget(18000));
        document.getElementById('targetSS') && (document.getElementById('targetSS').textContent = calcNeededRound2ScoreForTarget(16000));
    }
}