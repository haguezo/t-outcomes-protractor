import { TestBed, inject } from '@angular/core/testing'

import { SortPipe } from '../../../app/filter/pipes/sort.pipe'
import { Provider } from '../../../app/provider/provider'

let using = require('jasmine-data-provider')
let pipe: SortPipe

describe('Pipes: SortPipe', () => {

    let providers = require('../../json/unsortedoutcomes.json') as Provider[]
    let sortedProviders = require('../../json/sortedoutcomes.json') as Provider[]
    let pipedProviders: Provider[]

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SortPipe]
        })

        pipe = new SortPipe()
    })

    it('should retrieve the test list of 5 providers from the test/json/unsortedoutcomes.json file', () => {
        expect(providers).not.toBeUndefined()
        expect(providers.length).toEqual(5)
    })

    it('should be given an unsorted list of providers', () => {
        expect(providers[0].ukprn).not.toEqual(sortedProviders[0].ukprn)
        expect(providers[1].ukprn).toEqual(sortedProviders[1].ukprn)
        expect(providers[2].ukprn).not.toEqual(sortedProviders[2].ukprn)
        expect(providers[3].ukprn).not.toEqual(sortedProviders[3].ukprn)
        expect(providers[4].ukprn).not.toEqual(sortedProviders[4].ukprn)
    })

    it('should sort the list of providers', () => {
        pipedProviders = pipe.transform(providers, "")
        expect(pipedProviders[0].ukprn).toEqual(sortedProviders[0].ukprn)
        expect(pipedProviders[1].ukprn).toEqual(sortedProviders[1].ukprn)
        expect(pipedProviders[2].ukprn).toEqual(sortedProviders[2].ukprn)
        expect(pipedProviders[3].ukprn).toEqual(sortedProviders[3].ukprn)
        expect(pipedProviders[4].ukprn).toEqual(sortedProviders[4].ukprn)
    })

    it('should return undefined if list of providers is null', () => {
        let nullProviders: Provider[] = null
        pipedProviders = pipe.transform(nullProviders, "")
        expect(pipedProviders).toBeUndefined()
    })
})