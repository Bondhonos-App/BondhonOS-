import React from 'react'
import { motion } from 'framer-motion'

function Card({ children, className='' }){
  return <div className={`glass p-4 card-hover ${className}`}>{children}</div>
}

const ProgressRing = ({ value=70 }) => {
  const circumference = 2 * Math.PI * 36
  const offset = circumference * (1 - value/100)
  return (
    <svg viewBox="0 0 100 100" className="w-24 h-24 neon-ring">
      <circle cx="50" cy="50" r="36" fill="none" stroke="rgba(148,163,184,0.25)" strokeWidth="8" />
      <circle cx="50" cy="50" r="36" fill="none" stroke="url(#g)" strokeWidth="8" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#9b5cff" />
        </linearGradient>
      </defs>
      <text x="50" y="54" textAnchor="middle" className="fill-slate-900 dark:fill-white font-semibold">{value}%</text>
    </svg>
  )
}

export default function UserDashboard(){
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Good morning, Aria</h1>
          <p className="text-slate-600 dark:text-slate-300">Here’s your dashboard</p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs bg-coral/10 text-coral">Neo-Glass Theme</span>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-500 dark:text-slate-400">Dream Tracker</div>
              <div className="text-slate-700 dark:text-slate-200">You’re 70% there, feel proud!</div>
            </div>
            <ProgressRing value={70} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <img src="https://picsum.photos/seed/family/64/64" alt="family" className="size-14 rounded-full object-cover" />
            <div>
              <div className="font-semibold">Family</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">Your daughter has a birthday tomorrow</div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="font-semibold mb-2">Next Best Content</div>
          <div className="overflow-hidden rounded-2xl aspect-video bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
            <button className="px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900">Play</button>
          </div>
          <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">Cozy Morning Routine</div>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <Card className="md:col-span-2">
          <div className="font-semibold mb-3">Bond Moments</div>
          <div className="space-y-4">
            {[1,2].map(i => (
              <div key={i} className="glass p-3">
                <div className="flex items-center gap-3">
                  <img src={`https://picsum.photos/seed/user${i}/40/40`} className="size-10 rounded-full" />
                  <div>
                    <div className="font-medium">Tiara</div>
                    <div className="text-sm text-slate-500">2h ago</div>
                  </div>
                </div>
                <div className="mt-3 text-slate-800 dark:text-slate-200">What a beautiful day!</div>
                <img src={`https://picsum.photos/seed/photo${i}/800/300`} className="mt-3 rounded-2xl w-full object-cover" />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="font-semibold mb-3">Mentor Tips</div>
          <ul className="space-y-2 text-sm">
            <li>• Break your goal into weekly milestones</li>
            <li>• Share 1 learning with your family today</li>
            <li>• 20-minute deep work sprint</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
