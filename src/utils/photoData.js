import { LABORATORIES } from "../data/laboratories";

// Albums live in content/photos/<album-id>/ next to their images, so adding an
// album is a folder drop. Vite bundles every image it finds there and hands
// back its hashed URL; album.json says which ones to show and in what order.
const ALBUM_FILES = import.meta.glob("../../content/photos/*/album.json", {
    eager: true,
    import: "default",
});

const IMAGE_URLS = import.meta.glob(
    "../../content/photos/*/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}",
    { eager: true, query: "?url", import: "default" },
);

const LAB_NAMES = Object.fromEntries(
    LABORATORIES.map((lab) => [lab.key, lab.shortName]),
);

const albumIdFromPath = (filePath) => filePath.split("/").at(-2);

const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
});

export const formatAlbumDate = (date) =>
    DATE_FORMATTER.format(new Date(`${date}T00:00:00Z`));

export const getPhotoAlbums = () =>
    Object.entries(ALBUM_FILES)
        .map(([filePath, album]) => {
            const id = albumIdFromPath(filePath);
            const folder = filePath.replace(/album\.json$/, "");
            return {
                id,
                title: album.title,
                date: album.date,
                location: album.location ?? "",
                description: album.description ?? "",
                labs: (album.labs ?? []).map((key) => LAB_NAMES[key] ?? key),
                photos: (album.photos ?? [])
                    .map((photo) => ({
                        src: IMAGE_URLS[`${folder}${photo.file}`],
                        alt: photo.alt,
                        caption: photo.caption ?? "",
                    }))
                    .filter((photo) => photo.src),
            };
        })
        .filter((album) => album.photos.length > 0)
        .sort(
            (left, right) =>
                right.date.localeCompare(left.date) ||
                left.title.localeCompare(right.title),
        );
