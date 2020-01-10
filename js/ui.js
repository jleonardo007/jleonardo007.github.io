import projectsCollection from './projects_collection.js'

const projects = document.getElementById('projects')
const indicator = document.getElementById('indicator')

export default class UI{
    addProjects = index =>{
        
        const project = projectsCollection[index]
        projects.innerHTML =
        `
            <a href=${project.url} target="_blank" class="project-link animated fadeIn">
                <img
                    class="project-image animated fadeIn"
                    src=${project.img}
                    alt="${project.title}"
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

    handleIndicator = index =>{
        let maxWidth = projectsCollection.length
        let width = Math.round( (index + 1) * 100/maxWidth )

        indicator.style.width = `${Math.round(width)}%`
    }
}

