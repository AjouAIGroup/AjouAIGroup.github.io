import CvlLogo from "../assets/images/laboratories/cvl-logo.svg";
import HeiLogo from "../assets/images/laboratories/hei-logo.png";
import IknowLogo from "../assets/images/laboratories/iknow-logo.png";
import VisionLearningImage from "../assets/images/research_areas/aaig-vision-learning.webp";
import SpeechGenerativeImage from "../assets/images/research_areas/aaig-speech-generative.webp";
import EmbodiedIntelligenceImage from "../assets/images/research_areas/aaig-embodied-intelligence.webp";
import KnowledgeAiImage from "../assets/images/research_areas/aaig-knowledge-ai.webp";
import CvlResearchImage from "../assets/images/research_labs/cvl-research.webp";
import SailResearchImage from "../assets/images/research_labs/sail-research.webp";
import HeiResearchImage from "../assets/images/research_labs/hei-research.webp";
import IknowResearchImage from "../assets/images/research_labs/iknow-research.webp";

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
        researchDetails: [
            {
                title: "Computer Vision & Learning Algorithms",
                items: ["Visual Recognition", "Large-scale Models", "Meta Learning"],
            },
            {
                title: "Efficient Learning for LLMs",
                items: ["Model Compression", "Efficient Learning", "System-level Optimization"],
            },
            {
                title: "Robot Learning",
                items: ["Vision-Language-Action", "Efficient Robotics", "3D Recognition"],
            },
            {
                title: "Industrial & Medical AI",
                items: ["Battery AI", "Fault Detection", "Medical AI"],
            },
        ],
        homeResearchImage: VisionLearningImage,
        researchImage: CvlResearchImage,
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
        researchDetails: [
            {
                title: "Speech Synthesis",
                items: ["Text-to-Speech", "Voice Conversion", "Neural Vocoder"],
            },
            {
                title: "Speech Language Models",
                items: ["Neural Codec", "Speech-to-Speech Translation", "Speech Editing"],
            },
            {
                title: "Generative AI",
                items: ["Audio Generation", "Talking Head Generation", "Video Generation"],
            },
        ],
        homeResearchImage: SpeechGenerativeImage,
        researchImage: SailResearchImage,
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
        researchDetails: [
            {
                title: "Foundation Models for Robotics",
                items: ["Task Generalization", "Cross-environment Adaptation"],
            },
            {
                title: "Human-Robot Interaction",
                items: ["Natural Collaboration", "Shared Autonomy"],
            },
            {
                title: "Lifelong Robot Learning",
                items: ["Continuous Skill Acquisition", "Interactive Adaptation"],
            },
        ],
        homeResearchImage: EmbodiedIntelligenceImage,
        researchImage: HeiResearchImage,
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
        researchDetails: [
            {
                title: "Recommendation Systems",
                items: ["Personalization", "Intelligent Knowledge Systems"],
            },
            {
                title: "Multimodal Understanding",
                items: ["Multimodal Representation", "Cross-modal Reasoning"],
            },
            {
                title: "Large Language Models",
                items: ["Knowledge-aware Language Intelligence", "Reasoning"],
            },
            {
                title: "Federated Learning",
                items: ["Distributed Learning", "Privacy-conscious AI"],
            },
        ],
        homeResearchImage: KnowledgeAiImage,
        researchImage: IknowResearchImage,
    },
];
