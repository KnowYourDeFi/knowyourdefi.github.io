import { ReactComponent as KeepHeader} from '../resources/keep.svg'
import { ReactComponent as NuHeader} from '../resources/nucypher.svg'

function LearnKeanu() {
  return (
    <div className="defi-info">
      <p style={{ fontSize: 50, textAlign: 'center' }}>KEANU</p>
      <div className="defi-header-links">
        <a href="https://forum.threshold.network" rel="noreferrer" target="_blank">COMMUNITY</a>
      </div>
      <div className="defi-title">
        <div className="defi-title-text">Introduction</div>
        <a className="defi-title-tag" href="https://blog.nucypher.com/codename-keanu" rel="noreferrer" target="_blank">more</a>
      </div>
      <div className="defi-large-card">
        <p>Keep Network and NuCypher are set to perform the first decentralized hard merger in the blockchain space. Both blockchains operate on the Ethereum network and will merge under the new name of “KEANU.” The new platform is set to become active in the month of August.</p>
        <p>The Keep Network is designed to enable privacy options for Ethereum applications and users.</p>
        <p>The first component in the KEANU network would be a staking contract that accepts both NU and KEEP, each with a DAO-specified relative staking weight.</p>
      </div>
      <div className="defi-title">
        <div className="defi-title-text">Tutorials</div>
      </div>
      <div className="defi-large-card">
        <p><a href="https://www.notion.so/eastban/T-Token-Proposal-RC0-fd1730ba09b2409fb6d224217467701c" rel="noreferrer" target="_blank">T Token Proposal RC0</a></p>
        <p><a href="https://blog.keep.network/the-keanu-vote-passes-596fdfa11f00" rel="noreferrer" target="_blank">The KEANU Vote Passes</a></p>
        <p><a href="https://www.coindesk.com/keanu-explained-nucypher-keep-merger-ethereum" rel="noreferrer" target="_blank">'Keanu' Explained: What It Means to Merge Two Ethereum Projects</a></p>
        <p><a href="https://blog.nucypher.com/nucypher-keep-keanu-ama-hosted-by-staking-hub" rel="noreferrer" target="_blank">NuCypher + Keep: KEaNU AMA, Hosted by Staking Hub</a></p>
        <p><a href="https://blog.nucypher.com/an-intro-to-tbtc-for-nucyperinos" rel="noreferrer" target="_blank">An Intro to tBTC for NuCypherinos</a></p>
        <p><a href="https://blog.keep.network/value-bridged-versus-value-locked-4efe96888660" rel="noreferrer" target="_blank">Value bridged versus value locked</a></p>
        <p><a href="https://medium.com/figment/protocol-merger-keep-nu-keanu-ab048bd71c50" rel="noreferrer" target="_blank">Protocol Merger: KEEP + NU = KEANU</a></p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <NuHeader  width='150px'/>
      </div>
      <div className="defi-header-links">
        <a href="https://www.nucypher.com" rel="noreferrer" target="_blank">WEBSITE</a>
        <a href="https://github.com/nucypher" rel="noreferrer" target="_blank">GITHUB</a>
      </div>
      <div className="defi-title">
        <div className="defi-title-text">Introduction</div>
        <a className="defi-title-tag" href="https://docs.nucypher.com/en/latest" rel="noreferrer" target="_blank">more</a>
      </div>
      <div className="defi-large-card">
        <p>NuCypher is cryptographic infrastructure for privacy preserving protocols and applications.</p>
        <p>NuCypher's network provides cryptographic access controls for distributed applications & protocols that allow users to manage secrets with greater efficacy and security and more dynamically control access control to their applications and perform secure, private computation on encrypted data by outsourced nodes on the network.</p>
      </div>
      <div className="defi-title">
        <div className="defi-title-text">Tutorials</div>
      </div>
      <div className="defi-large-card">
        <p><a href="https://docs.nucypher.com/en/latest/staking/running_a_worker.html" rel="noreferrer" target="_blank">Running a Worker</a></p>
        <p><a href="https://medium.com/figment/figments-first-look-nucypher-6265298b09bd" rel="noreferrer" target="_blank">Figment’s First Look: NuCypher</a></p>
        <p><a href="https://medium.com/coinlist/a-deep-dive-into-nucypher-6d0f1b95e429" rel="noreferrer" target="_blank">A Deep Dive Into NuCypher</a></p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <KeepHeader width='150px'/>
      </div>
      <div className="defi-header-links">
        <a href="https://keep.network" rel="noreferrer" target="_blank">WEBSITE</a>
        <a href="https://github.com/keep-network" rel="noreferrer" target="_blank">GITHUB</a>
      </div>
      <div className="defi-title">
        <div className="defi-title-text">Introduction</div>
        <a className="defi-title-tag" href="https://keep.network/info" rel="noreferrer" target="_blank">more</a>
      </div>
      <div className="defi-large-card">
        <p>Keep is the privacy-focused infrastructure behind tBTC, the only truly decentralized solution for Bitcoin on Ethereum.</p>
        <p>Keep secures private data on public blockchains with “keeps.” Keeps are off-chain containers that allow contracts to manage and use private data without exposing the data itself to the public blockchain.</p>
      </div>
      <div className="defi-title">
        <div className="defi-title-text">Tutorials</div>
      </div>
      <div className="defi-large-card">
        <p><a href="https://cointelegraph.com/news/keep-network-unveils-v2-specs-for-tbtc-protocol" rel="noreferrer" target="_blank">Keep Network unveils v2 specs for tBTC protocol</a></p>
        <p><a href="https://staking.keep.network" rel="noreferrer" target="_blank">Staking document</a></p>
        <p><a href="https://keeptools.org" rel="noreferrer" target="_blank">Keep Tools</a></p>
      </div>
    </div>
  )
}

export default LearnKeanu