import React from 'react'
import query from '../LiquityData'

/**
 * state: setState({currentPage, hasNextPage})
 * callback: onPageClick(index)
 */
class PageNav extends React.Component {

  state = {
    currentPage: 0,
    hasNextPage: false,
  }

  render() {
    const pageList = this.generatePageList(this.state.currentPage, this.state.hasNextPage)

    const that = this
    const pageNavBody = pageList.map((item, k) => {
      switch (item.type) {
        case 'link':
          // eslint-disable-next-line
          return <li class="page-item" key={k}><a class="page-link" href="#" onClick={function (e) { e.preventDefault(); that.props.onPageClick(item.index) }}>{item.index + 1}</a></li>
        case 'current':
          // eslint-disable-next-line
          return <li class="page-item active" key={k}><a class="page-link" href="#" onClick={function (e) { e.preventDefault() }}>{item.index + 1}</a></li>
        case 'more':
        default:
          // eslint-disable-next-line
          return <li class="page-item disabled" key={k}><a class="page-link" href="#" onClick={function (e) { e.preventDefault() }}>...</a></li>
      }
    })

    return (
      <nav className="page-nav">
        <ul className="pagination">
          {pageNavBody}
        </ul>
      </nav>
    )
  }

  /**
   * return
   * array [
   *   {
   *     type: link | current | more
   *     index: number
   *   }
   * ]
   */
   generatePageList(currentPage, hasNextPage) {
    const pageCount = currentPage + 1
    let pageList
    if (pageCount < 5) {
      pageList = Array.from({length:pageCount}, (v,i) => ({ type: i === currentPage ? 'current' : 'link', index: i }))
    } else {
      pageList = [{ type: 'link', index: 0 }, { type: 'more' }, { type: 'link', index: currentPage - 1 }, { type: 'current', index: currentPage }]
    }
    if (hasNextPage) {
      pageList.push({ type: 'link', index: currentPage + 1 }, { type: 'more' })
    }
    // console.log('pageList:', currentPage, hasNextPage, pageList)
    return pageList
  }
}

class Holders extends React.Component {
  state = {
    loading: true,
    pageData: {}
  }

  PAGE_SIZE = 20

  constructor(props) {
    super(props)
    this.pageNav = React.createRef();
  }

  componentDidMount() {
    this.loadPage(0)
  }

  async loadPageData(pageIndex) {
    // LQTY holders
    const gql = `{
      tokenBalances(first:${this.PAGE_SIZE}, skip:${pageIndex * this.PAGE_SIZE}, orderBy:balance, orderDirection:desc, where:{balance_gt:0, token:"0x6dea81c8171d0ba574754ef6f8b412f2ed88c54d"}){
        owner{
          id
        }
        balance
      }
    }
    `
    // {
    //   "data": {
    //     "tokenBalances": [
    //       {
    //         "balance": "38196106666666666666666667",
    //         "owner": {
    //           "id": "0xb8a9fada75c6d891fb77a7988ff9bad9e485ca1c"
    //         }
    //       },
    //       {
    //         "balance": "27921879626091017325452749",
    //         "owner": {
    //           "id": "0xd8c9d9071123a059c6e0a945cf0e0c82b508d816"
    //         }
    //       },
    //       ...
    //     ]
    //   }
    // }
    const data = await query(gql)
    return data.tokenBalances.map(item => ({ address: item.owner.id, balance: item.balance }))
  }

  async loadPage(pageIndex) {
    let pageData = this.state.pageData
    let balances = pageData[pageIndex]

    if (!balances) {
      // prepare loading
      this.setState({
        loading: true,
      })
      this.pageNav.current?.setState({currentPage: pageIndex})

      // load data
      balances = await this.loadPageData(pageIndex)
      pageData[pageIndex] = balances
    }

    this.setState({
      loading: false,
      pageData: pageData,
    })
    this.pageNav.current?.setState({currentPage: pageIndex, hasNextPage: balances && balances.length === this.PAGE_SIZE })
  }

  currentPageData() {
    return this.state.pageData[this.pageNav.current?.state.currentPage] || []
  }

  render() {
    const tbody = this.state.loading ? null : this.currentPageData().map((e, i) => {
      const address = e.address
      const balance = e.balance
      return (
        <tr key={i}>
          <td><a href={`https://etherscan.io/address/${address}`} target="_blank" rel="noreferrer">{address}</a></td>
          <td>{balance}</td>
        </tr>
      )
    })

    return (
      <div className="holders">
        <h3>LQTY Holders</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Address</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {tbody}
          </tbody>
        </table>
        {
          this.state.loading === true && <div>Loading...</div>
        }
        <PageNav ref={this.pageNav} onPageClick={index => this.loadPage(index)}></PageNav>
      </div>
    )
  }
}

export default Holders
