import { LightningElement, api } from 'lwc';

export default class Card extends LightningElement {
    @api iconName;
    @api title;
    @api variant;
}
