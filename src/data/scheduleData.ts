export type Day = "friday" | "saturday" | "sunday";

export type Event = {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  icon: string;
  location: string;
};

export const scheduleData: {
  friday: { title: string; items: Event[] };
  saturday: { title: string; items: Event[] };
  sunday: { title: string; items: Event[] };
} = {
  friday: {
    title: "Friday",
    items: [
      {
        title: "Check-in + Dinner/snacks",
        date: "Friday",
        startTime: "6:00 PM",
        endTime: "7:00 PM",
        icon: "utensils",
        location: "CIF 4031",
      },
      {
        title: "Opening Ceremony",
        date: "Friday",
        startTime: "7:00 PM",
        endTime: "7:30 PM",
        icon: "flag",
        location: "CIF 4031",
      },
      {
        title: "Team Formation Activity",
        date: "Friday",
        startTime: "7:30 PM",
        endTime: "8:00 PM",
        icon: "users",
        location: "CIF 4031",
      },
      {
        title: "Hacking Begins",
        date: "Friday",
        startTime: "8:00 PM",
        endTime: "",
        icon: "code",
        location: "CIF 4031",
      },
      {
        title: "Isha Prayer",
        date: "Friday",
        startTime: "8:30 PM",
        endTime: "",
        icon: "moon",
        location: "CIF 4031",
      },
    ],
  },
  saturday: {
    title: "Saturday",
    items: [
      {
        title: "HOPPR Workshop",
        date: "Saturday",
        startTime: "10:00 AM",
        endTime: "11:00 AM",
        icon: "graduation-cap",
        location: "CIF 2036",
      },
      {
        title: "Perplexity Workshop/Lunch",
        date: "Saturday",
        startTime: "12:00 PM",
        endTime: "1:00 PM",
        icon: "utensils",
        location: "CIF 4031",
      },
      {
        title: "Mentor Office Hours",
        date: "Saturday",
        startTime: "12:00 PM",
        endTime: "3:00 PM",
        icon: "message-circle",
        location: "CIF 4031",
      },
      {
        title: "Dhuhr prayer",
        date: "Saturday",
        startTime: "1:00 PM",
        endTime: "",
        icon: "sun",
        location: "CIF 4031",
      },
      {
        title: "Josh Love Speaker Session",
        date: "Saturday",
        startTime: "2:00 PM",
        endTime: "2:45 PM",
        icon: "mic",
        location: "CIF 2018",
      },
      {
        title: "Trivia w/ prizes",
        date: "Saturday",
        startTime: "4:00 PM",
        endTime: "",
        icon: "brain",
        location: "CIF 2036",
      },
      {
        title: "Asr prayer",
        date: "Saturday",
        startTime: "5:00 PM",
        endTime: "",
        icon: "sun",
        location: "CIF 4031",
      },
      {
        title: "Movie Watch Party",
        date: "Saturday",
        startTime: "7:00 PM",
        endTime: "",
        icon: "film",
        location: "CIF 2018",
      },
    ],
  },
  sunday: {
    title: "Sunday",
    items: [
      {
        title: "Hacking Ends / Submissions Due",
        date: "Sunday",
        startTime: "12:00 PM",
        endTime: "",
        icon: "clock",
        location: "CIF 4031",
      },
      {
        title: "Judging",
        date: "Sunday",
        startTime: "12:00 PM",
        endTime: "2:00 PM",
        icon: "scale",
        location: "CIF 4031",
      },
      {
        title: "Break + Refreshments",
        date: "Sunday",
        startTime: "2:30 PM",
        endTime: "3:00 PM",
        icon: "coffee",
        location: "CIF 4031",
      },
      {
        title: "Closing Ceremony",
        date: "Sunday",
        startTime: "3:00 PM",
        endTime: "4:30 PM",
        icon: "trophy",
        location: "CIF 4031",
      },
    ],
  },
};
