
import styles from "./styles.js";
import dotTemplate from "./template.js";

class Dot extends HTMLElement {
    constructor() {
        super();
        let shadowRoot = this.attachShadow({mode: "open"});
        shadowRoot.innerHTML = `<style>${styles}</style>${dotTemplate}`;
    }
}

export default Dot;

