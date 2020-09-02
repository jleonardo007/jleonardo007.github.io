import projectsCollection from "./projects_collection.js";

const projects = document.querySelector(".projects-section");
const indicator = document.getElementById("indicator");

export default class UI {
  addProjects = (index) => {
    const project = projectsCollection[index];
    projects.innerHTML = `
            
        `;
  };

  toggleSections = (hideSection, showSection) => {
    hideSection.classList.add("hidden-section");
    showSection.classList.remove("hidden-section");
  };

  handleIndicator = (index) => {
    let maxWidth = projectsCollection.length;
    let width = Math.round(((index + 1) * 100) / maxWidth);

    indicator.style.width = `${Math.round(width)}%`;
  };
}
