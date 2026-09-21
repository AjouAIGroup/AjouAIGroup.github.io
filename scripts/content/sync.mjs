import { syncNewsContent } from "./news.mjs";
import { syncPublicationContent } from "./publications.mjs";
import { validateResearchContent } from "./research.mjs";
import { syncDeadlineContent } from "./deadlines.mjs";

const run = async () => {
    await validateResearchContent();
    const publicationItems = await syncPublicationContent();
    await syncNewsContent({ publicationItems });
    await syncDeadlineContent();
    console.log("[content] sync completed");
};

run().catch((error) => {
    console.error(error.message || error);
    process.exit(1);
});
