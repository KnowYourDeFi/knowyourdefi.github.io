import React from 'react'
import axios from 'axios'
import { numberWithCommas } from '../../utils/NumberUtils'

class LqtyCirculatingSupply extends React.Component {
    state = {
        loading: true,
        supply: 0
    }

    async getSupply() {
        axios.get('https://knowyourdefifunc.azurewebsites.net/api/RespondLqtyCirculatingSupplyFunc?module=lqtycirculatingsupply')
        .then((response) => {
            this.setState({
                loading: false,
                supply: parseFloat(parseFloat(response.data.data).toFixed(2))
            })
        })
        .catch(e => {
          console.error(e)
        })
    }

    componentDidMount() {
        this.getSupply()
    }

    render() {
        return this.state.loading ? 'Loading...' : numberWithCommas(this.state.supply)
    }
}

export default LqtyCirculatingSupply
