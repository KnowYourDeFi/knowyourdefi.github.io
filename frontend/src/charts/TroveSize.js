import React from 'react'
import query from '../data/liquity'
import ReactECharts from 'echarts-for-react'

class TroveSize extends React.Component {
  state = {
    loading: true,
    troveData: []
  }

  componentDidMount() {
    const gql = `{
      troves(where:{status: open},first:1000, orderBy: collateral, orderDirection: desc)
      {
        collateral
      }
    }`

    query(gql).then(data => {
      this.processTroveData(data)
    }).catch(e => {
      console.error(e)
    })
  }

  processTroveData(data) {
    //Sizes are sorted in descending order
    const sizes = data.troves.map(item => (parseFloat(item.collateral)))
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
    const chunkNames = ['>100k', '10k-100k', '1k-10k', '100-1k', '10-100', '0-10']
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
      loading: false,
      troveData: troveData
    })
  }

  chart() {
    const options = {
      title: {
          text: 'Trove size'
      },
      tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Trove size',
          type: 'pie',
          radius: '50%',
          center: ['25%', '50%'],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          data: this.state.troveData
        },
          {
            name: 'Trove size',
            type: 'pie',
            radius: [10, 150],
            center: ['75%', '50%'],
            roseType: 'area',
            itemStyle: {
                borderRadius: 0
            },
            data: this.state.troveData
          }
      ]
  }
    return <ReactECharts option={options} style={{height: 600}}/>;
  }

  trove() {
    if (this.state.loading) {
      return <p>Loading...</p>
    } else {
      return this.chart()
    }
  }

  render() {
    return (
      <div style={{height: 600}}>

        {this.trove()}
      </div>
    )
  }
}

export default TroveSize