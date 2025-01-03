const residenceData = {
    name: "الإقامة الجامعية شنتوف محمد",
    director: "بن يوسف فاطمة الزهراء",
    capacity: "1000 سرير",
    services: {
        internet: {
            networks: [
                {
                    name: "TP_Link",
                    password: "%amine%123"
                },
                {
                    name: "D_Link",
                    password: "CHEN2007"
                }
            ],
            computerCode: "Code"
        },
        dining: {
            schedule: {
                breakfast: "07:00 - 08:00",
                lunch: "12:00 - 13:30",
                dinner: "19:00 - 20:30"
            }
        },
        showers: {
            schedule: {
                mondayWednesday: "18:30 - 20:30",
                friday: "09:00 - 12:00"
            }
        },
        library: {
            services: [
                "برامج مثل Word",
                "مكتبة لاقتناء الكتب"
            ],
            schedule: {
                weekdays: "08:30 - 11:30",
                friday: "مغلقة"
            }
        },
        medical: {
            location: "الجناح ج، الطابق الأرضي"
        }
    },
    security: {
        gates: {
            openTime: "07:00",
            closeTime: "18:00"
        },
        emergencyContact: "مركز المراقبة رقم 1 (مدخل الإقامة)"
    },
    infoOfficer: "بثلجة محمد الحبيب",
    programInfo: {
        status: "تجريبي",
        launchDate: "يوم 22 على الساعة 22:22",
        goal: "تعزيز التواصل مع الطالبات وتطوير الخدمات"
    }
};

const welcomeMessages = [
    "مرحباً بك في الإقامة الجامعية شنتوف محمد! كيف يمكنني مساعدتك اليوم؟",
    "أهلاً وسهلاً بك! أنا هنا لمساعدتك في كل ما يتعلق بالإقامة الجامعية شنتوف محمد.",
    "مرحباً! يسعدني تقديم المساعدة لك فيما يخص خدمات الإقامة الجامعية."
];

const responseTemplates = {
    general: {
        outOfScope: "عذراً، أنا هنا لمساعدتك فيما يتعلق بخدمات الإقامة الجامعية شنتوف محمد فقط.",
        needMoreInfo: "هل يمكنك توضيح استفسارك بشكل أكثر تفصيلاً؟",
        maintenance: "يرجى التوجه إلى مركز المراقبة رقم 1 للإبلاغ عن أي مشكلة تقنية.",
        security: "في حالة أي مشكلة أمنية، يرجى التوجه مباشرة إلى الأمن الداخلي."
    },
    services: {
        internet: {
            help: "إذا واجهت مشكلة في الاتصال بالإنترنت، يمكنك تجربة الشبكات المتاحة:\nTP_Link (كلمة السر: %amine%123)\nD_Link (كلمة السر: CHEN2007)"
        },
        maintenance: {
            heating: "في حالة مشاكل التدفئة، يرجى إبلاغ مركز المراقبة رقم 1 وسيتم إرسال العون المختص.",
            electrical: "للإبلاغ عن مشاكل الكهرباء، يرجى التوجه إلى مركز المراقبة رقم 1."
        }
    }
};

const botBehavior = {
    tone: "ودود ومهني",
    focus: "خدمات الإقامة الجامعية",
    style: "واضح ومباشر",
    priorities: [
        "الرد السريع على استفسارات الطلبة",
        "توفير معلومات دقيقة عن الخدمات",
        "توجيه الطلبة للجهات المختصة عند الحاجة",
        "المساعدة في حل المشكلات التقنية والإدارية"
    ]
};

module.exports = {
    residenceData,
    welcomeMessages,
    responseTemplates,
    botBehavior
};
