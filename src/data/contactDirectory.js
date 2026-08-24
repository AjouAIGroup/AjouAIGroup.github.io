import { LABORATORIES } from "./laboratories";

const CONTACT_DETAILS = {
    cvl: {
        contactName: "Donggeon Lee",
        contactRole: "Ph.D. Student and student representative",
        contactEmail: "donggeon_lee@ajou.ac.kr",
        guidance:
            "Start by reviewing the lab's research areas. Send a short email with your CV, research interests, and any available academic record to discuss fit and current opportunities.",
        note: "Donggeon Lee is the current first contact for prospective students.",
    },
    sail: {
        contactName: "Sanghoon Lee",
        contactRole: "Assistant Professor",
        contactEmail: "sanghoonlee@ajou.ac.kr",
        guidance:
            "Review current research on speech and generative AI, then introduce your background and intended research direction by email. Confirm current openings and required materials with the lab.",
    },
    hei: {
        contactName: "Gicheon Kang",
        contactRole: "Assistant Professor",
        contactEmail: "gckang@ajou.ac.kr",
        guidance:
            "Read the lab's work in embodied intelligence and robotics before contacting the lab. Include a CV and a concise note about the research topics you would like to pursue.",
    },
    iknow: {
        contactName: "Hyunsouk Cho",
        contactRole: "Associate Professor",
        contactEmail: "hyunsouk@ajou.ac.kr",
        guidance:
            "Review the lab's research in knowledge-centered AI, then email an introduction with your CV and relevant interests. The lab can confirm its current application process and available positions.",
    },
};

export const CONTACT_LABS = LABORATORIES.map((lab) => ({
    ...lab,
    ...CONTACT_DETAILS[lab.key],
}));

export const STUDENT_REPRESENTATIVES = [
    {
        lab: "CVL Lab",
        name: "Donggeon Lee",
        koreanName: "이동건",
        role: "Ph.D. Student and student representative",
        email: "donggeon_lee@ajou.ac.kr",
    },
    {
        lab: "SAIL",
        name: "Student representative",
        koreanName: "추후 안내",
        role: "To be announced",
        email: null,
    },
    {
        lab: "HEI Lab",
        name: "Student representative",
        koreanName: "추후 안내",
        role: "To be announced",
        email: null,
    },
    {
        lab: "iKnow Lab",
        name: "Student representative",
        koreanName: "추후 안내",
        role: "To be announced",
        email: null,
    },
];
