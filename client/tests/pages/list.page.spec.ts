import { apiService } from '../../src/shared/api.service';
import { ITrip } from '../../src/interfaces/trip.interface';
import { Subject } from 'rxjs/internal/Subject';
import { shallow, ShallowWrapper } from 'enzyme';
import { MockComponent } from '../../src/utils/mock.component';
import { ListPage } from '../../src/pages/list.page';
jest.mock('./../../src/components/card/card.component', () => ({
    CardComponent: (props) => MockComponent('card'),
}));

describe('ListPage', () => {
    let page: ListPage;
    let trip: ITrip;

    beforeEach(() => {
        page =  new ListPage({});
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
        let spyGetTrips: jasmine.Spy;
        let spySetState: jasmine.Spy;
        let subject: Subject<{ [key: string] : ITrip[] }>;

        beforeEach(() => {
            subject = new Subject();
            spyGetTrips = spyOn(apiService, 'getTrips').and.returnValue(subject);
            spySetState = spyOn(page, 'setState');
        });

        describe('when the category is undefined', () => {
            beforeEach(() => {
                page['componentDidMount']();
            });

            it('should call apiService.getTrips', () => {
                expect(spyGetTrips).toHaveBeenCalled();
            });
    
            it('should call setState', () => {
                // before subject emits, setState should not be called
                expect(spySetState).not.toHaveBeenCalled();
                subject.next({ Iceland: [trip] });
                // after subject emits, setState should be called
                expect(spySetState).toHaveBeenCalledWith({ tripsByCategory: { Iceland: [trip] } });
            });
        });

        describe('when the category is defined', () => {
            beforeEach(() => {
                (page.props as any) = { match: { params: { category: 'Iceland' } } };
                page['componentDidMount'](); 
            });

            it('should call apiService.getTrips', () => {
                expect(spyGetTrips).toHaveBeenCalledWith('Iceland');
            });
    
            it('should call setState', () => {
                // before subject emits, setState should not be called
                expect(spySetState).not.toHaveBeenCalled();
                subject.next({ Iceland: [trip] });
                // after subject emits, setState should be called
                expect(spySetState).toHaveBeenCalledWith({ tripsByCategory: { Iceland: [trip] } });
            });
        });
    });

    describe('#renderCategoryTrips', () => {
        let result: string;

        beforeEach(() => {
            spyOn(page as any, 'goToTripDetails').and.returnValue('function');
            result = shallow(page['renderCategoryTrips'](trip.countryName, [trip, trip])).html();
        });

        it('should return the right html', () => {
            expect(result).toEqual('<div class="category-container"><div class="category-title">Iceland |</div><div class="trips-container"><div class="card"></div><div class="card"></div></div></div>');
        });
    });
});
