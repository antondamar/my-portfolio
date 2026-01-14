import React from 'react';

export default function ResumeViewer() {
  return (
    <div className="w-full h-[80vh] mt-10 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
      <iframe
        src="resume.pdf" // Put your PDF file in the 'public' folder and name it 'resume.pdf'
        width="100%"
        height="100%"
        className="bg-zinc-900"
        title="Resume Viewer"
      />
    </div>
  );
}