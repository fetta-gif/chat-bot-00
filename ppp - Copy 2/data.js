// معلومات الإقامة الجامعية
const residenceData = {
    name: "الإقامة الجامعية شنتوف محمد",
    director: "السيدة فاطمة الزهراء",
    capacity: "1500 طالبة",
    services: {
        internet: {
            networks: [
                { name: "TP_Link", password: "%amine%123" },
                { name: "D_Link", password: "CHEN2007" }
            ],
            help: "في حالة وجود مشاكل في الاتصال، يرجى التواصل مع مركز المراقبة"
        },
        dining: {
            schedule: {
                breakfast: "6:30 - 8:00",
                lunch: "11:30 - 14:00",
                dinner: "19:00 - 20:30"
            },
            rules: "يجب إظهار بطاقة الإقامة عند كل وجبة"
        },
        showers: {
            schedule: {
                mondayWednesday: "8:00 - 22:00",
                friday: "8:00 - 18:00"
            },
            rules: "يرجى الحفاظ على نظافة المرشات واستخدام المياه بشكل مسؤول"
        },
        library: {
            schedule: {
                weekdays: "8:00 - 22:00"
            },
            services: "خدمات المكتبة تشمل: القراءة، الاستعارة، والدراسة"
        },
        medical: {
            location: "الطابق الأرضي، بجانب مكتب الاستقبال",
            schedule: "24/7 للحالات الطارئة"
        }
    },
    security: {
        gates: {
            openTime: "6:00",
            closeTime: "23:00"
        },
        emergency: {
            controlCenter: "0123456789",
            available: "24/7"
        }
    },
    contacts: {
        infoOfficer: "السيد أمين",
        controlCenter: "0123456789"
    }
};

// رسائل الترحيب
const welcomeMessages = [
    "مرحباً بكِ! أنا نور، مساعدتكِ الافتراضية في الإقامة الجامعية شنتوف محمد. كيف يمكنني مساعدتكِ اليوم؟",
    "أهلاً وسهلاً! أنا نور، هنا لمساعدتكِ في كل ما يتعلق بالإقامة الجامعية شنتوف محمد. كيف يمكنني خدمتكِ؟",
    "مرحباً! أنا نور، مساعدتكِ الشخصية. أسعد بمساعدتكِ في أي استفسار عن الإقامة الجامعية شنتوف محمد."
];

// قوالب الردود
const responseTemplates = {
    general: {
        needMoreInfo: "عذراً، هل يمكنكِ توضيح سؤالكِ أكثر من فضلك؟",
        outOfScope: "عذراً، أنا متخصصة فقط في تقديم المعلومات المتعلقة بالإقامة الجامعية شنتوف محمد.",
        error: "عذراً، حدث خطأ ما. يرجى المحاولة مرة أخرى أو التواصل مع مركز المراقبة."
    },
    services: {
        internet: {
            help: `للاتصال بالإنترنت، يمكنكِ استخدام إحدى الشبكات التالية:
- ${residenceData.services.internet.networks[0].name} (كلمة السر: ${residenceData.services.internet.networks[0].password})
- ${residenceData.services.internet.networks[1].name} (كلمة السر: ${residenceData.services.internet.networks[1].password})

في حالة وجود مشاكل في الاتصال، يرجى التواصل مع مركز المراقبة على الرقم ${residenceData.contacts.controlCenter}`
        },
        maintenance: {
            heating: "للإبلاغ عن مشاكل في التدفئة، يرجى التواصل مع مركز المراقبة على الرقم " + residenceData.contacts.controlCenter,
            electrical: "للإبلاغ عن مشاكل في الكهرباء، يرجى التواصل فوراً مع مركز المراقبة على الرقم " + residenceData.contacts.controlCenter
        }
    }
};

// سلوك البوت
const botBehavior = {
    tone: "ودود ومحترف، مع الحفاظ على مستوى مناسب من الرسمية",
    focus: "التركيز على تقديم معلومات دقيقة وموثوقة عن الإقامة الجامعية",
    style: "استخدام لغة واضحة ومباشرة، مع تنظيم المعلومات بشكل سهل القراءة"
};
