// scripts/ownership-sheet.gs をスプレッドシートに置いてウェブアプリとして公開したあと、そのURLを入れる。
const OWNERSHIP_SHEET_URL = "https://script.google.com/macros/s/AKfycbzuMBCrSYbREbDcCPPJuNaw3dRVJyvvFyHVt0W24GE4r04WOGRIN_nj0El3FraQQsSw/exec";

const OwnershipShare = (() => {
    function encode(flags) {
        const bytes = [];
        for (let i = 0; i < flags.length; i += 8) {
            let byte = 0;
            for (let bit = 0; bit < 8; bit++) {
                if (flags[i + bit]) byte |= 1 << bit;
            }
            bytes.push(byte);
        }
        const bin = String.fromCharCode.apply(null, bytes);
        return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
    }

    function decode(token, length) {
        const flags = new Array(length).fill(false);
        if (!token) return flags;
        try {
            const padded = token.replace(/-/g, "+").replace(/_/g, "/");
            const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
            const bin = atob(padded + pad);
            for (let i = 0; i < length; i++) {
                const byte = bin.charCodeAt(i >> 3) || 0;
                flags[i] = !!(byte & (1 << (i & 7)));
            }
        } catch (e) {
            return new Array(length).fill(false);
        }
        return flags;
    }

    function fingerprint(names) {
        let hash = 2166136261;
        const text = names.join("\n");
        for (let i = 0; i < text.length; i++) {
            hash ^= text.charCodeAt(i);
            hash = Math.imul(hash, 16777619);
        }
        return (hash >>> 0).toString(36);
    }

    function readToken() {
        const match = location.hash.match(/(?:^#|&)s=([A-Za-z0-9_-]+)\.([A-Za-z0-9_-]+)/);
        if (!match) return null;
        return { fingerprint: match[1], bits: match[2] };
    }

    function absoluteUrl(flags, names) {
        const token = flags.some(Boolean) ? `${fingerprint(names)}.${encode(flags)}` : "";
        const url = new URL(location.href);
        url.hash = token ? `s=${token}` : "";
        if (url.href !== location.href) history.replaceState(null, "", url);
        return url.href;
    }

    function apply(names, onOwned) {
        const token = readToken();
        if (!token || token.fingerprint !== fingerprint(names)) return;
        decode(token.bits, names.length).forEach((owned, index) => {
            if (owned) onOwned(index);
        });
    }

    function report(payload) {
        if (!OWNERSHIP_SHEET_URL) return;
        const body = JSON.stringify(payload);
        try {
            if (navigator.sendBeacon) {
                const blob = new Blob([body], { type: "text/plain;charset=utf-8" });
                if (navigator.sendBeacon(OWNERSHIP_SHEET_URL, blob)) return;
            }
        } catch (e) {
            /* fetch に任せる */
        }
        fetch(OWNERSHIP_SHEET_URL, {
            method: "POST",
            mode: "no-cors",
            keepalive: true,
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body,
        }).catch(() => {});
    }

    function copy(url) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(url);
        }
        return new Promise((resolve, reject) => {
            const area = document.createElement("textarea");
            area.value = url;
            area.setAttribute("readonly", "");
            area.style.position = "fixed";
            area.style.left = "-9999px";
            document.body.appendChild(area);
            area.select();
            const ok = document.execCommand("copy");
            area.remove();
            if (ok) resolve();
            else reject(new Error("copy failed"));
        });
    }

    return { absoluteUrl, apply, report, copy };
})();
