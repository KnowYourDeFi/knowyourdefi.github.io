import React from 'react'
import { ReactComponent as KeepHeader} from '../resources/keep.svg'
import { ReactComponent as NuHeader} from '../resources/nucypher.svg'
import { ReactComponent as TBTCLogo} from '../resources/TBTC.svg'
import { TBTCPriceV2, NUPriceV2, NUPriceSushi, KEEPPriceV2 } from './charts/KeanuPrices'
import { TbtcHolders, NuHolders, KeepHolders} from './charts/Holders'
import TbtcTotalMinted from './charts/TbtcTotalMinted'
import { TbtcCurrentTotalSupply, TbtcTotalSupply, KeepCurrentTotalSupply, NuCurrentTotalSupply } from './charts/KeanuSupplies'
import { NuNodes } from './charts/KeanuNodes'

class HoprInfo extends React.Component {

  render() {
    return (
      <div className="defi-info">
        <div style={{ textAlign: 'center' }}>
          <KeepHeader  style={{ maxWidth: 180 }} />
          <NuHeader  style={{ maxWidth: 180 }} />
        </div>

        <div className="defi-title">
          <TBTCLogo className="defi-title-logo" />
          <span className="defi-title-text">TBTC</span>
          <div className="defi-title-info-container">
            <span className="defi-title-info-icon" />
            <div className="defi-title-info-card">
              <p>tBTC is a fully Bitcoin-backed ERC-20 token pegged to the price of Bitcoin. It facilitates Bitcoin holders to act on the Ethereum blockchain and access the decentralized finance (DeFi) ecosystem.</p>
            </div>
          </div>
        </div>
        <div className="defi-card-group-6">
          <div className="defi-card">
            <div className="defi-card-title">TBTC/ETH on Uniswap V2</div>
            <div className="defi-card-large-text"><TBTCPriceV2 /></div>
          </div>
          <div className="defi-card">
            <div className="defi-card-title">TBTC Holders</div>
            <div className="defi-card-large-text"><TbtcHolders /></div>
          </div>
          <div className="defi-card">
            <div className="defi-card-title">TBTC Total Minted</div>
            <div className="defi-card-large-text"><TbtcTotalMinted /></div>
          </div>
          <div className="defi-card">
            <div className="defi-card-title">TBTC Total Supply</div>
            <div className="defi-card-large-text"><TbtcCurrentTotalSupply /></div>
          </div>
        </div>
        <div className="defi-card">
          <div className="defi-card-title">TBTC Total Supply</div>
          <div className="defi-card-large-text"><TbtcTotalSupply /></div>
        </div>

        <div className="defi-title">
          <NuHeader className="defi-title-logo" />
          <span className="defi-title-text">NuCypher (NU)</span>
          <div className="defi-title-info-container">
            <span className="defi-title-info-icon" />
            <div className="defi-title-info-card">
              <p>NuCypher (NU) are the native tokens used on the larger NuCypher network. The tokens are used to incentivize network participants for performing key management services and accessing delegation/revocation operations on the network.</p>
            </div>
          </div>
        </div>
        <div className="defi-card-group-6">
          <div className="defi-card">
            <div className="defi-card-title">NU/ETH on Uniswap V2</div>
            <div className="defi-card-large-text"><NUPriceV2 /></div>
          </div>
          <div className="defi-card">
            <div className="defi-card-title">NU/ETH on Sushiswap</div>
            <div className="defi-card-large-text"><NUPriceSushi/></div>
          </div>
          <div className="defi-card">
            <div className="defi-card-title">NU Holders</div>
            <div className="defi-card-large-text"><NuHolders /></div>
          </div>
          <div className="defi-card">
            <div className="defi-card-title">NU Total Supply</div>
            <div className="defi-card-large-text"><NuCurrentTotalSupply /></div>
          </div>
          <div className="defi-card">
            <div className="defi-card-title">NU Nodes</div>
            <div className="defi-card-large-text"><NuNodes /></div>
          </div>
        </div>

        <div className="defi-title">
          <KeepHeader className="defi-title-logo" />
          <span className="defi-title-text">KEEP</span>
          <div className="defi-title-info-container">
            <span className="defi-title-info-icon" />
            <div className="defi-title-info-card">
              <p>KEEP is the network’s native work token with dividends and a slashing model. It provides the sybil resistance that allows the Keep network to be censorship resistant and permissionless.</p>
            </div>
          </div>
        </div>
        <div className="defi-card-group-6">
          <div className="defi-card">
            <div className="defi-card-title">KEEP/ETH on Uniswap V2</div>
            <div className="defi-card-large-text"><KEEPPriceV2 /></div>
          </div>
          <div className="defi-card">
            <div className="defi-card-title">KEEP Holders</div>
            <div className="defi-card-large-text"><KeepHolders/></div>
          </div>
          <div className="defi-card">
            <div className="defi-card-title">KEEP Total Supply</div>
            <div className="defi-card-large-text"><KeepCurrentTotalSupply /></div>
          </div>
        </div>

      </div>
    )
  }
}

export default HoprInfo 