
/**
 * Base class for our shadow elements
 *
 * @author Matt Kenefick <medium.com/@mattkenefick>
 * @extends HTMLElement
 */
export default class CustomHtmlElement extends HTMLElement
{
	/**
	 * @param HTMLElement template
	 * @return void
	 */
	static attach(template) {
        if (!template) {
			// Convert MyParagraphElement to my-paragraph
			const tagName = this.name
				.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
				.toLowerCase()
				.replace(/-?element/, '');

			template = document.querySelector(`#${tagName}`);
		}

		// Save template reference
		this.template = template;

		// Create shadow object
		customElements.define(this.template.id, this);
	}

    /**
     * Attempt to attach template over the network.
     * It attempts to derive an HTML tag from the filename,
     * but we could do anything here.
     *
     * @param string filename
     */
    static async attachRemote(filename) {
        const filenameMatches = filename.match(/\/([^\.\/]+)\.html/i);

        if (filenameMatches) {
            const id = filenameMatches[1];
            const response = await fetch(filename);
            const text = await response.text();
            const fragment = document.createElement('template');
            fragment.innerHTML = text;
            fragment.id = id;

            this.attach(fragment);
        }
    }

	/**
	 * @return void
	 */
	constructor() {
		super();

		// Clone element from our template
		this.templateNode = this.constructor.template.content.cloneNode(true);

		// Make shadow
		this.attachShadow({ mode: 'open' }).appendChild(this.templateNode);
	}
}
