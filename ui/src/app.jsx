import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Home, Users, PlaySquare, GraduationCap, ShoppingBag, LayoutGrid, Sun, Moon } from 'lucide-react'
import UserDashboard from './dashboards/UserDashboard'
import AdminDashboard from './dashboards/AdminDashboard'

const SidebarItem = ({ icon:Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${active ? 'bg-white/60 dark:bg-slate-800 text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-slate-800'}`}>
    <Icon size={18} />
    <span>{label}</span>
  </button>
)

export default function App(){
  const [mode, setMode] = useState('light')
  const [view, setView] = useState('user')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark')
  }, [mode])

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <div className="glass p-4 sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <div className="font-bold text-xl tracking-tight">Bondhon<span className="text-coral">OS</span></div>
                <button
                  onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
                  className="p-2 rounded-xl hover:bg-white/40 dark:hover:bg-slate-800"
                  title="Toggle theme"
                >
                  {mode === 'dark' ? <Sun size={18}/> : <Moon size={18}/>}
                </button>
              </div>

              <div className="space-y-2">
                <SidebarItem icon={Home} label="Home" active={view==='user'} onClick={()=>setView('user')}/>
                <SidebarItem icon={LayoutGrid} label="Admin Console" active={view==='admin'} onClick={()=>setView('admin')}/>
                <SidebarItem icon={Users} label="Social"/>
                <SidebarItem icon={PlaySquare} label="Videos"/>
                <SidebarItem icon={GraduationCap} label="Learning Hub"/>
                <SidebarItem icon={ShoppingBag} label="Marketplace"/>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-9 lg:col-span-10">
            <motion.div
              key={view}
              initial={{opacity:0, y:8}}
              animate={{opacity:1, y:0}}
              transition={{duration:0.35}}
              className="glass p-5"
            >
              {view === 'user' ? <UserDashboard/> : <AdminDashboard/>}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
