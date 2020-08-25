import { HuluNode } from '../types/index';
import render from './render';

class Component<P = {}, S = {}> {
    readonly props: Readonly<P> & Readonly<{ children?: HuluNode }>;
    state: S & {} = {};

    constructor(props: Readonly<P>) {
        this.props = props ?? {};
    }

    /**
     * 获取props
     * @param key
     * @param value
     */
    setAttribute(key: string, value: any): void {
        // @ts-ignore
        this.props[key] = value;
    }

    /**
     * 将children从虚拟dom写到类信息里
     */
    appendChild(child: HuluNode): void {
        if (!this.props?.children) {
            this.props['children'] = [];
        }
        this.props.children.push(child);
    }

    setState(state: Readonly<Partial<S>>) {
        Object.assign(this.state, state);
        this.update();
    }

    update() {
        render(this.render(), document.getElementById('root'));
    }

    render(): HuluNode {
        return;
    }
}

export default Component;
