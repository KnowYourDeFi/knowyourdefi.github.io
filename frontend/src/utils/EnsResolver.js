import { ensClient } from '../liquity/LiquityData'
import { gql } from '@apollo/client'

const NO_ENS = 'no-ens'

const ensToAddress = {} // ens -> address
const addressToEns = {} // address -> ens

export async function ensNameToAddress(ens) {
  if (!ens) return null

  // read from cache
  let address = ensToAddress[ens]
  if (address) return address

  // fetch data
  address = await _ensNameToAddress(ens)
  if (!address) return null

  // save to cache: ens != null, address != null
  ensToAddress[ens] = address
  addressToEns[address] = ens
  return address
}

export async function addressToEnsName(address) {
  if (!address) return null

  // read from cache
  let ens = addressToEns[address]
  if (ens) return ens === NO_ENS ? null : ens

  // fetch data
  ens = _addressToEnsName(address)

  // save to cache, address != null, ens maybe null
  if (ens) ensToAddress[ens] = address
  addressToEns[address] = ens || NO_ENS
  return ens
}

async function _ensNameToAddress(name) {
  if (!name) return null

  const addressQuery = `
    query address($name: Bytes!) {
        domains(where:{name:$name})
        {
          resolver
          {
            addr
            {
              id
            }
          }
        }
    }
    `

  let result = await ensClient.query({
    query: gql(addressQuery),
    variables: {
      name: name
    },
    fetchPolicy: 'cache-first',
  })

  const domains = result?.data?.domains
  if (!domains || domains.length === 0) return null
  return domains[0].resolver?.addr?.id ?? null
}

async function _addressToEnsName(address) {
  if (!address) return null

  const nameQuery = `
    query address($address: Bytes!) {
        domains(where: {resolvedAddress: $address}) {
          name
        }
      }
    `

  let result = await ensClient.query({
    query: gql(nameQuery),
    variables: {
      address: address
    },
    fetchPolicy: 'cache-first',
  })

  const domains = result?.data?.domains
  if (!domains || domains.length === 0) return null

  const names = domains.map(domain => domain.name).sort((a, b) => a.length > b.length ? 1 : -1)
  return names[0]
}
