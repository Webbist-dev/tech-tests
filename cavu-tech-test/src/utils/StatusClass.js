const statusClass = (status) => {
  if (!status) return;
  if (status.includes("Departed")) {
    return "departed"; // Editable
  } else if (status.includes("Diverted")) {
    return "diverted"; // Editable
  } else if (status.includes("Delayed")) {
    return "delayed"; // Editable
  } else if (status.includes("Cancelled")) {
    return "cancelled"; // Editable
  } else if (status.includes("Final Call")) {
    return "final-call";
  } else if (status.includes("Go to Gate")) {
    return "go-to-gate";
  } else if (status.includes("Scheduled")) {
    return "scheduled";
  } else if (status.includes("Departing")) {
    return "departing";
  } else if (status.includes("Wait in Lounge")) {
    return "wait-in-lounge";
  } else if (status.includes("Boarding")) {
    return "boarding";
  } else if (status.includes("Gate opens")) {
    return "gate-opens";
  } else if (status.includes("Flight closing")) {
    return "closing";
  } else {
    return "free-text";
  }
};

export default statusClass;
