import { connect, ConnectedProps } from 'react-redux';
import WeekSelector from '../Components/WeekDisplay/WeekSelector';
import { StateTypes } from '../Redux/Types';
import { setDate } from '../Redux/Modules/Date';

const mapState = (state: StateTypes) => ({
    date: state.timesSelected.dateSelected,
    week: state.timesSelected.weekSelected
});

const mapDispatch = {
    setDate: setDate
}

const connector = connect(mapState, mapDispatch);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(WeekSelector);
