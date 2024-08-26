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
  const projectsContainer = document.querySelector("#projects-container");
  projects
    .slice()
    .reverse()
    .forEach((element, i) => {
      const projectRow = document.createElement("div");
      projectRow.classList.add("project-row");

      const wavyLineContainer = document.createElement("div");
      wavyLineContainer.classList.add("wavy-line-container");

      wavyLineContainer.textContent = "Test Line";

      projectRow.innerHTML = `
              <div class="project-name-link">
                <div class="project-details">
                    <a
                    href=${element.link}
                    target="_blank"
                    >${element.title}</a
                    >
                    <p>
                        ${element.task} <br />
                        ${element.description} <br />
                        ${element.year}
                    </p>
                </div>
                <div>
                    <a href=${element.link} target="_blank">
                        <img src="./images/arrow_blank_link.svg" alt="" width="160px" class="arrow-link">
                    </a>
                </div>
              </div>
        `;

      projectsContainer.appendChild(wavyLineContainer);
      projectsContainer.appendChild(projectRow);

      if (i === projects.length - 1) {
        const lastWavyLineContainer = document.createElement("div");
        lastWavyLineContainer.classList.add("wavy-line-container");
        projectsContainer.appendChild(lastWavyLineContainer);
      }
    });
    
  // Trigger resize event
  window.dispatchEvent(new Event("resize"));
}
