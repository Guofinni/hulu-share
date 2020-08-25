import Hulu from './hulu';
import { HuluNode } from './types/index';

/** - -- - ---------------- */

const a = (
    <div>
        {true} {1} {{}}
        a
        <br />b 江山如此多娇
        <ol>
            <li tabIndex={1}>1</li>
            <li tabIndex={2}>2</li>
            <li>3</li>
            <li>4</li>
        </ol>
    </div>
);

/** - -- - ---------------- */

function Def() {
    return (
        <div>
            <header>静夜思</header>
        </div>
    );
}

/** - -- - ---------------- */

interface UserInfoProps {
    name: string;
    count: number;
}

class UserInfo extends Hulu.Component<UserInfoProps, {}> {
    constructor(props: UserInfoProps) {
        super(props);
    }
    render(): HuluNode {
        return (
            <div>
                {this.props.name} ... {this.props.count}
            </div>
        );
    }
}

/** - -- - ---------------- */

interface AbcProps {
    aaa: number;
    bbb: string;
    ccc?: Record<string, any>;
    children: HuluNode[];
}

interface AbcState {
    ddd: string;
    count: number;
}

class Abc extends Hulu.Component<AbcProps, AbcState> {
    constructor(props: AbcProps) {
        super(props);
    }

    state: AbcState = {
        ddd: 'i am ddd',
        count: 1
    };

    render() {
        return (
            <div>
                <div>{this.props.aaa}</div>
                <div>{this.props.bbb}</div>
                {a} {this.props.children}
                <p
                    onClick={() => {
                        this.setState({
                            count: this.state.count + 1
                        });
                    }}>
                    {this.state.ddd} ::: {this.state.count}
                </p>
                <UserInfo name="张三" count={this.state.count}></UserInfo>
            </div>
        );
    }
}

Hulu.render(
    <Abc aaa={1111} bbb={'sss'} ccc={{ d: 1 }}>
        <div>引无数英雄竞折腰</div>
        <Def>
            <ul>
                <li>床前明月光</li>
                <li>疑似地上霜</li>
            </ul>
        </Def>
    </Abc>,
    document.getElementById('root')
);
