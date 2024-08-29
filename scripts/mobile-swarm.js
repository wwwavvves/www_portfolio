document.addEventListener("DOMContentLoaded", () => {
  const swarmContainer = document.getElementById("mobile-swarm");

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    // Mobile-specific animation
    let touchActive = false;

    function createCircle(x, y) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "40");
      svg.setAttribute("height", "40");
      svg.setAttribute("viewBox", "0 0 40 40");
      svg.classList.add("mobile-swarm");

      const circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      circle.setAttribute("cx", "20");
      circle.setAttribute("cy", "20");
      circle.setAttribute("r", "20");
      circle.setAttribute("fill", "#000BFF"); // Blue color
      svg.appendChild(circle);

      svg.style.transform = `translate(${x}px, ${y}px)`;
      swarmContainer.appendChild(svg);

      setTimeout(() => {
        svg.style.transition = "transform 2s linear, opacity 2s linear";
        svg.style.transform = `translate(${x}px, ${window.innerHeight + 50}px)`;
        svg.style.opacity = "0";
        setTimeout(() => {
          swarmContainer.removeChild(svg);
        }, 2000);
      }, 100);
    }

    document.addEventListener("touchstart", (event) => {
      touchActive = true;
      const touch = event.touches[0];
      createCircle(touch.clientX, touch.clientY);
    });

    document.addEventListener("touchmove", (event) => {
      if (touchActive) {
        const touch = event.touches[0];
        createCircle(touch.clientX, touch.clientY);
      }
    });

    document.addEventListener("touchend", () => {
      touchActive = false;
    });
  } else {
    // Desktop-specific animation
    const numSvgs = 7; // Number of SVGs in the swarm
    const delay = 3; // Delay in frames for each SVG
    const positions = []; // Array to store mouse positions
    const svgs = []; // Array to store SVG elements
    let initialMousePos = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    // Initialize the array with initial mouse position
    for (let i = 0; i < numSvgs * delay; i++) {
      positions.push({ x: initialMousePos.x, y: initialMousePos.y });
    }

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

    // Update the positions array with the current mouse position
    document.addEventListener("mousemove", (event) => {
      positions.push({ x: event.clientX, y: event.clientY });
      positions.shift(); // Remove the oldest position to keep the array length constant
    });

    // Function to update the SVG positions with spring physics
    function updateSvgPositions() {
      if (positions.length === 0) return; // Stop if there are no positions

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

    updateSvgPositions(); // Start the animation for desktop
  }
});
