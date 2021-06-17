import React from 'react';
import { Button } from 'antd';

interface Props {
    open: () => void;
}

const DrawerOpen:React.FC<Props> = (props: Props) => {
    return (
        <Button onClick={props.open}>
            Test
        </Button>
    );
}

export default DrawerOpen;
