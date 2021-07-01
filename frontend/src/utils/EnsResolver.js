import {ensClient} from '../liquity/LiquityData'
import { gql } from '@apollo/client'

export async function ensAddressFrom(name) {
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

    const domains = result.data.domains
    if (!domains || domains.length === 0) return null
    return domains[0].resolver.addr.id ?? null
}

export async function ensNameFrom(address) {
    if (!address) return null

    const nameQuery = `
    query address($address: Bytes!) {
        account(id: $address)
        {
          domains{
            name
          }
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

    const domains = result.data.account.domains
    if (!domains || domains.length === 0) return null

    //Resolve the found names against given address to find the actual name
    const names = domains.map(domain => domain.name)
    let addresses = await Promise.all(names.map(async (name) => {
        return ensAddressFrom(name)
    }))
    const index = addresses.indexOf(address)
    if (index >= 0) {
        return names[index]
    } else {
        return null
    }
}