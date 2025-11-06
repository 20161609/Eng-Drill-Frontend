const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ||
  "https://eng-drill-web-487754022529.northamerica-northeast1.run.app";

/**
 * Generic helper to call backend API.
 */
async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, options);
  if (!res.ok) {
    let msg = "Request failed";
    try {
      const data = await res.json();
      msg = data.detail || data.message || JSON.stringify(data);
    } catch (e) {
      msg = res.statusText || msg;
    }
    throw new Error(msg);
  }
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export async function register(email, password) {
  return request("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });
}

export async function login(email, password) {
  return request("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });
}

export async function scoreSentence(token, payload) {
  return request("/qe/score", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
}

/**
 * Load KO source sentences from static txt files in /public/text/ko.
 * Each line is a sentence.
 */
export async function loadCategorySentences(filePath) {
  const res = await fetch(filePath);
  if (!res.ok) {
    throw new Error("문장 파일을 불러올 수 없어요.");
  }
  const text = await res.text();
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  if (!lines.length) {
    throw new Error("문장 파일이 비어있어요.");
  }
  return lines;
}
