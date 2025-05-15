export class DropDown extends HTMLSelectElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const templates = window.parent.document.querySelectorAll('.templatesWrapper .templateBtn');
        for (const template of templates) {
            let option = document.createElement("option");
            option.text = template.textContent;
            option.value = template.getAttribute('key');
            this.appendChild(option);
        }
        this.addEventListener('change', () => {
            const error = this.querySelector('option[value="ERROR"]');
            if (error) {
                error.remove();
            }
        })
    }

    addOption(optionText, key) {
        let option = document.createElement("option");
        option.text = optionText;
        option.value = key;
        this.appendChild(option);
    }

    deleteOption(key) {
        const option = this.querySelector(`option[value=${key}]`);
        if (this.value === option.value) {
            option.text = 'ERROR';
            option.value = 'ERROR';
        } else {
            option.remove();
        }
        
    }

    updateOption(key, optionText) {
        let option = document.querySelector(`option[value=${key}]`);
        option.text = optionText;
    }
}