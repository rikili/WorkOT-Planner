import { connect, ConnectedProps } from 'react-redux';
import Month from '../Components/Calendar/Month';
import { setDate, setWeek } from '../Redux/Modules/Date';

const mapDispatch = {
    setDate: setDate,
    setWeek: setWeek
}

const connector = connect(null, mapDispatch);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Month);
