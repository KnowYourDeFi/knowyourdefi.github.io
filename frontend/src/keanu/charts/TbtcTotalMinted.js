import React from 'react'
import axios from 'axios'
import { numberWithCommas } from '../../utils/NumberUtils'

class TbtcTotalMinted extends React.Component {
    state = {
        loading: true,
        minted: 0
    }

    async getMinted() {
        axios.get('https://keepscan.com/api/statistic')
        .then((response) => {
            this.setState({
                loading: false,
                minted: parseFloat(parseFloat(response.data.totalMinted).toFixed(2))
            })
        })
        .catch(e => {
          console.error(e)
        })
    }

    componentDidMount() {
        this.getMinted()
    }

    render() {
        return this.state.loading ? 'Loading...' : numberWithCommas(this.state.minted)
    }
}

export default TbtcTotalMinted