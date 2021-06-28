import LiquityHeader from "./LiquityHeader"

function LearnLiquity() {
  return (
    <div className="defi-info">
      <LiquityHeader />
      <div className="defi-header-links">
        <a className="active" href="/" rel="noreferrer" onClick={function (e) { e.preventDefault() }}>DATA</a>
        <a href="https://www.liquity.org/" rel="noreferrer" target="_blank">WEBSITE</a>
        <a href="https://github.com/liquity/liquity" rel="noreferrer" target="_blank">GITHUB</a>
      </div>

      <div className="defi-title">
        <div className="defi-title-text">Introduction</div>
        <a className="defi-title-tag" href="https://docs.liquity.org/" rel="noreferrer" target="_blank">more</a>
      </div>
      <div className="defi-large-card">
        <p>Liquity is a decentralized borrowing protocol that allows you to draw interest-free loans against Ether used as collateral. Loans are paid out in LUSD (a USD pegged stablecoin) and need to maintain a minimum collateral ratio of 110%.</p>
        <p>In addition to the collateral, the loans are secured by a Stability Pool containing LUSD and by fellow borrowers collectively acting as guarantors of last resort. Learn more about these mechanisms in our documentation.</p>
        <p>Liquity as a protocol is non-custodial, immutable, and governance-free.</p>
      </div>
      <div className="defi-title">
        <div className="defi-title-text">Tutorials</div>
      </div>
      <div className="defi-large-card">
        <p><a href="https://medium.com/@DerrickN_/liquity-protocol-vs-makerdao-84ed9f3440d5" rel="noreferrer" target="_blank">Liquity Protocol vs MakerDAO</a></p>
        <p><a href="https://medium.com/liquity/understanding-liquitys-stability-pool-212cec402db5" rel="noreferrer" target="_blank">Understanding Liquity’s Stability Pool</a></p>
        <p><a href="https://medium.com/liquity/overview-liquity-use-cases-a37204877672" rel="noreferrer" target="_blank">Overview: Liquity Use Cases</a></p>
        <p><a href="https://medium.com/@DerrickN_/how-to-borrow-lusd-using-liquity-d5df73c13421" rel="noreferrer" target="_blank">How to Borrow LUSD using Liquity</a></p>
        <p><a href="https://medium.com/@DerrickN_/how-to-earn-rewards-using-liquity-1d12a63c8eee" rel="noreferrer" target="_blank">How to Earn Rewards using Liquity</a></p>
        <p><a href="https://medium.com/liquity/understanding-liquitys-redemption-mechanism-b9f2fc78cddb" rel="noreferrer" target="_blank">Understanding Liquity’s Redemption Mechanism</a></p>
        <p><a href="https://medium.com/liquity/a-beginners-guide-to-trove-management-5d876891e1cd" rel="noreferrer" target="_blank">A Beginner’s Guide to Trove Management</a></p>
        <p><a href="https://adam-maj.medium.com/the-complete-guide-to-making-money-with-liquity-lqty-39b355fba2bc" rel="noreferrer" target="_blank">The complete guide to making money with Liquity (LQTY)</a></p>
      </div>
    </div>
  )
}

export default LearnLiquity
