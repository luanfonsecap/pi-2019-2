import React from 'react';
import {
  TouchableOpacity,
  Image
} from 'react-native'

const ArrowBack = () => {

  return (
    <TouchableOpacity style={{
      position: 'absolute',
      left: 15,
    }}>
      <Image
        source={require('../img/arrow-back.png')}
      />
    </TouchableOpacity>
  );

}

export default ArrowBack;