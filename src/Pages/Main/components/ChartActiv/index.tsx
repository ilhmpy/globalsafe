import React, { useContext, useState, useEffect, useCallback } from 'react';
import { SliderChart } from './Slider';
import { AppContext } from '../../../../context/HubContext';
import { ChartContext } from '../../../../context/ChartContext';

export const ExchangeChart = () => {
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const {
    fetchGLOBAL,
    listDIAMOND,
    listGLOBAL,
    listMGCWD,
    listGCWD,
    fetchDIAMOND,
    fetchGCWD,
    fetchMGCWD,
  } = useContext(ChartContext);

  useEffect(() => {
    let cancel = false;
    if (hubConnection && !cancel) {
      fetchGCWD('day');
      fetchMGCWD('day');
      fetchDIAMOND('day');
      fetchGLOBAL('day');
    }
    return () => {
      cancel = true;
    };
  }, [hubConnection]);

  return (
    <>
      <SliderChart
        listDIAMOND={listDIAMOND}
        listGLOBAL={listGLOBAL}
        listMGCWD={listMGCWD}
        listGCWD={listGCWD}
        fetchMGCWD={fetchMGCWD}
        fetchGCWD={fetchGCWD}
        fetchDIAMOND={fetchDIAMOND}
        fetchGLOBAL={fetchGLOBAL}
      />
    </>
  );
};
