import { DropDown } from "./DropDown";
import { TemplatesList } from "./TemplatesList";
import { TemplateEditor } from "./TemplateEditor";

customElements.define('custom-dropdown', DropDown, {extends: 'select'});
customElements.define('templates-list', TemplatesList);
customElements.define('template-editor', TemplateEditor);
