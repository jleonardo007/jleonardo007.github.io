const projects = document.getElementById('projects')

export default class UI{
    addProjects = (projectsCollection,index) =>{
        const project = projectsCollection[index]
       projects.innerHTML =
       `

            <a href=${project.url} target="_blank" class="project-link animated fadeIn">
                <img
                    class="project-image animated fadeIn"
                    src=${project.img}
                    alt="project"
                />
            </a>
            <div class="project-stack animated fadeIn">
                ${
                    project.stack.map(item =>{
                        return `<span class="iconify" data-icon=${item} data-inline="false"></span>`
                    }).join('')   
                }
            </div>
            <a class="project-title animated fadeIn" href="${project.url}" target="_blank">${project.title}</a>
       `
    }

    toggleSections = (hideSection,showSection) =>{
        hideSection.classList.add('hidden-section')
        showSection.classList.remove('hidden-section')
    }

    handleIndicator = (element,index,projects) =>{
        let maxWidth = projects.length
        let width = Math.round( (index + 1) * 100/maxWidth )

        element.style.width = `${Math.round(width)}%`
    }
}

