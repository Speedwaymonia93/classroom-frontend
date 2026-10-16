import { GraduationCap, School } from "lucide-react";

export const USER_ROLES = {
    STUDENT: "student",
    TEACHER: "teacher",
    ADMIN: "admin",
};

export const ROLE_OPTIONS = [
    {
        value: USER_ROLES.STUDENT,
        label: "Student",
        icon: GraduationCap,
    },
    {
        value: USER_ROLES.TEACHER,
        label: "Teacher",
        icon: School,
    },
];

export const DEPARTMENTS = [
    "Computer Science",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "History",
    "Geography",
    "Economics",
    "Business Administration",
    "Engineering",
    "Psychology",
    "Sociology",
    "Political Science",
    "Philosophy",
    "Education",
    "Fine Arts",
    "Music",
    "Physical Education",
    "Law",
] as const;

export const DEPARTMENT_OPTIONS = DEPARTMENTS.map((dept) => ({
    value: dept,
    label: dept,
}));

export const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB in bytes
export const ALLOWED_TYPES = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
];

function validateHttpUrl(value: string, label: string, httpsOnly = false): URL {
    let url: URL;
    try {
        url = new URL(value);
    } catch {
        throw new Error(`${label} must be a valid absolute URL`);
    }
    if (httpsOnly ? url.protocol !== "https:" : !["http:", "https:"].includes(url.protocol)) {
        throw new Error(`${label} must use ${httpsOnly ? "HTTPS" : "HTTP or HTTPS"}`);
    }
    if (url.username || url.password || url.search || url.hash) {
        throw new Error(`${label} must not contain credentials, query parameters or a fragment`);
    }
    return url;
}

// Validate Cloudinary only when an upload is requested, keeping startup independent.
export const CLOUDINARY_UPLOAD_URL = (import.meta.env.VITE_CLOUDINARY_UPLOAD_URL || "").trim();
export const CLOUDINARY_CLOUD_NAME = (import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "").trim();
export const CLOUDINARY_UPLOAD_PRESET = (import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "").trim();

export function getCloudinaryConfig() {
    const settings = {
        VITE_CLOUDINARY_UPLOAD_URL: CLOUDINARY_UPLOAD_URL,
        VITE_CLOUDINARY_CLOUD_NAME: CLOUDINARY_CLOUD_NAME,
        VITE_CLOUDINARY_UPLOAD_PRESET: CLOUDINARY_UPLOAD_PRESET,
    };
    const missing = Object.entries(settings).filter(([, value]) => !value).map(([key]) => key);
    if (missing.length) throw new Error(`Image uploads are not configured. Missing: ${missing.join(", ")}`);
    validateHttpUrl(CLOUDINARY_UPLOAD_URL, "VITE_CLOUDINARY_UPLOAD_URL", true);
    if (!/^[a-zA-Z0-9_-]+$/.test(CLOUDINARY_CLOUD_NAME)) {
        throw new Error("VITE_CLOUDINARY_CLOUD_NAME must contain only letters, numbers, underscores or hyphens");
    }
    if (/\s/.test(CLOUDINARY_UPLOAD_PRESET)) {
        throw new Error("VITE_CLOUDINARY_UPLOAD_PRESET must not contain whitespace");
    }
    return { uploadUrl: CLOUDINARY_UPLOAD_URL, cloudName: CLOUDINARY_CLOUD_NAME, uploadPreset: CLOUDINARY_UPLOAD_PRESET };
}

function validateBackendUrl(value: string): string {
    const url = value.trim();
    if (!url || /\s/.test(url)) throw new Error("Backend URL must not be empty or contain whitespace");
    if (url.startsWith("/") && !url.startsWith("//") && !url.includes("\\")) {
        if (url.includes("?") || url.includes("#")) throw new Error("Backend URL path must not contain a query or fragment");
    } else {
        validateHttpUrl(url, "Backend URL");
    }
    return url.replace(/\/+$/, "");
}

function validateStorageKey(value: string, label: string): string {
    const key = value.trim();
    if (!key || /\s/.test(key)) throw new Error(`${label} must be non-empty and contain no whitespace`);
    return key;
}

export const BACKEND_BASE_URL = validateBackendUrl(import.meta.env.VITE_BACKEND_BASE_URL ?? import.meta.env.VITE_API_URL ?? "/api");
export const BASE_URL = BACKEND_BASE_URL;
export const ACCESS_TOKEN_KEY = validateStorageKey(import.meta.env.VITE_ACCESS_TOKEN_KEY ?? "access_token", "VITE_ACCESS_TOKEN_KEY");
export const REFRESH_TOKEN_KEY = validateStorageKey(import.meta.env.VITE_REFRESH_TOKEN_KEY ?? "refresh_token", "VITE_REFRESH_TOKEN_KEY");
if (ACCESS_TOKEN_KEY === REFRESH_TOKEN_KEY) throw new Error("Access and refresh token storage keys must be different");
export const REFRESH_TOKEN_URL = `${BASE_URL}/refresh-token`;

export const teachers = [
    {
        id: "1",
        name: "John Doe",
    },
    {
        id: "2",
        name: "Jane Smith",
    },
    {
        id: "3",
        name: "Dr. Alan Turing",
    },
];

export const subjects = [
    {
        id: 1,
        name: "Mathematics",
        code: "MATH",
    },
    {
        id: 2,
        name: "Computer Science",
        code: "CS",
    },
    {
        id: 3,
        name: "Physics",
        code: "PHY",
    },
    {
        id: 4,
        name: "Chemistry",
        code: "CHEM",
    },
];