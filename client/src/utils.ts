function mod(number: number, modulus: number) {//% doesnt work with negative values
    if(modulus == 0)return 0;//to prevent errors
    return ((number % modulus) + modulus) % modulus;
}

function createAndAppend(element: HTMLElement, html: string): HTMLElement {
    var result = string2html(html);
    element.appendChild(result)
    return result;
}

function string2html(string): HTMLElement {
    var div = document.createElement('div')
    div.innerHTML = string;
    return div.children[0] as HTMLElement;
}

