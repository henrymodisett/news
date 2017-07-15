import { connect } from 'react-redux';
import { selectSource } from '../actions';
import Link from '../components/Link';

const mapStateToProps = (state, ownProps) => ({
    active: ownProps.source === state.selectedSource
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => {
        dispatch(selectSource(ownProps.source));
    }
});

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link);

export default FilterLink;
