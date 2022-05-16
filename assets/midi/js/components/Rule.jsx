import React from 'react';
import { useDispatch } from 'react-redux';
import { removeRule, toggleRuleActivated } from '../actions/rules';
import { midiTypeNameFromId } from '../utils/midi';

export default function Rule({ rule }) {
  const dispatch = useDispatch();

  const handleToggleActivated = () => {
    dispatch(toggleRuleActivated(rule.id));
  };

  const handleRemove = () => {
    dispatch(removeRule(rule.id));
  };

  return (
    <div className={`flex flex-col w-36 p-2 mx-2 mb-4 bg-gray-200 border-t-4 ${rule.activated ? 'border-green-400' : 'border-red-500'}`}>
      <div className="flex flex-row justify-between">
        <h4 className="font-bold">{midiTypeNameFromId(rule.midiMessageType)}</h4>
        <span>
          CH
          <span className="font-bold ml-1">{rule.midiMessageChannel + 1}</span>
        </span>
      </div>
      <div className="flex flex-row justify-between">
        <span className="mr-2">
          V1
          <span className="font-bold ml-1">{rule.midiMessageValue1}</span>
        </span>
        <span>
          V2
          <span className="font-bold ml-1">{rule.midiMessageValue2}</span>
        </span>
      </div>
      <div className="flex flex-row justify-center">
        <span className="mr-4">
          C
          <span className="font-bold">{rule.controllerIndex}</span>
        </span>
        <span>
          {rule.buttonType === 0 ? 'B' : 'Axe '}
          <span className="font-bold">{rule.buttonIndex}</span>
        </span>
      </div>
      <div className="flex flex-row justify-between mt-2">
        <button type="button" onClick={handleToggleActivated} className="underline">{rule.activated ? 'Stop' : 'Start'}</button>
        <button type="button" onClick={handleRemove} className="underline">Remove</button>
      </div>
    </div>
  );
}
