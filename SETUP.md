# دليل التشغيل والإعداد - AutoParts Egypt

## 🚀 البدء السريع

### 1. تحميل المشروع
```bash
git clone https://github.com/your-username/autoparts-egypt.git
cd autoparts-egypt
```

### 2. تشغيل الموقع
اختر إحدى الطرق التالية:

#### الطريقة الأولى: Python
```bash
python -m http.server 8000
```

#### الطريقة الثانية: Node.js
```bash
npx serve .
```

#### الطريقة الثالثة: PHP
```bash
php -S localhost:8000
```

### 3. فتح الموقع
- الموقع الرئيسي: `http://localhost:8000`
- لوحة الإدارة: `http://localhost:8000/admin-panel.html`

## 🔧 الإعداد الأولي

### إنشاء حساب المدير الأول
1. افتح الموقع في المتصفح
2. اضغط على "إنشاء حساب جديد"
3. أدخل البيانات التالية:
   - الاسم الأول: Admin
   - الاسم الأخير: User
   - البريد الإلكتروني: admin@autoparts-egypt.com
   - رقم الهاتف: 01010514741
   - كلمة المرور: admin123
4. بعد التسجيل، افتح Developer Tools (F12)
5. في Console، اكتب:
   ```javascript
   const user = auth.getCurrentUser();
   user.role = 'admin';
   auth.saveUsers();
   ```
6. أعد تحميل الصفحة

### تفعيل ميزات الإدارة
1. سجل الدخول بحساب المدير
2. ستظهر أيقونة الإعدادات في الزاوية اليمنى السفلى
3. اضغط عليها للوصول للوحة الإدارة

## 📊 إضافة البيانات الأولية

### إضافة منتجات جديدة
1. ادخل للوحة الإدارة
2. اذهب لقسم "إدارة المنتجات"
3. اضغط "إضافة منتج جديد"
4. املأ البيانات المطلوبة:
   - اسم المنتج
   - الفئة (engine, brakes, suspension, electrical, body)
   - الماركة (toyota, hyundai, kia, nissan, etc.)
   - الموديل
   - السعر
   - الكمية في المخزون
   - رقم القطعة
   - الوصف

### إضافة عملاء تجريبيين
```javascript
// في Developer Console
const testCustomers = [
    {
        firstName: 'أحمد',
        lastName: 'محمد',
        email: 'ahmed@example.com',
        phone: '01012345678',
        password: 'customer123'
    },
    {
        firstName: 'فاطمة',
        lastName: 'علي',
        email: 'fatma@example.com',
        phone: '01098765432',
        password: 'customer123'
    }
];

testCustomers.forEach(customer => {
    auth.users.push({
        id: auth.generateUserId(),
        ...customer,
        createdAt: new Date().toISOString(),
        role: 'customer',
        loyaltyPoints: Math.floor(Math.random() * 1000),
        totalSpent: Math.floor(Math.random() * 5000)
    });
});
auth.saveUsers();
```

## 🛒 اختبار وظائف الموقع

### اختبار عملية الشراء
1. تصفح المنتجات من الصفحة الرئيسية
2. اختر ماركة السيارة (مثل Toyota)
3. اختر الموديل (مثل Corolla)
4. تصفح قطع الغيار المتاحة
5. أضف منتجات لسلة التسوق
6. اذهب لسلة التسوق
7. اضغط "إتمام الطلب"
8. املأ بيانات الشحن
9. اختر طريقة الدفع
10. أكمل عملية الشراء

### اختبار دردشة WhatsApp
1. اضغط على أيقونة WhatsApp في الزاوية اليمنى السفلى
2. اختر رسالة جاهزة أو اكتب رسالة مخصصة
3. اضغط "إرسال عبر WhatsApp"
4. ستفتح نافذة WhatsApp مع الرسالة جاهزة

## 🔧 التخصيص والإعدادات

### تغيير معلومات الاتصال
في ملف `js/whatsapp-chat.js`:
```javascript
this.phoneNumber = '201010514741'; // رقم WhatsApp الخاص بك
```

في ملف `index.html` (قسم Footer):
```html
<p><i class="fas fa-phone"></i> +20 101 051 4741</p>
<p><i class="fas fa-envelope"></i> info@autoparts-egypt.com</p>
```

### تخصيص الألوان والشعار
في ملف `css/style.css`:
```css
:root {
    --primary-color: #dc2626;    /* اللون الأساسي */
    --secondary-color: #1f2937;  /* اللون الثانوي */
    --accent-color: #3b82f6;     /* لون التمييز */
}
```

### إضافة ماركات سيارات جديدة
في ملف `js/data.js`:
```javascript
const carBrands = [
    // الماركات الموجودة...
    {
        id: 'new-brand',
        name: 'New Brand',
        logo: 'fas fa-car',
        popular: true,
        models: [
            { id: 'model1', name: 'Model 1', year: '2020-2024' },
            { id: 'model2', name: 'Model 2', year: '2018-2024' }
        ]
    }
];
```

## 💳 إعداد طرق الدفع

### تفعيل بوابات الدفع
في ملف `js/payment-enhanced.js`:

#### فودافون كاش
```javascript
{
    id: 'vodafone_cash',
    name: 'فودافون كاش',
    available: true,
    apiKey: 'YOUR_VODAFONE_API_KEY'
}
```

#### فوري
```javascript
{
    id: 'fawry',
    name: 'فوري',
    available: true,
    merchantCode: 'YOUR_FAWRY_MERCHANT_CODE'
}
```

### إعداد الحسابات البنكية
```javascript
this.bankAccounts = [
    {
        bank: 'البنك الأهلي المصري',
        accountNumber: 'رقم الحساب الخاص بك',
        accountName: 'AutoParts Egypt',
        iban: 'رقم IBAN الخاص بك'
    }
];
```

## 📧 إعداد الإشعارات

### إعداد البريد الإلكتروني
في ملف `js/customer-management.js`:
```javascript
sendEmail(email, message) {
    // استخدم خدمة مثل EmailJS أو SendGrid
    emailjs.send('service_id', 'template_id', {
        to_email: email,
        message: message
    });
}
```

### إعداد الرسائل النصية
```javascript
sendSMS(phone, message) {
    // استخدم خدمة مثل Twilio أو Nexmo
    fetch('https://api.twilio.com/2010-04-01/Accounts/YOUR_ACCOUNT_SID/Messages.json', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa('YOUR_ACCOUNT_SID:YOUR_AUTH_TOKEN'),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `From=YOUR_PHONE_NUMBER&To=${phone}&Body=${message}`
    });
}
```

## 🔒 الأمان والحماية

### تأمين لوحة الإدارة
1. غير كلمة مرور المدير الافتراضية
2. استخدم HTTPS في الإنتاج
3. قم بتشفير البيانات الحساسة
4. فعل التحقق بخطوتين

### نسخ احتياطية للبيانات
```javascript
// تصدير البيانات
function exportAllData() {
    const data = {
        users: auth.users,
        inventory: enhancedInventory.parts,
        orders: enhancedOrders.orders,
        customers: customerManagement.customers
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `autoparts-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
}

// استيراد البيانات
function importData(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const data = JSON.parse(e.target.result);
        
        if (data.users) auth.users = data.users;
        if (data.inventory) enhancedInventory.parts = data.inventory;
        if (data.orders) enhancedOrders.orders = data.orders;
        if (data.customers) customerManagement.customers = data.customers;
        
        // حفظ البيانات
        auth.saveUsers();
        enhancedInventory.saveToStorage();
        enhancedOrders.saveToStorage();
    };
    reader.readAsText(file);
}
```

## 📱 تحسين الأداء

### تحسين الصور
1. استخدم تنسيقات حديثة (WebP, AVIF)
2. ضغط الصور قبل الرفع
3. استخدم أحجام مختلفة للشاشات المختلفة

### تحسين التحميل
1. فعل ضغط Gzip على الخادم
2. استخدم CDN للملفات الثابتة
3. قم بتحسين ملفات CSS و JavaScript

## 🐛 حل المشاكل الشائعة

### المشكلة: لوحة الإدارة لا تظهر
**الحل:**
1. تأكد من تسجيل الدخول بحساب مدير
2. تحقق من وجود `role: 'admin'` في بيانات المستخدم
3. امسح cache المتصفح

### المشكلة: سلة التسوق لا تعمل
**الحل:**
1. تحقق من تفعيل JavaScript
2. امسح localStorage
3. تحقق من وجود أخطاء في Console

### المشكلة: WhatsApp لا يفتح
**الحل:**
1. تأكد من صحة رقم الهاتف
2. تحقق من تثبيت WhatsApp على الجهاز
3. جرب من متصفح مختلف

## 📞 الدعم الفني

للحصول على المساعدة:
- **البريد الإلكتروني**: support@autoparts-egypt.com
- **الهاتف**: 01010514741
- **WhatsApp**: متاح عبر الموقع

## 🔄 التحديثات

للحصول على آخر التحديثات:
1. تابع المستودع على GitHub
2. اشترك في النشرة البريدية
3. تابع صفحاتنا على وسائل التواصل

---

**نصائح مهمة:**
- اعمل نسخة احتياطية من البيانات بانتظام
- اختبر جميع الوظائف قبل النشر
- راقب الأداء والأخطاء باستمرار
- حدث المحتوى والأسعار بانتظام