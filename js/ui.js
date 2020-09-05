import projectsCollection from "./projects_collection.js";

const projects = document.querySelector(".projects-container");
const indicator = document.getElementById("indicator");

export default class UI {
  addProjects = (index) => {
    const item = projectsCollection[index];

    const ProjectBackground = `
      background: url(${item.imgPath});
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    `;

    const addClassesIfRepoExist =
      item.projectRepository == null ? "display: none" : null;

    projects.innerHTML = `
            <article class="project-item">
              <div class="project-item__img" style="${ProjectBackground}">
                <div class="img__background-color" style="${addClassesIfRepoExist}">
                  <a
                    rel="noopener" 
                    href="
                      ${
                        item.projectRepository == null
                          ? "javascript:void(0)"
                          : item.projectRepository
                      }"
                    class="
                      project-item__repository-link" style=" ${addClassesIfRepoExist}">
                    View on <span class="iconify" data-icon="mdi:github-circle" data-inline="true">
                  </a>
                </div>
              </div>
              <a
                rel="noopener"
                href="${item.projectUrl}"
                target="_blank" 
                class="project-item__title"
                >
                  ${item.title}
              </a>
            </article>
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
