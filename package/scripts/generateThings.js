// const types = fetch('https://schema.org/version/latest/schemaorg-current-https.jsonld').then(r => r.json())
//   .then(things =>  console.log('export type Things = ' + Object.values(things['@graph'].filter(t => t['@type'] === 'rdfs:Class').map(t => t['@id'].replace('schema:',`'`) + `'`)).sort().join(' | ')))

// const properties = fetch('https://schema.org/version/latest/schemaorg-current-https.jsonld').then(r => r.json())
//   .then(properties =>  console.log('export type Properties = ' + Object.values(properties['@graph'].filter(t => t['@type'] === 'rdf:Property').map(t => t['@id'].replace('schema:',`'`) + `'`)).sort().join(' | ')))

fetch('https://schema.org/version/latest/schemaorg-current-https.jsonld').then(r => r.json())
  .then(things =>  console.log('export type Actions = ' + Object.values(things['@graph'].filter(t => t['@type'] === 'rdfs:Class' && t['@id'].endsWith('Action')).map(t => t['@id'].replace('schema:',`'`).replace('Action','') + `'`)).sort().join(' | ')))
