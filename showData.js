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
    // displayProjects(data.projects);
    // displayEducation(data.education);
    displaySomething();
  })
  .catch((error) => {
    console.error("There has been a problem with your fetch operation:", error);
  });


  displaySomething() {
    let potato = document.querySelector("#experimental");
    potato.innerHTML = "Hello";
  };