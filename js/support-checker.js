const sgrid = document.getElementById("supportGrid");
const sstats = document.getElementById("sstats");
const usableSupports = supports.filter(c =>
    !c.isDummy && (c.rarity === "SSR" || c.rarity === "配布SSR")
);

usableSupports.forEach((char, index) => {
    const div = document.createElement("div");
    div.className = "support";
    div.dataset.index = index;
    div.innerHTML = `
    <img src="${char.darkFile}" alt="${char.name}">
    <div class="support-name">${char.name}</div>
  `;
    div.addEventListener("click", () => togglesupport(div, index));
    sgrid.appendChild(div);
});

function togglesupport(div, index) {
    div.classList.toggle("owned");
    const img = div.querySelector("img");
    img.src = div.classList.contains("owned") ? usableSupports[index].file : usableSupports[index].darkFile;
    updateStats();
}

function updateStats() {
    const sstats = document.getElementById("sstats");
    const vocalStats = document.getElementById("vocalStats");
    const danceStats = document.getElementById("danceStats");
    const visualStats = document.getElementById("visualStats");



    const owned = document.querySelectorAll(".support.owned").length;
    const total = usableSupports.length;
    const percent = ((owned / total) * 100).toFixed(1);

    sstats.innerHTML = `全<span class="red">${total}</span>種中<span class="red">${owned}</span>種（ 所持率<span class="red">${percent}%</span> ）`;

    // vocalのカードだけを対象にカウント
    let vocalTotal = 0;
    let vocalOwned = 0;

    usableSupports.forEach((char, i) => {
        if (char.type === "vocal") {
            vocalTotal++;
            const div = document.querySelector(`.support[data-index='${i}']`);
            if (div && div.classList.contains("owned")) {
                vocalOwned++;
            }
        }
    });

    const vocalPercent = vocalTotal > 0 ? ((vocalOwned / vocalTotal) * 100).toFixed(1) : "0.0";

    vocalStats.innerHTML = `vocal:<span class="red">${vocalTotal}</span>種中<span class="red">${vocalOwned}</span>種（ 所持率<span class="red">${vocalPercent}%</span> ）`;

    // danceのカードだけを対象にカウント
    let danceTotal = 0;
    let danceOwned = 0;

    usableSupports.forEach((char, i) => {
        if (char.type === "dance") {
            danceTotal++;
            const div = document.querySelector(`.support[data-index='${i}']`);
            if (div && div.classList.contains("owned")) {
                danceOwned++;
            }
        }
    });

    const dancePercent = danceTotal > 0 ? ((danceOwned / danceTotal) * 100).toFixed(1) : "0.0";

    danceStats.innerHTML = `dance:<span class="red">${danceTotal}</span>種中<span class="red">${danceOwned}</span>種（ 所持率<span class="red">${dancePercent}%</span> ）`;

    // visualのカードだけを対象にカウント
    let visualTotal = 0;
    let visualOwned = 0;

    usableSupports.forEach((char, i) => {
        if (char.type === "visual") {
            visualTotal++;
            const div = document.querySelector(`.support[data-index='${i}']`);
            if (div && div.classList.contains("owned")) {
                visualOwned++;
            }
        }
    });

    const visualPercent = visualTotal > 0 ? ((visualOwned / visualTotal) * 100).toFixed(1) : "0.0";

    visualStats.innerHTML = `visual:<span class="red">${visualTotal}</span>種中<span class="red">${visualOwned}</span>種（ 所持率<span class="red">${visualPercent}%</span> ）`;

}




function selectAll(flag) {
    document.querySelectorAll(".support").forEach((div, index) => {
        const isOwned = div.classList.contains("owned");
        if (flag && !isOwned) {
            div.classList.add("owned");
            div.querySelector("img").src = usableSupports[index].file;
        } else if (!flag && isOwned) {
            div.classList.remove("owned");
            div.querySelector("img").src = usableSupports[index].darkFile;
        }
    });
    updateStats();
}





function shareOnTwitter() {
    const owned = document.querySelectorAll(".support.owned").length;
    const total = usableSupports.length;
    const percent = ((owned / total) * 100).toFixed(1);
    const text = `学マスSSRサポカ所持率チェッカー\n全${total}種中${owned}種（ 所持率${percent}% ）\n`;
    const url = location.href;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(tweetUrl, "_blank");
}

updateStats();