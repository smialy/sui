import { render } from 'preact';
import { Icon } from "@sui/icons";
import { App, AppBar, Nav, Page, SideBar, importStyles as importComonentStyles } from "@sui/components";
import { importStyles } from './styles';

const Logo = () => <div id="app-logo">S</div>;

export class Activator {
    private toDispose = [];
    start(ctx) {
        this.toDispose.push(
            importStyles(),
            importComonentStyles(),
        );
        run(document.body);
    }
    stop() {
        for(const dispose of this.toDispose) {
            dispose();
        }
    }
}

function run(dom: HTMLElement) {
    const app = (
        <App>
            <AppBar brand={<Logo />}>
                <AppBar.Toolbar wide>
                </AppBar.Toolbar>
                <AppBar.Toolbar>
                    <AppBar.Item>
                        <Icon name="bell" />
                    </AppBar.Item>
                    <AppBar.Item>
                        Hi
                    </AppBar.Item>
                </AppBar.Toolbar>
            </AppBar>
            <Page>
                <Page.Head>Head</Page.Head>
                <Page.LeftSideBar>
                    <SideBar label="Modules">
                        <Nav columns variant="pills">
                            <Nav.Item link="#home" active>
                                <Icon name="shopping-cart" />
                                Allegro
                            </Nav.Item>
                            <Nav.Item link="#home">Module 1</Nav.Item>
                            <Nav.Item link="#home">Module 1</Nav.Item>
                            <Nav.Item link="#home">Module 1</Nav.Item>
                            <Nav.Item link="#home">Module 1</Nav.Item>
                        </Nav>
                    </SideBar>
                    <SideBar label="Administration">
                        <Nav columns variant="pills">
                            <Nav.Item link="#home">
                                <Icon name="users" />
                                Users
                            </Nav.Item>
                        </Nav>
                    </SideBar>
                </Page.LeftSideBar>
                <Page.Content>
                    Content
                </Page.Content>
            </Page>
        </App>
    );
    render(app, dom);
}