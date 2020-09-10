import { createElement } from 'lwc';
import ShowPdfById from 'c/showPdfById';

describe('c-show-pdf-by-id', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('displays error details when errors are passed as parameters', () => {
        const FILE_ID = 'a056g00000FSIJMAA5';

        // Create initial element
        const element = createElement('c-show-pdf-by-id', {
            is: ShowPdfById
        });
        element.fileId = FILE_ID;
        document.body.appendChild(element);

        const inputEl = element.shadowRoot.querySelector('iframe');
        
        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise rejects.
        return Promise.resolve().then(() => {
            expect(inputEl.src).toBe('http://localhost/sfc/servlet.shepherd/document/download/a056g00000FSIJMAA5');
        });
    });

});