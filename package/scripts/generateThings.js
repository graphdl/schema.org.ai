const types = fetch('https://schema.org/version/latest/schemaorg-current-https.jsonld').then(r => r.json())
  .then(things =>  console.log('export type Things = ' + Object.values(things['@graph'].filter(t => t['@type'] === 'rdfs:Class').map(t => t['@id'].replace('schema:',`'`) + `'`)).sort().join(' | ')))
