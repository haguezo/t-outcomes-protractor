import { PipeData } from './pipe-data'

export interface ProviderNamePipeData {
    value: string
    count: number,
    awards: PipeData[],
    nations: PipeData[],
    types: PipeData[]
}