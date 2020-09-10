import { createElement } from 'lwc';
import ShowPdfRelatedToRecordId from 'c/showPdfRelatedToRecordId';
import { registerApexTestWireAdapter } from '@salesforce/sfdx-lwc-jest';
import getRelatedFilesByRecordId from '@salesforce/apex/PDFViewerController.getRelatedFilesByRecordId';

const mockgetRelatedFilesByRecordId = require('./data/PDFViewerController.json');

const getRelatedFilesByRecordIdAdapter = registerApexTestWireAdapter(getRelatedFilesByRecordId);

describe("c-show-pdf-related-to-record-id", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    jest.clearAllMocks();
  });

  it("displays a default friendly message", () => {
    const MESSAGE = "No related PDF file found"; // Create initial element
    const element = createElement("c-show-pdf-related-to-record-id", {
      is: ShowPdfRelatedToRecordId
    });
    document.body.appendChild(element);
    const messageEl = element.shadowRoot.querySelector("div");
    expect(messageEl.textContent).toBe(MESSAGE);
  });
});

  describe('getRelatedFilesByRecordId @wire data', () => {

        it('renders file data', () => {
          const element = createElement('c-show-pdf-related-to-record-id', {
            is: ShowPdfRelatedToRecordId
          });
          document.body.appendChild(element);
      
          // Emit data from @wire
          getRelatedFilesByRecordIdAdapter.emit(mockgetRelatedFilesByRecordId);
      
          return Promise.resolve().then(() => {
            // Select elements for validation
            const accountElements = element.shadowRoot.querySelectorAll('lightning-tab');
            expect(accountElements.length).toBe(mockgetRelatedFilesByRecordId.length);
            debugger;
          });
     
        });
    });
