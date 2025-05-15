export class TemplateEditor extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = '<h3>Edit templates</h3><input disabled class="editorInput"/>'
    }

    connectedCallback() {
        this.input = this.querySelector('input');

        this.input.addEventListener('focusout', (e) => {
            this.updateTemplate(e.currentTarget.value);
        });

        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') e.currentTarget.blur();
        })
    }

    pickTemplate(template) {
        this.currTemplate = template;
        this.input.value = template.textContent;
        this.input.disabled = false;
    }

    clearEditor() {
        this.input.value = '';
        this.input.disabled = true;
    }

    updateTemplate(value) {
        if (this.currTemplate && this.currTemplate.value !== value) {
            const optionsList = document.querySelector('templates-list');
            optionsList.updateTemplate(this.currTemplate, value);
        }
    }
}