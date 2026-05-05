'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Condition {
  nameAr: string
  probability: number
  description: string
  color: string
  warningSigns: string[]
}

export default function ResultsPage() {
  const [symptoms, setSymptoms] = useState('')
  const [age, setAge] = useState('')
  const [painLevel, setPainLevel] = useState('5')
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState<string[]>([])
  const [shared, setShared] = useState(false)

  useEffect(() => {
    setSymptoms(localStorage.getItem('mediscan_symptoms') || '')
    setAge(localStorage.getItem('mediscan_age') || '')
    setPainLevel(localStorage.getItem('mediscan_pain') || '5')
  }, [])

  const conditions: Condition[] = [
    { nameAr: 'صداع التوتر', probability: 0.45, description: 'صداع ناتج عن التوتر والإجهاد', color: '#f59e0b', warningSigns: ['يزداد مع الضغط', 'يتحسن مع الراحة'] },
    { nameAr: 'الشقيقة', probability: 0.25, description: 'صداع نصفي مع حساسية للضوء', color: '#8b5cf6', warningSigns: ['حساسية للضوء', 'غثيان'] },
    { nameAr: 'التهاب الجيوب', probability: 0.15, description: 'التهاب في ممرات الأنف', color: '#3b82f6', warningSigns: ['ألم حول العينين', 'انسداد الأنف'] },
    { nameAr: 'إجهاد العين', probability: 0.10, description: 'نتيجة استخدام الشاشات طويلاً', color: '#10b981', warningSigns: ['حرقان في العين'] },
    { nameAr: 'الجفاف', probability: 0.05, description: 'نقص السوائل في الجسم', color: '#06b6d4', warningSigns: ['عطش شديد', 'دوار'] },
  ]

  const overallConfidence = 0.65

  const addComment = () => {
    if (comment.trim()) {
      setComments([...comments, comment])
      setComment('')
    }
  }

  const handleShare = () => {
    setShared(true)
    setTimeout(() => setShared(false), 3000)
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className={`p-5 rounded-2xl mb-8 text-center font-bold text-lg ${
          overallConfidence < 0.5 ? 'bg-red-50 dark:bg-red-900/20 border-2 border-red-300 text-red-800 dark:text-red-300' :
          overallConfidence < 0.75 ? 'bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-300 text-yellow-800 dark:text-yellow-300' :
          'bg-green-50 dark:bg-green-900/20 border-2 border-green-300 text-green-800 dark:text-green-300'
        }`}
      >
        {overallConfidence < 0.5 ? '⚠️ ثقة منخفضة - يرجى تقديم تفاصيل أكثر' :
         overallConfidence < 0.75 ? '📊 ثقة متوسطة - ننصح بمراجعة الطبيب' :
         '✅ ثقة عالية - استشر طبيبك دائماً'}
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg mb-8">
        <h2 className="text-xl font-bold mb-4">📋 ملخص حالتك</h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4"><p className="text-sm text-gray-500">العمر</p><p className="text-2xl font-bold text-medical-600">{age || '—'}</p></div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4"><p className="text-sm text-gray-500">الألم</p><p className="text-2xl font-bold text-medical-600">{painLevel}/10</p></div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4"><p className="text-sm text-gray-500">الخطورة</p><p className={`text-2xl font-bold ${Number(painLevel) >= 7 ? 'text-urgent' : 'text-safe'}`}>{Number(painLevel) >= 7 ? 'متوسط' : 'آمن'}</p></div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mb-8">
        <h2 className="text-2xl font-bold mb-6">🎯 الأسباب المحتملة</h2>
        <div className="cards">
          {conditions.map((condition, index) => (
            <motion.div key={index} className="card-hover" style={{ backgroundColor: condition.color }} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + index * 0.1 }}>
              <p className="tip">{condition.nameAr}</p>
              <p className="second-text">{condition.description}</p>
              <p className="second-text" style={{ fontWeight: 'bold', fontSize: '1.5em', marginTop: '8px' }}>{Math.round(condition.probability * 100)}%</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-3xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">🌿 خطة العناية المنزلية</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4">💧 8-10 أكواب ماء</div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4">😴 7-8 ساعات نوم</div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4">🧘 تنفس عميق</div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4">🥗 وجبات متوازنة</div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="text-center mb-8">
        <button onClick={handleShare} className="px-8 py-4 bg-medical-500 text-white rounded-full font-bold text-lg hover:bg-medical-600 transition-all">
          {shared ? '✓ تمت المشاركة' : '🔗 شارك الموقع'}
        </button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }} className="comment-card mb-8">
        <div className="comment-title">💬 التعليقات ({comments.length})</div>
        {comments.map((c, i) => (<div key={i} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl mb-3"><p className="text-sm">{c}</p></div>))}
        <div className="text-box mt-4">
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="اكتب تعليقك..." />
          <div className="flex justify-end mt-2"><button onClick={addComment} className="send-btn">↑</button></div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-400 rounded-2xl p-6 text-center">
        <h3 className="font-bold text-yellow-800 dark:text-yellow-300 text-lg mb-2">⚕️ إخلاء المسؤولية</h3>
        <p className="text-yellow-700 dark:text-yellow-400">هذه النتائج تحليل أولي فقط. الذكاء الاصطناعي قد يخطئ.<br /><strong>لا تعتمد عليها لاتخاذ قرارات صحية. استشر طبيباً دائماً.</strong></p>
      </motion.div>

      <div className="text-center mt-8">
        <Link href="/" className="px-8 py-4 bg-gray-200 dark:bg-gray-600 rounded-2xl font-bold hover:bg-gray-300 transition-all">← فحص جديد</Link>
      </div>

    </main>
  )
                                                     }
