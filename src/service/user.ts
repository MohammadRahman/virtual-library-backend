import { UserDocument, UserInputs, USER_MODEL } from "../models/user";
import { databaseResponseTimeHistogram } from "../utils/metrics";

export async function createUserService(input: UserInputs) {
    const metricsLabel = {
        operation: 'createUserService'
    }
    const timer = databaseResponseTimeHistogram.startTimer()
    try {
        const result = await USER_MODEL.create(input)
        timer({ ...metricsLabel,success:'true' })
        return result
    } catch (error) {
        timer({ ...metricsLabel, success: 'true' })
        return error
    }
}
export async function findOneUserByEmail(email: UserDocument['email']) {
    
        const metricsLabel = {
            operation: 'createUserService'
        }
    const timer = databaseResponseTimeHistogram.startTimer()
    
    try {
        const result = await USER_MODEL.findOne({ email })
        timer({ ...metricsLabel, success: 'true' })
        return result
    } catch (error) {
        timer({ ...metricsLabel, success: 'true' })
        return error
    }
       
}