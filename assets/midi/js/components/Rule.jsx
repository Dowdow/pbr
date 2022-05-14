import React from 'react';
import { useDispatch } from 'react-redux';
import { removeRule } from '../actions/rules';

export default function Rule({ rule }) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeRule(rule.id));
  };
  return (
    <div>
      <span>{rule.midiMessageType}</span>
      <span>{`Channel: ${rule.midiMessageChannel}`}</span>
      <span>{`Message Value 1: ${rule.midiMessageValue1}`}</span>
      <span>{`Message Value 2: ${rule.midiMessageValue2}`}</span>
      <span>{`Trigger: ${rule.type === 0 ? 'Button' : 'Axe'}`}</span>
      <span>{`N°: ${rule.typeValue}`}</span>
      <button type="button" onClick={handleRemove}>Remove</button>
    </div>
  );
}
