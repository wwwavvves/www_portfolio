// Fetch the JSON data
fetch("data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json(); // Parse the JSON from the response
  })
  .then((data) => {
    // Handle the data here
    displayProjects(data.projects);
  })
  .catch((error) => {
    console.error("There has been a problem with your fetch operation:", error);
  });

function displayProjects(projects) {
  let projectsContainer = document.querySelector("#projects-container");
  projects
    .slice()
    .reverse()
    .forEach((element) => {
      const projectRow = document.createElement("div");
      projectRow.classList.add("temp-title");
      projectRow.innerHTML = `
              <div class="temp-work">
                  <a
                  href=${element.link}
                  target="_blank"
                  >${element.title}</a
                  >
                  <p>
                      ${element.task} <br />
                      ${element.description}
                  </p>
              </div>
              <div>
                  <a href=${element.link} target="_blank">
                      <img src="./images/arrow_blank_link.svg" alt="" width="160px">
                  </a>
              </div>
        `;
      projectsContainer.appendChild(projectRow);
    });
}
