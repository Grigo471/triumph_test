export class TemplatesList extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `<h3>Templates</h3>
        <div class="templatesWrapper"></div>
        <div class="templatesToolbar">
            <button class="add">+</button>
            <button class="delete">-</button>
        </div>`;

        this.renderTemplates();

        const [addBtn, deleteBtn] = this.querySelectorAll('.templatesToolbar button');

        addBtn.addEventListener('click', () => {
            this.addTemplate();
        })

        deleteBtn.addEventListener('click', () => {
            this.deleteTemplate();
        })
    }

    renderTemplates() {
        const wrapper = this.children[1];
        ['template 1', 'template 2', 'template 3'].forEach((template) => {
            const button = this.createTemplateBtn(template);
            wrapper.appendChild(button);
        })
    }

    createTemplateBtn(templateText) {
        let button = document.createElement('button');
        button.textContent = templateText;
        button.className = 'templateBtn';
        button.setAttribute('key', Date.now().toString(36) + Math.random().toString(36).slice(2));
        button.addEventListener('click', (e) => {
            this.pickTemplate(e.currentTarget);
        })
        return button;
    }

    pickTemplate(target) {
        if (this.picked) this.picked.className = 'templateBtn';
        target.classList.add('active');
        if (!this.editor) {
            this.editor = document.querySelector('template-editor');
        }
        this.editor.pickTemplate(target);
        this.picked = target;
    }

    addTemplate() {
        const templates = this.querySelector('.templatesWrapper').children;
        const templateText = `template ${templates.length + 1}`;
        const button = this.createTemplateBtn(templateText);
        const wrapper = this.children[1];
        wrapper.appendChild(button);
        this.addTemplateToDropdowns(templateText, button.getAttribute('key'));
    }

    deleteTemplate() {
        if (this.picked) {
            const key = this.picked.getAttribute('key');
            this.picked.remove();
            this.deleteTemplateFromDropdowns(key);
            this.editor.clearEditor();
            this.picked = null;
        }
    }

    updateTemplate(template, value) {
        template.textContent = value;
        this.updateTemplateOfDropdowns(template.getAttribute('key'), value);
    }

    addTemplateToDropdowns(templateText, key) {
        const dropdowns = document.querySelector('iframe').contentDocument.querySelectorAll('select');
        for (const dropdown of dropdowns) {
            dropdown.addOption(templateText, key);
        }
    }

    deleteTemplateFromDropdowns(key) {
        const dropdowns = document.querySelector('iframe').contentDocument.querySelectorAll('select');
        for (const dropdown of dropdowns) {
            dropdown.deleteOption(key);
        }
    }

    updateTemplateOfDropdowns(key, value) {
        const dropdowns = document.querySelector('iframe').contentDocument.querySelectorAll('select');
        for (const dropdown of dropdowns) {
            dropdown.updateOption(key, value);
        }
    }
}