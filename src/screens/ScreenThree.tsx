import { useState, useEffect } from "react";
import { type Day, scheduleData } from "../data/scheduleData";
import * as LucideIcons from "lucide-react";

export default function ScreenThree() {
  const [activeDay, setActiveDay] = useState<Day>("friday");
  const [currentTime, setCurrentTime] = useState(new Date());
  const currentSchedule = scheduleData[activeDay];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const getIcon = (iconName: string) => {
    const iconKey = iconName
      .split("-")
      .map((word, index) =>
        index === 0
          ? word.charAt(0).toUpperCase() + word.slice(1)
          : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join("");

    const IconComponent = (
      LucideIcons as unknown as Record<
        string,
        React.ComponentType<{ size?: number }>
      >
    )[iconKey];
    return IconComponent || LucideIcons.Circle;
  };

  const isEventActive = (
    eventIndex: number,
    startTime: string,
    endTime: string,
    date: string
  ): boolean => {
    const now = currentTime;

    // Map date to actual date in October/November 2025
    const dateMap: Record<string, { month: number; day: number }> = {
      Friday: { month: 9, day: 31 }, // October is month 9 (0-indexed)
      Saturday: { month: 10, day: 1 }, // November is month 10
      Sunday: { month: 10, day: 2 },
    };

    const eventDate = dateMap[date];
    if (!eventDate) return false;

    // Parse start time
    const startMatch = startTime.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!startMatch) return false;

    let startHour = parseInt(startMatch[1]);
    const startMinute = parseInt(startMatch[2]);
    const startPeriod = startMatch[3].toUpperCase();

    if (startPeriod === "PM" && startHour !== 12) startHour += 12;
    if (startPeriod === "AM" && startHour === 12) startHour = 0;

    const eventStart = new Date(
      2025,
      eventDate.month,
      eventDate.day,
      startHour,
      startMinute
    );

    // If event has an end time, use it
    if (endTime) {
      const endMatch = endTime.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (endMatch) {
        let endHour = parseInt(endMatch[1]);
        const endMinute = parseInt(endMatch[2]);
        const endPeriod = endMatch[3].toUpperCase();

        if (endPeriod === "PM" && endHour !== 12) endHour += 12;
        if (endPeriod === "AM" && endHour === 12) endHour = 0;

        const eventEnd = new Date(
          2025,
          eventDate.month,
          eventDate.day,
          endHour,
          endMinute
        );

        return now >= eventStart && now < eventEnd;
      }
    }

    // No end time: check if it's been less than 2 hours OR no next event has started
    const twoHoursLater = new Date(eventStart.getTime() + 2 * 60 * 60 * 1000);

    // Check if a next event has started
    const events = currentSchedule.items;
    if (eventIndex < events.length - 1) {
      const nextEvent = events[eventIndex + 1];
      const nextStartMatch = nextEvent.startTime.match(
        /(\d+):(\d+)\s*(AM|PM)/i
      );
      if (nextStartMatch) {
        let nextStartHour = parseInt(nextStartMatch[1]);
        const nextStartMinute = parseInt(nextStartMatch[2]);
        const nextStartPeriod = nextStartMatch[3].toUpperCase();

        if (nextStartPeriod === "PM" && nextStartHour !== 12)
          nextStartHour += 12;
        if (nextStartPeriod === "AM" && nextStartHour === 12) nextStartHour = 0;

        const nextEventStart = new Date(
          2025,
          eventDate.month,
          eventDate.day,
          nextStartHour,
          nextStartMinute
        );

        // Active if current time is between event start and either next event start or 2 hours
        const endTime = Math.min(
          twoHoursLater.getTime(),
          nextEventStart.getTime()
        );
        return now >= eventStart && now.getTime() < endTime;
      }
    }

    // No next event, just use 2-hour rule
    return now >= eventStart && now < twoHoursLater;
  };

  return (
    <section id="page2" className="screen">
      <div className="screen-content schedule-section">
        <h1>Schedule</h1>
        <div className="schedule-tabs">
          <button
            className={`schedule-tab ${
              activeDay === "friday" ? "schedule-tab--active" : ""
            }`}
            onClick={() => setActiveDay("friday")}
            type="button"
          >
            Friday 10/31
          </button>
          <button
            className={`schedule-tab ${
              activeDay === "saturday" ? "schedule-tab--active" : ""
            }`}
            onClick={() => setActiveDay("saturday")}
            type="button"
          >
            Saturday 11/1
          </button>
          <button
            className={`schedule-tab ${
              activeDay === "sunday" ? "schedule-tab--active" : ""
            }`}
            onClick={() => setActiveDay("sunday")}
            type="button"
          >
            Sunday 11/2
          </button>
        </div>

        <div className="schedule-day">
          <ul>
            {currentSchedule.items.map((item, index) => {
              const Icon = getIcon(item.icon);
              const isActive = isEventActive(
                index,
                item.startTime,
                item.endTime,
                item.date
              );
              return (
                <li key={index} className="schedule-event">
                  <div
                    className="schedule-event-icon"
                    style={
                      isActive
                        ? {
                            backgroundColor: "rgba(249, 192, 65, 0.25)",
                            color: "#f9c041",
                          }
                        : undefined
                    }
                  >
                    <Icon size={20} />
                  </div>
                  <div className="schedule-event-details">
                    {item.startTime && (
                      <div className="schedule-event-time">
                        {item.startTime}
                        {item.endTime && ` - ${item.endTime}`}
                        {" • "}
                        {item.location}
                      </div>
                    )}
                    <div className="schedule-event-title">{item.title}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
