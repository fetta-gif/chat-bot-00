from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import logging
import json
import os
import sys

# إعداد التسجيل
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler('server.log')
    ]
)
logger = logging.getLogger(__name__)

def load_residence_data():
    try:
        with open('residence_data.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
            logger.info("Successfully loaded residence data")
            return data
    except Exception as e:
        logger.error(f"Failed to load residence data: {str(e)}")
        sys.exit(1)

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}})
    
    # تحميل بيانات الإقامة
    residence_data = load_residence_data()
    
    # تكوين Gemini API
    API_KEY = "AIzaSyALyRoZZ0jdbsddK-ZlxmyBtyj-KyImkzE"
    try:
        genai.configure(api_key=API_KEY)
        model = genai.GenerativeModel('gemini-pro')
        logger.info("Successfully configured Gemini API")
    except Exception as e:
        logger.error(f"Failed to configure Gemini API: {str(e)}")
        sys.exit(1)

    @app.route('/health')
    def health_check():
        try:
            return jsonify({"status": "healthy"}), 200
        except Exception as e:
            logger.error(f"Health check failed: {str(e)}")
            return jsonify({"status": "unhealthy", "error": str(e)}), 500

    @app.route('/chat', methods=['POST', 'OPTIONS'])
    def chat():
        if request.method == 'OPTIONS':
            headers = {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
            return ('', 204, headers)

        try:
            logger.info("Received chat request")
            data = request.get_json()
            
            if not data or 'message' not in data:
                logger.error("Invalid request data")
                return jsonify({"error": "Invalid request"}), 400
                
            user_message = data['message']
            logger.info(f"Processing message: {user_message[:100]}...")
            
            # إضافة سياق إضافي للمساعد
            context = f"""أنت {residence_data['chat_bot']['name']}، مساعدة افتراضية ذكية واحترافية للإقامة الجامعية {residence_data['residence_info']['name']}.

شخصيتك:
{residence_data['chat_bot']['personality']['tone']}
{residence_data['chat_bot']['personality']['focus']}
{residence_data['chat_bot']['personality']['style']}

معلومات الإقامة:
- اسم الإقامة: {residence_data['residence_info']['name']}
- المديرة: {residence_data['residence_info']['director']}
- السعة: {residence_data['residence_info']['capacity']}

مواعيد مهمة:
- المطعم:
  * الإفطار: {residence_data['services']['dining']['schedule']['breakfast']['time']}
  * الغداء: {residence_data['services']['dining']['schedule']['lunch']['time']}
  * العشاء: {residence_data['services']['dining']['schedule']['dinner']['time']}
- المرشات:
  * الإثنين والأربعاء: {residence_data['services']['showers']['schedule']['monday_wednesday']['time']}
  * الجمعة: {residence_data['services']['showers']['schedule']['friday']['time']}
- المكتبة: {residence_data['services']['library']['schedule']['weekdays']}
- أبواب الإقامة: {residence_data['security']['gates']['open_time']} - {residence_data['security']['gates']['close_time']}

للحالات الطارئة:
- مركز المراقبة: {residence_data['security']['emergency']['control_center']} (متاح {residence_data['security']['emergency']['available']})

قواعد مهمة:
1. قدمي إجابات دقيقة ومباشرة بناءً على البيانات المتاحة فقط
2. وجهي الطالبات للجهات المختصة عند الحاجة
3. اذكري مواعيد الخدمات بدقة
4. قدمي معلومات الاتصال بالمسؤولين عند الحاجة

استفسار المستخدم: {user_message}"""

            response = model.generate_content(context)
            
            if response.text:
                logger.info("Successfully generated response")
                return jsonify({"response": response.text})
            else:
                logger.error("Empty response from model")
                return jsonify({"error": "No response generated"}), 500
                
        except Exception as e:
            logger.error(f"Error in chat endpoint: {str(e)}")
            return jsonify({"error": str(e)}), 500

    return app

if __name__ == '__main__':
    try:
        port = 8000
        logger.info(f"Starting server on port {port}")
        app = create_app()
        app.run(host='0.0.0.0', port=port, debug=True)
    except Exception as e:
        logger.error(f"Failed to start server: {str(e)}")
        sys.exit(1)
