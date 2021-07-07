import React from 'react'
import ReactECharts from 'echarts-for-react'
import { gql } from '@apollo/client'
import {hoprClient, hoprXdaiClient} from '../HoprData'

class HolderBalance extends React.Component {
  state = {
    loading: true,
    holderBalance: []
  }

  async fetchData() {
    const holderBalanceQuery = `
    query accounts($skip: Int!) {
        accounts(where:{HoprBalance_gt:0, id_not:"0x0000000000000000000000000000000000000000"},first:1000, skip:$skip, orderBy: HoprBalance, orderDirection: desc)
        {
          totalBalance
        }
      }
    `

    const holderXdaiBalanceQuery = `
    query accounts($skip: Int!) {
        accounts(where:{totalBalance_gt:0, id_not:"0x0000000000000000000000000000000000000000"},first:1000, skip:$skip, orderBy: totalBalance, orderDirection: desc)
        {
          totalBalance
        }
      }
    `

    try {
      let skip = 0
      let allResults = []
      let found = false
      while (!found) {
        let result = await hoprClient.query({
          query: gql(holderBalanceQuery),
          variables: {
            skip: skip
          },
          fetchPolicy: 'cache-first',
        })
        allResults = allResults.concat(result.data.accounts)
        if (result.data.accounts.length < 1000) {
          found = true
        } else {
          skip += 1000
        }
      }
      
      let foundXdai = false
      let skipXdai = 0
      while (!foundXdai) {
        let result = await hoprXdaiClient.query({
          query: gql(holderXdaiBalanceQuery),
          variables: {
            skip: skipXdai
          },
          fetchPolicy: 'cache-first',
        })
        allResults = allResults.concat(result.data.accounts)
        if (result.data.accounts.length < 1000) {
          foundXdai = true
        } else {
          skipXdai += 1000
        }
      }
      return allResults
    } catch (e) {
      console.error(e)
    }
  }

  componentDidMount() {
    this.fetchData().then(data => {
      this.processHolderBalanceData(data)
    }).catch(e => {
      console.error(e)
    })
  }

  processHolderBalanceData(data) {
    //Sizes are sorted in descending order
    const sizes = data.map(item => (parseFloat(item.totalBalance)))
    const spliters = [10, 100, 1000, 10000, 100000]
    //Find indexes spliting the sizes by given spliters
    let spliterIndex = spliters.length - 1
    let splitingIndexes = [0]
    for (let [idx, size] of sizes.entries()) {
      while (size <= spliters[spliterIndex]) {
        splitingIndexes.push(idx)
        spliterIndex -= 1
      }
      if (spliterIndex < 0 )
        break
    }
    //Split sizes, get chunk size and calculate sum of each chunk
    const chunkNames = ['>100k 🐳', '10k-100k', '1k-10k', '100-1k', '10-100', '0-10']
    let splited = []
    for (let i = 0; i < splitingIndexes.length - 1; i++) {
      const chunk = sizes.slice(splitingIndexes[i], splitingIndexes[i + 1])
      splited.push({
        name: chunkNames[i],
        chunk: chunk
      })
    }
    splited.push({
      name: chunkNames[splitingIndexes.length - 1],
      chunk: sizes.slice(splitingIndexes[splitingIndexes.length - 1])
    })
    //Update holder balance data
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    let holderBalance = splited.map((item) => {
      const length = item.chunk.length
      const noun = length === 1 ? 'holder' : 'holders'
      return ({
        name: `${item.name} (${length} ${noun})`,
        value: item.chunk.reduce(reducer)
      })
    })
    this.setState({
      loading: false,
      holderBalance: holderBalance
    })
  }

  chart() {
    if (this.state.loading) {
      return <p>Loading...</p>
    }
    const options = {
      tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      // legend: {
      //   top: '5%',
      //   left: 'center'
      // },
      series: [
        {
          name: 'Holder Balance',
          type: 'pie',
          radius: '50%',
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          data: this.state.holderBalance.map((item) => {
            return {
              ...item,
              value: parseFloat(item.value.toFixed(2))
            }
          }),
        }
      ]
    }
    return <ReactECharts option={options} />;
  }

  render() {
    return (
      <div>
        {this.chart()}
      </div>
    )
  }
}

export default HolderBalance
