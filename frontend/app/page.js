"use client";

import { useMemo, useState } from "react";
import { buildHelloMessage } from "@repo/shared";

function normalizeBaseUrl(value) {
  if (!value || typeof value !== "string") return "";
  return value.trim().replace(/\/$/, "");
}

export default function Page() {
  const [name, setName] = useState("DevOpsIntern");
  const [apiMessage, setApiMessage] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiBase = useMemo(() => {
    const base = normalizeBaseUrl(process.env.NEXT_PUBLIC_API_BASE_URL);
    return base || "";
  }, []);

  async function callHello(targetName) {
    setLoading(true);
    setApiError(null);

    try {
      const url = apiBase ? `${apiBase}/api/hello` : "/api/hello";
      const res = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: targetName })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setApiMessage(data?.message ?? JSON.stringify(data));
    } catch (err) {
      setApiError(err?.message ?? String(err));
      setApiMessage(null);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    const trimmed = typeof name === "string" ? name.trim() : "";
    callHello(trimmed.length > 0 ? trimmed : "world");
  }

  return (
    <main className="card">
      <h1>DevOpsIntern Monorepo</h1>

      <p className="muted">
        Shared package: <code>{buildHelloMessage("from shared")}</code>
      </p>

      <h2>Backend API</h2>
      <form className="row" onSubmit={onSubmit}>
        <label className="label">
          Name
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </label>
        <button className="button" type="submit" disabled={loading}>
          {loading ? "Calling..." : "Call API"}
        </button>
      </form>

      {apiError ? (
        <p className="error">
          API error: <code>{apiError}</code>
        </p>
      ) : apiMessage ? (
        <p>
          API message: <code>{apiMessage}</code>
        </p>
      ) : (
        <p className="muted">
          Click <code>Call API</code> to fetch message.
        </p>
      )}

      <div className="hint">
        <p>
          Docker Compose mode: open <code>http://localhost:8080</code> (frontend)
        </p>
        <p>
          Backend health: <code>http://localhost:3001/health</code>
        </p>
      </div>
    </main>
  );
}
