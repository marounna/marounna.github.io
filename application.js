const header = document.querySelector('h1')
const app = document.getElementById('app')
const barMenu = document.getElementById('barMenu')
const darkMode = document.getElementById('darkMode')
const ddMenu = document.querySelector('#ddMenu')
const sandwitch = document.querySelectorAll('svg')
const html = document.documentElement

//toggles the theme of the website
const toggle = () => html.classList.toggle('dark')

//setview sets the screen based on the button
const setView = (v) => {
    header.innerText = v
    toggleMenu(true)

    if (v === 'Calculator') {
        renderCalculator()
    } else if (v === 'About') {
        renderAbout()
    } else if (v === 'Contact') {
        renderContact()
    }
}

window.setView = setView

//depends on screen size it toggles the ddmenu
const toggleMenu = (hide) => {
    if (!hide) {
        ddMenu.classList.toggle('hidden')
        sandwitch.forEach((el) => {
            el.classList.toggle('hidden')
        })
    } else {
        ddMenu.classList.add('hidden')
        sandwitch[0].classList.remove('hidden')
        sandwitch[1].classList.add('hidden')
    }
}

//simply adds a div that contains buttons.
const addRow = (container, content) => {
    const row = `<div class='grid grid-cols-5 gap-2'>${content}</div>`
    container.insertAdjacentHTML('beforeend', row)
}
//adds the monitor that display all the calculations
const addMonitor = (container, text) => {
    const t = text ?? ''
    const monitor = `<div id='monitor' class="bg-white border-4 border-blue-400 h-20 flex items-center col-span-5 text-blue-800 p-2 rounded-lg mb-2 font-bold text-4xl">${t}</div>`
    container.insertAdjacentHTML('beforeend', monitor)
}
//creates a div for buttons if its the calculate button it gives it more cols.
const button = (text) => {
    const c = text === 'calculate' ? 'col-span-4' : ''
    return `<div class='bg-blue-400 hover:bg-blue-600 text-white ${c} py-1 rounded-md text-center text-lg font-bold cursor-pointer d-btn'>${text}</div>`
}
//adds all buttons together and makes a string.
const addButtons = (container, nums) => {
    const btnHTML = nums.map((n) => button(n)).join('')
    addRow(container, btnHTML)
}

//when we click on button this func is executed and depends on the event it does the action.
const click = (event) => {
    const monitor = document.getElementById('monitor')
    const bac = monitor.innerText.trim()
    const a = event.target.innerText
    console.log(a)
    if (a === 'clear') {
        monitor.innerText = ''
    } else if (a === 'calculate') {
        monitor.innerText = bac + '=' + eval(bac)
    } else {
        monitor.innerText += a
    }
}

//creates the calculator by adding the monitor and buttons.
const renderCalculator = () => {
    const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '+', '-', '*', '/', '**', 'calculate', 'clear']
    app.innerHTML = ''
    addMonitor(app)
    addButtons(app, labels)
    const buttons = document.querySelectorAll('.d-btn')
    buttons.forEach((el) => el.addEventListener('click', click))
}
//about page
const renderAbout = () => {
    app.innerHTML = '<div class="p-4 h-[200px] flex items-center justify-center">Temp for About</div>'
}
//contact page
const renderContact = () => {
    app.innerHTML = '<div class="p-4 h-[200px] flex items-center justify-center">Temp for Contact</div>'
}

//create buttons for the bar menu and changes the view whhen clicked on. 
const menuButton = (text) => `<button onclick="setView('${text}')"> ${text} </button>`

//creates buttons for the dropdown menu and does the same as bar buttons.
const ddMenuButton = (text) => `<button  class="block py-1 px-2" onclick="setView('${text}')"> ${text} </button>`;


//changes between dark and light theme.
const darkModeButton = () => {
        return `<button class="dark:hidden block" onclick="toggle()">Dark</button>
                <button class="hidden dark:block" onclick="toggle()">Light</button>`
}

//menus for the sites.
const renderMenu = () => {
    const buttons = ['Calculator','About','Contact'];
    const barBtns = buttons.map((btn)=>menuButton(btn)).join('');
    const ddBtns = buttons.map((btn)=>ddMenuButton(btn)).join('');
    barMenu.innerHTML = barBtns;
    ddMenu.innerHTML = ddBtns;
    ddMenu.classList.add('hidden')
}
//dark/light theme
const renderThemeToggle = () => {
    darkMode.innerHTML = darkModeButton()
}

renderMenu()
renderThemeToggle()
renderCalculator()
