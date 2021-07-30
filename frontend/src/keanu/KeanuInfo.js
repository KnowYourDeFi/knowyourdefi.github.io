import React from 'react'
import { ReactComponent as NuHeader} from '../resources/nucypher.svg'
import { ReactComponent as TBTCLogo} from '../resources/TBTC.svg'
import KeepLogo from'../resources/keep-token-main.png'
import { TBTCPriceV2, NUPriceV2, NUPriceSushi, KEEPPriceV2 } from './charts/KeanuPrices'
import { TbtcHolders, NuHolders, KeepHolders} from './charts/Holders'
import TbtcTotalMinted from './charts/TbtcTotalMinted'
import { TbtcCurrentTotalSupply, TbtcTotalSupply, KeepCurrentTotalSupply, NuCurrentTotalSupply, KeepCirculatingSupply, NuCirculatingSupply } from './charts/KeanuSupplies'
import { NuNodes } from './charts/KeanuNodes'
import ColorProgressBar from '../widget/ColorProgressBar'

class KeanuInfo extends React.Component {
  render() {
    return (
      <div className="defi-info">
        <p style={{ fontSize: 50, textAlign: 'center' }}>KEANU</p>
        
        <div className="defi-title">
          <span className="defi-title-text">T</span>
          <div className="defi-title-info-container">
            <span className="defi-title-info-icon" />
            <div className="defi-title-info-card">
              <p>Existing NU and KEEP stakers will be able to stake in the Keanu network via adapters and earn T rewards until such time as their staked tokens become liquid and they can explicitly upgrade to T.</p>
              <p>Wrapped T can be unwrapped back to the underlying NU or KEEP, but only from the same address.</p>
            </div>
          </div>
        </div>
        <div className="defi-card-group-6">
          <div className="defi-card">
            <div className="defi-card-title">T Total Supply</div>
            <div className="defi-card-large-text">1,000,000,000</div>
          </div>
          <div className="defi-card">
            <div className="defi-card-title">T Token Allocation</div>
            <ColorProgressBar progress= '100' range={[{
        size: 45,
        color: '#1E65F3',
        name: null,
        desc: 'Existing NuCypher holders. 45% of initial total supply.',
      }, {
        size: 10,
        color: 'rgb(147, 180, 280)',
        name: null,
        desc: '"KEaNu" DAO. 10% of initial total supply.',
      }, {
        size: 45,
        color: '#48DB44',
        name: null,
        desc: 'Existing Keep holders. 45% of initial total supply.',
      }]}
    />
          </div>
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
            <div className="defi-card-title">NU Circulating Supply</div>
            <div className="defi-card-large-text"><NuCirculatingSupply /></div>
          </div>
          <div className="defi-card">
            <div className="defi-card-title">NU Nodes</div>
            <div className="defi-card-large-text"><NuNodes /></div>
          </div>
        </div>

        <div className="defi-title">
          <img  src={KeepLogo} width='30px' />
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
          <div className="defi-card">
            <div className="defi-card-title">KEEP Circulating Supply</div>
            <div className="defi-card-large-text"><KeepCirculatingSupply /></div>
          </div>
        </div>

      </div>
    )
  }
}

export default KeanuInfo