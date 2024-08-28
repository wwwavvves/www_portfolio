// Fetch the JSON data
fetch("../data/data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json(); // Parse the JSON from the response
  })
  .then((data) => {
    // Handle the data here
    displayEducation(data.education);
    displayWorkshops(data.workshops);
  })
  .catch((error) => {
    console.error("There has been a problem with your fetch operation:", error);
  });

function displayEducation(education) {
  let educationContainer = document.querySelector("#education");
  education
    .slice()
    .reverse()
    .forEach((element) => {
      const tableRow = document.createElement("tr");
      tableRow.innerHTML = `
      <td>${element.year}</td>
      <td>${element.degree}, ${element.institution}</td>
    `;
      educationContainer.appendChild(tableRow);
    });
}

function displayWorkshops(workshops) {
  let workshopsContainer = document.querySelector("#workshops");
  workshops
    .slice()
    .reverse()
    .forEach((element) => {
      const tableRow = document.createElement("tr");
      tableRow.innerHTML = `
      <td>${element.year}</td>
      <td>${element.title} (w/ ${element.instructor})</td>
    `;
      workshopsContainer.appendChild(tableRow);
    });
}
