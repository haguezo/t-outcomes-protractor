import { TestBed, inject } from '@angular/core/testing'

import { NationPipe } from '../../../app/filter/pipes/nation.pipe'
import { Provider } from '../../../app/provider/provider'
import { PipeData } from '../../interfaces/pipe-data'

let using = require('jasmine-data-provider')

describe('Pipes: NationPipe', () => {

    let pipe: NationPipe
    let providers = require('../../json/outcomes.json') as Provider[]
    let testData = require('../../json/nation.pipe.json') as PipeData[]

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [NationPipe]
        })

        pipe = new NationPipe()
    })
    
    it('should retrieve the test list of 24 providers from the test/json/outcomes.json file', () => {
        expect(providers).not.toBeUndefined()
        expect(providers.length).toEqual(24)
    })

    using(testData, (data: PipeData) => {

        if (data.value) {

            it('should return ' + data.count + ' providers when the nation is ' + data.value, () => {
                let filteredProviders: Provider[]

                filteredProviders = pipe.transform(providers, data.value)

                expect(filteredProviders.length).toEqual(data.count)
            })

            it('should return only providers located in ' + data.value + ' when the nation is ' + data.value, () => {
                let filteredProviders: Provider[]

                filteredProviders = pipe.transform(providers, data.value)

                for (let i in filteredProviders) {
                    expect(filteredProviders[i].nation).toEqual(data.value)
                }
            })
        }
        else {
            it('should return all providers when no nation is selected', () => {
                let filteredProviders: Provider[]

                filteredProviders = pipe.transform(providers, data.value)

                expect(filteredProviders.length).toEqual(data.count)
            })
        }   
    })
})