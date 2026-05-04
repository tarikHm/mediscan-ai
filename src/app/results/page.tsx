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
    {
      nameAr: 'صداع التوتر',
      probability: 0.45,
      description: 'صداع ناتج عن التوتر والإجهاد، يتحسن مع الراحة',
      color: '#f59e0b',
      warningSigns: ['يزداد مع الضغط النفسي', 'يتحسن بعد النوم'],
    },
    {
      nameAr: 'الشقيقة (الصداع النصفي)',
      probability: 0.25,
      description: 'صداع نصفي مع حساسية للضوء والصوت',
      color: '#8b5cf6',
      warningSigns: ['حساسية للضوء', 'غثيان', 'اضطرابات بصرية'],
    },
    {
      nameAr: 'التهاب الجيوب الأنفية',
      probability: 0.15,
      description: 'التهاب في ممرات الأنف يسبب صداعاً أمامياً',
      color: '#3b82f6',
      warningSigns: ['ألم حول العينين', 'انسداد الأنف'],
    },
    {
      nameAr: 'إجهاد العين',
      probability: 0.10,
      description: 'نتيجة استخدام الشاشات لفترات طويلة',
      color: '#10b981',
      warningSigns: ['حرقان في العين', 'عدم وضوح الرؤية'],
    },
    {
      nameAr: 'الجفاف',
      probability: 0.05,
      description: 'نقص السوائل في الجسم يسبب الصداع',
      color: '#06b6d4',
      warningSigns: ['عطش شديد', 'بول داكن', 'دوار'],
    },
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
    if (navigator.share) {
      navigator.share({
        title: 'MediScan AI',
        text: 'جربت MediScan AI لتحليل الأعراض! موقع رائع للتوعية الصحية.',
        url: window.location.origin,
      })
    }
    setTimeout(() => setShared(false), 3000)
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      
      {/* ============ Confidence Bar ============ */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className={`p-5 rounded-2xl mb-8 text-center font-bold text-lg ${
          overallConfidence < 0.5 ? 'bg-red-50 dark:bg-red-900/20 border-2 border-red-300 text-red-800 dark:text-red-300' :
          overallConfidence < 0.75 ? 'bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-300 text-yellow-800 dark:text-yellow-300' :
          'bg-green-50 dark:bg-green-900/20 border-2 border-green-300 text-green-800 dark:text-green-300'
        }`}
      >
        {overallConfidence < 0.5 ? '⚠️ ثقة منخفضة - يرجى تقديم تفاصيل أكثر أو استشارة طبيب' :
         overallConfidence < 0.75 ? '📊 ثقة متوسطة - ننصح بمراجعة الطبيب للتأكيد' :
         '✅ ثقة عالية - لكن استشر طبيبك دائماً للتشخيص النهائي'}
      </motion.div>

      {/* ============ Summary ============ */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg mb-8">
        <h2 className="text-xl font-bold mb-4">📋 ملخص حالتك</h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">العمر</p>
            <p className="text-2xl font-bold text-medical-600">{age || '—'}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">مستوى الألم</p>
            <p className="text-2xl font-bold text-medical-600">{painLevel}/10</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">الخطورة</p>
            <p className={`text-2xl font-bold ${Number(painLevel) >= 7 ? 'text-urgent' : 'text-safe'}`}>
              {Number(painLevel) >= 7 ? 'متوسط' : 'آمن'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* ============ Hover Cards (kamehame-ha) ============ */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mb-8">
        <h2 className="text-2xl font-bold mb-6">🎯 الأسباب المحتملة</h2>
        
        <div className="cards">
          {conditions.map((condition, index) => (
            <motion.div key={index} className="card-hover" style={{ backgroundColor: condition.color }} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + index * 0.1 }}>
              <p className="tip">{condition.nameAr}</p>
              <p className="second-text" style={{ opacity: 0.9 }}>{condition.description}</p>
              <p className="second-text" style={{ fontWeight: 'bold', fontSize: '1.5em', marginTop: '8px' }}>
                {Math.round(condition.probability * 100)}%
              </p>
              <div className="progress-bar mt-3" style={{ width: '100%', background: 'rgba(255,255,255,0.3)' }}>
                <motion.div className="progress-fill" initial={{ width: 0 }} animate={{ width: `${condition.probability * 100}%` }} transition={{ duration: 1, delay: 0.7 + index * 0.1 }} style={{ background: 'white' }} />
              </div>
              {condition.warningSigns.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {condition.warningSigns.map((sign, i) => (
                    <span key={i} className="text-xs bg-white/30 px-3 py-1 rounded-full">{sign}</span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ============ Home Care ============ */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-3xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">🌿 خطة العناية المنزلية</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4"><span className="font-bold">💧</span> اشرب 8-10 أكواب ماء</div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4"><span className="font-bold">😴</span> نم 7-8 ساعات</div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4"><span className="font-bold">🧘</span> مارس التنفس العميق</div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4"><span className="font-bold">🥗</span> تناول وجبات متوازنة</div>
        </div>
      </motion.div>

      {/* ============ Share Button (Mohammad-Rahme-576) ============ */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="text-center mb-8">
        <button onClick={handleShare} className="tooltip-container inline-block">
          <div className="button-content" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: 'white', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold', border: 'none', fontSize: '16px' }}>
            <span>{shared ? '✓ تمت المشاركة' : '🔗 شارك الموقع'}</span>
          </div>
        </button>
      </motion.div>

      {/* ============ Comment Section (zanina-yassine) ============ */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }} className="comment-card mb-8">
        <div className="comment-title">💬 التعليقات ({comments.length})</div>
        
        {comments.map((c, i) => (
          <div key={i} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl mb-3">
            <p className="text-sm">{c}</p>
          </div>
        ))}

        <div className="text-box mt-4">
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="اكتب تعليقك..." />
          <div className="flex justify-end mt-2">
            <button onClick={addComment} className="send-btn">↑</button>
          </div>
        </div>
      </motion.div>

      {/* ============ Disclaimer ============ */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-400 dark:border-yellow-700 rounded-2xl p-6 text-center">
        <h3 className="font-bold text-yellow-800 dark:text-yellow-300 text-lg mb-2">⚕️ إخلاء المسؤولية</h3>
        <p className="text-yellow-700 dark:text-yellow-400">
          هذه النتائج تحليل أولي فقط. الذكاء الاصطناعي قد يخطئ.
          <br /><strong>لا تعتمد عليها لاتخاذ قرارات صحية. استشر طبيباً دائماً.</strong>
        </p>
      </motion.div>

      {/* ============ Back Button ============ */}
      <div className="text-center mt-8">
        <Link href="/" className="px-8 py-4 bg-gray-200 dark:bg-gray-600 rounded-2xl font-bold hover:bg-gray-300 dark:hover:bg-gray-500 transition-all">
          ← فحص جديد
        </Link>
      </div>

    </main>
  )
      }
