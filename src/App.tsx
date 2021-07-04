import React, { useState } from 'react';
import { Layout, Drawer } from 'antd';
import {
    BrowserRouter as Router
} from 'react-router-dom';
import DrawerOpen from './Components/Drawer/OpenDrawerButton';
import DrawerNav from './Components/Drawer/DrawerContent/DrawerNav';
import Routing from './Components/Routing';

import './App.scss';

const { Header, Content } = Layout;

function App() {
    const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

    const openDrawer = () => {
        setDrawerVisible(true);
    }

    const closeDrawer = () => {
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
                    <Routing/>
                </Content>
            </Layout>
        </Router>
    );
}

export default App;
