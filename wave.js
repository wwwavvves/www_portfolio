function createWavyLine(container) {
  const containerWidth = container.clientWidth;

  // Adjust the wave frequency and amplitude
  const waveFrequency = 20; // The number of waves
  const waveAmplitude = 20; // The height of the wave

  // Create SVG element
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", containerWidth);
  svg.setAttribute("height", "100px"); // Adjust the height as needed

  // Create path element
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("fill", "transparent");
  path.setAttribute("stroke", "white");
  path.setAttribute("stroke-width", "4");

  // Create the wave path
  let d = `M0,${waveAmplitude}`;
  let direction = 1; // Start going down

  for (let i = 0; i <= containerWidth; i += waveFrequency) {
    d += ` Q${i + waveFrequency / 2},${
      waveAmplitude + waveAmplitude * direction
    } ${i + waveFrequency},${waveAmplitude}`;
    direction *= -1; // Alternate the direction
  }

  path.setAttribute("d", d);

  // Append path to SVG
  svg.appendChild(path);

  // Clear any previous SVG and append the new one to the container
  container.innerHTML = "";
  container.appendChild(svg);
}

// Call the function on page load for all elements with the class 'wavy-line-container'
window.onload = function () {
  const containers = document.querySelectorAll(".wavy-line-container");
  containers.forEach(createWavyLine);
};

// Optional: Recreate the wavy lines on window resize to ensure they always fit the container
window.onresize = function () {
  const containers = document.querySelectorAll(".wavy-line-container");
  containers.forEach(createWavyLine);
};