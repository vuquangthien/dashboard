/*
 * Snackbar Messages
 *
 * This contains all the text for the Snackbar component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Snackbar';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Snackbar component!',
  },
});
