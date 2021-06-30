/**
 *
 * Asynchronously loads the component for ReportBox
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
