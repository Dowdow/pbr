import React from 'react';
import Button from './Button';

export default function Gamepad({ activated, data }) {
  if (data === null) {
    return null;
  }

  return (
    <div className="flex flex-col mt-5">
      <h3 className="text-lg font-bold mx-2 mb-4">{data.id}</h3>
      <div className="flex flex-row flex-wrap">
        {data.buttons.map((button, i) => <Button key={`button-${data.index}-${i}`} type={0} activated={activated} controllerIndex={data.index} index={i} value={button.value} />)}
      </div>
      <div className="flex flex-row flex-wrap mt-2">
        {data.axes.map((axe, i) => <Button key={`axe-${data.index}-${i}`} type={1} activated={activated} controllerIndex={data.index} index={i} value={axe} />)}
      </div>
    </div>
  );
}
