import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { requestJson } from "./adminApi";

// How often the editor re-checks while an edit is on its way to the site.
const POLL_MS = 20 * 1000;
// A dispatched workflow run takes a few seconds to appear on GitHub, so an
// item just saved counts as on its way for this long even before it shows.
const QUEUE_GRACE_MS = 60 * 1000;

const EMPTY_STATUS = { pending: [], failed: {} };

// Tracks which items of one kind ("news" or "albums") have an edit on its way
// to the site and which edits failed to get there. `listStatus` is the status
// that came with the last list load; `onLanded` reloads the list when an
// edit has finished so the buttons come back without a page reload.
export const useEditStatus = ({
    apiUrl,
    credential,
    kind,
    listStatus,
    onLanded,
}) => {
    const [serverStatus, setServerStatus] = useState(EMPTY_STATUS);
    const [queued, setQueued] = useState({});
    const [now, setNow] = useState(() => Date.now());

    useEffect(() => {
        if (listStatus) setServerStatus(listStatus);
    }, [listStatus]);

    const pending = useMemo(() => {
        const ids = new Set(serverStatus.pending);
        Object.entries(queued).forEach(([id, queuedAt]) => {
            if (now - queuedAt < QUEUE_GRACE_MS) ids.add(id);
        });
        return ids;
    }, [serverStatus, queued, now]);

    useEffect(() => {
        if (!pending.size) return undefined;
        const timer = setTimeout(async () => {
            try {
                const status = await requestJson(
                    `${apiUrl}/v1/site/status`,
                    credential,
                );
                setServerStatus(status[kind] ?? EMPTY_STATUS);
            } catch {
                // The next tick tries again; a lapsed session shows up on
                // the next save or list load.
            }
            setNow(Date.now());
        }, POLL_MS);
        return () => clearTimeout(timer);
    }, [apiUrl, credential, kind, pending]);

    const previous = useRef(pending);
    useEffect(() => {
        const landed = [...previous.current].some((id) => !pending.has(id));
        previous.current = pending;
        if (landed) onLanded();
    }, [pending, onLanded]);

    const markQueued = useCallback((id) => {
        const queuedAt = Date.now();
        setQueued((current) => ({ ...current, [id]: queuedAt }));
        setNow(queuedAt);
    }, []);

    return {
        pending,
        failed: serverStatus.failed ?? {},
        markQueued,
    };
};
