import formatDate from "./FomatDate.js"
export const generateNotificationContent = (user,askerName)=>{
return `Dear ${user.fullname} you received an offer from ${askerName} 
,kindly check your order page`
}
export const generateNotificationContentToAnswerReservation = (user,answer,reservationDate,providerName)=>{
return `Dear ${user.fullname} your  offer to ${providerName}  has been ${answer === "accept" ? `approved , the  service provider will be present the ${formatDate(reservationDate.toISOString())} for the service` : "unfornately refused ,please make another reservation"}`
}
export const generateNotificationContentForPayment = (askerName,amount,providerName)=>{
return `Dear ${providerName} you received ${amount} $ from to ${askerName}  because you complete the service`
}