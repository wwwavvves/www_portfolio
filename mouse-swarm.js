document.addEventListener("DOMContentLoaded", () => {
  const swarmContainer = document.getElementById("swarm");
  const numSvgs = 7; // Number of SVGs in the swarm
  const delay = 3; // Delay in frames for each SVG
  const positions = []; // Array to store mouse positions
  const svgs = []; // Array to store SVG elements

  // Function to create circles and ellipses with unique colors
  function createShape(index) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "200");
    svg.setAttribute("height", "200");
    svg.setAttribute("viewBox", "0 0 200 200");
    svg.classList.add("swarm");

    if (index % 2 === 0) {
      // Circles
      const circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      circle.setAttribute("cx", "100");
      circle.setAttribute("cy", "100");
      circle.setAttribute("r", index === 6 ? "50" : "80"); // Different size for the last circle
      switch (index) {
        case 0:
          circle.setAttribute("fill", "#000BFF"); // Blue
          break;
        case 2:
          circle.setAttribute("fill", "#B4FFB2"); // Light green
          break;
        case 4:
          circle.setAttribute("fill", "#DFC6FF"); // Light purple
          break;
        case 6:
          circle.setAttribute("fill", "#FFB7F8"); // Pink
          break;
      }
      svg.appendChild(circle);
    } else {
      // Ellipses
      const ellipse = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "ellipse"
      );
      ellipse.setAttribute("cx", "100");
      ellipse.setAttribute("cy", "100");
      ellipse.setAttribute("rx", "90");
      ellipse.setAttribute("ry", "50");
      switch (index) {
        case 1:
          ellipse.setAttribute("fill", "#FFCC00"); // Yellow
          break;
        case 3:
          ellipse.setAttribute("fill", "#FF0000"); // Red
          break;
        case 5:
          ellipse.setAttribute("fill", "#FF8A00"); // Orange
          break;
      }
      svg.appendChild(ellipse);
    }

    return svg;
  }

  // Named function to capture the initial mouse position and initialize the shapes
  function captureInitialMousePos(event) {
    const initialMousePos = { x: event.clientX, y: event.clientY };

    // Initialize the array with initial mouse position
    for (let i = 0; i < numSvgs * delay; i++) {
      positions.push({ x: initialMousePos.x, y: initialMousePos.y });
    }

    // Create SVG elements with circles and ellipses
    for (let i = 0; i < numSvgs; i++) {
      const svg = createShape(i);
      swarmContainer.appendChild(svg);

      // Store initial properties for spring physics
      svgs.push({
        element: svg,
        x: initialMousePos.x,
        y: initialMousePos.y,
        vx: 0,
        vy: 0,
      });
    }

    // Start the animation
    updateSvgPositions();

    // Remove the event listener after initializing the shapes
    document.removeEventListener("mousemove", captureInitialMousePos);
  }

  // Add event listener for capturing initial mouse position
  document.addEventListener("mousemove", captureInitialMousePos);

  // Update the positions array with the current mouse position
  document.addEventListener("mousemove", (event) => {
    positions.push({ x: event.clientX, y: event.clientY });
    positions.shift(); // Remove the oldest position to keep the array length constant
  });

  // Function to update the SVG positions with spring physics
  function updateSvgPositions() {
    const stiffness = 0.1; // Stiffness of the spring
    const damping = 0.8; // Damping to reduce oscillation

    svgs.forEach((svgObj, index) => {
      const targetPos = positions[Math.max(0, index * delay)]; // Get the delayed position
      if (targetPos) {
        const dx = targetPos.x - svgObj.x;
        const dy = targetPos.y - svgObj.y;

        // Apply spring force
        const ax = stiffness * dx;
        const ay = stiffness * dy;

        // Apply damping to velocity
        svgObj.vx += ax;
        svgObj.vy += ay;
        svgObj.vx *= damping;
        svgObj.vy *= damping;

        // Update positions
        svgObj.x += svgObj.vx;
        svgObj.y += svgObj.vy;

        svgObj.element.style.transform = `translate(${svgObj.x}px, ${svgObj.y}px)`;
      }
    });

    requestAnimationFrame(updateSvgPositions); // Continue the animation
  }
});
