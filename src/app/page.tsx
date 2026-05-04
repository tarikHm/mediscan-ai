'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const medicalIcons = [
  '❤️', '🧠', '🫁', '🩺', '🏥', '🔬', '🧬', '💊', '👨‍⚕️', '🩻'
]

const emergencyWords = [
  'ألم صدر', 'صعوبة تنفس', 'نزيف', 'جلطة', 'إغماء', 'اختناق',
  'شلل', 'تشنج', 'حرق شديد', 'كسور', 'لا أستطيع التنفس'
]

export default function HomePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [symptoms, setSymptoms] = useState('')
  const [age, setAge] = useState('')
  const [painLevel, setPainLevel] = useState(5)
  const [showEmergency, setShowEmergency] = useState(false)
  const [loading, setLoading] = useState(false)

  const checkEmergency = (text: string) => {
    return emergencyWords.some(word => text.includes(word))
  }

  const handleSymptomsChange = (value: string) => {
    setSymptoms(value)
    setShowEmergency(checkEmergency(value))
  }

  const handleSubmit = () => {
    if (showEmergency) return
    setLoading(true)
    localStorage.setItem('mediscan_symptoms', symptoms)
    localStorage.setItem('mediscan_age', age)
    localStorage.setItem('mediscan_pain', painLevel.toString())
    setTimeout(() => {
      setLoading(false)
      router.push('/results')
    }, 3000)
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      
      {/* ============ 3D Carousel (ilkhoeri) ============ */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <div className="wrapper">
          <div className="inner" style={{ '--quantity': '10', '--w': '110px', '--h': '140px', '--translateZ': 'calc((110px + 140px) + 0px)' } as React.CSSProperties}>
            {medicalIcons.map((icon, index) => (
              <div key={index} className="carousel-card" style={{ '--index': index, '--quantity': '10' } as React.CSSProperties}>
                {icon}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============ Text Loader (dexter-st) ============ */}
      <AnimatePresence>
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md z-50 flex items-center justify-center">
            <div className="text-center">
              <div className="loader-wrapper" style={{ scale: 1.5 }}>
                {['ج', 'ا', 'ر', 'ي', ' ', 'ا', 'ل', 'ت', 'ح', 'ل', 'ي', 'ل'].map((letter, i) => (
                  <span key={i} className="loader-letter" style={{ animationDelay: `${i * 0.1}s`, fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>
                    {letter}
                  </span>
                ))}
                <div className="loader"></div>
              </div>
              <p className="mt-12 text-gray-500 text-lg">يرجى الانتظار...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8">
        
        {/* ============ Emergency Alert ============ */}
        <AnimatePresence>
          {showEmergency && (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-red-600 text-white rounded-3xl p-8 text-center mb-8 shadow-2xl">
              <span className="text-7xl block mb-4">🚨</span>
              <h2 className="text-3xl font-bold mb-4">حالة طارئة محتملة!</h2>
              <p className="text-lg mb-6">الأعراض التي ذكرتها قد تشير إلى حالة طبية طارئة.</p>
              <p className="text-yellow-200 font-bold text-xl mb-6">⚠️ تم إيقاف التحليل تلقائياً</p>
              <a href="tel:911" className="inline-block bg-white text-red-600 font-bold py-4 px-12 rounded-2xl text-2xl hover:bg-gray-100 transition-colors">
                📞 اتصل بالطوارئ الآن
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ============ Title ============ */}
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-5xl font-bold text-medical-600 dark:text-medical-400 mb-3">🏥 MediScan AI</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">تحليل ذكي للأعراض مع السلامة أولاً</p>
        </motion.div>

        {/* ============ Steps ============ */}
        <div className="flex justify-center gap-4 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= s ? 'bg-medical-500 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-500'}`}>
              {step > s ? '✓' : s}
            </div>
          ))}
        </div>

        {/* ============ Step 1: Symptoms (Floating Label) ============ */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4">🩺 صف أعراضك بالتفصيل</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">كلما كان الوصف أدق، كان التحليل أفضل</p>
            
            <div className="inputGroup">
              <textarea
                required
                value={symptoms}
                onChange={(e) => handleSymptomsChange(e.target.value)}
                className="min-h-[150px]"
                style={{ borderRadius: '20px', width: '100%', padding: '15px', border: '2px solid #c8c8c8', outline: 'none', resize: 'vertical' }}
              />
              <label>الأعراض</label>
            </div>

            {symptoms.length > 0 && symptoms.length < 30 && (
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-xl">
                <p className="font-bold text-blue-800 dark:text-blue-300">💡 لمساعدتك بشكل أفضل:</p>
                <p className="text-blue-700 dark:text-blue-400 text-sm mt-1">حاول وصف: مكان الألم، متى بدأ، ما يزيده أو يخففه</p>
              </div>
            )}
          </motion.div>
        )}

        {/* ============ Step 2: Age ============ */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4">👤 العمر</h2>
            <div className="inputGroup">
              <input type="number" required value={age} onChange={(e) => setAge(e.target.value)} min="0" max="120" />
              <label>العمر</label>
            </div>
          </motion.div>
        )}

        {/* ============ Step 3: Pain Level ============ */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4">📊 مستوى الألم: {painLevel}/10</h2>
            <input type="range" min="0" max="10" value={painLevel} onChange={(e) => setPainLevel(Number(e.target.value))} className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-medical-500" />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>😊 لا ألم</span>
              <span>😐 متوسط</span>
              <span>😫 شديد جداً</span>
            </div>
          </motion.div>
        )}

        {/* ============ Buttons ============ */}
        <div className="flex justify-between">
          {step > 1 ? (
            <button onClick={() => setStep(step - 1)} className="px-8 py-4 bg-gray-200 dark:bg-gray-600 rounded-2xl font-bold hover:bg-gray-300 dark:hover:bg-gray-500 transition-all">← رجوع</button>
          ) : <div />}
          
          {step < 3 ? (
            <button onClick={() => setStep(step + 1)} className="px-8 py-4 bg-medical-500 text-white rounded-2xl font-bold hover:bg-medical-600 transition-all">التالي ←</button>
          ) : (
            <button onClick={handleSubmit} disabled={showEmergency} className={`sparkle-btn ${showEmergency ? 'opacity-50 cursor-not-allowed' : ''}`}>
              ✨ تحليل الأعراض
            </button>
          )}
        </div>

      </div>
    </main>
  )
    }
