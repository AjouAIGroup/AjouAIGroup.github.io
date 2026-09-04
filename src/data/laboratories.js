import MmaiLogo from "../assets/images/laboratories/mmai-logo.svg";
import HeiLogo from "../assets/images/laboratories/hei-logo.png";
import IknowLogo from "../assets/images/laboratories/iknow-logo.png";
import VisionLearningImage from "../assets/images/research_areas/aaig-vision-learning.webp";
import SpeechGenerativeImage from "../assets/images/research_areas/aaig-speech-generative.webp";
import EmbodiedIntelligenceImage from "../assets/images/research_areas/aaig-embodied-intelligence.webp";
import KnowledgeAiImage from "../assets/images/research_areas/aaig-knowledge-ai.webp";
import CvlResearchImage from "../assets/images/research_labs/cvl-research-v2.webp";
import SailResearchImage from "../assets/images/research_labs/sail-research.webp";
import HeiResearchImage from "../assets/images/research_labs/hei-research.webp";
import IknowResearchImage from "../assets/images/research_labs/iknow-research.webp";
import LamdaResearchImage from "../assets/images/research_labs/lamda-research.webp";
import LamdaHomeResearchImage from "../assets/images/home_research/data-centric-trustworthy-ai.webp";

export const LABORATORIES = [
    {
        key: "cvl",
        shortName: "MMAI Lab",
        name: "Multi-Modal Artificial Intelligence Lab",
        heroTitle: "Multi-Modal AI",
        summary:
            "Multi-modal AI research connecting vision, language, and diverse signals for real-world impact.",
        topics: ["Computer Vision", "Efficient LLMs", "Robot Learning"],
        href: "https://mmai-laboratory.github.io/",
        logo: MmaiLogo,
        logoAlt: "MMAI Lab logo",
        researchTitle: "Multi-Modal AI",
        researchSummary:
            "Vision, language, and multimodal learning systems for reliable real-world intelligence.",
        researchDescription:
            "We develop multimodal learning systems that connect visual, language, and diverse real-world signals across computer vision, robotics, efficient LLMs, and applied AI.",
        themes: ["Computer Vision", "Multimodal AI", "Efficient LLMs"],
        researchDetails: [
            {
                title: "Computer Vision & Learning Algorithms",
                items: [
                    "Visual Recognition",
                    "Large-scale Models",
                    "Meta Learning",
                ],
            },
            {
                title: "Efficient Learning for LLMs",
                items: [
                    "Model Compression",
                    "Efficient Learning",
                    "System-level Optimization",
                ],
            },
            {
                title: "Robot Learning",
                items: [
                    "Vision-Language-Action",
                    "Efficient Robotics",
                    "3D Recognition",
                ],
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
        heroTitle: "Speech Artificial Intelligence",
        summary:
            "Research on speech synthesis, speech language models, and generative models for audio, talking-head, and video generation.",
        heroSummary:
            "Speech, language, and generative models for audio and visual media.",
        topics: [
            "Speech Synthesis",
            "Speech Language Models",
            "Generative Models",
        ],
        href: "https://sites.google.com/view/speechailab",
        researchTitle: "Speech AI & Generative Models",
        researchSummary:
            "Speech synthesis, speech language models, and generative approaches for audio and visual media.",
        researchDescription:
            "We study speech synthesis, speech language models, and generative approaches for audio, talking-head, and video generation.",
        themes: [
            "Speech Synthesis",
            "Speech Language Models",
            "Generative Models",
        ],
        researchDetails: [
            {
                title: "Speech Synthesis",
                items: ["Text-to-Speech", "Voice Conversion", "Neural Vocoder"],
            },
            {
                title: "Speech Language Models",
                items: [
                    "Neural Codec",
                    "Speech-to-Speech Translation",
                    "Speech Editing",
                ],
            },
            {
                title: "Generative AI",
                items: [
                    "Audio Generation",
                    "Talking Head Generation",
                    "Video Generation",
                ],
            },
        ],
        homeResearchImage: SpeechGenerativeImage,
        researchImage: SailResearchImage,
    },
    {
        key: "hei",
        shortName: "HEI Lab",
        name: "Human-Centered Embodied Intelligence Lab",
        heroTitle: "Human-Centered Embodied Intelligence",
        summary:
            "Building robots that learn, adapt, and interact with people through foundation models for robotics, human-robot interaction, and lifelong learning.",
        topics: [
            "Robot Learning",
            "Human-Robot Interaction",
            "Lifelong Learning",
        ],
        href: "https://heilaboratory.github.io/",
        logo: HeiLogo,
        logoAlt: "HEI Lab logo",
        researchTitle: "Embodied Intelligence",
        researchSummary:
            "Foundation models and lifelong learning for robots that adapt and collaborate with people.",
        researchDescription:
            "We build adaptive robots through foundation models, human-robot interaction, and lifelong learning in changing physical environments.",
        themes: [
            "Robot Learning",
            "Human-Robot Interaction",
            "Lifelong Learning",
        ],
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
                items: [
                    "Continuous Skill Acquisition",
                    "Interactive Adaptation",
                ],
            },
        ],
        homeResearchImage: EmbodiedIntelligenceImage,
        researchImage: HeiResearchImage,
    },
    {
        key: "iknow",
        shortName: "iKnow Lab",
        name: "intelligence and Knowledge Lab",
        heroTitle: "Intelligence & Knowledge",
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
    {
        key: "lamda",
        shortName: "LAMDA Lab",
        name: "Learning and Mining from DAta Lab",
        heroTitle: "Learning & Mining from Data",
        summary:
            "Multimodal, self-supervised, explainable, and trustworthy AI for biomedical, social, and other real-world data.",
        heroSummary:
            "Data-centric learning for multimodal, medical, and social intelligence.",
        topics: ["Multimodal Learning", "Trustworthy AI", "Biomedical AI"],
        href: "https://sites.google.com/site/kasohn/group",
        researchTitle: "Data-Centric & Trustworthy AI",
        researchSummary:
            "Multimodal and self-supervised learning for reliable analysis of medical, social, and heterogeneous data.",
        researchDescription:
            "We develop multimodal, self-supervised, and explainable AI methods for trustworthy analysis of text, images, graphs, biosignals, and real-world data.",
        themes: ["Multimodal Learning", "Trustworthy AI", "Biomedical AI"],
        researchDetails: [
            {
                title: "Multimodal & Self-Supervised Learning",
                items: ["Representation Learning", "Cross-modal Integration"],
            },
            {
                title: "Trustworthy AI",
                items: ["Explainability", "Robustness", "Safety"],
            },
            {
                title: "Medical & Social Data AI",
                items: ["Biomedical Informatics", "Network Analysis"],
            },
            {
                title: "Efficient Language Models",
                items: ["LLM Efficiency", "Real-world Deployment"],
            },
        ],
        homeResearchImage: LamdaHomeResearchImage,
        researchImage: LamdaResearchImage,
    },
];
