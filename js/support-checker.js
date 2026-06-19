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

function countTypeStats(type) {
    let total = 0;
    let owned = 0;

    usableSupports.forEach((char, i) => {
        if (char.type === type) {
            total++;
            const div = document.querySelector(`.support[data-index='${i}']`);
            if (div && div.classList.contains("owned")) {
                owned++;
            }
        }
    });

    const percent = total > 0 ? ((owned / total) * 100).toFixed(1) : "0.0";
    return { total, owned, percent };
}

function renderTypeStats(elementId, label, type) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const { total, owned, percent } = countTypeStats(type);
    el.innerHTML = `${label}:<span class="red">${total}</span>種中<span class="red">${owned}</span>種（ 所持率<span class="red">${percent}%</span> ）`;
}

function updateStats() {
    const sstats = document.getElementById("sstats");

    const owned = document.querySelectorAll(".support.owned").length;
    const total = usableSupports.length;
    const percent = ((owned / total) * 100).toFixed(1);

    sstats.innerHTML = `全<span class="red">${total}</span>種中<span class="red">${owned}</span>種（ 所持率<span class="red">${percent}%</span> ）`;

    renderTypeStats("vocalStats", "vocal", "vocal");
    renderTypeStats("danceStats", "dance", "dance");
    renderTypeStats("visualStats", "visual", "visual");
    renderTypeStats("assistStats", "assist", "assist");
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