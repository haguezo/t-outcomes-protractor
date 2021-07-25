import { TestBed, inject } from '@angular/core/testing'

import { ProviderNamePipe } from '../../../app/filter/pipes/provider-name.pipe'
import { Provider } from '../../../app/provider/provider'
import { ProviderNamePipeData } from '../../interfaces/provider-name.pipe-data'
import { PipeData } from '../../interfaces/pipe-data'

let using = require('jasmine-data-provider')

describe('Pipes: ProviderNamePipe', () => {

    let pipe: ProviderNamePipe
    let providers = require('../../json/outcomes.json') as Provider[]
    let testData = require('../../json/provider-name.pipe.json') as ProviderNamePipeData[]

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ProviderNamePipe]
        })

        pipe = new ProviderNamePipe()
    })

    it('should retrieve the test list of 24 providers from the test/json/outcomes.json file', () => {
        expect(providers).not.toBeUndefined()
        expect(providers.length).toEqual(24)
    })

    using(testData, (data: ProviderNamePipeData) => {

        it('should return ' + data.count + ' providers when the provider name is "' + data.value + '"', () => {
            let filteredProviders: Provider[]

            filteredProviders = pipe.transform(providers, data.value)

            expect(filteredProviders.length).toEqual(data.count)
        })

        if (data.value.trim() === '') {
            it('should return all providers when only spaces are entered for the provider name', () => {
                let filteredProviders: Provider[]

                filteredProviders = pipe.transform(providers, data.value)

                expect(filteredProviders.length).toEqual(24)
            })
        }
        else if (data.value.startsWith(' ') || data.value.endsWith(' ')) {
            it('should trim off spaces in "' + data.value + '" and return all providers with "' + data.value.trim() + '" in the name', () => {
                let filteredProviders: Provider[]

                filteredProviders = pipe.transform(providers, data.value)

                for (let i in filteredProviders) {
                    expect(filteredProviders[i].providerName.toLowerCase()).toContain(data.value.toLowerCase().trim())
                }
            })
        }
        else {
            it('should return only providers with "' + data.value + '" in the name', () => {
                let filteredProviders: Provider[]

                filteredProviders = pipe.transform(providers, data.value)

                for (let i in filteredProviders) {
                    expect(filteredProviders[i].providerName.toLowerCase()).toContain(data.value.toLowerCase())
                }
            })
        }

        using(data.awards, (award: PipeData) => {

            it('should return ' + award.count + ' providers when the provider name is "' + data.value + '" and the award type is ' + award.value, () => {
                let filteredProviders: Provider[]

                filteredProviders = pipe.transform(providers, data.value)
                filteredProviders = filteredProviders.filter(p => p.awardRating === award.value)

                expect(filteredProviders.length).toEqual(award.count)
            }) 
        })

        using(data.nations, (nation: PipeData) => {

            it('should return ' + nation.count + ' providers when the provider name is "' + data.value + '" and the nation is ' + nation.value, () => {
                let filteredProviders: Provider[]

                filteredProviders = pipe.transform(providers, data.value)
                filteredProviders = filteredProviders.filter(p => p.nation === nation.value)

                expect(filteredProviders.length).toEqual(nation.count)
            })
        })

        using(data.types, (type: PipeData) => {

            it('should return ' + type.count + ' providers when the provider name is "' + data.value + '" and the provider type is ' + type.value, () => {
                let filteredProviders: Provider[]

                filteredProviders = pipe.transform(providers, data.value)
                filteredProviders = filteredProviders.filter(p => p.providerType === type.value)

                expect(filteredProviders.length).toEqual(type.count)
            })
        })
    })
})