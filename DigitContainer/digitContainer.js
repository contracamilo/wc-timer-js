import style from './styles.js';

class DigitContainer extends HTMLElement{
    constructor(){
        super();
        let shadowRoot = this.attachShadow({mode: "open"});
        shadowRoot.innerHTML = `<style>${style}</style><slot></slot>`;

        this.counter = 0;
        this.updateTime = this.updateTime.bind(this); // This is necessary to bind the updateTime method to the class instance
    }

    connectedCallback(){
        document.body.addEventListener('update-time', this.updateTime);
    };

    disconnectedCallback(){
        document.body.removeEventListener('update-time', this.updateTime);
    
    }

    updateTime(event){
        let time = this.formatTime(event.detail.counter);

        this.querySelector('#hourTens').number = Math.floor(time.hours / 10);
        this.querySelector('#hours').number = Math.floor(time.hours % 10);

        this.querySelector('#minutesTens').number = Math.floor(time.minutes / 10);
        this.querySelector('#minutes').number = Math.floor(time.minutes % 10);

        this.querySelector('#secondsTens').number = Math.floor(time.seconds / 10);
        this.querySelector('#seconds').number = Math.floor(time.seconds % 10);

        this.querySelector('#hundredthsTens').number = Math.floor(time.tens);
        this.querySelector('#hundredths').number = Math.floor(time.hundredths);
    };

    formatTime(counter){
        let hours, minutes, seconds, tens, hundredths;

        hundredths = counter % 10;
        tens = Math.floor(counter  % 100) / 10;
        seconds = Math.floor(counter / 100) % 60;
        minutes = Math.floor(counter / 6000) % 60;
        hours = Math.floor(counter / 360000);

        return {
            hours,
            minutes,
            seconds,
            tens,
            hundredths
        };
    }
}

export default DigitContainer;