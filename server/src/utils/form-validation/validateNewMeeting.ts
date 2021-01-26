import { MeetingInput } from "src/resolvers/types/MeetingInput";

export const validateNewMeeting = (options: MeetingInput) => {
  if (!options.studentID) {
    return [
      {
        field: "studentID",
        message: "A student id is required",
      },
    ];
  }

  if (options.meetingDate.length == 0) {
    return [
      {
        field: "meetingDate",
        message: "A meeting date is required",
      },
    ];
  }
  if (options.duration == 0) {
    return [
      {
        field: "duration",
        message: "Cannot have a meeting that is 0 minutes long",
      },
    ];
  }
  if (!options.duration) {
    return [
      {
        field: "duration",
        message: "A meeting duration is required",
      },
    ];
  }

  return null;
};
