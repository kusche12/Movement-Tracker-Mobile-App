import { useState, useEffect } from 'react';
import { Accuracy, requestPermissionsAsync, watchPositionAsync } from 'expo-location';

export default (shouldTrack, callback) => {
    const [err, setErr] = useState(null);

    // useEffect runs every single time component updates
    // if array changes from true to false or vice versa, it runs another time
    useEffect(() => {
        let subscriber;
        const startWatching = async () => {
            try {
                await requestPermissionsAsync();
                // Subscriber shows that the function is running
                // if Subscriber is null, the function stops running
                subscriber = await watchPositionAsync({
                    accuracy: Accuracy.BestForNavigation,
                    timeInterval: 1000,
                    distanceInterval: 10
                }, callback
            );
            } catch (e) {
                setErr(e);
            }
        };

        if (shouldTrack) {
            startWatching();
        } else {
            if (subscriber) {
                subscriber.remove();
            }
            subscriber = null;
        }
        
        // terminate first watchPositionAsync so that you can start a new one
        return () => {
            if (subscriber) {
                subscriber.remove();
            }
        };
    }, [shouldTrack, callback]);

    return [err]; // it's an array bc that is the convention of hooks
}