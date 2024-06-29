const header = document.querySelector('h1');
const app = document.getElementById('app');
const ddMenu = document.querySelector('#ddMenu');
const html = document.documentElement;

/**
 * Toggles the dark mode theme by toggling the 'dark' class on the HTML element.
 */
const toggle = () => html.classList.toggle('dark');

/**
 * Sets the current view by updating the header and rendering the appropriate content.
 * @param {string} view - The view to be set (e.g., 'Calculator', 'About', 'Contact').
 */
const setView = (view) => {
    header.innerText = view;
    toggleMenu(true);

    if (view === 'Calculator') {
        renderCalculator();
    } else if (view === 'About') {
        renderAbout();
    } else if (view === 'Contact') {
        renderContact();
    }

    // Update the border color of the h1 element based on the current view
    if (view === 'Calculator') {
        header.style.borderColor = 'blue';
    } else if (view === 'About') {
        header.style.borderColor = 'yellow';
    } else if (view === 'Contact') {
        header.style.borderColor = 'green';
    }
};

/**
 * Toggles the visibility of the dropdown menu.
 * @param {boolean} hide - Indicates whether to hide the menu (true) or toggle its visibility (false).
 */
const toggleMenu = (hide) => {
    if (!hide) {
        ddMenu.classList.toggle('hidden');
        document.querySelectorAll('svg').forEach((el) => {
            el.classList.toggle('hidden');
        });
    } else {
        ddMenu.classList.add('hidden');
        document.querySelectorAll('svg')[0].classList.remove('hidden');
        document.querySelectorAll('svg')[1].classList.add('hidden');
    }
};

/**
 * Adds a row to the specified container with the provided content.
 * @param {HTMLElement} container - The container element to which the row will be added.
 * @param {string} content - The HTML content to be added as a row.
 */
const addRow = (container, content) => {
    const row = `<div class='grid grid-cols-5 gap-2'>${content}</div>`;
    container.insertAdjacentHTML('beforeend', row);
};

/**
 * Adds a monitor display to the specified container with optional text.
 * @param {HTMLElement} container - The container element to which the monitor will be added.
 * @param {string} [text] - The optional text to be displayed on the monitor.
 */
const addMonitor = (container, text) => {
    const t = text ?? '';
    const monitor = `<div id='monitor' class="bg-white dark:bg-gray-800 border-4 border-blue-400 dark:border-gray-400 h-20 flex items-center col-span-5 text-blue-800 dark:text-gray-100 p-2 rounded-lg mb-2 font-bold text-4xl">${t}</div>`;
    container.insertAdjacentHTML('beforeend', monitor);
};

/**
 * Creates a button element with the specified text.
 * @param {string} text - The text to be displayed on the button.
 * @returns {string} - The HTML string representing the button element.
 */
const button = (text) => {
    const c = text === 'calculate' ? 'col-span-4' : '';
    return `<div class='bg-blue-400 hover:bg-blue-600 text-white ${c} py-1 rounded-md text-center text-lg font-bold cursor-pointer d-btn'>${text}</div>`;
};

/**
 * Adds a series of buttons to the specified container based on the provided array of labels.
 * @param {HTMLElement} container - The container element to which the buttons will be added.
 * @param {string[]} labels - An array of labels for the buttons.
 */
const addButtons = (container, labels) => {
    const btnHTML = labels.map((n) => button(n)).join('');
    addRow(container, btnHTML);
};

/**
 * Handles the click event for the calculator buttons, updating the monitor display based on the button clicked.
 * @param {Event} event - The click event triggered by a button.
 */
const click = (event) => {
    const monitor = document.getElementById('monitor');
    const currentText = monitor.innerText.trim();
    const buttonText = event.target.innerText;
    if (buttonText === 'clear') {
        monitor.innerText = '';
    } else if (buttonText === 'calculate') {
        try {
            monitor.innerText = currentText + '=' + eval(currentText);
        } catch (error) {
            monitor.innerText = 'Error';
        }
    } else {
        monitor.innerText += buttonText;
    }
};

/**
 * Renders the calculator interface by adding a monitor and buttons to the app container.
 */
const renderCalculator = () => {
    const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '+', '-', '*', '/', '**', 'calculate', 'clear'];
    app.innerHTML = '';
    addMonitor(app);
    addButtons(app, labels);
    const buttons = document.querySelectorAll('.d-btn');
    buttons.forEach((el) => el.addEventListener('click', click));
};

/**
 * Renders the "About" view with temporary content.
 */
const renderAbout = () => {
    app.innerHTML = '<div class="p-4 h-[200px] flex items-center justify-center">Temp for About</div>';
};

/**
 * Renders the "Contact" view with temporary content.
 */
const renderContact = () => {
    app.innerHTML = '<div class="p-4 h-[200px] flex items-center justify-center">Temp for Contact</div>';
};

/**
 * Renders the top menu dynamically by adding buttons for each view (Calculator, About, Contact).
 */
const renderMenu = () => {
    const menuItems = ['Calculator', 'About', 'Contact'];
    const topMenu = document.getElementById('topMenu');
    const ddMenuContent = menuItems.map(item => `<button class="block py-1 px-2" onclick="setView('${item}')">${item}</button>`).join('');
    const topMenuContent = menuItems.map(item => `<button class="py-2 px-4" onclick="setView('${item}')">${item}</button>`).join('');
    ddMenu.innerHTML = ddMenuContent;
    topMenu.innerHTML = topMenuContent;
};

/**
 * Renders the dark/light theme toggle buttons dynamically.
 */
const renderThemeToggle = () => {
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.innerHTML = `
        <button class="dark:hidden block" onclick="toggle()">Dark</button>
        <button class="hidden dark:block" onclick="toggle()">Light</button>
    `;
};

// Initial render of the menu, theme toggle, and calculator
renderMenu();
renderThemeToggle();
renderCalculator();
