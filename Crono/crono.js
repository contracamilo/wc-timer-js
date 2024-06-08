import styles from "./styles.js";

class Crono extends HTMLElement {
    constructor() {
        super();
        let shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `<style>${styles}<style>`;

        let slot = document.createElement('slot');
        this.startPauseButton = document.createElement('wc-button');
        this.restartButton = document.createElement('wc-button');

        let buttonContainer = document.createElement('div');
        buttonContainer.classList.add('content-buttons');

        shadowRoot.appendChild(slot);
        buttonContainer.appendChild(this.startPauseButton);
        buttonContainer.appendChild(this.restartButton);
        shadowRoot.appendChild(buttonContainer);

        this.counter = 0;
        
        this.handleStartAndPauseClick = this.handleStartAndPauseClick.bind(this);
        this.handleReStartClick = this.handleReStartClick.bind(this);

    }

    connectedCallback() {
        this.startPauseButton.label = "Start";
        this.restartButton.label = "Restart";

        this.startPauseButton.addEventListener('buttonClick', this.handleStartAndPauseClick);
        this.restartButton.addEventListener('buttonClick', this.handleReStartClick);
    }

    handleStartAndPauseClick(event) {
        if(event.detail.label === "Start"){
            this.startPauseButton.label = "Pause";
            this.interval = setInterval(() => {
                this.counter++;
                this.dispatchEvent(new CustomEvent('update-time', { 
                    bubbles: true,
                    detail: { counter: this.counter } 
                }));
            }, 10);
        }else {
            clearInterval(this.interval);
            this.startPauseButton.label = "Start";

        }
        event.stopPropagation();
    }

    handleReStartClick(event) {
        this.counter = 0;
        this.interval = setInterval(() => {
            this.dispatchEvent(new CustomEvent('update-time', { 
                bubbles: true,
                detail: { counter: this.counter } 
            }));
        }, 10);
        event.stopPropagation();
    }
}

export default Crono;