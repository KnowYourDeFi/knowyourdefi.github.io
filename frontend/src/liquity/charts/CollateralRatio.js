import React from 'react'
import ColorProgressBar from '../../widget/ColorProgressBar'

class CollateralRatio extends React.Component {

  // TODO load data

  render() {
    return <ColorProgressBar
      progress={75}
      descriptions={['Killed', 'High Risk', 'Master', 'Healthy']}
    />
  }
}

export default CollateralRatio;
