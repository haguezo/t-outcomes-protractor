import { Observable } from 'rxjs';
import { Type } from '@angular/core';
import { ActivatedRoute, Route, ActivatedRouteSnapshot, UrlSegment, Params, ParamMap, Data } from '@angular/router';

export class MockActivatedRoute implements ActivatedRoute {
    snapshot: ActivatedRouteSnapshot
    url: Observable<UrlSegment[]>
    params: Observable<Params>
    paramMap: Observable<ParamMap>
    queryParams: Observable<Params>
    queryParamMap: Observable<ParamMap>
    fragment: Observable<string>
    data: Observable<Data>
    outlet: string
    component: Type<any> | string
    routeConfig: Route
    root: ActivatedRoute
    parent: ActivatedRoute
    firstChild: ActivatedRoute
    children: ActivatedRoute[]
    pathFromRoot: ActivatedRoute[]
    toString(): string {
        return ''
    }

    constructor(private ukprn: string) {
        this.snapshot = new ActivatedRouteSnapshot()
        this.snapshot.params = { ukprn: ukprn }
    }
}