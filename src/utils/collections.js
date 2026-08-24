export function shuffleItems(items) {
    const shuffled = [...items];

    for (let index = shuffled.length - 1; index > 0; index -= 1) {
        const nextIndex = Math.floor(Math.random() * (index + 1));
        [shuffled[index], shuffled[nextIndex]] = [
            shuffled[nextIndex],
            shuffled[index],
        ];
    }

    return shuffled;
}
