const sortByHeading = (array, { direction, key }) => {
  array.sort((a, b) => {
    let statusA = "";
    let statusB = "";

    // Remove numbers and special chars from status
    if (key === "status") {
      statusA = a[key].replace(/[^a-zA-Z ]/g, "");
      statusB = b[key].replace(/[^a-zA-Z ]/g, "");
    }

    // Split key to sort by nested key
    const c = key.split(".");

    if (direction === "asc") {
      if (key === "estimatedDepartureDateTime") {
        return new Date(a[key]) - new Date(b[key]);
      }
      if (key === "status") {
        return statusA.localeCompare(statusB);
      }
      // Check if object or nested object exists
      if (a[c[0]] && b[c[0]]) {
        return a[c[0]][c[1]].localeCompare(b[c[0]][c[1]]);
      } else {
        return 0;
      }
    } else {
      if (key === "estimatedDepartureDateTime") {
        return new Date(b[key]) - new Date(a[key]);
      }
      if (key === "status") {
        return statusB.localeCompare(statusA);
      }
      // Check if object or nested object exists
      if (a[c[0]] && b[c[0]]) {
        return b[c[0]][c[1]].localeCompare(a[c[0]][c[1]]);
      } else {
        return 0;
      }
    }
  });

  return array;
};

export default sortByHeading;
