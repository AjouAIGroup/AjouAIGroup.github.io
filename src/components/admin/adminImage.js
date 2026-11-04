import {
    MAX_IMAGE_BYTES,
    MAX_IMAGE_EDGE,
    MAX_THUMB_EDGE,
} from "../../utils/siteContentRules";

const loadImage = (file) =>
    new Promise((resolve, reject) => {
        const url = URL.createObjectURL(file);
        const image = new Image();
        image.onload = () => resolve({ image, url });
        image.onerror = () => {
            URL.revokeObjectURL(url);
            reject(
                new Error(
                    `${file.name}: 이 브라우저에서 열 수 없는 사진입니다. JPEG나 PNG로 바꿔 올려주세요.`,
                ),
            );
        };
        image.src = url;
    });

const toBlob = (canvas, type, quality) =>
    new Promise((resolve) => canvas.toBlob(resolve, type, quality));

// Draws the image at most `maxEdge` px on its long side and encodes it as
// WebP, or JPEG where the browser cannot encode WebP.
const encode = async (image, maxEdge, quality) => {
    const scale = Math.min(
        1,
        maxEdge / Math.max(image.naturalWidth, image.naturalHeight),
    );
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(image.naturalWidth * scale);
    canvas.height = Math.round(image.naturalHeight * scale);
    canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);

    const blob = await toBlob(canvas, "image/webp", quality);
    return blob && blob.type === "image/webp"
        ? blob
        : toBlob(canvas, "image/jpeg", quality);
};

// Phone photos run 5-15 MB, so every upload is redrawn at most
// MAX_IMAGE_EDGE px on its long side and re-encoded before it leaves the
// browser. This also drops EXIF data such as GPS location. Browsers that
// cannot encode WebP fall back to JPEG. A small copy for album grids is made
// from the same image; its preview URL is the caller's to revoke.
export const prepareImageUpload = async (file) => {
    const { image, url } = await loadImage(file);
    try {
        const blob = await encode(image, MAX_IMAGE_EDGE, 0.85);
        if (!blob) throw new Error(`${file.name}: 사진을 변환하지 못했습니다.`);
        if (blob.size > MAX_IMAGE_BYTES) {
            throw new Error(`${file.name}: 줄인 뒤에도 3MB보다 큽니다.`);
        }
        const thumbBlob = await encode(image, MAX_THUMB_EDGE, 0.8);
        return {
            blob,
            thumbBlob: thumbBlob?.type === blob.type ? thumbBlob : null,
            previewUrl: URL.createObjectURL(thumbBlob ?? blob),
            name: file.name,
        };
    } finally {
        URL.revokeObjectURL(url);
    }
};
