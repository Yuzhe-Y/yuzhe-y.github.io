

const content_dir = 'contents/'
const config_file = 'config.yml'
const section_names = ['home', 'publications', 'awards']

function showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '<div class="loading-container"><div class="loading-spinner"></div></div>';
    }
}

function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = `<div style="color: var(--text-light); text-align: center; padding: 2rem;">${message}</div>`;
    }
}

function setContentLoaded(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add('content-loaded');
    }
}


window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });


    // Yaml
    fetch(content_dir + config_file)
        .then(response => {
            if (!response.ok) throw new Error('Failed to load configuration');
            return response.text();
        })
        .then(text => {
            const yml = jsyaml.load(text);
            Object.keys(yml).forEach(key => {
                try {
                    document.getElementById(key).innerHTML = yml[key];
                } catch {
                    console.log("Unknown id and value: " + key + "," + yml[key].toString())
                }
            })
        })
        .catch(error => {
            console.error('Configuration loading error:', error);
        });


    // Marked
    marked.use({ mangle: false, headerIds: false })
    section_names.forEach((name, idx) => {
        const contentElement = name + '-md';
        showLoading(contentElement);
        
        fetch(content_dir + name + '.md')
            .then(response => {
                if (!response.ok) throw new Error(`Failed to load ${name}.md`);
                return response.text();
            })
            .then(markdown => {
                const html = marked.parse(markdown);
                document.getElementById(contentElement).innerHTML = html;
                setContentLoaded(contentElement);
            })
            .then(() => {
                MathJax.typeset();
            })
            .catch(error => {
                console.error(`Error loading ${name}:`, error);
                showError(contentElement, `Unable to load content. Please refresh the page.`);
            });
    })

}); 
