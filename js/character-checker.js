const grid = document.getElementById("characterGrid");
const usableCharacters = characters.filter(c => !c.isDummy);

const characterGroups = [];
usableCharacters.forEach((char, index) => {
    if (!char.chara) return;
    let group = characterGroups.find(item => item.name === char.chara);
    if (!group) {
        group = {
            name: char.chara,
            icon: `../assets/sozai/${char.chara}アイコン.png`,
            indexes: [],
        };
        characterGroups.push(group);
    }
    group.indexes.push(index);
});

const ownershipBoard = document.createElement("section");
ownershipBoard.className = "ownership-board";
document.querySelector("h1").insertAdjacentElement("afterend", ownershipBoard);

const ownershipTotal = document.createElement("div");
ownershipTotal.className = "ownership-total";
ownershipBoard.appendChild(ownershipTotal);

const ownershipGrid = document.createElement("div");
ownershipGrid.className = "ownership-grid";
ownershipBoard.appendChild(ownershipGrid);

const characterCards = characterGroups.map(group => {
    const card = document.createElement("article");
    card.className = "ownership-card";
    card.innerHTML = `
        <img src="${group.icon}" alt="${group.name}">
        <div class="ownership-name">${group.name}</div>
        <div class="ownership-count"></div>
        <div class="ownership-bar"><span></span></div>
        <div class="ownership-rate"></div>
    `;
    ownershipGrid.appendChild(card);
    return card;
});

characterGroups.forEach(group => {
    const section = document.createElement("section");
    section.className = "picker-group";
    const header = document.createElement("div");
    header.className = "picker-group-header";
    header.innerHTML = `
        <img src="${group.icon}" alt="">
        <div class="picker-group-title">${group.name}</div>
        <div class="picker-group-count"></div>
    `;
    const cards = document.createElement("div");
    cards.className = "picker-cards";
    group.indexes.forEach(index => {
        const char = usableCharacters[index];
        const div = document.createElement("div");
        div.className = "character";
        div.dataset.index = index;
        div.innerHTML = `
            <img src="${char.darkFile}" alt="${char.name}">
            <div class="character-name">${char.name}</div>
        `;
        div.addEventListener("click", () => toggleCharacter(div, index));
        cards.appendChild(div);
    });
    section.appendChild(header);
    section.appendChild(cards);
    grid.appendChild(section);
    group.countEl = header.querySelector(".picker-group-count");
});

function toggleCharacter(div, index) {
    div.classList.toggle("owned");
    const img = div.querySelector("img");
    img.src = div.classList.contains("owned") ? usableCharacters[index].file : usableCharacters[index].darkFile;
    updateStats();
}

function countOwned(indexes) {
    let owned = 0;
    indexes.forEach(index => {
        const div = document.querySelector(`.character[data-index='${index}']`);
        if (div && div.classList.contains("owned")) owned++;
    });
    return owned;
}

function paintOwnershipCard(card, owned, total) {
    const percent = total > 0 ? ((owned / total) * 100).toFixed(1) : "0.0";
    card.querySelector(".ownership-count").textContent = `${owned} / ${total}`;
    card.querySelector(".ownership-rate").textContent = `${percent}%`;
    card.querySelector(".ownership-bar > span").style.width = `${percent}%`;
}

function updateStats() {
    const owned = document.querySelectorAll(".character.owned").length;
    const total = usableCharacters.length;
    const percent = total > 0 ? ((owned / total) * 100).toFixed(1) : "0.0";

    ownershipTotal.innerHTML = `<span class="ownership-total-label">全体</span><span class="ownership-total-count">全<span class="red">${total}</span>種中<span class="red">${owned}</span>種</span><span class="ownership-total-rate">${percent}%</span>`;

    characterGroups.forEach((group, index) => {
        const ownedCount = countOwned(group.indexes);
        paintOwnershipCard(characterCards[index], ownedCount, group.indexes.length);
        if (group.countEl) group.countEl.textContent = `${ownedCount} / ${group.indexes.length}`;
    });
}

function selectAll(flag) {
    document.querySelectorAll(".character").forEach(div => {
        const index = Number(div.dataset.index);
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
