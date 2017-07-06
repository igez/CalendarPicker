import React, { PropTypes } from 'react';
import {
  TouchableOpacity,
  Text,
} from 'react-native';

export default function Controls({ styles, textStyles, label, onPressControl, element }) {
	let renderLabel = () => {
		return <Text style={[styles, textStyles]}>
        { label }
      </Text>;
	}
	
	let renderElement = () => {
		return element;
	}
	
	let renderButton = () => {
		if(!!element){
			return renderElement();
		}
		else if(!!label){
			return renderLabel();
		}
	}
	
  return (
    <TouchableOpacity
      onPress={() => onPressControl()}
    >
	{renderButton()}
    </TouchableOpacity>
  );
}

Controls.propTypes = {
  styles: PropTypes.shape({}).isRequired,
  label: PropTypes.string,
  onPressControl: PropTypes.func.isRequired,
  element: PropTypes.element
};
