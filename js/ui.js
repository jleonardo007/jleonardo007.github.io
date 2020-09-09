import projectsCollection from "./projects_collection.js";

const projectsContainer = document.querySelector(".projects-container");
const progressBar = document.getElementById("progress_bar");

export default class UI {
  //Properties to handle pagination
  slice = [];
  start = 0;
  end = 0;
  projectsAmound = projectsCollection.length;

  addProjects = (projectsCollectionSlice) => {
    const sliceCopy = [...projectsCollectionSlice];

    sliceCopy.map((item, index) => {
      const ProjectImage = `
      background: url(${item.imgPath});
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    `;

      const addStylesIfRepoExist =
        item.projectRepository == null ? "display: none" : null;

      projectsContainer.innerHTML += `
      
      <article class="project-item animated fadeIn">
        <div class="project-item__img" style="${ProjectImage}">
            <div class="img__background-color" style="${addStylesIfRepoExist}">
               <a
                  rel="noopener"
                  target="_blank"
                  href="
                    ${
                      item.projectRepository == null
                        ? "javascript:void(0)"
                        : item.projectRepository
                    }"
                  class="project-item__repository-link" style=" ${addStylesIfRepoExist}">
                  View on <span class="iconify" data-icon="mdi:github-circle" data-inline="true">
                </a>
            </div>
        </div>
          <a
            rel="noopener"
              target="_blank" 
              href="${item.projectUrl}"
              class="project-item__title"
          >
            ${item.title}
          </a>
      </article>
      
      `;
    });
  };

  getProjectsCollectionSlice(status) {
    projectsContainer.innerHTML = " ";

    switch (status) {
      case "next":
        if (window.innerWidth <= 800) {
          this.start = this.end;
          this.end += 2;
          this.slice = projectsCollection.slice(this.start, this.end);
        }

        if (window.innerWidth >= 801 && window.innerWidth <= 1024) {
          this.start = this.end;
          this.end += 4;
          this.slice = projectsCollection.slice(this.start, this.end);
        }

        if (window.innerWidth >= 1025) {
          this.start = this.end;
          this.end += 6;
          this.slice = projectsCollection.slice(this.start, this.end);
        }

        break;

      case "previous":
        if (window.innerWidth <= 800) {
          this.start -= 2;
          this.end -= 2;
          this.slice = projectsCollection.slice(this.start, this.end);
        }

        if (window.innerWidth >= 801 && window.innerWidth <= 1024) {
          this.start -= 4;
          this.end -= 4;
          this.slice = projectsCollection.slice(this.start, this.end);
        }

        if (window.innerWidth >= 1025) {
          this.start -= 6;
          this.end -= 6;
          this.slice = projectsCollection.slice(this.start, this.end);
        }
        break;
    }
    this.handleProgressBar(this.end);
    this.addProjects(this.slice);
  }

  toggleSections = (hideSection, showSection) => {
    hideSection.classList.add("hidden-section");
    showSection.classList.remove("hidden-section");
  };

  handleProgressBar = (currentLength) => {
    let maxWidth = projectsCollection.length;
    let currentWidth = Math.round((currentLength * 100) / maxWidth);

    progressBar.style.width = `${currentWidth}%`;
  };
}
