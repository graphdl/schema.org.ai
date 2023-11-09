// const types = fetch('https://schema.org/version/latest/schemaorg-current-https.jsonld').then(r => r.json())
//   .then(things =>  console.log('export type Things = ' + Object.values(things['@graph'].filter(t => t['@type'] === 'rdfs:Class').map(t => t['@id'].replace('schema:',`'`) + `'`)).sort().join(' | ')))

// const properties = fetch('https://schema.org/version/latest/schemaorg-current-https.jsonld').then(r => r.json())
//   .then(properties =>  console.log('export type Properties = ' + Object.values(properties['@graph'].filter(t => t['@type'] === 'rdf:Property').map(t => t['@id'].replace('schema:',`'`) + `'`)).sort().join(' | ')))

// fetch('https://schema.org/version/latest/schemaorg-current-https.jsonld').then(r => r.json())
//   .then(things =>  console.log('export type Actions = ' + Object.values(things['@graph'].filter(t => t['@type'] === 'rdfs:Class' && t['@id'].endsWith('Action')).map(t => t['@id'].replace('schema:',`'`).replace('Action','') + `'`)).sort().join(' | ')))
import { promises as fs } from 'fs'

const graph = await fetch('https://schema.org/version/latest/schemaorg-current-https.jsonld').then(r => r.json()).then(r => r['@graph'])

// const things = graph.filter(t => t['@type'] === 'rdfs:Class').map(t => t['@id'].replace('schema:',``)).sort()
// const properties = graph.filter(t => t['@type'] === 'rdf:Property').map(t => t['@id'].replace('schema:',``)).sort()
// const actions = graph.filter(t => t['@type'] === 'rdfs:Class' && t['@id'].endsWith('Action')).map(t => t['@id'].replace('schema:',``).replace(/(?!^Action$)Action/g, '')).filter(t => t).sort()

const all = graph.map(t => t['@id'].replace('schema:',``)).sort()
// add Actions without 'Action' suffix to all and replace '3DModel' with 'Model3D'
const actions = all.filter(t => t.endsWith('Action')).map(t => t.replace(/(?!^Action$)Action/g, '')).filter(t => t).sort()
all.push(...actions)

let types = `declare module '@graphdl/schema' {
${all.map(thing => `  export const ${thing.replace('3DModel','Model3D')}: '${thing}'`).join('\n')}
}`

// ${things.map(thing => `  export const ${thing}: '${thing}'`).join('\n')}
// ${properties.map(property => `  export const ${property}: '${property}'`).join('\n')}
// ${actions.map(action => `  export const ${action}: '${action}'`).join('\n')}

console.log(types)
await fs.writeFile('./generated/things.d.ts', types)