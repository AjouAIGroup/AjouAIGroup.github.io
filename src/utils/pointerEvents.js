// A plain left-click is the only case where the app may hijack a link and
// scroll instead of navigating. Modified clicks and middle clicks must keep
// the browser's own behaviour so "open in new tab" still works.
export const isPrimaryPlainClick = (event) =>
    (event.button === undefined || event.button === 0) &&
    !event.metaKey &&
    !event.altKey &&
    !event.ctrlKey &&
    !event.shiftKey;
