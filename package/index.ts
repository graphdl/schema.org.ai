import { AI } from 'ai-functions'
import type { OpenAIModels, Things } from './types'

type Pluralize<T> = T extends `${infer Base}s` ? `${T}es` : T extends string ? `${T}s` : T

export type PluralThings = Pluralize<Things>
export type ListThings = `list${PluralThings}`
export type GetThings = `get${Things}`
export type CreateThings = `create${Things}`
export type CompleteThings = `complete${Things}`
export type ImagineThings = `imagine${Things}`
export type GenerateThings = `generate${Things}`


export type ThingVerbs = 'create' | 'complete' | 'imagine' | 'generate'
export type SingularThingVerbs = 'get' | ThingVerbs
export type PluralThingVerbs = 'list' | ThingVerbs

export type PotentialActions<CustomVerbs extends string> = `${SingularThingVerbs | CustomVerbs}${Things}` | `${PluralThingVerbs | CustomVerbs}${PluralThings}`


export const getThing = (action: string) => action.replace(/^[a-z]+/, '')
export const getVerb = (action: string) => action.replace(getThing(action), '')
export const isPlural = (action: string) => action.endsWith('s')

type Options = {
  apiKey?: string
  baseUrl?: string
  model?: OpenAIModels
}

export const SchemaAI  = ({ apiKey, baseUrl, model = 'gpt-3.5-turbo' }: Options) => {
  const { ai, list, gpt } = AI({ apiKey, baseUrl, model })
  return { 
    ai: new Proxy({
      getType: (meta: any) => ai.getType(meta, { '@type': 'The name from Schema.org' }),
    }, {
      get: (target, action) => {
        // TODO: Finish getting this passed to `ai`
        const thing = getThing(action as string)
        const verb = getVerb(action as string)
        const plural = isPlural(action as string)
        return plural ? list(thing) : ai[verb](thing)

      }
    })
  }
}


// export type AIActions<CustomVerbs extends string> = {
//   [K in PotentialActions<CustomVerbs>]: AI
// }