import { TestBed, inject } from '@angular/core/testing'

import { AwardPipe } from '../../../app/filter/pipes/award.pipe'
import { Provider } from '../../../app/provider/provider'
import { PipeData } from '../../interfaces/pipe-data'

let using = require('jasmine-data-provider')

describe('Pipes: AwardPipe', () => {

    let pipe: AwardPipe
    let providers = require('../../json/outcomes.json') as Provider[]
    let testData = require('../../json/award.pipe.json') as PipeData[]

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AwardPipe]
        })

        pipe = new AwardPipe()
    })

    it('should retrieve the test list of 24 providers from the test/json/outcomes.json file', () => {
        expect(providers).not.toBeUndefined()
        expect(providers.length).toEqual(24)
    })

    using(testData, (data: PipeData) => {

        if (data.value) {

            it('should return ' + data.count + ' providers when the award type is ' + data.value, () => {
                let filteredProviders: Provider[]

                filteredProviders = pipe.transform(providers, data.value)

                expect(filteredProviders.length).toEqual(data.count)
            })

            if (data.value != 'invalid') {

                it('should return only ' + data.value + ' rated providers when the award type is ' + data.value, () => {
                    let filteredProviders: Provider[]

                    filteredProviders = pipe.transform(providers, data.value)

                    for (let i in filteredProviders) {
                        expect(filteredProviders[i].awardRating.toLowerCase()).toEqual(data.value.toLowerCase())
                    }
                })
            }
        }
        else if (data.value === null) {

            it('should return the unfiltered 24 providers when award type is null', () => {
                let filteredProviders: Provider[]

                filteredProviders = pipe.transform(providers, data.value)

                expect(filteredProviders).toEqual(providers)
            })

            it('should return all 24 providers when award type is null', () => {
                let filteredProviders: Provider[]

                filteredProviders = pipe.transform(providers, data.value)

                expect(filteredProviders.length).toEqual(data.count)
            })
        }
        else if (data.value === '') {

            it('should return all 24 providers when award type is an empty string', () => {
                let filteredProviders: Provider[]

                filteredProviders = pipe.transform(providers, data.value)

                expect(filteredProviders.length).toEqual(data.count)
            })
        }
    })
})