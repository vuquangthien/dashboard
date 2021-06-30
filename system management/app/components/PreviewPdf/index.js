/* eslint-disable prettier/prettier */

import React, { memo } from 'react';


function PreviewPdf(props) {
  const { data, title } = props;

    
  return (
    <iframe title={title} width={'100%'} height={'100%'} src={data} />
  );
}
export default memo(PreviewPdf);
