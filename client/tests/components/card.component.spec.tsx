import { CardComponent } from './../../src/components/card/card.component';
import { ITrip } from './../../src/interfaces/trip.interface';
import { ShallowWrapper, shallow } from 'enzyme';

describe('CardComponent', () => {
    let trip: ITrip;
    let component: CardComponent;

    beforeEach(() => {
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

        component = new CardComponent({ trip, onClick: () => jest.fn() });
    });

    describe('#render', () => {
        let spyOnClick: jasmine.Spy;
        let wrapper: ShallowWrapper;

        beforeEach(() => {
            spyOnClick = spyOn(component as any, 'onClick');
            wrapper = shallow(component.render());
        });

        it('should call onClick', () => {
            wrapper.find('.my-card').simulate('click');
            expect(spyOnClick).toHaveBeenCalled();
        });

        it('should return the right html', () => {
            expect(wrapper.html()).toEqual('<div class=\"my-card\"><div class=\"card-image\" style=\"background-image:url(undefined/assets/img/iceland.jpg)\"><div class=\"country-flag\" style=\"background-image:url(undefined/assets/img/flagIceland.png)\"></div></div><div class=\"card-info\"><div class=\"country\">Iceland</div><div class=\"title\">Island of Ice</div><div class=\"card-keywords\"><div class=\"keyword\">#nature</div><div class=\"keyword\">#family</div></div></div></div>');
        });
    });

    describe('#onClick', () => {
        let spyPropsOnClick: jasmine.Spy;

        beforeEach(() => {
            spyPropsOnClick = spyOn(component.props, 'onClick');
            component['onClick']();
        });

        it('should call onClick', () => {
            expect(spyPropsOnClick).toHaveBeenCalledWith(component.props.trip.id);
        });
    });
});
