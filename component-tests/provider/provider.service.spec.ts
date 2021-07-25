import { TestBed, inject } from '@angular/core/testing'
import { HttpModule, Http, BaseRequestOptions, XHRBackend, Response, ResponseOptions } from '@angular/http'
import { MockBackend, MockConnection } from '@angular/http/testing'

import { ProviderService } from '../../app/provider/provider.service'
import { Provider } from '../../app/provider/provider'
import { APP_CONFIG, AppConfig } from '../../app/app.config'

describe('Service: ProviderService', () => {

    let providers = require('../json/outcomes.json') as Provider[]
    let mockProvider = providers.find(p => p.ukprn == '10000291')
    let mockProviders = providers
    let service: ProviderService
    let backend: MockBackend

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                { provide: APP_CONFIG, useValue: AppConfig },
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    useFactory: (backend: MockBackend, options: BaseRequestOptions) => new Http(backend, options),
                    deps: [MockBackend, BaseRequestOptions]
                },
                ProviderService
            ]
        })
        backend = TestBed.get(MockBackend)
        service = TestBed.get(ProviderService)
    })
    
    it('should define the service', () => {
        expect(service).toBeDefined()
    })

    describe('getProviders()', () => {

        beforeEach(inject([MockBackend], (mockBackend: MockBackend) => {
            backend.connections.subscribe((connection: MockConnection) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockProviders)
                })))
            })
        }))

        it('should be called once on the service', () => {
            spyOn(service, 'getProviders').and.callThrough()
            service.getProviders()
            expect(service.getProviders).toHaveBeenCalledTimes(1)
        })

        it('should return a list of 24 providers', () => {
            service.getProviders().subscribe((results) => {
                expect(results.length).toBe(24)
            })
        })
    })

    describe('getProvider(ukprn)', () => {

        let ukprn = '10000291'  // doesn't really matter what this value is

        beforeEach(inject([MockBackend], (mockBackend: MockBackend) => {
            backend.connections.subscribe((connection: MockConnection) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockProvider)
                })))
            })
        }))

        it('should be called once on the service', () => {
            spyOn(service, 'getProvider').and.callThrough()
            service.getProvider(ukprn)
            expect(service.getProvider).toHaveBeenCalledTimes(1)
        })

        it('should be called with the parameter ' + ukprn, () => {
            spyOn(service, 'getProvider').and.callThrough()
            service.getProvider(ukprn)
            expect(service.getProvider).toHaveBeenCalledWith(ukprn)
        })

        it('should return a single provider matching the ukprn ' + ukprn, () => {
            service.getProvider(ukprn).subscribe((result) => {
                expect(result.ukprn).toBe(ukprn)
            })
        })

        it('should return a single provider matching the ukprn ' + ukprn + ' with the award rating ' + mockProvider.awardRating, () => {
            service.getProvider(ukprn).subscribe((result) => {
                expect(result.awardRating).toBe(mockProvider.awardRating)
            })
        })

        it('should return a single provider matching the ukprn ' + ukprn + ' with the nation ' + mockProvider.nation, () => {
            service.getProvider(ukprn).subscribe((result) => {
                expect(result.nation).toBe(mockProvider.nation)
            })
        })

        it('should return a single provider matching the ukprn ' + ukprn + ' with the provider name ' + mockProvider.providerName, () => {
            service.getProvider(ukprn).subscribe((result) => {
                expect(result.providerName).toBe(mockProvider.providerName)
            })
        })

        it('should return a single provider matching the ukprn ' + ukprn + ' with the provider type ' + mockProvider.providerType, () => {
            service.getProvider(ukprn).subscribe((result) => {
                expect(result.providerType).toBe(mockProvider.providerType)
            })
        })

        it('should return a single provider matching the ukprn ' + ukprn + ' with the award date ' + mockProvider.awardDate, () => {
            service.getProvider(ukprn).subscribe((result) => {
                expect(result.awardDate).toBe(mockProvider.awardDate)
            })
        })

        it('should return a single provider matching the ukprn ' + ukprn + ' with the award duration ' + mockProvider.awardDuration, () => {
            service.getProvider(ukprn).subscribe((result) => {
                expect(result.awardDuration).toBe(mockProvider.awardDuration)
            })
        })
    })
})