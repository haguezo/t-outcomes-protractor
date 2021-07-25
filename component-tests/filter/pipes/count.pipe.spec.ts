import { TestBed, inject } from '@angular/core/testing'

import { CountPipe } from '../../../app/filter/pipes/count.pipe'
import { FilterCount } from '../../../app/filter/filter-count'
import { Provider } from '../../../app/provider/provider'
import { CountPipeData, MultiFacetCountPipeData } from '../../interfaces/count.pipe-data'

let using = require('jasmine-data-provider')
let pipe: CountPipe
let providers = require('../../json/outcomes.json') as Provider[]
let count: FilterCount = {
    "awardGold": -1,
    "awardSilver": -1,
    "awardBronze": -1,
    "awardProvisional": -1,
    "nationEngland": -1,
    "nationWales": -1,
    "nationScotland": -1,
    "nationNI": -1,
    "providerTypeHEI": -1,
    "providerTypeFEC": -1,
    "providerTypeAP": -1
}

describe('Pipes: CountPipe', () => {

    let providers = require('../../json/outcomes.json') as Provider[]

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [CountPipe]
        })

        pipe = new CountPipe()
    })

    it('should return all zero counts if providers is null', () => {

        // pre transform assert
        expect(count.awardGold).toEqual(-1)
        expect(count.awardSilver).toEqual(-1)
        expect(count.awardBronze).toEqual(-1)
        expect(count.awardProvisional).toEqual(-1)
        expect(count.nationEngland).toEqual(-1)
        expect(count.nationWales).toEqual(-1)
        expect(count.nationScotland).toEqual(-1)
        expect(count.nationNI).toEqual(-1)
        expect(count.providerTypeHEI).toEqual(-1)
        expect(count.providerTypeFEC).toEqual(-1)
        expect(count.providerTypeAP).toEqual(-1)

        // act
        pipe.transform(null, count)

        // post transform assert
        expect(count.awardGold).toEqual(0)
        expect(count.awardSilver).toEqual(0)
        expect(count.awardBronze).toEqual(0)
        expect(count.awardProvisional).toEqual(0)
        expect(count.nationEngland).toEqual(0)
        expect(count.nationWales).toEqual(0)
        expect(count.nationScotland).toEqual(0)
        expect(count.nationNI).toEqual(0)
        expect(count.providerTypeHEI).toEqual(0)
        expect(count.providerTypeFEC).toEqual(0)
        expect(count.providerTypeAP).toEqual(0)
    })

    it('should return null if providers is null', () => {

        let countedProviders: Provider[] = pipe.transform(null, count)

        expect(countedProviders).toBeNull()
    })

    it('should return all providers passed in when providers is not null', () => {

        let countedProviders: Provider[]

        countedProviders = pipe.transform(providers, count)

        expect(countedProviders).toEqual(providers)
    })

    describe('Filtering by one facet at a time', () => {

        let testData = require('../../json/count.pipe.json') as CountPipeData[]

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [CountPipe]
            })
        })

        it('should retrieve the test list of 24 providers from the test/json/outcomes.json file', () => {
            expect(providers).not.toBeUndefined()
            expect(providers.length).toEqual(24)
        })

        using(testData, (data: CountPipeData) => {

            let filteredProviders: Provider[] = providers
            let countedProviders: Provider[]

            beforeAll(() => {
                pipe = new CountPipe()

                if (data.filter)
                    switch (data.filter) {
                        case 'award':
                            filteredProviders = filteredProviders.filter(p => p.awardRating == data.filterValue)
                            break
                        case 'nation':
                            filteredProviders = filteredProviders.filter(p => p.nation == data.filterValue)
                            break
                        case 'type':
                            filteredProviders = filteredProviders.filter(p => p.providerType == data.filterValue)
                            break
                        case 'name':
                            filteredProviders = filteredProviders.filter(p => p.providerName.toLowerCase().includes(data.filterValue))
                            break
                    }

                countedProviders = pipe.transform(filteredProviders, data.value)
            })

            it('should return ' + data.expected.awardGold + ' Gold rated providers when the provider list is ' + (data.filter ? 'filtered by ' + data.filter + ' of ' + data.filterValue : 'unfiltered'), () => {
                expect(data.value.awardGold).toEqual(data.expected.awardGold)
                expect(data.value.awardGold).toEqual(countedProviders.filter(p => p.awardRating == 'Gold').length)
            })

            it('should return ' + data.expected.awardSilver + ' Silver rated providers when the provider list is ' + (data.filter ? 'filtered by ' + data.filter + ' of ' + data.filterValue : 'unfiltered'), () => {
                expect(data.value.awardSilver).toEqual(data.expected.awardSilver)
                expect(data.value.awardSilver).toEqual(countedProviders.filter(p => p.awardRating == 'Silver').length)
            })

            it('should return ' + data.expected.awardBronze + ' Bronze rated providers when the provider list is ' + (data.filter ? 'filtered by ' + data.filter + ' of ' + data.filterValue : 'unfiltered'), () => {
                expect(data.value.awardBronze).toEqual(data.expected.awardBronze)
                expect(data.value.awardBronze).toEqual(countedProviders.filter(p => p.awardRating == 'Bronze').length)
            })

            it('should return ' + data.expected.awardProvisional + ' Provisional rated providers when the provider list is ' + (data.filter ? 'filtered by ' + data.filter + ' of ' + data.filterValue : 'unfiltered'), () => {
                expect(data.value.awardProvisional).toEqual(data.expected.awardProvisional)
                expect(data.value.awardProvisional).toEqual(countedProviders.filter(p => p.awardRating == 'Provisional').length)
            })

            it('should return ' + data.expected.nationEngland + ' providers in England when the provider list is ' + (data.filter ? 'filtered by ' + data.filter + ' of ' + data.filterValue : 'unfiltered'), () => {
                expect(data.value.nationEngland).toEqual(data.expected.nationEngland)
                expect(data.value.nationEngland).toEqual(countedProviders.filter(p => p.nation == 'England').length)
            })

            it('should return ' + data.expected.nationWales + ' providers in Wales when the provider list is ' + (data.filter ? 'filtered by ' + data.filter + ' of ' + data.filterValue : 'unfiltered'), () => {
                expect(data.value.nationWales).toEqual(data.expected.nationWales)
                expect(data.value.nationWales).toEqual(countedProviders.filter(p => p.nation == 'Wales').length)
            })

            it('should return ' + data.expected.nationScotland + ' providers in Scotland when the provider list is ' + (data.filter ? 'filtered by ' + data.filter + ' of ' + data.filterValue : 'unfiltered'), () => {
                expect(data.value.nationScotland).toEqual(data.expected.nationScotland)
                expect(data.value.nationScotland).toEqual(countedProviders.filter(p => p.nation == 'Scotland').length)
            })

            it('should return ' + data.expected.nationNI + ' providers in Northern Ireland when the provider list is ' + (data.filter ? 'filtered by ' + data.filter + ' of ' + data.filterValue : 'unfiltered'), () => {
                expect(data.value.nationNI).toEqual(data.expected.nationNI)
                expect(data.value.nationNI).toEqual(countedProviders.filter(p => p.nation == 'Northern Ireland').length)
            })

            it('should return ' + data.expected.providerTypeHEI + ' HEI providers when the provider list is ' + (data.filter ? 'filtered by ' + data.filter + ' of ' + data.filterValue : 'unfiltered'), () => {
                expect(data.value.providerTypeHEI).toEqual(data.expected.providerTypeHEI)
                expect(data.value.providerTypeHEI).toEqual(countedProviders.filter(p => p.providerType == 'HEI').length)
            })

            it('should return ' + data.expected.providerTypeFEC + ' FEC providers when the provider list is ' + (data.filter ? 'filtered by ' + data.filter + ' of ' + data.filterValue : 'unfiltered'), () => {
                expect(data.value.providerTypeFEC).toEqual(data.expected.providerTypeFEC)
                expect(data.value.providerTypeFEC).toEqual(countedProviders.filter(p => p.providerType == 'FEC').length)
            })

            it('should return ' + data.expected.providerTypeAP + ' AP providers when the provider list is ' + (data.filter ? 'filtered by ' + data.filter + ' of ' + data.filterValue : 'unfiltered'), () => {
                expect(data.value.providerTypeAP).toEqual(data.expected.providerTypeAP)
                expect(data.value.providerTypeAP).toEqual(countedProviders.filter(p => p.providerType == 'AP').length)
            })
        })
    })

    describe('Filtering by multiple facets', () => {

        let testData = require('../../json/multifacet-count.pipe.json') as MultiFacetCountPipeData[]

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [CountPipe]
            })
        })

        it('should retrieve the test list of 24 providers from the test/json/outcomes.json file', () => {
            expect(providers).not.toBeUndefined()
            expect(providers.length).toEqual(24)
        })

        using(testData, (data: MultiFacetCountPipeData) => {

            let filteredProviders: Provider[] = providers
            let countedProviders: Provider[]

            beforeAll(() => {
                pipe = new CountPipe()

                if (data.name) {
                    filteredProviders = filteredProviders.filter(p => p.providerName.toLowerCase().includes(data.name))
                }

                if (data.award) {
                    filteredProviders = filteredProviders.filter(p => p.awardRating == data.award)
                }

                if (data.nation) {
                    filteredProviders = filteredProviders.filter(p => p.nation == data.nation)
                }

                if (data.type) {
                    filteredProviders = filteredProviders.filter(p => p.providerType == data.type)
                }

                countedProviders = pipe.transform(filteredProviders, data.value)
            })

            it('should return ' + data.expected.awardGold + ' Gold rated providers when the provider list is filtered by ' + (data.name ? data.name + ', ' : ': ') + (data.award ? data.award + ', ' : ', ') + (data.nation ? data.nation + ', ' : ', ') + (data.type ? data.type : ' '), () => {
                expect(data.value.awardGold).toEqual(data.expected.awardGold)
                expect(data.value.awardGold).toEqual(countedProviders.filter(p => p.awardRating == 'Gold').length)
            })

            it('should return ' + data.expected.awardSilver + ' Silver rated providers when the provider list is filtered by ' + (data.name ? data.name + ', ' : ': ') + (data.award ? data.award + ', ' : ', ') + (data.nation ? data.nation + ', ' : ', ') + (data.type ? data.type : ' '), () => {
                expect(data.value.awardSilver).toEqual(data.expected.awardSilver)
                expect(data.value.awardSilver).toEqual(countedProviders.filter(p => p.awardRating == 'Silver').length)
            })

            it('should return ' + data.expected.awardBronze + ' Bronze rated providers when the provider list is filtered by ' + (data.name ? data.name + ', ' : ': ') + (data.award ? data.award + ', ' : ', ') + (data.nation ? data.nation + ', ' : ', ') + (data.type ? data.type : ' '), () => {
                expect(data.value.awardBronze).toEqual(data.expected.awardBronze)
                expect(data.value.awardBronze).toEqual(countedProviders.filter(p => p.awardRating == 'Bronze').length)
            })

            it('should return ' + data.expected.awardProvisional + ' Provisional rated providers when the provider list is filtered by ' + (data.name ? data.name + ', ' : ': ') + (data.award ? data.award : ', ') + (data.nation ? data.nation + ', ' : ', ') + (data.type ? data.type : ' '), () => {
                expect(data.value.awardProvisional).toEqual(data.expected.awardProvisional)
                expect(data.value.awardProvisional).toEqual(countedProviders.filter(p => p.awardRating == 'Provisional').length)
            })

            it('should return ' + data.expected.nationEngland + ' providers in England when the provider list is filtered by ' + (data.name ? data.name + ', ' : ': ') + (data.award ? data.award + ', ' : ', ') + (data.nation ? data.nation + ', ' : ', ') + (data.type ? data.type : ' '), () => {
                expect(data.value.nationEngland).toEqual(data.expected.nationEngland)
                expect(data.value.nationEngland).toEqual(countedProviders.filter(p => p.nation == 'England').length)
            })

            it('should return ' + data.expected.nationWales + ' providers in Wales when the provider list is filtered by ' + (data.name ? data.name + ', ' : ': ') + (data.award ? data.award + ', ' : ', ') + (data.nation ? data.nation + ', ' : ', ') + (data.type ? data.type : ' '), () => {
                expect(data.value.nationWales).toEqual(data.expected.nationWales)
                expect(data.value.nationWales).toEqual(countedProviders.filter(p => p.nation == 'Wales').length)
            })

            it('should return ' + data.expected.nationScotland + ' providers in Scotland when the provider list is filtered by ' + (data.name ? data.name + ', ' : ': ') + (data.award ? data.award + ', ' : ', ') + (data.nation ? data.nation + ', ' : ', ') + (data.type ? data.type : ' '), () => {
                expect(data.value.nationScotland).toEqual(data.expected.nationScotland)
                expect(data.value.nationScotland).toEqual(countedProviders.filter(p => p.nation == 'Scotland').length)
            })

            it('should return ' + data.expected.nationNI + ' providers in Northern Ireland when the provider list is filtered by ' + (data.name ? data.name + ', ' : ': ') + (data.award ? data.award + ', ' : ', ') + (data.nation ? data.nation + ', ' : ', ') + (data.type ? data.type : ' '), () => {
                expect(data.value.nationNI).toEqual(data.expected.nationNI)
                expect(data.value.nationNI).toEqual(countedProviders.filter(p => p.nation == 'Northern Ireland').length)
            })

            it('should return ' + data.expected.providerTypeHEI + ' HEI providers when the provider list is filtered by ' + (data.name ? data.name + ', ' : ': ') + (data.award ? data.award + ', ' : ', ') + (data.nation ? data.nation : ', ') + (data.type ? data.type : ' '), () => {
                expect(data.value.providerTypeHEI).toEqual(data.expected.providerTypeHEI)
                expect(data.value.providerTypeHEI).toEqual(countedProviders.filter(p => p.providerType == 'HEI').length)
            })

            it('should return ' + data.expected.providerTypeFEC + ' FEC providers when the provider list is filtered by ' + (data.name ? data.name + ', ' : ': ') + (data.award ? data.award + ', ' : ', ') + (data.nation ? data.nation : ', ') + (data.type ? data.type : ''), () => {
                expect(data.value.providerTypeFEC).toEqual(data.expected.providerTypeFEC)
                expect(data.value.providerTypeFEC).toEqual(countedProviders.filter(p => p.providerType == 'FEC').length)
            })

            it('should return ' + data.expected.providerTypeAP + ' AP providers when the provider list is filtered by ' + (data.name ? data.name + ', ' : ': ') + (data.award ? data.award + ', ' : ', ') + (data.nation ? data.nation : ', ') + (data.type ? data.type : ''), () => {
                expect(data.value.providerTypeAP).toEqual(data.expected.providerTypeAP)
                expect(data.value.providerTypeAP).toEqual(countedProviders.filter(p => p.providerType == 'AP').length)
            })
        })
    })
})