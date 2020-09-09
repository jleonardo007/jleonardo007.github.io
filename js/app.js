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

const resetSwipeParameters = () => {
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
  ui.getProjectsCollectionSlice("next");
});

//Handle mouse wheel detection
document.addEventListener("wheel", (e) => {
  switch (e.target.offsetParent) {
    case devSection:
      if (e.deltaY > 0) {
        ui.toggleSections(devSection, projectsSection);
        ui.getProjectsCollectionSlice("next");
      }
      break;

    case projectsSection:
      if (e.deltaY < 0) {
        showDevSection = ui.start == 0 ? true : false;
        ui.getProjectsCollectionSlice("previous");
      } else {
        showAboutSection = ui.end >= ui.projectsAmound ? true : false;
        ui.getProjectsCollectionSlice("next");
      }

      if (showDevSection) {
        ui.toggleSections(projectsSection, devSection);
        ui.start = 0;
        ui.end = 0;
        showDevSection = false;
      }

      if (showAboutSection) {
        ui.toggleSections(projectsSection, aboutSection);
        showAboutSection = false;
      }
      break;

    case aboutSection:
      if (e.deltaY < 0) {
        ui.toggleSections(aboutSection, projectsSection);
        ui.getProjectsCollectionSlice("previous");
      }
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
    //diffY = -+5 prevents vertical swipe
    switch (e.target.offsetParent) {
      case devSection:
        if (diffX < 0 && diffY > -5 && diffY < 5) {
          ui.getProjectsCollectionSlice("next");
          ui.toggleSections(devSection, projectsSection);
        }
        break;

      case projectsSection:
        if (diffX < 0 && diffY > -5 && diffY < 5) {
          showAboutSection = ui.end >= ui.projectsAmound ? true : false;
          ui.getProjectsCollectionSlice("next");
        } else if (diffY > -5 && diffY < 5) {
          showDevSection = ui.start == 0 ? true : false;
          ui.getProjectsCollectionSlice("previous");
        }

        if (showDevSection) {
          ui.toggleSections(projectsSection, devSection);
          ui.start = 0;
          ui.end = 0;
          showDevSection = false;
        }

        if (showAboutSection) {
          ui.toggleSections(projectsSection, aboutSection);
          showAboutSection = false;
        }
        break;

      case aboutSection:
        if (diffX > 0 && diffY > -5 && diffY < 5) {
          ui.getProjectsCollectionSlice("previous");
          ui.toggleSections(aboutSection, projectsSection);
        }
        break;
    }
    isPushed = true;
  }
});

document.addEventListener("touchend", () => {
  resetSwipeParameters();
});
