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
    <tr className={`border-l-4 ${rule.activated ? 'border-green-400' : 'border-red-500'}`}>
      <td className="p-2 border-b border-r">
        C
        <span className="font-bold">{rule.controllerIndex}</span>
      </td>
      <td className="p-2 border-b border-r">
        {rule.buttonType === 0 ? 'B' : 'Axe '}
        <span className="font-bold">{rule.buttonIndex}</span>
      </td>
      <td className="p-2 border-b border-r font-bold">{midiTypeNameFromId(rule.midiMessageType)}</td>
      <td className="p-2 border-b border-r">
        CH
        <span className="font-bold ml-1">{rule.midiMessageChannel + 1}</span>
      </td>
      <td className="p-2 border-b border-r">
        V1
        <span className="font-bold ml-1">{rule.midiMessageValue1}</span>
      </td>
      <td className="p-2 border-b border-r">
        V2
        <span className="font-bold ml-1">{rule.midiMessageValue2}</span>
      </td>
      <td className="p-2 border-b border-r">
        <button type="button" onClick={handleToggleActivated} className="underline">{rule.activated ? 'Stop' : 'Start'}</button>
      </td>
      <td className="p-2 border-b border-r">
        <button type="button" onClick={handleRemove} className="underline">Remove</button>
      </td>
    </tr>
  );
}
