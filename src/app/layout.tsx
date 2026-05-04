import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MediScan AI | فحص الأعراض الذكي',
  description: 'أداة تحليل أعراض ذكية مع السلامة أولاً - استشر طبيبك دائماً',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-sans">
        
        {/* شريط إخلاء المسؤولية الدائم */}
        <div className="bg-yellow-50 border-b-2 border-yellow-300 text-yellow-800 text-sm text-center py-3 px-4 font-bold">
          ⚕️ تنبيه طبي: هذه الأداة للمعلومات فقط وليست بديلاً عن الاستشارة الطبية. الذكاء الاصطناعي قد يخطئ. استشر طبيبك دائماً.
        </div>

        {/* المحتوى الرئيسي */}
        {children}

        {/* تذييل الموقع */}
        <footer className="border-t border-gray-200 bg-white/50 backdrop-blur-md mt-20">
          <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* معلومات الموقع */}
              <div className="text-center md:text-right">
                <h3 className="font-bold text-lg mb-2">🏥 MediScan AI</h3>
                <p className="text-sm text-gray-600">
                  تحليل ذكي للأعراض مع نظام سلامة صارم
                </p>
              </div>

              {/* الدعم الفني */}
              <div className="text-center">
                <h3 className="font-bold text-lg mb-2">🎧 الدعم الفني</h3>
                <p className="text-sm text-gray-600">📞 +212 718 478 238</p>
                <p className="text-sm text-gray-600">📧 tarikhamou7@gmail.com</p>
                <p className="text-sm text-gray-600">🕐 8:30 صباحاً - 5 مساءً</p>
              </div>

              {/* روابط سريعة */}
              <div className="text-center md:text-left">
                <h3 className="font-bold text-lg mb-2">🔗 روابط</h3>
                <p className="text-sm text-gray-600">سياسة الخصوصية</p>
                <p className="text-sm text-gray-600">شروط الاستخدام</p>
                <p className="text-sm text-gray-600">اتصل بنا</p>
              </div>
            </div>

            <div className="text-center text-xs text-gray-400 mt-8 pt-6 border-t border-gray-200">
              © {new Date().getFullYear()} MediScan AI. جميع الحقوق محفوظة. ليس بديلاً عن الطبيب.
            </div>
          </div>
        </footer>

      </body>
    </html>
  )
        }
