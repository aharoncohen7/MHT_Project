"use server"
import { connect } from "@/server/connect"
import { create } from "@/server/controller/pendingQa.controller"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const createQuestionAction = async (prevState, fd) => {
    await new Promise((resolve, reject) => { setTimeout(resolve, 1000 * 3) })
    const body = Object.fromEntries(fd)
    try {
        if (!body.question) {
            return { success: false, message: "חסר מידע" };
        }
        //אפשר לבטל אם מחליטים שאפשר לשאול שאלה אנונימית
        if ((!body.contactMethod || (!body.email && !body.phone)) || (body.contactMethod == "email" && !body.email || body.contactMethod == ("sms" || "whatsapp") && !body.phone)) {
            return { success: false, message: "פרטי התקשרות לא נקלטו בהצלחה" };
        }
        const question = {
            title: body.title || undefined,
            question: body.question,
            contactDetails: {
                contactBy: body.contactMethod,
                email: body.email || undefined,
                phone: body.phone || undefined
            }
        }
        await connect()
        const newQuestion = await create(question);
        if (newQuestion.id) {
            return { success: true, message: 'שאלתך נקלטה בהצלחה! בקרוב תקבל מענה בערוץ שבחרת', question: newQuestion };
        }
        else{
            return { success: false, message: 'אירעה שגיאה בעת השלמת השאלה. אנא נסה שוב מאוחר יותר' };
        }
        revalidatePath('/')
    } catch (error) {
        console.log({ error })
        return { success: false, message: error.message };
    }
    redirect('/')
}


