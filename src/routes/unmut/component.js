import withIntl from '../../core/withIntl';

import { Grid, Column, Row } from '../../components/Grid';
import Jumbotron from '../../components/Jumbotron';
import React from 'react';

/*
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  error: {
    id: 'model.order.error',
    defaultMessage: 'Fehler',
    description: 'RGF Auftrag Fehler',
  },
  id: {
    id: 'model.order.id',
    defaultMessage: '#',
    description: 'Order Id',
  },
});
*/

export default withIntl(() => { // (props, context)
  const text = "Unmut is an IBM Watson based API which provides ad-hoc text analysis, known as Real-time NLP to recognize displeasure of customers in a natural written German text like E-Mails or letters from customers."; // eslint-disable-line
  return (
    <div>
      <Jumbotron>
        <Row>
          <Column clasName="column-75">
            <h1>Unmut</h1>
            <p>{ text }</p>
          </Column>
          <Column className="column-25">
            <ul>
              <li>Fork on GitHub</li>
              <li>API Docs</li>
            </ul>
          </Column>
        </Row>
      </Jumbotron>
      <Grid>
        <Row>
          <Column>
            <h2>Analyze Text</h2>
            <p>
              Try sample content by editing the textbox and submit.
            </p>
            <textarea />
          </Column>
        </Row>
      </Grid>
    </div>);
});
