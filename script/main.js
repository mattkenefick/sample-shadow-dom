
import MyFormElement from './component/my-form.js';
import MyInputElement from './component/my-input.js';


// Instantiate Templates
// ----------------------------------------------------------------------------

Array.from(document.getElementsByTagName('template')).forEach(element => {
	// Convert "my-paragraph" to "MyParagraphElement"
	const className = element.id
		.replace(/^([a-z])/, m => m.toUpperCase())
		.replace(/-([a-z])/g, m => m.toUpperCase())
		.replace('-', '')
		+ 'Element';

	const reference = eval(className);

	reference.attach();
});


// Instantiate Remote Templates
// ----------------------------------------------------------------------------

MyInputElement.attachRemote('./view/component/my-input.html');
