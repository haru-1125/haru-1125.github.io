/**
 * cache-version.txt の値を読み取り、全 HTML の CSS/JS 参照に ?v= を付与します。
 * デプロイ前: cache-version.txt の数字を増やしてから node scripts/update-cache-version.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const versionPath = path.join(root, 'cache-version.txt');
const version = fs.readFileSync(versionPath, 'utf8').trim();

if (!version) {
    console.error('cache-version.txt が空です');
    process.exit(1);
}

const htmlFiles = [
    'index.html',
    'pages/hajime-r-calculator.html',
    'pages/character-checker.html',
    'pages/support-checker.html',
    'pages/nia-simulator.html',
];

const patterns = [
    /(href|src)="(?!https?:)([^"]+\.(css|js))(\?v=[^"]*)?"/g,
    /(src)="(?!https?:)(\.\.\/assets\/[^"?#]+)(\?v=[^"]*)?"/g,
];

htmlFiles.forEach((relPath) => {
    const filePath = path.join(root, relPath);
    let content = fs.readFileSync(filePath, 'utf8');
    patterns.forEach((pattern) => {
        content = content.replace(pattern, `$1="$2?v=${version}"`);
    });
    fs.writeFileSync(filePath, content);
    console.log(`${relPath} -> v=${version}`);
});

console.log('完了');
