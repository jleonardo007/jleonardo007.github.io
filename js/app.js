import UI from './ui.js'
import projects from './projects_collection.js'
const ui = new UI()
const devSection = document.querySelector('.developer-section')
const projectsSection = document.querySelector('.projects-section')
const aboutSection =  document.querySelector('.about-section')
const indicator = document.getElementById('indicator')
const click = document.getElementById('click_projects')

let projectIndex = 0
let showDevSection = false
let showAboutSection = false

//Swipe parameters
let referenceX = 0
let currentX = 0
let diffX = 0

const restetSwipeParameters = () => {
    referenceX = 0
    currentX = 0
    diffX = 0
}

//Click the angle-down button
click.addEventListener('click', () =>{
    ui.toggleSections(devSection,projectsSection)
    ui.handleIndicator(indicator,projectIndex,projects)
    ui.addProjects(projects,projectIndex)
})

//Handle mouse wheel detection
devSection.addEventListener('wheel', e =>{
    if(e.deltaY > 0){
        ui.toggleSections(devSection,projectsSection)
    }
    ui.handleIndicator(indicator,projectIndex,projects)
    ui.addProjects(projects,projectIndex)
})

projectsSection.addEventListener('wheel', e =>{
    if( e.deltaY < 0){
        projectIndex--
        if( projectIndex < 0) {
            projectIndex = 0
            showDevSection = true
        }
    }
    else{
        projectIndex++
        if(projectIndex > projects.length - 1){
            projectIndex = projects.length -1
            showAboutSection = true
        }
    }

    if(e.deltaY < 0 && showDevSection){
        ui.toggleSections(projectsSection,devSection)
        showDevSection = false
    }

    if(e.deltaY > 0 && showAboutSection){
        ui.toggleSections(projectsSection,aboutSection)
        showAboutSection = false
    }
    ui.addProjects(projects,projectIndex)
    ui.handleIndicator(indicator,projectIndex,projects)
})

aboutSection.addEventListener('wheel', e =>{
    if(e.deltaY < 0){
        projectIndex = projects.length - 1
        ui.toggleSections(aboutSection,projectsSection)
    }

    ui.addProjects(projects,projectIndex)
})

//Handle finger swipe detection 
document.addEventListener('touchstart', e =>{
    referenceX = e.touches[0].clientX
})

document.addEventListener('touchend', () =>{
    restetSwipeParameters()
})

devSection.addEventListener('touchmove', e =>{
    currentX = e.touches[0].clientX
    diffX = currentX - referenceX

    if(diffX < 0){
        projectIndex--
        if(projectIndex < 0 ) projectIndex = 0
        ui.toggleSections(devSection,projectsSection)
    }
    ui.handleIndicator(indicator,projectIndex,projects)
    ui.addProjects(projects,projectIndex)
})

projectsSection.addEventListener('touchmove', e =>{
    currentX = e.touches[0].clientX
    diffX = currentX - referenceX
    
    if(diffX < 0 && currentX > 0){
        projectIndex++
        if(projectIndex > projects.length - 1){
            projectIndex = projects.length - 1
            showAboutSection = true
        }
    }
    else if(diffX > 0){
        projectIndex--
        if(projectIndex < 0) {
            projectIndex = 0
            showDevSection = true
        }
    }

    if(diffX > 0 && showDevSection){
        ui.toggleSections(projectsSection,devSection)
        showDevSection = false
    }

    if(diffX < 0 && showAboutSection){
        ui.toggleSections(projectsSection,aboutSection)
        showAboutSection = false
    }
    ui.addProjects(projects,projectIndex)
    ui.handleIndicator(indicator,projectIndex,projects)

})

aboutSection.addEventListener('touchmove', e =>{
    currentX = e.touches[0].clientX
    diffX = currentX - referenceX

    if(diffX > 0 && currentX > 0){
        projectIndex = projects.length - 1
        ui.toggleSections(aboutSection,projectsSection)
    }

    ui.addProjects(projects,projectIndex)
})