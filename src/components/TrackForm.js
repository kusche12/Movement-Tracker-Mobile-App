import React, { useContext } from 'react';
import { Context as LocationContext } from '../context/LocationContext';
import { Input, Button } from 'react-native-elements';
import useSaveTrack from '../hooks/useSaveTrack';
import Spacer from './Spacer';

const TrackForm = () => {
    const { state, startRecording, stopRecording, changeName } = useContext(LocationContext);
    const [saveTrack] = useSaveTrack();

    return (
        <>
        <Spacer>
            <Input onChangeText={changeName} value={state.name} placeholder="Enter name" />
        </Spacer>
        <Spacer>
        {state.recording 
        ? <Button title="Stop" onPress={stopRecording}/>
        : <Button title="Start Recording" onPress={startRecording}/>
        } 
        </Spacer>
        <Spacer>
        { !state.recording && state.locations.length
        ? <Button title="Save Recording" onPress={saveTrack}/>
        : null
        }
        </Spacer>
        </>
    )
}

export default TrackForm;