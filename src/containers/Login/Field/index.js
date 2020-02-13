import { connect } from 'react-redux';

import Field from 'src/components/Login/Field';
import { onInputChange } from 'src/store/reducer';


const mapStateToProps = null;

const mapDispatchToProps = Dispatch => ({
  InputChange: (name, value) => {
    Dispatch(onInputChange(name, value));
  },
});

const FieldContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Field);

export default FieldContainer;
