'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function HomePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [symptoms, setSymptoms] = useState('')
  const [age, setAge] = useState('')
  const [painLevel, setPainLevel] = useState(5)
  const [showEmergency, setShowEmergency] = useState(false)

  // قائمة الكلمات الطارئة
  const emergencyWords = [
    'ألم صدر', 'صعوبة تنفس', 'نزيف', 'جلطة', 'إغماء', 'اختناق',
    'شلل', 'تشنج', 'حروق شديدة', 'كسور', 'ضربات شمس'
  ]

  const checkEmergency = (text: string) => {
    return emergencyWords.some(word => text.includes(word))
  }

  const handleSymptomsChange = (value: string) => {
    setSymptoms(value)
    if (checkEmergency(value)) {
      setShowEmergency(true)
    } else {
      setShowEmergency(false)
    }
  }

  const handleSubmit = () => {
    if (showEmergency) return
    localStorage.setItem('mediscan_symptoms', symptoms)
    localStorage.setItem('mediscan_age', age)
    localStorage.setItem('mediscan_pain', painLevel.toString())
    router.push('/results')
  }

  // SVG أيقونات طبية للـ Carousel
  const medicalIcons = [
    { color: '#ef4444', icon: '❤️', label: 'قلب' },
    { color: '#8b5cf6', icon: '🧠', label: 'دماغ' },
    { color: '#3b82f6', icon: '🫁', label: 'رئتين' },
    { color: '#10b981', icon: '🩺', label: 'طبيب' },
    { color: '#f59e0b', icon: '🏥', label: 'مستشفى' },
    { color: '#6366f1', icon: '🔬', label: 'تحليل' },
    { color: '#ec4899', icon: '🧬', label: 'DNA' },
    { color: '#14b8a6', icon: '💊', label: 'دواء' },
    { color: '#f97316', icon: '👨‍⚕️', label: 'فريق طبي' },
    { color: '#94a3b8', icon: '🩻', label: 'أشعة' },
  ]

  return (
    <main className="min-h-screen relative overflow-hidden">
      
      {/* ============ 3D Carousel في الخلفية ============ */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="wrapper">
          <div className="inner" style={{ '--quantity': '10', '--w': '120px', '--h': '160px' } as React.CSSProperties}>
            {medicalIcons.map((item, index) => (
              <div
                key={index}
                className="card"
                style={{
                  '--index': index,
                  '--color-card': item.color,
                  '--quantity': '10',
                } as React.CSSProperties}
              >
                <div className="img flex items-center justify-center text-6xl">
                  {item.icon}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-12">
        
        {/* ============ شاشة الطوارئ ============ */}
        {showEmergency && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-red-600 text-white rounded-3xl p-8 text-center mb-8 shadow-2xl"
          >
            <span className="text-7xl block mb-4">🚨</span>
            <h2 className="text-3xl font-bold mb-4">حالة طارئة محتملة!</h2>
            <p className="text-lg mb-6">
              الأعراض التي ذكرتها قد تشير إلى حالة طبية طارئة تستدعي التدخل الفوري.
            </p>
            <p className="text-yellow-200 font-bold text-xl mb-6">
              ⚠️ تم إيقاف التحليل تلقائياً
            </p>
            <a
              href="tel:911"
              className="inline-block bg-white text-red-600 font-bold py-4 px-12 rounded-2xl text-2xl hover:bg-gray-100 transition-colors"
            >
              📞 اتصل بالطوارئ الآن
            </a>
          </motion.div>
        )}

        {/* ============ العنوان ============ */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-5xl font-bold text-medical-600 mb-3">
            🏥 MediScan AI
          </h1>
          <p className="text-xl text-gray-600">
            تحليل ذكي للأعراض مع السلامة أولاً
          </p>
        </motion.div>

        {/* ============ خطوات المؤشر ============ */}
        <div className="flex justify-center gap-4 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                step >= s ? 'bg-medical-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step > s ? '✓' : s}
            </div>
          ))}
        </div>

        {/* ============ الخطوة 1: وصف الأعراض ============ */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card mb-6"
          >
            <h2 className="text-2xl font-bold mb-4">🩺 صف أعراضك بالتفصيل</h2>
            <p className="text-gray-500 mb-4">كلما كان الوصف أدق، كان التحليل أفضل</p>
            
            <textarea
              className="w-full p-5 border-2 border-gray-200 rounded-2xl resize-none text-lg outline-none focus:border-medical-500 transition-all min-h-[150px]"
              value={symptoms}
              onChange={(e) => handleSymptomsChange(e.target.value)}
              placeholder="مثال: أعاني من صداع في الجانب الأيمن من الرأس منذ 3 أيام، يزداد عند الانحناء للأمام..."
            />

            {symptoms.length > 0 && symptoms.length < 30 && (
              <div className="mt-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
                <p className="font-bold text-blue-800">💡 لمساعدتك بشكل أفضل:</p>
                <p className="text-blue-700 text-sm mt-1">حاول وصف: مكان الألم، متى بدأ، ما يزيده أو يخففه</p>
              </div>
            )}
          </motion.div>
        )}

        {/* ============ الخطوة 2: العمر ============ */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card mb-6"
          >
            <h2 className="text-2xl font-bold mb-4">👤 العمر</h2>
            <input
              type="number"
              className="w-full p-5 border-2 border-gray-200 rounded-2xl text-lg outline-none focus:border-medical-500 transition-all"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="أدخل عمرك"
              min="0"
              max="120"
            />
          </motion.div>
        )}

        {/* ============ الخطوة 3: مستوى الألم ============ */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card mb-6"
          >
            <h2 className="text-2xl font-bold mb-4">📊 مستوى الألم: {painLevel}/10</h2>
            <input
              type="range"
              min="0"
              max="10"
              value={painLevel}
              onChange={(e) => setPainLevel(Number(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-medical-500"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>😊 لا ألم</span>
              <span>😐 متوسط</span>
              <span>😫 شديد جداً</span>
            </div>
          </motion.div>
        )}

        {/* ============ أزرار التنقل ============ */}
        <div className="flex justify-between">
          {step > 1 ? (
            <button onClick={() => setStep(step - 1)} className="px-8 py-4 bg-gray-200 rounded-2xl font-bold hover:bg-gray-300 transition-all">
              ← رجوع
            </button>
          ) : <div />}
          
          {step < 3 ? (
            <button onClick={() => setStep(step + 1)} className="px-8 py-4 bg-medical-500 text-white rounded-2xl font-bold hover:bg-medical-600 transition-all">
              التالي ←
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={showEmergency}
              className={`px-8 py-4 rounded-2xl font-bold text-white transition-all ${
                showEmergency
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg'
              }`}
            >
              ✨ تحليل الأعراض
            </button>
          )}
        </div>

      </div>
    </main>
  )
    }
