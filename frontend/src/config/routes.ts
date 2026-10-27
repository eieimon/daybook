type UrlPaths = {
  title: string;
  url: string;
  description?: string;
};

export const URL_PATHS: Record<string, UrlPaths> = {
  OVERVIEW: {
    title: "Overview",
    url: "/overview",
  },
  MYDIARY: {
    title: "My Diary",
    description: "Your thoughts, little moments, and everything in between.",
    url: "/my-diary",
  },
  TASKS: {
    title: "Tasks",
    description: "Your tasks, to-dos, and reminders.",
    url: "/tasks",
  },
  CALENDAR: {
    title: "Your Calendar",
    url: "/calendar",
  },
  NOTES: {
    title: "Notes",
    url: "/notes",
  },
};
