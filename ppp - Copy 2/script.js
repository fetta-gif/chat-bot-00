const API_KEY = 'AIzaSyCLLm225wbWgzrJMhu_1knkalFEyHvy5e0';

// عند تحميل الصفحة
window.onload = async function() {
    try {
        // التحقق من حالة الخادم
        const healthCheck = await fetch('http://localhost:8000/health');
        if (!healthCheck.ok) {
            throw new Error('Server is not responding');
        }
        
        // عرض رسالة ترحيب عشوائية
        const welcomeMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
        addMessage(welcomeMessage, 'bot-message');
    } catch (error) {
        console.error('Server health check failed:', error);
        addMessage('عذراً، يبدو أن هناك مشكلة في الاتصال بالخادم. يرجى التأكد من تشغيل الخادم والمحاولة مرة أخرى.', 'bot-message error');
    }
};

function formatResponse(text) {
    if (!text) return '';
    return text
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        .replace(/^\* (.*$)/gm, '<li>$1</li>')
        .replace(/^(\d+\.) (.*$)/gm, '<li>$2</li>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\|\s*([^|]*)\s*\|/g, '<td>$1</td>')
        .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>');
}

function getServiceInfo(topic) {
    if (topic.includes('تدفئة')) {
        return responseTemplates.services.maintenance.heating;
    } else if (topic.includes('كهرباء')) {
        return responseTemplates.services.maintenance.electrical;
    } else if (topic.includes('انترنت') || topic.includes('واي فاي')) {
        return responseTemplates.services.internet.help;
    }
    return '';
}

function createPrompt(userMessage) {
    const message = userMessage.toLowerCase();
    let contextInfo = getServiceInfo(message);

    return `أنت مساعد افتراضي للإقامة الجامعية شنتوف محمد.
السلوك المطلوب:
- ${botBehavior.tone}
- ${botBehavior.focus}
- ${botBehavior.style}

معلومات الإقامة:
اسم الإقامة: ${residenceData.name}
المديرة: ${residenceData.director}
السعة: ${residenceData.capacity}

مواعيد مهمة:
- المطعم:
  * الإفطار: ${residenceData.services.dining.schedule.breakfast}
  * الغداء: ${residenceData.services.dining.schedule.lunch}
  * العشاء: ${residenceData.services.dining.schedule.dinner}
- المرشات: 
  * الإثنين والأربعاء: ${residenceData.services.showers.schedule.mondayWednesday}
  * الجمعة: ${residenceData.services.showers.schedule.friday}
- المكتبة: ${residenceData.services.library.schedule.weekdays}
- أبواب الإقامة: ${residenceData.security.gates.openTime} - ${residenceData.security.gates.closeTime}

${contextInfo ? 'معلومات إضافية:\n' + contextInfo + '\n' : ''}

استفسار المستخدم: ${userMessage}

قواعد مهمة:
1. قدم إجابات دقيقة ومباشرة
2. وجه الطالبات للجهات المختصة عند الحاجة
3. اذكر مواعيد الخدمات بدقة
4. قدم معلومات الاتصال بالمسؤولين عند الحاجة`;
}

function showTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.style.display = 'flex';
        const messagesDiv = document.getElementById('chat-messages');
        if (messagesDiv) {
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }
    }
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.style.display = 'none';
    }
}

let isProcessing = false;

async function sendMessage() {
    if (isProcessing) return;

    const input = document.getElementById('user-input');
    const message = input.value.trim();
    
    if (!message) return;

    isProcessing = true;
    const sendBtn = document.querySelector('.send-btn');
    if (sendBtn) {
        sendBtn.disabled = true;
    }

    addMessage(message, 'user-message');
    input.value = '';
    
    showTypingIndicator();

    try {
        const prompt = createPrompt(message);
        const response = await fetch('http://localhost:8000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                message: prompt
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        hideTypingIndicator();
        
        if (data.response) {
            addMessage(data.response, 'bot-message');
        } else if (data.error) {
            throw new Error(data.error);
        } else {
            addMessage(responseTemplates.general.needMoreInfo, 'bot-message');
        }
    } catch (error) {
        console.error('Error:', error);
        hideTypingIndicator();
        addMessage('عذراً، حدث خطأ في معالجة طلبك. يرجى التأكد من تشغيل الخادم والمحاولة مرة أخرى.', 'bot-message error');
    } finally {
        isProcessing = false;
        if (sendBtn) {
            sendBtn.disabled = false;
        }
    }
}

function addMessage(text, className) {
    const messagesDiv = document.getElementById('chat-messages');
    if (!messagesDiv) return;

    const messageElement = document.createElement('div');
    messageElement.className = `message ${className}`;
    
    if (className === 'bot-message') {
        const formattedText = formatResponse(text);
        messageElement.innerHTML = `<p>${formattedText}</p>`;
    } else {
        messageElement.textContent = text;
    }
    
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function clearChat() {
    const messagesDiv = document.getElementById('chat-messages');
    if (!messagesDiv) return;

    // حذف كل الرسائل ما عدا مؤشر الكتابة
    const typingIndicator = document.getElementById('typing-indicator');
    messagesDiv.innerHTML = '';
    if (typingIndicator) {
        messagesDiv.appendChild(typingIndicator);
    }

    // إضافة رسالة ترحيب جديدة
    const welcomeMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
    addMessage(welcomeMessage, 'bot-message');
}

// إضافة مستمع لمفتاح Enter
document.getElementById('user-input')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
