import React from 'react';

export default function Tools() {
  const midiUrl = process.env.NODE_ENV === 'production' ? 'https://midi.painboudinrecord.fr' : 'https://midi.pbr.local';
  const vrUrl = process.env.NODE_ENV === 'production' ? 'https://vr.painboudinrecord.fr' : 'https://vr.pbr.local';

  return (
    <div id="tools" className="container mx-auto my-20 px-2 md:px-0">
      <div className="flex flex-col md:flex-row justify-center mb-20">
        <img src="/images/tools/midi.png" alt="MIDI Tool" loading="lazy" className="w-full md:w-96 lg:w-160 md:mx-20 object-cover self-center rounded shadow" />
        <div className="my-5">
          <a href={midiUrl} target="_blank" rel="noreferrer" className="font-bold text-3xl hover:underline">Gamepad inputs to MIDI</a>
          <p className="mt-2">
            Connect any gamepad to your computer, write some MIDI rules, activate your MIDI output, and let the magic do the rest.
            <br className="mt-1" />
            You can connect up to 4 gamepads and activate as many outputs as you want.
            <br className="mt1" />
            Debug your rules through logs and get your work done in your favorite DAW.
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row-reverse justify-center">
        <img src="/images/tools/vr.png" alt="VR Website" loading="lazy" className="w-full md:w-96 lg:w-160 md:mx-20 object-cover self-center rounded shadow" />
        <div className="my-5">
          <a href={vrUrl} target="_blank" rel="noreferrer" className="font-bold text-3xl hover:underline">VR Website</a>
          <p className="mt-2">
            Experience the PBdR website in its VR form.
            <br className="mt-1" />
            Select a song and press the button in front of you to play and pause.
          </p>
        </div>
      </div>
    </div>
  );
}
