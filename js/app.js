import UI from "./ui.js";
import projects from "./projects_collection.js";

const ui = new UI();
const devSection = document.querySelector(".developer-section-bg");
const projectsSection = document.querySelector(".projects-section");
const aboutSection = document.querySelector(".about-section");
const click = document.getElementById("click_projects");

let projectIndex = 0;
let showDevSection = false;
let showAboutSection = false;

//Swipe parameters
let referenceX = 0;
let currentX = 0;
let diffX = 0;
let referenceY = 0;
let currentY = 0;
let diffY = 0;
let isPushed = false;

const restetSwipeParameters = () => {
  referenceX = 0;
  currentX = 0;
  diffX = 0;
  referenceY = 0;
  currentY = 0;
  diffY = 0;
  isPushed = false;
};

//Click the angle-down button to show projects section
click.addEventListener("click", () => {
  ui.toggleSections(devSection, projectsSection);
  ui.handleProgressBar(projectIndex);
  ui.addProjects(projectIndex);
});

//Handle mouse wheel detection
document.addEventListener("wheel", (e) => {
  switch (e.target.offsetParent) {
    case devSection:
      if (e.deltaY > 0) {
        ui.toggleSections(devSection, projectsSection);
      }
      ui.handleProgressBar(projectIndex);
      ui.addProjects(projectIndex);
      break;

    case projectsSection:
      if (e.deltaY < 0) {
        projectIndex--;
        if (projectIndex < 0) {
          projectIndex = 0;
          showDevSection = true;
        }
      } else {
        projectIndex++;
        if (projectIndex > projects.length - 1) {
          projectIndex = projects.length - 1;
          showAboutSection = true;
        }
      }

      if (e.deltaY < 0 && showDevSection) {
        ui.toggleSections(projectsSection, devSection);
        showDevSection = false;
      }

      if (e.deltaY > 0 && showAboutSection) {
        ui.toggleSections(projectsSection, aboutSection);
        showAboutSection = false;
      }

      ui.addProjects(projectIndex);
      ui.handleProgressBar(projectIndex);
      break;

    case aboutSection:
      if (e.deltaY < 0) {
        projectIndex = projects.length - 1;
        ui.toggleSections(aboutSection, projectsSection);
      }

      ui.addProjects(projectIndex);
      break;
  }
});

//Handle finger swipe detection
document.addEventListener("touchstart", (e) => {
  referenceX = e.touches[0].clientX;
  referenceY = e.touches[0].clientY;
});

document.addEventListener("touchmove", (e) => {
  currentX = e.touches[0].clientX;
  currentY = e.touches[0].clientY;
  diffX = currentX - referenceX;
  diffY = currentY - referenceY;

  if (!isPushed) {
    switch (e.target.offsetParent) {
      case devSection:
        if (diffX < 0 && diffY > -5 && diffY < 5) {
          projectIndex--;
          if (projectIndex < 0) {
            projectIndex = 0;
          }
        }
        ui.addProjects(projectIndex);
        ui.toggleSections(devSection, projectsSection);
        break;

      case projectsSection:
        if (diffX < 0 && diffY > -5 && diffY < 5) {
          projectIndex++;
          if (projectIndex > projects.length - 1) {
            projectIndex = projects.length - 1;
            showAboutSection = true;
          }
        } else if (diffY > -5 && diffY < 5) {
          projectIndex--;
          if (projectIndex < 0) {
            projectIndex = 0;
            showDevSection = true;
          }
        }

        if (diffX > 0 && showDevSection) {
          ui.toggleSections(projectsSection, devSection);
          showDevSection = false;
        }

        if (diffX < 0 && showAboutSection) {
          ui.toggleSections(projectsSection, aboutSection);
          showAboutSection = false;
        }
        ui.addProjects(projectIndex);
        ui.handleProgressBar(projectIndex);
        break;

      case aboutSection:
        if (diffX > 0 && diffY > -5 && diffY < 5) {
          projectIndex = projects.length - 1;
          ui.toggleSections(aboutSection, projectsSection);
        }
        ui.addProjects(projectIndex);
        ui.handleProgressBar(projectIndex);
        break;
    }
    isPushed = true;
  }
});

document.addEventListener("touchend", (e) => {
  restetSwipeParameters();
});
