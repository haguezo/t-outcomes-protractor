import { TestBed, inject } from '@angular/core/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs/Observable'

import { APP_CONFIG, AppConfig } from '../../app/app.config'
import { ProviderPageComponent } from '../../app/provider/provider-page.component'
import { ProviderService } from '../../app/provider/provider.service'
import { MockProviderService } from '../mocks/provider.service.mock'
import { MockActivatedRoute } from '../mocks/route.mocks'

describe('Provider page', () => {

    // *** Example test ***
    //it('should set credentials and redirect on sign in', inject([Login, AuthenticationService, Router], (login, auth, router) => {
    //    login.secretKey = 'test';
    //    spyOn(auth, 'setCredentials');
    //    login.onSignIn();
    //    expect(config.setCredentials).toHaveBeenCalledWith('test');
    //    expect(router.navigate).toHaveBeenCalledWith(['Home']);
    //}));

    let ukprn: string = '12345'
    let providerPage: ProviderPageComponent
    let mockActivatedRoute: MockActivatedRoute    
    let mockService: MockProviderService

    beforeEach(() => {

        mockActivatedRoute = new MockActivatedRoute(ukprn)
        mockService = new MockProviderService()
        spyOn(mockService, 'getProvider').and.callThrough()
        spyOn(mockService, 'getProviders').and.callThrough()

        TestBed.configureTestingModule({
            declarations: [ProviderPageComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                { provide: APP_CONFIG, useValue: AppConfig },
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) },
                { provide: ProviderService, useValue: mockService }
            ]
        })

        let fixture = TestBed.createComponent(ProviderPageComponent)
        providerPage = fixture.componentInstance
    })

    // *** this shows how to inject dependencies - only need to do this when using in the test itself ***
    // ==================================================================================================
    //it('should be defined', inject([ActivatedRoute, Router, ProviderService], (route: MockActivatedRoute, router: Router, service: MockProviderService) => {
    //    expect(providerPage).toBeDefined()  // <-- technically this expectation doesn't require any of the injected parameters
    //}))

    it('should be defined', () => {
        expect(providerPage).toBeDefined()
    })

    it('should have a ProviderService defined', inject([ProviderService], (service: MockProviderService) => {
        expect(service).toBeDefined()
    }))

    it('should contain params in the activated route', inject([ActivatedRoute], (activatedRoute: MockActivatedRoute) => {
        expect(activatedRoute.snapshot.params).toBeDefined()
    }))

    it('should contain the ukprn param in the activated route', inject([ActivatedRoute], (activatedRoute: MockActivatedRoute) => {
        expect(activatedRoute.snapshot.params['ukprn']).toBeDefined()
    }))

    it('should contain the ukprn param "' + ukprn + '" in the activated route', inject([ActivatedRoute], (activatedRoute: MockActivatedRoute) => {
        expect(activatedRoute.snapshot.params['ukprn']).toEqual(ukprn)
    }))

    describe('initialise', () => {

        beforeEach(() => {
            providerPage.ngOnInit()
        })

        it('should call getProvider(ukprn) on the ProviderService', inject([ProviderService], (service: MockProviderService) => {
            expect(service.getProvider).toHaveBeenCalled()
        }))

        it('should call getProvider(ukprn) on the ProviderService once', inject([ProviderService], (service: MockProviderService) => {
            expect(service.getProvider).toHaveBeenCalledTimes(1)
        }))

        it('should call getProvider(ukprn) on the ProviderService with the parameter "' + ukprn + '"', inject([ProviderService], (service: MockProviderService) => {
            expect(service.getProvider).toHaveBeenCalledWith(ukprn)
        }))
    })

    it('should call navigate on the router onBack()', inject([Router], (router: Router) => {
        providerPage.onBack()
        expect(router.navigate).toHaveBeenCalled()
    }))

    it('should call navigate on the router onBack() passing the "/" parameter', inject([Router], (router: Router) => {
        providerPage.onBack()
        expect(router.navigate).toHaveBeenCalledWith(['/'])
    }))

    it('should call navigate on the router once onBack() ', inject([Router], (router: Router) => {
        providerPage.onBack()
        expect(router.navigate).toHaveBeenCalledTimes(1)
    }))
})