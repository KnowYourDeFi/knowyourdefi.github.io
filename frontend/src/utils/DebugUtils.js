const prod = 'production'

export const trace = process.env.NODE_ENV !== prod ? console.log : () => {}
export const log = process.env.NODE_ENV !== prod ? console.log : () => {}
export const error = console.error
