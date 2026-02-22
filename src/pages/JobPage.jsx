import React, { useState } from 'react';
import { ApplySearch } from '../components/Job/ApplySearch';
import { ApplyJobForm } from '../components/Job/ApplyJobForm';
import { ApplyJobStatus } from '../components/Job/ApplyJobStatus';

export function JobPage() {
  const [foundJob, setFoundJob] = useState(null);
  const [applyNew, setApllyNew] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <main className="container-page py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Cek Lamaran / Coba Melamar</h1>
        <div>
          <button
            type="button"
            onClick={() => { setApllyNew((v) => !v); setFoundJob(null); setSelectedJob(null); }}
            className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-4 py-3 text-xs font-semibold text-white shadow-sm hover:bg-primary-600"
          >
            {applyNew ? 'Kembali lihat lowongan' : 'Karirmu berawal dari sini ?'}
          </button>
        </div>
      </div>


      {!applyNew && (
        <div id='#jobs'>
          <ApplySearch onFound={(apply) => setFoundJob(apply)} onApply={(job) => { setApllyNew(true); setSelectedJob(job); }} />
        </div>
      )}
      
      {foundJob && (
        <div className="mt-6">
          <ApplyJobStatus applyData={foundJob} />
        </div>
      )}


      {applyNew && (
        <div className="mt-6">
          <ApplyJobForm selectedJob={selectedJob} onCreated={(applyId) => { setApllyNew(false); }} onFound={(apply) => setFoundJob(apply)} />
        </div>
      )}
    </main>
  );
}

export default JobPage;
