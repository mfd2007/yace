/*
MIT License

Copyright (c) 2018 Andy Bell

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

https://github.com/Andy-set-studio/vanilla-js-state-management

*/

// We're importing the store Class here so we can test against it in the constructor
import Store from '../store/store.js';

export default class Component {
    constructor(props = {}) {
        let self = this;

        // We're setting a render function as the one set by whatever inherits this base
        // class or setting it to an empty by default. This is so nothing breaks if someone
        // forgets to set it.
        this.render = this.render || function() {};
        
        // If there's a store passed in, subscribe to the state change
        if(props.store instanceof Store) {
            props.store.events.subscribe('stateChange', () => self.render());
        }
        
        // Store the HTML element to attach the render to if set
        if(props.hasOwnProperty('element')) {
            this.element = props.element;
        }
    }
}
