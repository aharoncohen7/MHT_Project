import { useCallback, useEffect, useRef, useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { SiTheconversation } from "react-icons/si";
// import { createQuestionAction } from 'askQuestionAction.js'
import styles from "./style.module.css";
import { axiosReq } from '../../../helpers/useAxiosReq';
import { SubmitButton } from '../../buttons/SubmitButton/SubmitButton';
import Text from '../../TextComponent';
import Spinner from '../../Spinner';
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

export default function ContactUsForm() {
  const [state, setState] = useState({});
  const formRef = useRef(null);
  const [contactMethod, setContactMethod] = useState('email');
  const [contactDetails, setContactDetails] = useState('');
  const [message, setMessage] = useState(null);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [isReCaptchaLoading, setIsReCaptchaLoading] = useState(true);

  // מטפל בתגובה לשליחת הטופס
  useEffect(() => {
    if (state?.success) {
      console.log(state.question);
      if (formRef.current) {
        formRef.current.reset();
        setContactDetails("");
        setContactMethod("email");
      }
    }
    setMessage(state?.message || "");
    setTimeout(() => {
      setMessage(null);
    }, 4000);
  }, [state]);

  // מטפל בהמתנה לטעינת קומפוננט קאפצ'ה
  const handleRecaptchaLoad = useCallback(() => {
    setIsReCaptchaLoading(false);
  }, []);

  // מאפס נתונים בין מעבר בין סוגי קלטים ומעדכן סוג התקשרות
  const handleContactMethodChange = (e) => {
    setContactMethod(prev => {
      if ((prev === "email" && ["sms", "whatsapp"].includes(e.target.value)) ||
          (["sms", "whatsapp"].includes(prev) && e.target.value === "email")) {
        setContactDetails("");
      }
      return e.target.value;
    });
  }

  // שליחת הטופס
  const handleSubmit = async(event) => {
    try{
      event.preventDefault();
    
      // יצירת אובייקט FormData לקבלת נתוני הטופס
      const formData = new FormData(formRef.current);
      
      // יצירת אובייקט רגיל מנתוני הטופס
      const formValues = Object.fromEntries(formData.entries());
      
      console.log("Form submitted with values:", formValues);
      
      // קריאה לפעולה עם הנתונים שנאספו
      const action = await axiosReq({
        method: "POST",
        body: formValues,
        url: "/questions"
      });
      setState(action)
      console.log("Form action response:", action);
    
    }
    catch (error) {
      console.error("Error occurred during form submission:", error);
      setState({ success:false, message: "שגיאה אירעה במהלך השליחה" });
    }
  }
  

  return (
    <div className={styles.container}>
      {/* כותרת */}
      <Text as="h3" fontStyle="b">
        <span className={styles.header}>
          <SiTheconversation size={26} />
          {`  טופס יצירת קשר `}
        </span>
      </Text>

      {state?.error && (
        <span className={styles.message}>
          <Text as="h4" textColor="red" fontStyle="b">{state.error}</Text>
        </span>
      )}

      {/* טופס */}
      <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            {/* <Text as="h5" fontStyle="b">כותרת הפנייה</Text> */}
          </label>
          <input
            type="text"
            name='subject'
            placeholder="נושא הפנייה"
            className={styles.input}
            minLength={10}
            pattern="^[\u0590-\u05FF\s]*$"
            title="אנא הכנס כותרת בעברית בלבד"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            <Text as="h5" fontStyle="b">*תוכן הפנייה</Text>
          </label>
          <textarea
            name='content'
            placeholder="אנא נסח את פנייתך בעברית (באורך של 20 תווים ומעלה)"
            title="אנא נסח את פנייתך בעברית (באורך של 20 תווים ומעלה)"
            className={styles.textarea}
            minLength={20}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            <Text as="h5" fontStyle="b">*הזן פרטי קשר</Text>
          </label>

          <div className={styles.formGroup}>
            <input
              type={contactMethod === 'email' ? 'email' : 'tel'}
              pattern={contactMethod === 'email' ? '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$' : '^\\d{10}$'}
              title={contactMethod === 'email' ? 'אנא הכנס כתובת אימייל תקינה' : 'אנא הכנס מספר טלפון בעל 10 ספרות בדיוק'}
              minLength={contactMethod === 'email' ? 0 : 10}
              maxLength={contactMethod === 'email' ? 50 : 10}
              name={contactMethod === 'email' ? 'email' : 'phone'}
              placeholder={contactMethod === 'email' ? 'הכנס כתובת אימייל' : 'הכנס מספר טלפון'}
              className={styles.input}
              value={contactDetails}
              style={{ direction: "ltr" }}
              onChange={(e) => setContactDetails(e.target.value)}
              required
            />
            <input
              name="contactMethod"
              value={contactMethod}
              type="hidden"
              required
            />
          </div>

          <div className={styles.contactOptions}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="contactOption"
                value="email"
                className={styles.radio}
                checked={contactMethod === 'email'}
                onChange={handleContactMethodChange}
              />
              <Text as="h5" fontStyle="h">Email</Text>
            </label>

            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="contactOption"
                value="sms"
                checked={contactMethod === 'sms'}
                onChange={handleContactMethodChange}
                className={styles.radio}
              />
              <Text as="h5" fontStyle="h">SMS</Text>
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="contactOption"
                value="whatsapp"
                className={styles.radio}
                checked={contactMethod === 'whatsapp'}
                onChange={handleContactMethodChange}
              />
              <Text as="h5" fontStyle="h">WhatsApp</Text>
            </label>
          </div>
        </div>

        <div className={styles.submitButton}>
          <div className={styles.recaptcha}>
            {isReCaptchaLoading && (
              <Spinner/>
            )}
            <div style={{ display: isReCaptchaLoading ? 'none' : 'block' }}>
              <ReCAPTCHA
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={(value) => setCaptchaValue(value)}
                asyncScriptOnLoad={handleRecaptchaLoad}
              />
            </div>
          </div>
          {message ? (
            <span className={styles.message}>
              <Text as="h4" textColor="black" fontStyle="b">{message}</Text>
            </span>
          ) : (
            <SubmitButton
              text={"שלח"}
              width={"100%"}
              onPendingText={"שולח..."}
              disabled={!captchaValue}
            />
          )}
        </div>
      </form>
    </div>
  );
}


