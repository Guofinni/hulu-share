import { HuluNode } from '../types/index';

function setAttribute(element: HTMLElement, key: string, value: any) {
    if (/^on([A-Z][a-zA-Z]+)$/.test(key)) {
        const eventName = RegExp.$1.replace(/^[A-Z]/, (s) => s.toLowerCase());
        element.addEventListener(eventName, value);
        return;
    }
    element.setAttribute(key, String(value));
}

function __render(huluNode: HuluNode, root: HTMLElement): void {
    if (typeof huluNode === 'string' || typeof huluNode === 'number') {
        let txt = document.createTextNode(String(huluNode));
        root.appendChild(txt);
        return;
    }

    // 对 children 生成的虚拟dom进行处理
    if (typeof huluNode === 'object' && huluNode instanceof Array) {
        huluNode.forEach((child: HuluNode) => {
            __render(child, root);
        });
        return;
    }

    try {
        if (typeof huluNode.type === 'string') {
            let element = document.createElement(huluNode.type);

            // attribute
            Object.entries(huluNode.props ?? {}).forEach(([key, value]) => {
                setAttribute(element, key, value);
            });

            huluNode.children.forEach((child: HuluNode) => {
                __render(child, element);
            });

            root.appendChild(element);
            return;
        }

        if (typeof huluNode.type === 'function') {
            if (huluNode.type.prototype.render) {
                let comp = new huluNode.type();
                huluNode.children.forEach((child: HuluNode) => {
                    comp.appendChild(child);
                });
                Object.entries(huluNode.props ?? {}).forEach(([key, value]) => {
                    comp.setAttribute(key, value);
                });

                __render(comp.render(), root);
                return;
            }

            let _huluNode = huluNode.type();
            __render(_huluNode, root);
        }
    } catch (e) {
        console.debug('catch', huluNode, e);
        let txt = document.createTextNode(String(huluNode));
        root.appendChild(txt);
        return;
    }
}

function render(huluNode: HuluNode, container: HTMLElement | null) {
    let root = container ?? document.body;
    root.innerHTML = '';
    __render(huluNode, root);
}

export default render;
