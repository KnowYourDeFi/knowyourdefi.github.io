/*
 * 文件说明: 展示协议数据，请求失败时仅显示当前组件的无数据状态。
 */
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
          this.setState({ failed: true })
        })
    }

    componentDidMount() {
        this.getSupply()
    }

    render() {
      if (this.state.failed) return 'No data'
        return this.state.loading ? 'Loading...' : numberWithCommas(this.state.supply)
    }
}

export default LqtyCirculatingSupply
