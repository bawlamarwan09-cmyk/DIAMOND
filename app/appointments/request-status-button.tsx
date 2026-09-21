"use client";

import { useState } from "react";

export default function RequestStatusButton({ id, status }: { id: string; status: string }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const contacted = status === "contacted";

  async function updateStatus() {
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/appointments", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status: contacted ? "new" : "contacted" }) });
      if (!response.ok) throw new Error("Could not update this request. Try again.");
      window.location.reload();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not update this request.");
    } finally { setPending(false); }
  }

  return <div className="appointments-card-action"><button type="button" onClick={updateStatus} disabled={pending}>{pending ? "SAVING…" : contacted ? "MARK AS NEW" : "MARK CONTACTED"}</button>{error && <p role="alert">{error}</p>}</div>;
}
