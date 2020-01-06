import * as React from 'react';
import { IBasePageProps } from '../interfaces/base-page.interface';
import { Subscription } from 'rxjs/internal/Subscription';

export class BasePage<T> extends React.Component<IBasePageProps<T>> {
    public subscription: Subscription;

    /**
     * Before the page is unmount, unsubscribes the subscription
     */
    public componentWillUnmount(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    /**
     * Renders the navigation buttons (in this case, just the back one)
     */
    public renderNavigationButtons(): JSX.Element {
        return (
            <div className="navigation-buttons">
                <button onClick={() => this.goBack()}>{"<< Back"}</button>
            </div>
        );
    }

    /**
     * Allows to go back to the previous page 
     */
    private goBack(): void {
        this.props.history.goBack();
    }
}
