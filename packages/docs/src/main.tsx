import Router, { Route } from 'preact-router';
import { createHashHistory } from "history";

import IndexPage from './pages/IndexPage';
import ButtonPage from './pages/ButtonPage';
import TextFieldPage from './pages/TextFieldPage';
import PaperPage from './pages/PaperPage';
import CardPage from './pages/CardPage';
import Bullseye from './pages/BullseyePage';
import ContainerPage from './pages/ContainerPage'
import FlexPage from './pages/FlexPage';
import SplitPage from './pages/SplitPage';
import StackPage from './pages/StackPage';
import FormPage from './pages/FormPage';

import Test from './test';

function Header() {
    return (
        <header className="menu">
            Header
        </header>
    );
}

function SideBar() {
    return (
        <nav className="sidebar">
            <ul>
                <li><a href="/c/button">Button</a></li>
                <li><a href="/c/textfield">Text field</a></li>
                <li><a href="/c/card">Card</a></li>
                <li><a href="/c/paper">Paper</a></li>
                <li><a href="/form">Form</a></li>
                <li><a href="/layout/container">Container</a></li>
                <li><a href="/layout/bullseye">Bullseye</a></li>
                <li><a href="/layout/flex">Flex</a></li>
                <li><a href="/layout/split">Split</a></li>
                <li><a href="/layout/stack">Stack</a></li>
            </ul>
        </nav>
    );
}

function App({ children }: any) {
    return (
        <div className="app">
            <Header />
            <SideBar />
            <div className="page">
                {children}
            </div>
        </div>
    );
}
export function Main() {
    return (
        <App>
            <Router history={createHashHistory() as any}>
                <Route component={IndexPage} path="/" />
                <Route component={ButtonPage} path="/c/button" />
                <Route component={TextFieldPage} path="/c/textfield" />
                <Route component={CardPage} path="/c/card" />
                <Route component={PaperPage} path="/c/paper" />

                <Route component={FormPage} path="/form" />

                <Route component={ContainerPage} path="/layout/container" />
                <Route component={Bullseye} path="/layout/bullseye" />
                <Route component={FlexPage} path="/layout/flex" />
                <Route component={SplitPage} path="/layout/split" />
                <Route component={StackPage} path="/layout/stack" />
            </Router>
        </App>
    )
}

