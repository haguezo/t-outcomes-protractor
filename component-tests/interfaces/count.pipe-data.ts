import { FilterCount } from '../../app/filter/filter-count'

export interface CountPipeData {
    filter: string,
    filterValue: string,
    value: FilterCount,
    expected: FilterCount
}

export interface MultiFacetCountPipeData {
    name: string,
    award: string,
    nation: string,
    type: string,
    value: FilterCount,
    expected: FilterCount
}