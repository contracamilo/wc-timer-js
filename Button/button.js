import styles from "./styles.js";

class Button extends HTMLElement {
    constructor() {
        super();
        let shadowRoot = this.attachShadow({mode: "open"});
        this.button = document.createElement("button");

        shadowRoot.innerHTML = `<style>${styles}</style>`;
        shadowRoot.appendChild(this.button);
    }
    
    connectedCallback(){
       this.addEventListener("click", this.handleClick);
    }

    handleClick(event){
        event.preventDefault();
        event.stopPropagation();

        this.dispatchEvent(new CustomEvent("buttonClick", {
            bubbles: true, // controls if the event bubbles up through the DOM or not
            composed: true, 
            detail: {
                label: this.label
            }
        }));
    }
    
    get label(){
       return this.getAttribute("label");
    }

    set label(value){
        this.setAttribute("label", value);
    }

    static get observedAttributes(){
        return ["label"];
    }

    updateButton(oldValue, newValue){
        if(oldValue !== newValue){
            this.button.innerText= newValue;
        }
        
    }

    attributeChangedCallback(name, oldValue, newValue){
        switch(name){
            case "label":
                this.updateButton(oldValue, newValue);
                break;
        }
    }
}

export default Button;
