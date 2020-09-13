import React from 'react';

import { Container } from 'unstated';
import { connect } from '../../lib';

export class QuoteContainer extends Container {
  state = {
    quote: '',
    isLoading: false
  };

  getQuote = async () => {
    this.setState({ isLoading: true, quote: 'Loading...' });

    // Fake longer load time
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      // simulate error sometimes
      if (Math.random() < 0.2) throw new Error();

      const response = await fetch('https://quotes.rest/qod');
      const body = await response.json();

      return this.setState({
        isLoading: false,
        quote: body.contents.quotes[0].quote
      });
    } catch (error) {
      return this.setState({
        isLoading: false,
        quote: '(Simulated) Error loading quote'
      });
    }
  };
}

export const QuoteView = props => (
  <div>
    <button disabled={props.isLoading} onClick={props.getQuote}>
      Get quote
    </button>
    Quote: {props.quote}
  </div>
);

export const Quote = connect({
  containers: [QuoteContainer],
  mapToProps: quote => ({
    ...quote.state,
    getQuote: quote.getQuote
  }),
  component: QuoteView
});
