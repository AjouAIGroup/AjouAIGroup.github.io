import { refreshExternalContent } from "./external.mjs";
import { syncDeadlineContent } from "./deadlines.mjs";
import { syncNewsContent } from "./news.mjs";
import { syncPhotoContent } from "./photos.mjs";
import { syncPublicationContent } from "./publications.mjs";
import { validateResearchContent } from "./research.mjs";

const run = async () => {
    await refreshExternalContent();
    await syncDeadlineContent({ refreshSources: true, persistSourceRefresh: true });
    await validateResearchContent();
    const publicationItems = await syncPublicationContent();
    await syncNewsContent({ publicationItems });
    await syncPhotoContent();
    console.log("[content] external refresh completed");
};

run().catch((error) => {
    console.error(error.message || error);
    process.exit(1);
});
