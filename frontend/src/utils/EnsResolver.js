import {ensClient} from '../liquity/LiquityData'
import { gql } from '@apollo/client'

export async function ensNameToAddress(name) {
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

export async function addressToEnsName(address) {
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

    const names = domains.map(domain => domain.name).sort((a, b) => a.length > b.length? 1 : -1)
    return names[0]
}
