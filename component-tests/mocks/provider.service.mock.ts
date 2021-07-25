//import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of'

import { Provider } from '../../app/provider/provider'

export class MockProviderService {

    //getProviders(): Observable<Provider[]> { return }

    //getProvider(ukprn: string): Observable<Provider> { return }

    getProviders() {
        return Observable.of([
            {
                "providerName": "The University of Here",
                "ukprn": "10002945",
                "awardDate": "1 December 2016",
                "awardRating": "Gold",
                "awardDuration": "1 Year",
                "nation": "England",
                "providerType": "HEI"
            },
            {
                "providerName": "The University of Somewhere",
                "ukprn": "10007798",
                "awardDate": "1 December 2016",
                "awardRating": "Provisional",
                "awardDuration": "2 years",
                "nation": "England",
                "providerType": "HEI"
            },
            {
                "providerName": "University of Festivals",
                "ukprn": "10007786",
                "awardDate": "1 January 2017",
                "awardRating": "Silver",
                "awardDuration": "1 year",
                "nation": "England",
                "providerType": "HEI",
                "fairAccessLink": "www.****.ac.uk"
            }
        ])
    }

    getProvider(ukprn: string) {
        return Observable.of({
            "providerName": "Mock University",
            "ukprn": "10000999",
            "awardDate": "19 March 2016",
            "awardRating": "Gold",
            "awardDuration": "2 years",
            "nation": "England",
            "providerType": "HEI"
        })
    }
}