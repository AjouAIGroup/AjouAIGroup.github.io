import { LABORATORIES } from "./laboratories";

const labsByKey = Object.fromEntries(
    LABORATORIES.map((lab) => [lab.key, lab]),
);

const makeArea = (labKey, title, summary) => {
    const lab = labsByKey[labKey];

    return {
        id: `${labKey}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        lab: lab.shortName,
        labKey,
        title,
        summary,
        image: lab.homeResearchImage,
    };
};

// Home is for discovery: each card represents one research direction while
// the longer Research page remains the destination for expanded context.
export const HOME_RESEARCH_AREAS = [
    makeArea(
        "cvl",
        "Computer Vision & Learning Algorithms",
        "Visual recognition, large-scale models, and learning algorithms for reliable perception.",
    ),
    makeArea(
        "cvl",
        "Efficient Learning for LLMs",
        "Model compression and efficient learning methods for capable language models.",
    ),
    makeArea(
        "cvl",
        "Robot Learning",
        "Vision-language-action learning and perception for robots in the physical world.",
    ),
    makeArea(
        "cvl",
        "Industrial & Medical AI",
        "Learning systems for industrial inspection, biomedical data, and real-world deployment.",
    ),
    makeArea(
        "sail",
        "Speech Synthesis",
        "Expressive speech generation, text-to-speech, and voice conversion.",
    ),
    makeArea(
        "sail",
        "Speech Language Models",
        "Speech-to-speech translation, speech editing, and language-aware audio intelligence.",
    ),
    makeArea(
        "sail",
        "Generative Audio & Media",
        "Audio generation and talking-head generation across multimodal media.",
    ),
    makeArea(
        "hei",
        "Foundation Models for Robotics",
        "Generalizable models that transfer robot skills across tasks and environments.",
    ),
    makeArea(
        "hei",
        "Human-Robot Interaction",
        "Natural collaboration, shared autonomy, and interaction between people and robots.",
    ),
    makeArea(
        "hei",
        "Lifelong Robot Learning",
        "Robots that continuously acquire skills and adapt through real-world interaction.",
    ),
    makeArea(
        "iknow",
        "Recommendation Systems",
        "Personalized recommendation and intelligent knowledge systems.",
    ),
    makeArea(
        "iknow",
        "Multimodal Understanding",
        "Learning from interconnected language, vision, and structured information.",
    ),
    makeArea(
        "iknow",
        "Large Language Models",
        "Knowledge-aware language models for reasoning and intelligent assistance.",
    ),
    makeArea(
        "iknow",
        "Federated Learning",
        "Privacy-conscious distributed learning across data and devices.",
    ),
];
