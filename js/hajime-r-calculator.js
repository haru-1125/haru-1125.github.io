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
let scoreInputMode = 'r2after'; // 'r1before', 'r2before', or 'r2after'
let targetScoreView = 'r1'; // 'r1' or 'r2'
let round1ScoreType = 'corrected'; // 'corrected' or 'uncorrected'

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

function toRound1Corrected(score) {
    const s = score || 0;
    if (round1ScoreType === 'corrected') return s;
    return Math.floor(s * 1.2);
}

function toRound1Uncorrected(score) {
    const s = score || 0;
    if (round1ScoreType === 'uncorrected') return s;
    return Math.floor(s / 1.2);
}

function getHifLeftScoreMax() {
    if (scoreInputMode === 'r2after') return 4080000;
    return round1ScoreType === 'corrected' ? 1680000 : 1400000;
}

function capHifLeftScoreToMax() {
    const input = document.getElementById('hifTotalScore');
    if (!input) return;
    const max = getHifLeftScoreMax();
    input.max = max;
    const val = parseInt(input.value, 10);
    if (!Number.isNaN(val) && val > max) {
        input.value = String(max);
    }
}

function setRound1ScoreType(type) {
    if (type === round1ScoreType) return;
    round1ScoreType = type;
    updateRound1ScoreTypeUI();
    capHifLeftScoreToMax();
    updateCalculation();
}

function updateRound1ScoreTypeUI() {
    const row = document.getElementById('round1CorrectionRow');
    const show = scoreInputMode === 'r1before' || scoreInputMode === 'r2before';
    if (row) {
        row.hidden = !show;
        row.style.display = show ? 'grid' : 'none';
    }
    document.getElementById('round1TypeCorrected')?.classList.toggle('active', round1ScoreType === 'corrected');
    document.getElementById('round1TypeUncorrected')?.classList.toggle('active', round1ScoreType === 'uncorrected');

    const leftLabel = document.getElementById('leftScoreLabel');
    const leftInput = document.getElementById('hifTotalScore');
    if (show) {
        if (leftLabel) {
            leftLabel.textContent = round1ScoreType === 'corrected' ? 'R1(補正後)' : 'R1(補正前)';
        }
        if (leftInput) {
            leftInput.max = getHifLeftScoreMax();
        }
    } else if (scoreInputMode === 'r2after' && leftLabel) {
        leftLabel.textContent = '合計スコア';
    }
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
    const show = mode === 'r1before' || mode === 'r2before';
    if (btn) {
        btn.classList.toggle('is-hidden', !show);
        btn.setAttribute('aria-expanded', 'false');
    }
    if (panel) panel.hidden = true;
}

function setScoreInputMode(mode) {
    scoreInputMode = mode;
    document.getElementById('scoreModeR1').classList.toggle('active', mode === 'r1before');
    document.getElementById('scoreModeR2Pre').classList.toggle('active', mode === 'r2before');
    document.getElementById('scoreModeR2Post').classList.toggle('active', mode === 'r2after');

    const starLabel = document.getElementById('hifStarLabel');
    const leftInput = document.getElementById('hifTotalScore');

    const hifStarInput = document.getElementById('hifStar');
    if (mode === 'r2after') {
        if (leftInput) leftInput.max = 4080000;
        if (starLabel) starLabel.textContent = 'ラウンド2前 スター性';
        if (hifStarInput) hifStarInput.max = 1110;
    } else if (mode === 'r2before') {
        if (leftInput) leftInput.max = round1ScoreType === 'corrected' ? 1680000 : 1400000;
        if (starLabel) starLabel.textContent = 'ラウンド2前 スター性';
        if (hifStarInput) hifStarInput.max = 1110;
    } else {
        if (leftInput) leftInput.max = round1ScoreType === 'corrected' ? 1680000 : 1400000;
        if (starLabel) starLabel.textContent = 'ラウンド1前 スター性';
        if (hifStarInput) hifStarInput.max = 930;
        if (hifStarInput && parseInt(hifStarInput.value, 10) > 930) {
            hifStarInput.value = '930';
        }
        targetScoreView = 'r1';
        document.getElementById('showR1ScoreBtn')?.classList.add('active');
        document.getElementById('showR2ScoreBtn')?.classList.remove('active');
    }

    updateRound1ScoreTypeUI();
    updateRound1ScoreHelpVisibility(mode);
    updateTargetScoreSwitcherVisibility();
    capHifLeftScoreToMax();
    updateCalculation();
}

function setMaxLeft() {
    setMax('hifTotalScore', getHifLeftScoreMax());
}

function setMaxHifStar() {
    if (scoreInputMode === 'r1before') setMax('hifStar', 930);
    else setMax('hifStar', 1110);
}

function setTargetScoreView(view) {
    targetScoreView = view;
    document.getElementById('showR1ScoreBtn')?.classList.toggle('active', view === 'r1');
    document.getElementById('showR2ScoreBtn')?.classList.toggle('active', view === 'r2');
    updateCalculation();
}

function updateTargetScoreSwitcherVisibility() {
    const switcher = document.getElementById('roundScoreSwitch');
    const title = document.getElementById('targetScoresTitle');
    const rows = {
        s5: document.getElementById('targetRowS5'),
        s4plus: document.getElementById('targetRowS4Plus'),
        s4: document.getElementById('targetRowS4'),
        sssplus: document.getElementById('targetRowSSSPlus'),
        sss: document.getElementById('targetRowSSS'),
        ssplus: document.getElementById('targetRowSSPlus'),
        ss: document.getElementById('targetRowSS'),
    };
    if (!switcher || !title) return;

    if (calcType === 'hif' && scoreInputMode === 'r1before') {
        switcher.hidden = false;
        switcher.style.display = 'inline-flex';
        title.textContent = targetScoreView === 'r1'
            ? (round1ScoreType === 'corrected'
                ? '目標ランク別 必要 R1スコア(補正後)'
                : '目標ランク別 必要 R1スコア(補正前)')
            : '目標ランク別 必要 R2スコア';
        if (targetScoreView === 'r1') {
            if (rows.s5) rows.s5.style.display = 'none';
            if (rows.s4plus) rows.s4plus.style.display = 'none';
            if (rows.s4) rows.s4.style.display = 'none';
            if (rows.sssplus) rows.sssplus.style.display = 'flex';
            if (rows.sss) rows.sss.style.display = 'flex';
            if (rows.ssplus) rows.ssplus.style.display = 'flex';
            if (rows.ss) rows.ss.style.display = 'flex';
        } else {
            if (rows.s5) rows.s5.style.display = 'flex';
            if (rows.s4plus) rows.s4plus.style.display = 'flex';
            if (rows.s4) rows.s4.style.display = 'flex';
            if (rows.sssplus) rows.sssplus.style.display = 'flex';
            if (rows.sss) rows.sss.style.display = 'flex';
            if (rows.ssplus) rows.ssplus.style.display = 'flex';
            if (rows.ss) rows.ss.style.display = 'flex';
        }
    } else {
        switcher.hidden = true;
        switcher.style.display = 'none';
        title.textContent = '目標ランク別 必要ラウンド2スコア';
        if (rows.s5) rows.s5.style.display = 'flex';
        if (rows.s4plus) rows.s4plus.style.display = 'flex';
        if (rows.s4) rows.s4.style.display = 'flex';
        if (rows.sssplus) rows.sssplus.style.display = 'flex';
        if (rows.sss) rows.sss.style.display = 'flex';
        if (rows.ssplus) rows.ssplus.style.display = 'flex';
        if (rows.ss) rows.ss.style.display = 'flex';
    }
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

function getHifRound1EvalFromAdjusted(adjusted) {
    const score = adjusted || 0;
    let res = 0;
    if (score <= 300000) res = 0;
    else if (score <= 700000) res = (score - 300000) * 0.01;
    else if (score <= 1000000) res = 4000 + (score - 700000) * 0.003;
    else if (score <= 1200000) res = 4900 + (score - 1000000) * 0.002;
    else if (score <= 1400000) res = 5300 + (score - 1200000) * 0.001;
    else res = 5500;
    return Math.floor(res);
}

function getHifRound1EvalFromInput(inputScore) {
    return getHifRound1EvalFromAdjusted(toRound1Uncorrected(inputScore));
}

function getHifRound1Eval(score) {
    return getHifRound1EvalFromAdjusted(Math.floor((score || 0) / 1.2));
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

function getHifStarGainFromRound1(round1Score) {
    const score = round1Score || 0;
    let value;
    if (score <= 240000) value = score * 0.00025;
    else if (score <= 360000) value = 60 + (score - 240000) * 0.0003;
    else if (score <= 600000) value = 96 + (score - 360000) * 0.0001;
    else value = 120;
    return Math.ceil(value);
}

function updateHifRound1StarGainDisplay(gain) {
    const el = document.getElementById('hifRound1StarGain');
    if (!el) return;
    if (scoreInputMode === 'r1before') {
        el.style.display = 'block';
        el.textContent = `R1 スター性+${gain}`;
    } else {
        el.style.display = 'none';
        el.textContent = '';
    }
}

function updateHifRound2StarGainDisplay(gain) {
    const el = document.getElementById('hifRound2StarGain');
    if (el) el.textContent = `R2 スター性+${gain}`;
}

function updateHifDerivedScoreDisplay() {
    if (calcType !== 'hif') return;
    const el = document.getElementById('hifDerivedScore');
    if (!el) return;
    const hifTotalScore = parseInt(document.getElementById('hifTotalScore')?.value) || 0;
    const hifRound2 = parseInt(document.getElementById('hifRound2')?.value) || 0;
    if (scoreInputMode === 'r2after') {
        el.textContent = `R1(補正後)=${hifTotalScore - hifRound2}`;
    } else {
        const r1Corrected = toRound1Corrected(hifTotalScore);
        el.textContent = `合計スコア=${r1Corrected + hifRound2}`;
    }
}

function rankToImageFile(rank) {
    const fileMap = {
        'S5': 's5.png',
        'S4+': 's4+.png',
        'S4': 's4.png',
        'SSS+': 'sss+.png',
        'SSS': 'sss.png',
        'SS+': 'ss+.png',
        'SS': 'ss.png',
        'S+': 's+.png',
        'S': 's.png',
        'A+': 'a+.png',
        'A': 'a.png',
        'B+': 'b+.png',
        'B': 'b.png',
        'C+': 'c+.png',
        'C': 'c.png',
        'F': 'f.png',
    };
    return fileMap[rank] || 'f.png';
}

function updateEvalRankDisplay(rank) {
    const el = document.getElementById('evalRank');
    if (!el) return;
    el.src = `../assets/sozai/${rankToImageFile(rank)}`;
    el.alt = rank;
}

function updateFinalRankParamBonusDisplay(rank) {
    const el = document.getElementById('finalRankParamBonus');
    if (!el) return;
    const labels = {
        1: 'パラメータ+160',
        2: 'パラメータ+80',
        3: 'パラメータ+40',
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
    if (scoreInputMode === 'r2after') {
        hifRound1 = hifTotalScore - hifRound2;
    } else {
        hifRound1 = hifTotalScore;
    }

    updateHifDerivedScoreDisplay();
    updateFinalRankParamBonusDisplay(finalRank);
    updateTargetScoreSwitcherVisibility();

    const allZero = (preVo===0 && preDa===0 && preVi===0 && abiVo===0 && abiDa===0 && abiVi===0 && midScore===0 && finalScore===0 && sparkle===0 && hifTotalScore===0 && hifRound2===0 && hifStar===0);
    if (allZero) {
        document.getElementById('preTotal').textContent = "0";
        document.getElementById('totalEvaluation').textContent = "0";
        updateEvalRankDisplay('F');
        updateHifRound1StarGainDisplay(0);
        updateHifRound2StarGainDisplay(0);
        updateHifDerivedScoreDisplay();
        const tIds = ['targetS5','targetS4Plus','targetS4','targetSSSPlus','targetSSS','targetSSPlus','targetSS'];
        tIds.forEach(id => { const e = document.getElementById(id); if (e) e.textContent = '-'; });
        return;
    }

    if (calcType === 'hajime') {
        let rankAdd = 0;
        if (finalRank === 1) rankAdd = 160;
        else if (finalRank === 2) rankAdd = 80;
        else if (finalRank === 3) rankAdd = 40;

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
        updateEvalRankDisplay(getRank(totalEvaluation));
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

        const round1GainBase = (scoreInputMode === 'r1before')
            ? getHifStarGainFromRound1(toRound1Corrected(hifRound1))
            : 0;
        const round2GainBase = getHifStarGainFromRound2(hifRound2);
        const round1StarGain = Math.floor(round1GainBase * 1.5);
        const round2StarGain = Math.floor(round2GainBase * 1.5);
        updateHifRound1StarGainDisplay(round1StarGain);
        updateHifRound2StarGainDisplay(round2StarGain);
        const statStarPart = Math.floor(totalStats * 2 + (hifStar + round1StarGain + round2StarGain) * 7.5);
        const r1Eval = (scoreInputMode === 'r2after')
            ? getHifRound1Eval(hifRound1)
            : getHifRound1EvalFromInput(hifRound1);
        const r2Eval = getHifRound2Eval(hifRound2);
        const totalEvaluation = statStarPart + r1Eval + r2Eval - 2000;

        document.getElementById('totalEvaluation').textContent = totalEvaluation.toLocaleString();
        const getRank = (score) => {
            if (score >= 35000) return 'S5';
            if (score >= 30000) return 'S4+';
            if (score >= 26000) return 'S4';
            if (score >= 23000) return 'SSS+';
            if (score >= 20000) return 'SSS';
            if (score >= 18000) return 'SS+';
            if (score >= 16000) return 'SS';
            if (score >= 14500) return 'S+';
            if (score >= 13000) return 'S';
            if (score >= 11500) return 'A+';
            if (score >= 10000) return 'A';
            if (score >= 8000) return 'B+';
            if (score >= 6000) return 'B';
            if (score >= 4500) return 'C+';
            if (score >= 3000) return 'C';
            return 'F';
        };
        updateEvalRankDisplay(getRank(totalEvaluation));

        updateTargetScoreSwitcherVisibility();

        const calcTotalEvalWithScores = (round1Score, round2Score) => {
            const round1GainBase = (scoreInputMode === 'r1before')
                ? getHifStarGainFromRound1(toRound1Corrected(round1Score))
                : 0;
            const round1StarGain = Math.floor(round1GainBase * 1.5);
            const round2Gain = Math.floor(getHifStarGainFromRound2(round2Score) * 1.5);
            const starPart = Math.floor(totalStats * 2 + (hifStar + round1StarGain + round2Gain) * 7.5);
            const r1EvalPart = (scoreInputMode === 'r2after')
                ? getHifRound1Eval(round1Score)
                : getHifRound1EvalFromInput(round1Score);
            return starPart + r1EvalPart + getHifRound2Eval(round2Score) - 2000;
        };

        const calcNeededR1ScoreForTarget = (targetEval) => {
            let lo = 0, hi = round1ScoreType === 'corrected' ? 1680000 : 1400000, ans = -1;
            while (lo <= hi) {
                const mid = Math.floor((lo + hi) / 2);
                if (calcTotalEvalWithScores(mid, hifRound2) >= targetEval) {
                    ans = mid;
                    hi = mid - 1;
                } else {
                    lo = mid + 1;
                }
            }
            return ans === -1 ? '不可能' : Math.ceil(ans).toLocaleString() + ' pt';
        };

        const calcNeededR2ScoreForTarget = (targetEval) => {
            const evalAtR2 = (r2) => {
                const r1 = scoreInputMode === 'r2after' ? hifTotalScore - r2 : hifRound1;
                return calcTotalEvalWithScores(r1, r2);
            };
            let lo = 0, hi = 2400000, ans = -1;
            while (lo <= hi) {
                const mid = Math.floor((lo + hi) / 2);
                if (evalAtR2(mid) >= targetEval) {
                    ans = mid;
                    hi = mid - 1;
                } else {
                    lo = mid + 1;
                }
            }
            return ans === -1 ? '不可能' : Math.ceil(ans).toLocaleString() + ' pt';
        };

        const getTargetNeededScore = (targetEval) => {
            if (scoreInputMode === 'r1before') {
                return targetScoreView === 'r1'
                    ? calcNeededR1ScoreForTarget(targetEval)
                    : calcNeededR2ScoreForTarget(targetEval);
            }
            return calcNeededR2ScoreForTarget(targetEval);
        };

        document.getElementById('targetS5') && (document.getElementById('targetS5').textContent = getTargetNeededScore(35000));
        document.getElementById('targetS4Plus') && (document.getElementById('targetS4Plus').textContent = getTargetNeededScore(30000));
        document.getElementById('targetS4') && (document.getElementById('targetS4').textContent = getTargetNeededScore(26000));
        document.getElementById('targetSSSPlus') && (document.getElementById('targetSSSPlus').textContent = getTargetNeededScore(23000));
        document.getElementById('targetSSS') && (document.getElementById('targetSSS').textContent = getTargetNeededScore(20000));
        document.getElementById('targetSSPlus') && (document.getElementById('targetSSPlus').textContent = getTargetNeededScore(18000));
        document.getElementById('targetSS') && (document.getElementById('targetSS').textContent = getTargetNeededScore(16000));
    }
}