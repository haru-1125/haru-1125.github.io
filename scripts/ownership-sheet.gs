/**
 * 所持率チェッカーの集計用。
 * 1. 空の Google スプレッドシートを作る
 * 2. 拡張機能 → Apps Script にこのファイルの中身を貼る
 * 3. デプロイ → 新しいデプロイ → 種類「ウェブアプリ」
 *    実行ユーザー: 自分 / アクセス: 全員
 * 4. 出た URL を js/ownership-share.js の OWNERSHIP_SHEET_URL に貼る
 *
 * log シート: 共有1回につき1行
 * summary シート: カードごとの所持回数（log の同じ kind の行数で割ると所持率）
 */
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const log = ss.getSheetByName("log") || ss.insertSheet("log");
    if (log.getLastRow() === 0) {
      log.appendRow(["timestamp", "kind", "owned", "total", "percent", "names"]);
    }
    const names = Array.isArray(data.names) ? data.names : [];
    log.appendRow([
      new Date(),
      data.kind || "",
      data.owned || 0,
      data.total || 0,
      data.percent || "",
      names.join("\n"),
    ]);

    const summary = ss.getSheetByName("summary") || ss.insertSheet("summary");
    if (summary.getLastRow() === 0) {
      summary.appendRow(["kind", "name", "count"]);
    }
    const values = summary.getDataRange().getValues();
    const map = {};
    for (let i = 1; i < values.length; i++) {
      map[values[i][0] + "\t" + values[i][1]] = { row: i + 1, count: Number(values[i][2]) || 0 };
    }
    names.forEach((name) => {
      const key = (data.kind || "") + "\t" + name;
      if (map[key]) {
        map[key].count += 1;
        summary.getRange(map[key].row, 3).setValue(map[key].count);
      } else {
        summary.appendRow([data.kind || "", name, 1]);
        map[key] = { row: summary.getLastRow(), count: 1 };
      }
    });
  } finally {
    lock.releaseLock();
  }
  return ContentService.createTextOutput("ok");
}
