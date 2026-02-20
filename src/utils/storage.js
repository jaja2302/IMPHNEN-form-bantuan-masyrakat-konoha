const STORAGE_KEY = 'portal_bantuan_eksistensi';
const BLOCK_DURATION_MS = 3 * 24 * 60 * 60 * 1000; // 3 hari
const BANDING_PENALTY_MS = 7 * 24 * 60 * 60 * 1000; // 7 hari

export function getStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function setStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...getStorage(), ...data }));
  } catch (e) {
    console.warn('localStorage set failed', e);
  }
}

export function getFailCount() {
  return getStorage().failCount ?? 0;
}

export function setFailCount(count) {
  setStorage({ failCount: count });
}

export function incrementFailCount() {
  const next = getFailCount() + 1;
  setFailCount(next);
  return next;
}

export function getBlockUntil() {
  const t = getStorage().blockUntil;
  return t ? new Date(t) : null;
}

export function setBlockUntil(timestamp) {
  setStorage({ blockUntil: timestamp.getTime() });
}

export function isBlocked() {
  const until = getBlockUntil();
  if (!until) return false;
  if (new Date() < until) return true;
  setStorage({ blockUntil: null, failCount: 0, refreshPenalty: 0 });
  return false;
}

export function blockUser() {
  const until = new Date(Date.now() + BLOCK_DURATION_MS + (getRefreshPenaltyHours() * 60 * 60 * 1000));
  setBlockUntil(until);
  setFailCount(0);
}

export function getRefreshPenaltyHours() {
  return getStorage().refreshPenalty ?? 0;
}

export function addRefreshPenalty() {
  const next = getRefreshPenaltyHours() + 1;
  setStorage({ refreshPenalty: next });
  return next;
}

export function extendBlockByOneHour() {
  const until = getBlockUntil();
  if (!until) return;
  const extended = new Date(until.getTime() + 60 * 60 * 1000);
  setBlockUntil(extended);
  addRefreshPenalty();
}

export function applyBandingPenalty() {
  const until = new Date(Date.now() + BANDING_PENALTY_MS);
  setBlockUntil(until);
}

export function getLeaderboard() {
  return getStorage().leaderboard ?? { topTimes: [], hallOfShame: [], firstClear: null };
}

export function saveToLeaderboard(entry) {
  const lb = getLeaderboard();
  const topTimes = [...(lb.topTimes || [])];
  topTimes.push(entry);
  topTimes.sort((a, b) => a.timeMs - b.timeMs);
  const newTop = topTimes.slice(0, 10);
  const firstClear = lb.firstClear ?? entry;
  setStorage({
    leaderboard: {
      ...lb,
      topTimes: newTop,
      firstClear,
    },
    lastEntry: entry,
  });
}

export function getLastEntry() {
  return getStorage().lastEntry ?? null;
}

export function addRageQuit() {
  const lb = getLeaderboard();
  const count = (lb.rageQuitCount ?? 0) + 1;
  setStorage({
    leaderboard: { ...lb, rageQuitCount: count, hallOfShame: lb.hallOfShame || [] },
  });
}
