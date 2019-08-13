import React from 'react';
import Splitter from '../../shared/components/splitter/splitter';
import Resume from './resume/resume';
import ResumeTools from './resume-tools/resume-tools';

export default () => {
  const initConfig = [
    { size: '80%', min: '10px', resizable: true, collapsible: true },
    { size: '20%', min: '10px', resizable: true, collapsible: true }
  ];
  return (
    <Splitter panesConfig={initConfig}>
      <Resume />
      <ResumeTools />
    </Splitter>
  )
}
