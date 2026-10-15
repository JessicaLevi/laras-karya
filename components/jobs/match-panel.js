import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { GAP_LEVELS, DEFAULT_REASONS } from "@/lib/mock-jobs";

function matchSummary(match) {
  if (match >= 90) return "Profil Anda sangat ideal untuk kualifikasi ini";
  if (match >= 75) return "Profil Anda cukup sesuai dengan kualifikasi ini";
  return "Beberapa keterampilan perlu dikembangkan";
}

export function SkillGapList({ gaps }) {
  return (
    <ul className="space-y-4">
      {gaps.map(([skill, level]) => {
        const l = GAP_LEVELS[level];
        return (
          <li key={skill}>
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="font-medium text-ink">{skill}</span>
              <span className={`text-xs ${l.text}`}>{l.label}</span>
            </div>
            <div className="mt-1.5 h-1.5 rounded-full bg-slate-200" role="img" aria-label={`${skill}: ${l.label}`}>
              <div className={`h-full rounded-full ${l.bar}`} style={{ width: `${l.pct}%` }} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default function MatchPanel({ job }) {
  const r = 26;
  const c = 2 * Math.PI * r;

  return (
    <aside aria-label="Alasan kecocokan" className="rounded-2xl bg-white p-6">
      <h3 className="flex items-center gap-2 font-bold text-ai">
        <Sparkles className="h-4 w-4" aria-hidden /> Mengapa Cocok untuk Anda
      </h3>

      <div className="mt-5 flex items-center gap-4">
        <div className="relative h-16 w-16 shrink-0">
          <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90" aria-hidden>
            <circle cx="32" cy="32" r={r} fill="none" strokeWidth="5" className="stroke-slate-200" />
            <circle
              cx="32" cy="32" r={r} fill="none" strokeWidth="5" strokeLinecap="round"
              className="stroke-brand" strokeDasharray={c} strokeDashoffset={c * (1 - job.match / 100)}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-brand">
            {job.match}%
          </span>
        </div>
        <div>
          <p className="font-bold text-ink">Tingkat Kecocokan</p>
          <p className="text-xs text-slate-600">{matchSummary(job.match)}</p>
        </div>
      </div>

      <ul className="mt-5 space-y-2 text-sm text-slate-800">
        {DEFAULT_REASONS.map((t) => (
          <li key={t} className="flex items-center gap-2">
            <Check className="h-4 w-4 shrink-0 text-brand" aria-hidden /> {t}
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t border-slate-200 pt-5">
        <h4 className="mb-4 font-bold text-ink">Skill Gap</h4>
        <SkillGapList gaps={job.gaps} />
        <Link href="/learning-path" className="mt-5 inline-block text-sm font-semibold text-brand hover:underline">
          Lihat Pelatihan Terkait
        </Link>
      </div>
    </aside>
  );
}
