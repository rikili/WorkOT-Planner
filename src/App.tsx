import React, { useState } from 'react';
import { Layout, Drawer } from 'antd';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import DrawerOpen from './Components/Drawer/OpenDrawerButton';
import DrawerNav from './Components/Drawer/DrawerContent/DrawerNav';

import './App.scss';

const { Header, Content } = Layout;
// let drawerVisible = false;

function App() {
    const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

    function openDrawer(): void {
        setDrawerVisible(true);
    }

    function closeDrawer(): void {
        setDrawerVisible(false);
    }

    return (
        <Router>
            <Layout>
                <Drawer
                    title="Navigation"
                    onClose={closeDrawer}
                    placement="left"
                    closable={true}
                    visible={drawerVisible}
                >
                    <DrawerNav />
                </Drawer>
                <Header>
                    <DrawerOpen open={openDrawer} />
                </Header>
                <Content>
                    <Switch>
                        <Route path="/weekTempl">
                            <div>route 2</div>
                        </Route>
                        <Route path="/Temp">
                            <div>route 3</div>
                        </Route>
                        <Route path="/">
                            <div>route 1</div>
                        </Route>
                    </Switch>
                </Content>
            </Layout>
        </Router>
    );
}

export default App;
