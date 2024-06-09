import { Expo } from 'expo-server-sdk';

// Create a new Expo SDK client
// optionally providing an access token if you have enabled push security
let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });

// structure for push token




export  const generatePushNotificationMessge = (title,body,pushToken) => {
    return {
        to: pushToken,
        sound: 'default',
        title,
        body,
        data: { 
            url: `fixitapp://--/--/notifications`,
        },
      }
}


const sendPushNotification = async(messages) => { 
    // divide the messages into separate chunk
    let chunks = expo.chunkPushNotifications(messages);
    // Send the chunks to the Expo push notification service. There are
      // different strategies you could use. A simple one is to send one chunk at a
      // time, which nicely spreads the load out over time:
      for (let chunk of chunks) {
        try {
           await expo.sendPushNotificationsAsync(chunk);
        } catch (error) {
          console.error(error);
        }
      }
 }

 export default sendPushNotification


