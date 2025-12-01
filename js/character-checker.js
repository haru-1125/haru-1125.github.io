const grid = document.getElementById("characterGrid");
const cstats = document.getElementById("cstats");
const usableCharacters = characters.filter(c => !c.isDummy);

usableCharacters.forEach((char, index) => {
    const div = document.createElement("div");
    div.className = "character";
    div.dataset.index = index;
    div.innerHTML = `
    <img src="${char.darkFile}" alt="${char.name}">
    <div class="character-name">${char.name}</div>
  `;
    div.addEventListener("click", () => toggleCharacter(div, index));
    grid.appendChild(div);
});

function toggleCharacter(div, index) {
    div.classList.toggle("owned");
    const img = div.querySelector("img");
    img.src = div.classList.contains("owned") ? usableCharacters[index].file : usableCharacters[index].darkFile;
    updateStats();
}

function updateStats() {
    const cstats = document.getElementById("cstats");
    const sakiStats = document.getElementById("sakiStats");
    const temariStats = document.getElementById("temariStats");
    const kotoneStats = document.getElementById("kotoneStats");
    const tubameStats = document.getElementById("tubameStats");
    const maoStats = document.getElementById("maoStats");
    const ririyaStats = document.getElementById("ririyaStats");
    const tinaStats = document.getElementById("tinaStats");
    const sumikaStats = document.getElementById("sumikaStats");
    const hiroStats = document.getElementById("hiroStats");
    const senaStats = document.getElementById("senaStats");
    const misuzuStats = document.getElementById("misuzuStats");
    const umeStats = document.getElementById("umeStats");
    const rinamiStats = document.getElementById("rinamiStats");





    const owned = document.querySelectorAll(".character.owned").length;
    const total = usableCharacters.length;
    const percent = ((owned / total) * 100).toFixed(1);

    cstats.innerHTML = `全<span class="red">${total}</span>種中<span class="red">${owned}</span>種（ 所持率<span class="red">${percent}%</span> ）`;

    // 咲季のカードだけを対象にカウント
    let sakiTotal = 0;
    let sakiOwned = 0;

    usableCharacters.forEach((char, i) => {
        if (char.chara === "咲季") {
            sakiTotal++;
            const div = document.querySelector(`.character[data-index='${i}']`);
            if (div && div.classList.contains("owned")) {
                sakiOwned++;
            }
        }
    });

    const sakiPercent = sakiTotal > 0 ? ((sakiOwned / sakiTotal) * 100).toFixed(1) : "0.0";

    sakiStats.innerHTML = `咲季:<span class="red">${sakiTotal}</span>種中<span class="red">${sakiOwned}</span>種（ 所持率<span class="red">${sakiPercent}%</span> ）`;

    // 手毬のカードだけを対象にカウント
    let temariTotal = 0;
    let temariOwned = 0;

    usableCharacters.forEach((char, i) => {
        if (char.chara === "手毬") {
            temariTotal++;
            const div = document.querySelector(`.character[data-index='${i}']`);
            if (div && div.classList.contains("owned")) {
                temariOwned++;
            }
        }
    });

    const temariPercent = temariTotal > 0 ? ((temariOwned / temariTotal) * 100).toFixed(1) : "0.0";

    temariStats.innerHTML = `手毬:<span class="red">${temariTotal}</span>種中<span class="red">${temariOwned}</span>種（ 所持率<span class="red">${temariPercent}%</span> ）`;

    // ことねのカードだけを対象にカウント
    let kotoneTotal = 0;
    let kotoneOwned = 0;

    usableCharacters.forEach((char, i) => {
        if (char.chara === "ことね") {
            kotoneTotal++;
            const div = document.querySelector(`.character[data-index='${i}']`);
            if (div && div.classList.contains("owned")) {
                kotoneOwned++;
            }
        }
    });

    const kotonePercent = kotoneTotal > 0 ? ((kotoneOwned / kotoneTotal) * 100).toFixed(1) : "0.0";

    kotoneStats.innerHTML = `ことね:<span class="red">${kotoneTotal}</span>種中<span class="red">${kotoneOwned}</span>種（ 所持率<span class="red">${kotonePercent}%</span> ）`;

    // 燕のカードだけを対象にカウント
    let tubameTotal = 0;
    let tubameOwned = 0;

    usableCharacters.forEach((char, i) => {
        if (char.chara === "燕") {
            tubameTotal++;
            const div = document.querySelector(`.character[data-index='${i}']`);
            if (div && div.classList.contains("owned")) {
                tubameOwned++;
            }
        }
    });

    const tubamePercent = kotoneTotal > 0 ? ((tubameOwned / tubameTotal) * 100).toFixed(1) : "0.0";

    tubameStats.innerHTML = `燕:<span class="red">${tubameTotal}</span>種中<span class="red">${tubameOwned}</span>種（ 所持率<span class="red">${tubamePercent}%</span> ）`;

    // 麻央のカードだけを対象にカウント
    let maoTotal = 0;
    let maoOwned = 0;

    usableCharacters.forEach((char, i) => {
        if (char.chara === "麻央") {
            maoTotal++;
            const div = document.querySelector(`.character[data-index='${i}']`);
            if (div && div.classList.contains("owned")) {
                maoOwned++;
            }
        }
    });

    const maoPercent = maoTotal > 0 ? ((maoOwned / maoTotal) * 100).toFixed(1) : "0.0";

    maoStats.innerHTML = `麻央:<span class="red">${maoTotal}</span>種中<span class="red">${maoOwned}</span>種（ 所持率<span class="red">${maoPercent}%</span> ）`;

    // リーリヤのカードだけを対象にカウント
    let ririyaTotal = 0;
    let ririyaOwned = 0;

    usableCharacters.forEach((char, i) => {
        if (char.chara === "リーリヤ") {
            ririyaTotal++;
            const div = document.querySelector(`.character[data-index='${i}']`);
            if (div && div.classList.contains("owned")) {
                ririyaOwned++;
            }
        }
    });

    const ririyaPercent = ririyaTotal > 0 ? ((ririyaOwned / ririyaTotal) * 100).toFixed(1) : "0.0";

    ririyaStats.innerHTML = `リーリヤ:<span class="red">${ririyaTotal}</span>種中<span class="red">${ririyaOwned}</span>種（ 所持率<span class="red">${ririyaPercent}%</span> ）`;

    // 千奈のカードだけを対象にカウント
    let tinaTotal = 0;
    let tinaOwned = 0;

    usableCharacters.forEach((char, i) => {
        if (char.chara === "千奈") {
            tinaTotal++;
            const div = document.querySelector(`.character[data-index='${i}']`);
            if (div && div.classList.contains("owned")) {
                tinaOwned++;
            }
        }
    });

    const tinaPercent = tinaTotal > 0 ? ((tinaOwned / tinaTotal) * 100).toFixed(1) : "0.0";

    tinaStats.innerHTML = `千奈:<span class="red">${tinaTotal}</span>種中<span class="red">${tinaOwned}</span>種（ 所持率<span class="red">${tinaPercent}%</span> ）`;

    // 清夏のカードだけを対象にカウント
    let sumikaTotal = 0;
    let sumikaOwned = 0;

    usableCharacters.forEach((char, i) => {
        if (char.chara === "清夏") {
            sumikaTotal++;
            const div = document.querySelector(`.character[data-index='${i}']`);
            if (div && div.classList.contains("owned")) {
                sumikaOwned++;
            }
        }
    });

    const sumikaPercent = sumikaTotal > 0 ? ((sumikaOwned / sumikaTotal) * 100).toFixed(1) : "0.0";

    sumikaStats.innerHTML = `清夏:<span class="red">${sumikaTotal}</span>種中<span class="red">${sumikaOwned}</span>種（ 所持率<span class="red">${sumikaPercent}%</span> ）`;

    // 広のカードだけを対象にカウント
    let hiroTotal = 0;
    let hiroOwned = 0;

    usableCharacters.forEach((char, i) => {
        if (char.chara === "広") {
            hiroTotal++;
            const div = document.querySelector(`.character[data-index='${i}']`);
            if (div && div.classList.contains("owned")) {
                hiroOwned++;
            }
        }
    });

    const hiroPercent = hiroTotal > 0 ? ((hiroOwned / hiroTotal) * 100).toFixed(1) : "0.0";

    hiroStats.innerHTML = `広:<span class="red">${hiroTotal}</span>種中<span class="red">${hiroOwned}</span>種（ 所持率<span class="red">${hiroPercent}%</span> ）`;

    // 星南のカードだけを対象にカウント
    let senaTotal = 0;
    let senaOwned = 0;

    usableCharacters.forEach((char, i) => {
        if (char.chara === "星南") {
            senaTotal++;
            const div = document.querySelector(`.character[data-index='${i}']`);
            if (div && div.classList.contains("owned")) {
                senaOwned++;
            }
        }
    });

    const senaPercent = senaTotal > 0 ? ((senaOwned / senaTotal) * 100).toFixed(1) : "0.0";

    senaStats.innerHTML = `星南:<span class="red">${senaTotal}</span>種中<span class="red">${senaOwned}</span>種（ 所持率<span class="red">${senaPercent}%</span> ）`;

    // 美鈴のカードだけを対象にカウント
    let misuzuTotal = 0;
    let misuzuOwned = 0;

    usableCharacters.forEach((char, i) => {
        if (char.chara === "美鈴") {
            misuzuTotal++;
            const div = document.querySelector(`.character[data-index='${i}']`);
            if (div && div.classList.contains("owned")) {
                misuzuOwned++;
            }
        }
    });

    const misuzuPercent = misuzuTotal > 0 ? ((misuzuOwned / misuzuTotal) * 100).toFixed(1) : "0.0";

    misuzuStats.innerHTML = `美鈴:<span class="red">${misuzuTotal}</span>種中<span class="red">${misuzuOwned}</span>種（ 所持率<span class="red">${misuzuPercent}%</span> ）`;


    // 佑芽のカードだけを対象にカウント
    let umeTotal = 0;
    let umeOwned = 0;

    usableCharacters.forEach((char, i) => {
        if (char.chara === "佑芽") {
            umeTotal++;
            const div = document.querySelector(`.character[data-index='${i}']`);
            if (div && div.classList.contains("owned")) {
                umeOwned++;
            }
        }
    });

    const umePercent = umeTotal > 0 ? ((umeOwned / umeTotal) * 100).toFixed(1) : "0.0";

    umeStats.innerHTML = `佑芽:<span class="red">${umeTotal}</span>種中<span class="red">${umeOwned}</span>種（ 所持率<span class="red">${umePercent}%</span> ）`;

    // 莉波のカードだけを対象にカウント
    let rinamiTotal = 0;
    let rinamiOwned = 0;

    usableCharacters.forEach((char, i) => {
        if (char.chara === "莉波") {
            rinamiTotal++;
            const div = document.querySelector(`.character[data-index='${i}']`);
            if (div && div.classList.contains("owned")) {
                rinamiOwned++;
            }
        }
    });

    const rinamiPercent = rinamiTotal > 0 ? ((rinamiOwned / rinamiTotal) * 100).toFixed(1) : "0.0";

    rinamiStats.innerHTML = `莉波:<span class="red">${rinamiTotal}</span>種中<span class="red">${rinamiOwned}</span>種（ 所持率<span class="red">${rinamiPercent}%</span> ）`;

}


function selectAll(flag) {
    document.querySelectorAll(".character").forEach((div, index) => {
        const isOwned = div.classList.contains("owned");
        if (flag && !isOwned) {
            div.classList.add("owned");
            div.querySelector("img").src = usableCharacters[index].file;
        } else if (!flag && isOwned) {
            div.classList.remove("owned");
            div.querySelector("img").src = usableCharacters[index].darkFile;
        }
    });
    updateStats();
}





function shareOnTwitter() {
    const owned = document.querySelectorAll(".character.owned").length;
    const total = usableCharacters.length;
    const percent = ((owned / total) * 100).toFixed(1);
    const text = `学マスSSRキャラ所持率チェッカー\n全${total}種中${owned}種（ 所持率${percent}% ）\n`;
    const url = location.href;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(tweetUrl, "_blank");
}

updateStats();