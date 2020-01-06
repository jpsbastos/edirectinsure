import { apiService } from './../../src/shared/api.service';
import { ITrip } from '../../src/interfaces/trip.interface';
import { Subject } from 'rxjs/internal/Subject';
import { shallow } from 'enzyme';
import { MockComponent } from './../../src/utils/mock.component';
import { ArticlePage } from './../../src/pages/article.page';
jest.mock('react-router-dom', () => ({
    Link: (props) => MockComponent('link', props),
}));

describe('ArticlePage', () => {

    let page: ArticlePage;
    let trip: ITrip;

    beforeEach(() => {
        page = new ArticlePage({ match: { params: { id: '1' } } });
        trip = {
            id: 1,
            title: 'Island of Ice',
            countryName: 'Iceland',
            countryFlag: 'flagIceland.png',
            description: 'Iceland Trip',
            keywords: ['nature', 'family'],
            cities: ['Reykjavik'],
            picture: 'iceland.jpg',
        };
    });

    describe('#componentDidMount', () => {
        let spyGetTripById: jasmine.Spy;
        let spySetState: jasmine.Spy;
        let subject: Subject<ITrip>;

        beforeEach(() => {
            subject = new Subject();
            spyGetTripById = spyOn(apiService, 'getTripById').and.returnValue(subject);
            spySetState = spyOn(page, 'setState');
            page['componentDidMount']();
        });

        it('should call apiService.getTripById', () => {
            expect(spyGetTripById).toHaveBeenCalledWith(1);
        });

        it('should call setState', () => {
            // before subject emits, setState should not be called
            expect(spySetState).not.toHaveBeenCalled();
            subject.next(trip);
            // after subject emits, setState should be called
            expect(spySetState).toHaveBeenCalledWith({ trip });
        });
    });

    describe('#render', () => {
        let spyRenderImageAndTitle: jasmine.Spy;
        let spyRenderInfo: jasmine.Spy;
        let spyRenderNavigationButtons: jasmine.Spy;
        let result: JSX.Element;

        beforeEach(() => {
            spyRenderImageAndTitle = spyOn(page as any, 'renderImageAndTitle')
                .and.returnValue('renderImageAndTitle');
            spyRenderInfo = spyOn(page as any, 'renderInfo').and.returnValue('renderInfo');
            spyRenderNavigationButtons = spyOn(page as any, 'renderNavigationButtons')
                .and.returnValue('renderNavigationButtons');
        });

        describe('when trip is undefined', () => {
            beforeEach(() => result = page.render());

            it('should not call renderImageAndTitle', () => {
                expect(spyRenderImageAndTitle).not.toHaveBeenCalled();
            });

            it('should not call renderInfo', () => {
                expect(spyRenderInfo).not.toHaveBeenCalled();
            });

            it('should not call renderNavigationButtons', () => {
                expect(spyRenderNavigationButtons).not.toHaveBeenCalled();
            });

            it('should return null', () => {
                expect(result).toBeNull();
            });
        });

        describe('when trip is defined', () => {
            beforeEach(() => {
                page.state.trip = trip;
                result = page.render();
            });

            it('should call renderImageAndTitle', () => {
                expect(spyRenderImageAndTitle).toHaveBeenCalledWith(trip);
            });

            it('should call renderInfo', () => {
                expect(spyRenderInfo).toHaveBeenCalledWith(trip);
            });

            it('should call renderNavigationButtons', () => {
                expect(spyRenderNavigationButtons).toHaveBeenCalled();
            });

            it('should return the right html', () => {
                expect(shallow(result).html()).toEqual('<div class="page article-page"><div class="article">renderImageAndTitlerenderInforenderNavigationButtons</div></div>');
            });
        });
    });

    describe('#renderImageAndTitle', () => {
        it('should return the right html', () => {
            expect(shallow(page['renderImageAndTitle'](trip)).html()).toEqual('<div class="image-title"><div class="article-title">Island of Ice</div><div class="article-image" style="background-image:url(undefined/assets/img/iceland.jpg)"></div></div>');
        });
    });

    describe('#renderInfo', () => {
        it('should return the right html', () => {
            expect(shallow(page['renderInfo'](trip)).html()).toEqual('<div class="info"><div class="info-card"><div class="keywords"><div class="label">Keywords: </div><div class="keyword" prop-to="/category/nature" prop-children="nature"></div><div class="keyword" prop-to="/category/family" prop-children="family"></div></div><div class="description">Iceland Trip</div></div><div class="country-card"><div class="header"><div class="flag" style="background-image:url(undefined/assets/img/flagIceland.png)"></div><div class="country-name">Iceland | Visited Cities</div></div><div class="cities"><div class="city"><a href="https://www.google.com/search?q=Reykjavik" target="_blank" rel="noopener noreferrer">Reykjavik</a></div></div></div></div>');
        });
    });
});
