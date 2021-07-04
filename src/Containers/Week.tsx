import { connect, ConnectedProps } from 'react-redux';
import Week from '../Components/Calendar/Week';
import { setDate, setWeek } from '../Redux/Modules/Date';

const mapDispatch = {
    setDate: setDate,
    setWeek: setWeek
}

const connector = connect(null, mapDispatch);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Week);
