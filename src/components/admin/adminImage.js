import { MAX_IMAGE_BYTES, MAX_IMAGE_EDGE } from "../../utils/siteContentRules";

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

const blobToBase64 = (blob) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result).split(",")[1]);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(blob);
    });

// Phone photos run 5-15 MB, so every upload is redrawn at most
// MAX_IMAGE_EDGE px on its long side and re-encoded before it leaves the
// browser. This also drops EXIF data such as GPS location. Browsers that
// cannot encode WebP fall back to JPEG.
export const prepareImageUpload = async (file) => {
    const { image, url } = await loadImage(file);
    try {
        const scale = Math.min(
            1,
            MAX_IMAGE_EDGE / Math.max(image.naturalWidth, image.naturalHeight),
        );
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.naturalWidth * scale);
        canvas.height = Math.round(image.naturalHeight * scale);
        canvas
            .getContext("2d")
            .drawImage(image, 0, 0, canvas.width, canvas.height);

        let blob = await toBlob(canvas, "image/webp", 0.85);
        if (!blob || blob.type !== "image/webp") {
            blob = await toBlob(canvas, "image/jpeg", 0.85);
        }
        if (!blob) throw new Error(`${file.name}: 사진을 변환하지 못했습니다.`);
        if (blob.size > MAX_IMAGE_BYTES) {
            throw new Error(`${file.name}: 줄인 뒤에도 3MB보다 큽니다.`);
        }
        return {
            data: await blobToBase64(blob),
            previewUrl: URL.createObjectURL(blob),
            name: file.name,
        };
    } finally {
        URL.revokeObjectURL(url);
    }
};
