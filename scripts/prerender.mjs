import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import {
    buildPageTitle,
    ROUTE_DEFINITIONS,
} from "../src/routes/routeDefinitions.js";

const ROOT_DIR = process.cwd();
const DIST_DIR = path.resolve(ROOT_DIR, "dist");
const SERVER_DIR = path.resolve(DIST_DIR, "server");
const SERVER_ENTRY = path.resolve(SERVER_DIR, "entry-server.js");
const ROOT_HTML_FILE = path.resolve(DIST_DIR, "index.html");

const ROOT_CONTAINER_PATTERN = /<div id="root">[\s\S]*?<\/div>/;
const TITLE_PATTERN = /<title>[\s\S]*?<\/title>/;
const OG_URL_PATTERN =
    /<meta\b[^>]*\bproperty="og:url"[^>]*\bcontent="([^"]*)"/i;

const normalizeBasePath = (basePath) => {
    if (!basePath || basePath === "/") {
        return "";
    }

    const withLeadingSlash = basePath.startsWith("/")
        ? basePath
        : `/${basePath}`;
    return withLeadingSlash.replace(/\/+$/, "");
};

const escapeAttribute = (value) =>
    String(value)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

// The head fields are written by index.html on multiple lines, so match the
// whole tag rather than a single line, and rewrite only its content value.
const replaceMetaContent = (html, attribute, name, value) => {
    const pattern = new RegExp(
        `(<meta\\b[^>]*\\b${attribute}="${name}"[^>]*\\bcontent=")[^"]*(")`,
        "i",
    );

    if (!pattern.test(html)) {
        throw new Error(
            `Unable to find <meta ${attribute}="${name}"> in dist/index.html`,
        );
    }

    return html.replace(
        pattern,
        (match, prefix, suffix) =>
            `${prefix}${escapeAttribute(value)}${suffix}`,
    );
};

const toOutputFile = (routePath) => {
    if (routePath === "/") {
        return ROOT_HTML_FILE;
    }

    const routeDir = routePath.replace(/^\/+/, "");
    return path.resolve(DIST_DIR, routeDir, "index.html");
};

const buildHead = (template, route, siteOrigin, basePath) => {
    const title = buildPageTitle(route.title);
    const canonicalUrl = `${siteOrigin}${basePath}${route.path === "/" ? "/" : route.path}`;

    let html = template.replace(
        TITLE_PATTERN,
        `<title>${escapeAttribute(title)}</title>`,
    );
    html = replaceMetaContent(html, "name", "description", route.description);
    html = replaceMetaContent(html, "property", "og:title", title);
    html = replaceMetaContent(
        html,
        "property",
        "og:description",
        route.description,
    );
    html = replaceMetaContent(html, "property", "og:url", canonicalUrl);
    html = replaceMetaContent(html, "name", "twitter:title", title);
    html = replaceMetaContent(
        html,
        "name",
        "twitter:description",
        route.description,
    );

    return html.replace(
        "</head>",
        `    <link rel="canonical" href="${escapeAttribute(canonicalUrl)}" />\n    </head>`,
    );
};

async function prerender() {
    const template = await readFile(ROOT_HTML_FILE, "utf-8");
    if (!ROOT_CONTAINER_PATTERN.test(template)) {
        throw new Error("Unable to find #root mount point in dist/index.html");
    }

    const siteOrigin = new URL(
        template.match(OG_URL_PATTERN)?.[1] ?? "https://ajouaigroup.github.io/",
    ).origin;
    const basePath = normalizeBasePath(process.env.VITE_BASE_PATH);

    const serverModule = await import(pathToFileURL(SERVER_ENTRY).href);
    if (typeof serverModule.render !== "function") {
        throw new Error("entry-server.js must export a render(url) function");
    }

    const renderedRoutes = [];

    for (const route of ROUTE_DEFINITIONS) {
        const appHtml = serverModule.render(route.path);
        const html = buildHead(template, route, siteOrigin, basePath).replace(
            ROOT_CONTAINER_PATTERN,
            `<div id="root">${appHtml}</div>`,
        );
        const outputFile = toOutputFile(route.path);

        await mkdir(path.dirname(outputFile), { recursive: true });
        await writeFile(outputFile, html, "utf-8");
        renderedRoutes.push(route.path);
    }

    await rm(SERVER_DIR, { recursive: true, force: true });
    console.log(
        `Prerendered ${renderedRoutes.length} routes: ${renderedRoutes.join(", ")}`,
    );
}

prerender().catch((error) => {
    console.error(error);
    process.exit(1);
});
