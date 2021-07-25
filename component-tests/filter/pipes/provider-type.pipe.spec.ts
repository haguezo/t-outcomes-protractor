import { TestBed, inject } from '@angular/core/testing'

import { ProviderTypePipe } from '../../../app/filter/pipes/provider-type.pipe'
import { Provider } from '../../../app/provider/provider'
import { PipeData } from '../../interfaces/pipe-data'

let using = require('jasmine-data-provider')

describe('Pipes: ProviderTypePipe', () => {

    let pipe: ProviderTypePipe
    let providers = require('../../json/outcomes.json') as Provider[]
    let testData = require('../../json/provider-type.pipe.json') as PipeData[]

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ProviderTypePipe]
        })

        pipe = new ProviderTypePipe()
    })
    
    it('should retrieve the test list of 24 providers from the test/json/outcomes.json file', () => {
        expect(providers).not.toBeUndefined()
        expect(providers.length).toEqual(24)
    })

    using(testData, (data: PipeData) => {

        if (data.value) {

            it('should return ' + data.count + ' providers when the provider type is ' + data.value, () => {
                let filteredProviders: Provider[]

                filteredProviders = pipe.transform(providers, data.value)

                expect(filteredProviders.length).toEqual(data.count)
            })

            it('should return only ' + data.value + ' providers when the provider type is ' + data.value, () => {
                let filteredProviders: Provider[]

                filteredProviders = pipe.transform(providers, data.value)

                for (let i in filteredProviders) {
                    expect(filteredProviders[i].providerType).toEqual(data.value)
                }
            })
        }
        else {
            it('should return all providers when no provider type is selected', () => {
                let filteredProviders: Provider[]

                filteredProviders = pipe.transform(providers, data.value)

                expect(filteredProviders.length).toEqual(data.count)
            })
        }
    })
})