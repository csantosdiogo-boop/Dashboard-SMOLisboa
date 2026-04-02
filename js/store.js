// STORE COMUM – INDEXEDDB + CSV
// USADO POR index / criticas / relatorio

const DB_NAME = 'uoLisboaDashboard';
const STORE = 'snapshots';

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      req.result.createObjectStore(STORE, { keyPath: 'date' });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function saveSnapshot(date, data) {
  const db = await openDB();
  const tx = db.transaction(STORE, 'readwrite');
  tx.objectStore(STORE).put({ date, data });
}

async function getLatestSnapshot() {
  const db = await openDB();
  const tx = db.transaction(STORE, 'readonly');
  const store = tx.objectStore(STORE);
  return new Promise(resolve => {
    const req = store.openCursor(null, 'prev');
    req.onsuccess = () => resolve(req.result?.value || null);
  });
}

function parseCSV(text) {
  const sep = text.includes(';') ? ';' : ',';
  const lines = text.trim().split('\n');
  const headers = lines.shift().split(sep).map(h => h.trim());
  return lines.map(line => {
    const cols = line.split(sep);
    const obj = {};
    headers.forEach((h, i) => obj[h] = cols[i]?.trim());
    return obj;
  });
}
