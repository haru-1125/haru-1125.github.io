const sgrid = document.getElementById("supportGrid");
const usableSupports = supports.filter(c =>
    !c.isDummy && (c.rarity === "SSR" || c.rarity === "配布SSR")
);

const supportTypes = [
    { name: "Vocal", type: "vocal" },
    { name: "Dance", type: "dance" },
    { name: "Visual", type: "visual" },
    { name: "Assist", type: "assist" },
];

const ownershipBoard = document.createElement("section");
ownershipBoard.className = "ownership-board";
document.querySelector("h1").insertAdjacentElement("afterend", ownershipBoard);

const ownershipTotal = document.createElement("div");
ownershipTotal.className = "ownership-total";
ownershipBoard.appendChild(ownershipTotal);

const ownershipGrid = document.createElement("div");
ownershipGrid.className = "ownership-grid ownership-grid-types";
ownershipBoard.appendChild(ownershipGrid);

const supportCards = supportTypes.map(item => {
    const card = document.createElement("article");
    card.className = `ownership-card ownership-card-${item.type}`;
    card.innerHTML = `
        <img src="../assets/sozai/${item.type}.png" alt="${item.name}">
        <div class="ownership-name">${item.name}</div>
        <div class="ownership-count"></div>
        <div class="ownership-bar"><span></span></div>
        <div class="ownership-rate"></div>
    `;
    ownershipGrid.appendChild(card);
    return card;
});

supportTypes.forEach(item => {
    const section = document.createElement("section");
    section.className = `picker-group picker-group-${item.type}`;
    const header = document.createElement("div");
    header.className = "picker-group-header";
    header.innerHTML = `
        <img src="../assets/sozai/${item.type}.png" alt="">
        <div class="picker-group-title">${item.name}</div>
        <div class="picker-group-count"></div>
    `;
    const cards = document.createElement("div");
    cards.className = "picker-cards picker-cards-wide";
    usableSupports.forEach((card, index) => {
        if (card.type !== item.type) return;
        const div = document.createElement("div");
        div.className = "support";
        div.dataset.index = index;
        div.innerHTML = `
            <img src="${card.darkFile}" alt="${card.name}">
            <div class="support-name">${card.name}</div>
        `;
        div.addEventListener("click", () => togglesupport(div, index));
        cards.appendChild(div);
    });
    section.appendChild(header);
    section.appendChild(cards);
    sgrid.appendChild(section);
    item.countEl = header.querySelector(".picker-group-count");
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

function paintOwnershipCard(card, owned, total) {
    const percent = total > 0 ? ((owned / total) * 100).toFixed(1) : "0.0";
    card.querySelector(".ownership-count").textContent = `${owned} / ${total}`;
    card.querySelector(".ownership-rate").textContent = `${percent}%`;
    card.querySelector(".ownership-bar > span").style.width = `${percent}%`;
}

function updateStats() {
    const owned = document.querySelectorAll(".support.owned").length;
    const total = usableSupports.length;
    const percent = total > 0 ? ((owned / total) * 100).toFixed(1) : "0.0";

    ownershipTotal.innerHTML = `<span class="ownership-total-label">全体</span><span class="ownership-total-count">全<span class="red">${total}</span>種中<span class="red">${owned}</span>種</span><span class="ownership-total-rate">${percent}%</span>`;

    supportTypes.forEach((item, index) => {
        const stats = countTypeStats(item.type);
        paintOwnershipCard(supportCards[index], stats.owned, stats.total);
        if (item.countEl) item.countEl.textContent = `${stats.owned} / ${stats.total}`;
    });
}




function selectAll(flag) {
    document.querySelectorAll(".support").forEach(div => {
        const index = Number(div.dataset.index);
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