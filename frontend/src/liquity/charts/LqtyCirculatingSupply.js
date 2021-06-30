import React from 'react'
import axios from 'axios'
import { numberWithCommas } from '../../utils/NumberUtils'

class LqtyCirculatingSupply extends React.Component {
    state = {
        loading: true,
        supply: 0
    }
    
    async getSupply() {
        const result = await axios("https://knowyourdefifunc.azurewebsites.net/api/RespondLqtyCirculatingSupplyFunc?module=lqtycirculatingsupply")
        this.setState({
            loading: false,
            supply: result.data
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