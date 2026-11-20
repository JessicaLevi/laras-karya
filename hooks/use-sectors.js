"use client";

import { useEffect, useState } from "react";
import { loadSectors } from "@/app/assessment/sector-actions";

let cache = null;
let pending = null;

export function useSectors() {
  const [sectors, setSectors] = useState(cache);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (cache) return undefined;
    let alive = true;
    pending ??= loadSectors().finally(() => {
      pending = null;
    });
    pending
      .then((rows) => {
        if (!alive) return;
        if (rows.length > 0) {
          cache = rows;
          setSectors(rows);
        } else setFailed(true);
      })
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, []);

  return { sectors, failed };
}