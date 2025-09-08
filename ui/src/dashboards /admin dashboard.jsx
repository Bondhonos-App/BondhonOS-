import React from 'react'
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts'

function Card({ children, className='' }){
  return <div className={`glass p-4 card-hover ${className}`}>{children}</div>
}

const lineData = [
  { name:'W', v: 20 }, { name:'T', v: 34 }, { name:'F', v: 29 }, { name:'S', v: 45 }, { name:'S', v: 62 }
]
const barData = [
  { name:'Approved', a:14 }, { name:'Removed', a:9 }, { name:'Pending', a:6 }
]
const revData = [
  { name:'J', r: 12 },{ name:'F', r: 16 },{ name:'M', r: 20 },{ name:'A', r: 18 },{ name:'M', r: 25 }
]

export default function AdminDashboard(){
  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Admin Control Center</h1>
          <p className="text-slate-600 dark:text-slate-300">Cyber Futurism Theme</p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs bg-sky-400/10 text-sky-300 border border-sky-400/30">LIVE</span>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <Card className="md:col-span-2">
          <div className="flex items-center justify-between">
            <div className="font-semibold">Real-Time Analytics</div>
            <div className="text-xs text-slate-500">Last 24h</div>
          </div>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Line type="monotone" dataKey="v" stroke="#38bdf8" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <div className="font-semibold mb-3">User Behavior</div>
          <div className="text-4xl font-bold text-sky-300">85%</div>
          <div className="text-sm text-slate-400">Engagement</div>
          <div className="mt-4 h-24 flex items-end gap-2">
            <div className="w-3 bg-sky-500 rounded" style={{height:'70%'}}/>
            <div className="w-3 bg-indigo-500 rounded" style={{height:'85%'}}/>
            <div className="w-3 bg-fuchsia-500 rounded" style={{height:'60%'}}/>
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <Card className="md:col-span-2">
          <div className="font-semibold mb-2">Content Moderation</div>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="name" stroke="#94a3b8"/>
                <YAxis stroke="#94a3b8"/>
                <Tooltip />
                <Bar dataKey="a" fill="#9b5cff" radius={[8,8,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-sm text-slate-500">Toxic: 15 • Flagged: 8</div>
        </Card>

        <Card>
          <div className="font-semibold mb-2">Revenue & Marketplace</div>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revData}>
                <XAxis dataKey="name" stroke="#94a3b8"/>
                <YAxis stroke="#94a3b8"/>
                <Tooltip />
                <Line type="monotone" dataKey="r" stroke="#22d3ee" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-sm text-slate-300">Balance: $45.8k</div>
        </Card>
      </div>
    </div>
  )
}
