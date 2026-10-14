export interface Subject {
  id: string;
  code: string;
  name: string;
  department: string;
  description: string;
}

export const MOCK_SUBJECTS: Subject[] = [
  {
    id: "subject-001",
    code: "CS101",
    name: "Introduction to Computer Science",
    department: "Computer Science",
    description:
      "An introduction to programming, algorithms, and computational problem-solving.",
  },
  {
    id: "subject-002",
    code: "MATH201",
    name: "Linear Algebra",
    department: "Mathematics",
    description:
      "A study of vectors, matrices, linear transformations, and their applications.",
  },
  {
    id: "subject-003",
    code: "PSY101",
    name: "Introduction to Psychology",
    department: "Psychology",
    description:
      "An exploration of human behavior, cognition, emotions, and psychological research.",
  },
];