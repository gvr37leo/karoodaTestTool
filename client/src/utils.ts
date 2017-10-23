function mod(number, modulus) {
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

function getFunctionDefinitions(){
    var steps: any = [
        {
            type: 'click',
            description: 'user clicks on element',
            parameters: [{
                type: 'text',
                name: 'id'
            }]
        }, {
            type: 'write',
            description: 'user writes text',
            parameters: [{
                type: 'text',
                name: 'id'
            }, {
                type: 'text',
                name: 'text to write'
            }]
        },{
            type:'switchtab',
            description:'user goes to tab',
            parameters: [{
                type: 'text',
                name: 'id'
            }]
        }
    ]
    return steps
}

