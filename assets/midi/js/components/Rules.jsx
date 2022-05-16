import React from 'react';
import { useSelector } from 'react-redux';
import Rule from './Rule';
import RuleForm from './RuleForm';

export default function Rules() {
  const rules = useSelector((state) => state.rules);

  return (
    <div className="mt-3">
      <h3 className="text-lg font-bold mb-4 text-center">Your Rules</h3>
      <table className="table table-auto border-collapse mx-auto">
        <tbody className="border-t">
          {rules.length === 0 ? <tr><td>No rules for now</td></tr> : null}
          {rules
            .sort((r1, r2) => r1.id - r2.id)
            .map((r) => <Rule key={r.id} rule={r} />)}
        </tbody>
      </table>
      <RuleForm />
    </div>
  );
}
