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
      const addStylesIfRepoDoesNotExist = item.projectRepository === null && "display: none";

      projectsContainer.innerHTML += `
      
        <article class="project-item animated fadeIn">
          <div class="project-item__img-container">
            <img class="project-item__img" src="${item.imgPath}"/>
            <a
              class="project-item__repository-link" style=" ${addStylesIfRepoDoesNotExist}"
              rel="noopener"
              target="_blank"
              tabindex=${index + 1}
              href="
                ${item.projectRepository === null ? "javascript:void(0)" : item.projectRepository}"
              >
                View on <span class="iconify" data-icon="mdi:github-circle" data-inline="true">
            </a>
          </div>
          <a
            class="project-item__title"
            rel="noopener"
            target="_blank" 
            tabindex=${index + 1}
            href="${item.projectUrl}"
          >
            ${item.title}
          </a>
        </article>
      
      `;
    });
  };

  getProjectsCollectionSlice(status) {
    projectsContainer.innerHTML = "";

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

  handleProgressBar = (end) => {
    const currentLength = end > this.slice.length ? this.slice.length + this.start : end;
    let maxWidth = projectsCollection.length;
    let currentWidth = Math.round((currentLength * 100) / maxWidth);

    progressBar.style.width = `${currentWidth}%`;
  };
}
