import React from 'react'
import ReactECharts from 'echarts-for-react'
import { gql } from '@apollo/client'
import {liquityClient} from '../LiquityData'
import {loadingOption} from '../../utils/ChartUtils'

class TroveSize extends React.Component {
  state = {
    troveData: []
  }

  async fetchData() {
    const troveQuery = `
    query tokenBalances($skip: Int!) {
        troves(where:{status: open},first:1000, skip:$skip, orderBy: collateral, orderDirection: desc)
        {
          collateral
        }
      }
    `

    try {
      let skip = 0
      let allResults = []
      let found = false
      while (!found) {
        let result = await liquityClient.query({
          query: gql(troveQuery),
          variables: {
            skip: skip
          },
          fetchPolicy: 'cache-first',
        })
        allResults = allResults.concat(result.data.troves)
        if (result.data.troves.length < 1000) {
          found = true
        } else {
          skip += 1000
        }
      }
      return allResults
    } catch (e) {
      console.error(e)
    }
  }

  componentDidMount() {
    this.fetchData().then(data => {
      this.processTroveData(data)
    }).catch(e => {
      console.error(e)
    })
  }

  processTroveData(data) {
    //Sizes are sorted in descending order
    const sizes = data.map(item => (parseFloat(item.collateral)))
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
    //Update trove data
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    let troveData = splited.map((item) => {
      const length = item.chunk.length
      const noun = length === 1 ? 'trove' : 'troves'
      return ({
        name: `${item.name} (${length} ${noun})`,
        value: item.chunk.reduce(reducer)
      })
    })
    this.setState({
      troveData: troveData
    })
  }

  chart() {
    const options = {
      tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      series: [
        {
          name: 'Trove size',
          type: 'pie',
          radius: '50%',
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          data: this.state.troveData.map((item) => {
            return {
              ...item,
              value: parseFloat(item.value.toFixed(2))
            }
          }),
        }
      ]
    }
    return <ReactECharts 
        loadingOption={loadingOption} 
        showLoading={this.state.troveData.length === 0} 
        option={options} 
      />
  }

  render() {
    return (
      <div>
        {this.chart()}
      </div>
    )
  }
}

export default TroveSize
