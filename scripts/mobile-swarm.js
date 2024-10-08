// Check if the device is mobile
if (/Mobi|Android/i.test(navigator.userAgent)) {
  document.addEventListener("DOMContentLoaded", () => {
    const swarmContainer = document.getElementById("mobile-swarm");
    const numSvgs = 7; // Number of SVGs to be created
    const svgs = []; // Store SVG elements

    // Function to create circles with different radii and unique colors
    function createShape(index) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "150");
      svg.setAttribute("height", "150");
      svg.setAttribute("viewBox", "0 0 200 200");

      // Random horizontal position
      svg.style.left = `${Math.random() * (window.innerWidth - 150)}px`;
      svg.style.top = `-200px`; // Start above the screen

      // Create circle element with random radius
      const radius = 60 + Math.random() * 40; // Random radius between 60 and 100
      const circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      circle.setAttribute("cx", "100");
      circle.setAttribute("cy", "100");
      circle.setAttribute("r", radius);

      // Assign unique colors to each circle
      const colors = [
        "#000BFF",
        "#FFCC00",
        "#B4FFB2",
        "#FF0000",
        "#DFC6FF",
        "#FF8A00",
        "#FFB7F8",
      ];
      circle.setAttribute("fill", colors[index % colors.length]);

      svg.appendChild(circle);
      return { svg, radius };
    }

    // Function to animate the falling circles
    function animateFall(circles) {
      function updatePositions() {
        let allCirclesExited = true; // To check if all circles have exited the screen

        circles.forEach((circleObj) => {
          // Apply variable falling speed with acceleration
          circleObj.velocity += circleObj.acceleration;
          circleObj.y += circleObj.velocity;

          // Update the position
          circleObj.svg.style.transform = `translateY(${circleObj.y}px)`;

          // Check if any circle is still on screen
          if (circleObj.y < window.innerHeight + circleObj.radius * 2) {
            allCirclesExited = false;
          } else {
            // Remove the circle from the DOM once it's completely out of the screen
            if (circleObj.svg.parentElement) {
              swarmContainer.removeChild(circleObj.svg);
            }
          }
        });

        // If all circles have exited, stop animation
        if (!allCirclesExited) {
          requestAnimationFrame(updatePositions); // Keep the animation running
        }
      }

      updatePositions();
    }

    // Initialize falling circles
    function initCircles() {
      const circleObjects = [];

      for (let i = 0; i < numSvgs; i++) {
        const { svg, radius } = createShape(i);
        swarmContainer.appendChild(svg);

        const circleObj = {
          svg: svg,
          radius: radius,
          y: -radius * 2, // Start position above the screen
          velocity: Math.random() * 9 + 1, // Random initial velocity (between 2 and 4)
          acceleration: 0.1 + Math.random() * 0.05, // Slightly different acceleration for each circle
        };

        circleObjects.push(circleObj);
      }

      // Start the fall animation
      animateFall(circleObjects);
    }

    // Start the animation when the page loads
    initCircles();
  });
}
