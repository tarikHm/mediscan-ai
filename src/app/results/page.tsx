'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Condition {
  name: string
  nameAr: string
  probability: number
  description: string
  color: string
  warningSigns?: string[]
}

export default function ResultsPage() {
  const [symptoms, setSymptoms] = useState('')
  const [age, setAge] = useState('')
  const [painLevel, setPainLevel] = useState('5')

  useEffect(() => {
    setSymptoms(localStorage.getItem('mediscan_symptoms') || '')
    setAge(localStorage.getItem('mediscan_age') || '')
    setPainLevel(localStorage.getItem('mediscan_pain') || '5')
  }, [])

  // محاكاة نتائج التحليل
  const conditions: Condition[] = [
    {
      name: 'Tension Headache',
      nameAr: 'صداع التوتر',
      probability: 0.45,
      description: 'صداع ناتج عن التوتر والإجهاد، يتحسن مع الراحة',
      color: '#f59e0b',
      warningSigns: ['يزداد مع الضغط النفسي', 'يتحسن بعد النوم'],
    },
    {
      name: 'Migraine',
      nameAr: 'الشقيقة (الصداع النصفي)',
      probability: 0.25,
      description: 'صداع نصفي مع حساسية للضوء والصوت',
      color: '#8b5cf6',
      warningSigns: ['حساسية للضوء', 'غثيان', 'اضطرابات بصرية'],
    },
    {
      name: 'Sinusitis',
      nameAr: 'التهاب الجيوب الأنفية',
      probability: 0.15,
      description: 'التهاب في ممرات الأنف يسبب صداعاً أمامياً',
      color: '#3b82f6',
      warningSigns: ['ألم حول العينين', 'انسداد الأنف', 'يزداد عند الانحناء'],
    },
    {
      name: 'Eye Strain',
      nameAr: 'إجهاد العين',
      probability: 0.10,
      description: 'نتيجة استخدام الشاشات لفترات طويلة',
      color: '#10b981',
      warningSigns: ['حرقان في العين', 'عدم وضوح الرؤية'],
    },
    {
      name: 'Dehydration',
      nameAr: 'الجفاف',
      probability: 0.05,
      description: 'نقص السوائل في الجسم يسبب الصداع',
      color: '#06b6d4',
      warningSigns: ['عطش شديد', 'بول داكن', 'دوار'],
    },
  ]

  const overallConfidence = 0.65
  const triageLevel = painLevel >= '7' ? 'yellow' : 'green'

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      
      {/* ============ شريط الثقة ============ */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-5 rounded-2xl mb-8 text-center font-bold text-lg ${
          overallConfidence < 0.5
            ? 'bg-red-50 border-2 border-red-300 text-red-800'
            : overallConfidence < 0.75
            ? 'bg-yellow-50 border-2 border-yellow-300 text-yellow-800'
            : 'bg-green-50 border-2 border-green-300 text-green-800'
        }`}
      >
        {overallConfidence < 0.5 ? (
          '⚠️ ثقة منخفضة - يرجى تقديم تفاصيل أكثر أو استشارة طبيب'
        ) : overallConfidence < 0.75 ? (
          '📊 ثقة متوسطة - ننصح بمراجعة الطبيب للتأكيد'
        ) : (
          '✅ ثقة عالية - لكن استشر طبيبك دائماً للتشخيص النهائي'
        )}
      </motion.div>

      {/* ============ ملخص المدخلات ============ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="card mb-8"
      >
        <h2 className="text-xl font-bold mb-4">📋 ملخص حالتك</h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-500">العمر</p>
            <p className="text-2xl font-bold text-medical-600">{age || '—'}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-500">مستوى الألم</p>
            <p className="text-2xl font-bold text-medical-600">{painLevel}/10</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-500">مستوى الخطورة</p>
            <p className={`text-2xl font-bold ${triageLevel === 'yellow' ? 'text-urgent' : 'text-safe'}`}>
              {triageLevel === 'yellow' ? 'متوسط' : 'آمن'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* ============ Hover Cards - الأسباب المحتملة ============ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold mb-6">🎯 الأسباب المحتملة</h2>
        
        <div className="cards">
          {conditions.map((condition, index) => (
            <motion.div
              key={condition.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="card"
              style={{ borderRight: `4px solid ${condition.color}` }}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-lg">{condition.nameAr}</h3>
                  <p className="text-sm text-gray-500 mt-1">{condition.description}</p>
                </div>
                <span className="text-3xl font-bold" style={{ color: condition.color }}>
                  {Math.round(condition.probability * 100)}%
                </span>
              </div>

              {/* شريط التقدم */}
              <div className="progress-bar">
                <motion.div
                  className="progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${condition.probability * 100}%` }}
                  transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
                  style={{ background: condition.color }}
                />
              </div>

              {/* علامات تحذيرية */}
              {condition.warningSigns && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {condition.warningSigns.map((sign, i) => (
                    <span key={i} className="text-xs bg-red-50 text-red-700 px-3 py-1 rounded-full border border-red-200">
                      ⚠️ {sign}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ============ خطة العناية المنزلية ============ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="card mb-8 bg-gradient-to-r from-green-50 to-blue-50"
      >
        <h2 className="text-2xl font-bold mb-4">🌿 خطة العناية المنزلية</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-bold text-green-700 mb-2">💧 الترطيب</h3>
            <p className="text-sm text-gray-600">اشرب 8-10 أكواب من الماء يومياً</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-bold text-blue-700 mb-2">😴 النوم</h3>
            <p className="text-sm text-gray-600">احصل على 7-8 ساعات من النوم الليلي</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-bold text-purple-700 mb-2">🧘 الراحة</h3>
            <p className="text-sm text-gray-600">مارس تمارين التنفس العميق والاسترخاء</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-bold text-orange-700 mb-2">🥗 التغذية</h3>
            <p className="text-sm text-gray-600">تناول وجبات خفيفة ومتوازنة غنية بالفيتامينات</p>
          </div>
        </div>
      </motion.div>

      {/* ============ نصائح وقائية ============ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="card mb-8"
      >
        <h2 className="text-2xl font-bold mb-4">🛡️ نصائح وقائية</h2>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-green-500 font-bold">✓</span>
            <span>تجنب الجلوس المطول أمام الشاشات دون استراحة</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-500 font-bold">✓</span>
            <span>حافظ على وضعية جلوس صحيحة</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-500 font-bold">✓</span>
            <span>مارس رياضة المشي 30 دقيقة يومياً</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-500 font-bold">✓</span>
            <span>قلل من الكافيين والمشروبات الغازية</span>
          </li>
        </ul>
      </motion.div>

      {/* ============ إخلاء مسؤولية ============ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="bg-yellow-50 border-2 border-yellow-400 rounded-2xl p-6 text-center"
      >
        <p className="text-2xl mb-2">⚕️</p>
        <h3 className="font-bold text-yellow-800 text-lg mb-2">إخلاء المسؤولية</h3>
        <p className="text-yellow-700">
          هذه النتائج تحليل أولي فقط بواسطة الذكاء الاصطناعي. الذكاء الاصطناعي قد يخطئ.
          <br />
          <strong>لا تعتمد على هذه النتائج لاتخاذ قرارات صحية.</strong>
          <br />
          استشر طبيباً مختصاً دائماً للتشخيص والعلاج.
        </p>
      </motion.div>

      {/* ============ أزرار العودة والمشاركة ============ */}
      <div className="flex justify-center gap-4 mt-8">
        <Link
          href="/"
          className="px-8 py-4 bg-gray-200 rounded-2xl font-bold hover:bg-gray-300 transition-all"
        >
          ← فحص جديد
        </Link>
      </div>

    </main>
  )
      }
