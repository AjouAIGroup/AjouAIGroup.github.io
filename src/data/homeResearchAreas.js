import { LABORATORIES } from "./laboratories";
import VisionPerceptionImage from "../assets/images/home_research/vision-perception.webp";
import MultimodalUnderstandingImage from "../assets/images/home_research/multimodal-understanding.webp";
import LearningFoundationModelsImage from "../assets/images/home_research/learning-foundation-models.webp";
import SpeechLanguageImage from "../assets/images/home_research/speech-language.webp";
import GenerativeMediaImage from "../assets/images/home_research/generative-media.webp";
import EmbodiedIntelligenceImage from "../assets/images/home_research/embodied-intelligence.webp";
import HumanCenteredAiImage from "../assets/images/home_research/human-centered-ai.webp";
import KnowledgeRecommendationImage from "../assets/images/home_research/knowledge-recommendation.webp";
import AppliedAiImage from "../assets/images/home_research/applied-ai.webp";

const labsByKey = Object.fromEntries(
    LABORATORIES.map((lab) => [lab.key, lab]),
);

const makeArea = (id, title, summary, labKeys, image) => ({
    id,
    title,
    summary,
    image,
    labs: labKeys.map((key) => ({
        key,
        label: labsByKey[key].shortName,
    })),
});

// The Home page groups related work across laboratories. The detailed Research
// page remains the destination for individual areas and longer descriptions.
export const HOME_RESEARCH_AREAS = [
    makeArea(
        "vision-perception",
        "Vision & Perception",
        "Reliable visual understanding, representation learning, and perception across real-world environments.",
        ["cvl", "iknow"],
        VisionPerceptionImage,
    ),
    makeArea(
        "multimodal-understanding",
        "Multimodal Understanding",
        "Methods that connect visual, audio, language, and structured information to reason across modalities.",
        ["cvl", "sail", "iknow"],
        MultimodalUnderstandingImage,
    ),
    makeArea(
        "learning-foundation-models",
        "Learning Systems & Foundation Models",
        "Efficient, scalable, and generalizable learning systems for language, vision, and physical intelligence.",
        ["cvl", "hei", "iknow"],
        LearningFoundationModelsImage,
    ),
    makeArea(
        "speech-language-ai",
        "Speech & Language AI",
        "Speech synthesis, spoken-language modeling, translation, and knowledge-aware language intelligence.",
        ["sail", "iknow"],
        SpeechLanguageImage,
    ),
    makeArea(
        "generative-media",
        "Generative Media",
        "Generative methods for audio, video, visual content, and interactive multimodal media.",
        ["cvl", "sail"],
        GenerativeMediaImage,
    ),
    makeArea(
        "embodied-intelligence",
        "Embodied Intelligence & Robot Learning",
        "Vision-language-action learning and adaptable robot skills for interaction in the physical world.",
        ["cvl", "hei"],
        EmbodiedIntelligenceImage,
    ),
    makeArea(
        "human-centered-ai",
        "Human-Centered AI",
        "Human-aware systems that collaborate, communicate, and adapt to people in practical settings.",
        ["sail", "hei", "iknow"],
        HumanCenteredAiImage,
    ),
    makeArea(
        "knowledge-recommendation",
        "Knowledge, Recommendation & Personalization",
        "Personalized and knowledge-centered intelligence for recommendation, retrieval, and assistance.",
        ["iknow"],
        KnowledgeRecommendationImage,
    ),
    makeArea(
        "applied-ai",
        "Applied AI for Industry & Health",
        "Robust AI methods for industrial inspection, biomedical data, and dependable real-world deployment.",
        ["cvl", "hei"],
        AppliedAiImage,
    ),
];
