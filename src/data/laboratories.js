import CvlLogo from "../assets/images/laboratories/cvl-logo.svg";
import HeiLogo from "../assets/images/laboratories/hei-logo.png";
import IknowLogo from "../assets/images/laboratories/iknow-logo.png";
import VisionLearningImage from "../assets/images/research_areas/aaig-vision-learning.webp";
import SpeechGenerativeImage from "../assets/images/research_areas/aaig-speech-generative.webp";
import EmbodiedIntelligenceImage from "../assets/images/research_areas/aaig-embodied-intelligence.webp";
import KnowledgeAiImage from "../assets/images/research_areas/aaig-knowledge-ai.webp";
import VisionImage from "../assets/images/research_concepts/aaig/cvl-vision-research.webp";
import SpeechImage from "../assets/images/research_concepts/aaig/sail-speech-research.webp";
import RoboticsImage from "../assets/images/research_concepts/aaig/hei-embodied-research.webp";
import KnowledgeImage from "../assets/images/research_concepts/aaig/iknow-knowledge-research.webp";

export const LABORATORIES = [
    {
        key: "cvl",
        shortName: "CVL Lab",
        name: "Computer Vision & Learning Lab",
        summary:
            "Research in computer vision, deep learning, and machine learning, spanning visual recognition and robust learning methods.",
        topics: ["Computer Vision", "Deep Learning", "Machine Learning"],
        href: "https://cvl-lab.github.io/",
        logo: CvlLogo,
        logoAlt: "CVL Lab logo",
        researchTitle: "Computer Vision & Learning",
        researchSummary:
            "Robust visual recognition and representation learning for reliable perception in real-world settings.",
        researchDescription:
            "We develop robust visual recognition and representation-learning methods that remain reliable across changing environments and real-world data.",
        themes: ["Visual Recognition", "Representation Learning", "Robust AI"],
        homeResearchImage: VisionLearningImage,
        researchImage: VisionImage,
    },
    {
        key: "sail",
        shortName: "SAIL",
        name: "Speech Artificial Intelligence Lab",
        summary:
            "Research on speech synthesis, speech language models, and generative models for audio, talking-head, and video generation.",
        heroSummary:
            "Speech, language, and generative models for audio and visual media.",
        topics: ["Speech Synthesis", "Speech Language Models", "Generative Models"],
        href: "https://sites.google.com/view/speechailab",
        researchTitle: "Speech AI & Generative Models",
        researchSummary:
            "Speech synthesis, speech language models, and generative approaches for audio and visual media.",
        researchDescription:
            "We study speech synthesis, speech language models, and generative approaches for audio, talking-head, and video generation.",
        themes: ["Speech Synthesis", "Speech Language Models", "Generative Models"],
        homeResearchImage: SpeechGenerativeImage,
        researchImage: SpeechImage,
    },
    {
        key: "hei",
        shortName: "HEI Lab",
        name: "Human-Centered Embodied Intelligence Lab",
        summary:
            "Building robots that learn, adapt, and interact with people through foundation models for robotics, human-robot interaction, and lifelong learning.",
        topics: ["Robot Learning", "Human-Robot Interaction", "Lifelong Learning"],
        href: "https://heilaboratory.github.io/",
        logo: HeiLogo,
        logoAlt: "HEI Lab logo",
        researchTitle: "Embodied Intelligence",
        researchSummary:
            "Foundation models and lifelong learning for robots that adapt and collaborate with people.",
        researchDescription:
            "We build adaptive robots through foundation models, human-robot interaction, and lifelong learning in changing physical environments.",
        themes: ["Robot Learning", "Human-Robot Interaction", "Lifelong Learning"],
        homeResearchImage: EmbodiedIntelligenceImage,
        researchImage: RoboticsImage,
    },
    {
        key: "iknow",
        shortName: "iKnow Lab",
        name: "intelligence and Knowledge Lab",
        summary:
            "Research on recommendation systems, multimodal understanding, large language models, and federated learning.",
        topics: ["Recommendation", "Multimodal AI", "Large Language Models"],
        href: "https://iknow.ajou.ac.kr/",
        logo: IknowLogo,
        logoAlt: "iKnow Lab logo",
        researchTitle: "Knowledge-Centered AI",
        researchSummary:
            "Recommendation, multimodal understanding, large language models, and federated learning.",
        researchDescription:
            "We explore recommendation systems, multimodal understanding, large language models, and federated learning for intelligent knowledge systems.",
        themes: ["Recommendation", "Multimodal AI", "Large Language Models"],
        homeResearchImage: KnowledgeAiImage,
        researchImage: KnowledgeImage,
    },
];
