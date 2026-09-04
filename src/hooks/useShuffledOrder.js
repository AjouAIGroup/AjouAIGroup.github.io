import { useEffect, useLayoutEffect, useState } from "react";
import { shuffleItems } from "../utils/collections";

// Every route is prerendered once at build time, so a shuffle performed during
// render bakes one random order into the static HTML while the client picks a
// different one on hydration. React would then report a mismatch and repaint
// the list. Render the source order first so hydration matches the HTML, then
// reorder in a layout effect, which runs before the browser paints.
const useIsomorphicLayoutEffect =
    typeof window === "undefined" ? useEffect : useLayoutEffect;

function useShuffledOrder(items) {
    const [orderedItems, setOrderedItems] = useState(items);

    useIsomorphicLayoutEffect(() => {
        setOrderedItems(shuffleItems(items));
    }, [items]);

    return orderedItems;
}

export default useShuffledOrder;
