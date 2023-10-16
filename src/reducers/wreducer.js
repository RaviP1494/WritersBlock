export default function wReducer(streamsObj, action){
    switch (action.type){
        case "spurtEnd":
            let streamsObjCopy = {...streamsObj};
            if(streamsObj.streams.length === 0){
                const nullStream  = {
                    id: streamsObj.nextStreamId,
                    dbStreamId: null,
                    title: "Null Stream",
                    ableToSave: true,
                    spurts: [],
                    tags: [],
                    createDTime: Date.now()
                };
                streamsObjCopy = {
                    ...streamsObj, 
                    streams: [nullStream], 
                    targetedStreamId: streamsObj.nextStreamId,
                    nextStreamId: streamsObj.nextStreamId + 1,
                };
            }
            if(!(streamsObjCopy.streams.find((stream)=>stream.id===streamsObjCopy.targetedStreamId))){
                streamsObjCopy.targetedStreamId = streamsObjCopy.streams[0].id;
            }
            const newStreamsAddSpurt = streamsObjCopy.streams.map((stream)=>{
                if(stream.id === streamsObjCopy.targetedStreamId){
                    return {...stream, spurts: [...stream.spurts, {
                        ...action.spurt,
                        id: streamsObjCopy.nextSpurtId,
                        createDTime: Date.now()
                    }]}
                }
                return stream;
            });
            return {
                ...streamsObjCopy, 
                streams: newStreamsAddSpurt, 
                nextSpurtId: streamsObj.nextSpurtId + 1
            };
        case "streamaddnew":
            return {
                ...streamsObj, 
                nextStreamId: streamsObj.nextStreamId + 1,
                targetedStreamId: streamsObj.nextStreamId,
                streams: [
                    ...streamsObj.streams, {
                        id: streamsObj.nextStreamId,
                        dbStreamId: null,
                        title: "New Stream",
                        ableToSave: false,
                        spurts: [],
                        tags: [],
                        createDTime: Date.now()
                    }
                ]
            };
        case "streamdelete":
            const newStreamsDeleteStream = streamsObj.streams.filter(
                (stream)=>stream.id !== action.streamId
            );
            return {
                ...streamsObj, 
                streams: newStreamsDeleteStream
            };
        case "streamtarget":
            return {
                ...streamsObj,
                targetedStreamId: action.streamId
            };
        case "streamresume":
            return {
                ...streamsObj,
                streams: [...streamsObj.streams, action.stream],
                targetedStreamId: action.stream.id
            }
        case "spurtclick":
            // spurt edit button submit
            if (action.spurt.focusState === "edit") {
                const updatedStreams = streamsObj.streams.map(
                    (stream) => {
                        const spurtIndex = stream.spurts.findIndex(
                            (spurt) => spurt.id === action.spurt.id
                        );
                        if (spurtIndex === -1) {
                            return stream;
                        }
                        const newSpurts = stream.spurts.map((spurt) => {
                            if (spurt.id !== action.spurt.id) {
                                return spurt;
                            }
                            return { ...action.spurt, focusState: null};
                        });
                        return { 
                            ...stream, 
                            spurts: newSpurts, 
                            ableToSave: true 
                        };
                    }
                );
                return {
                    ...streamsObj,
                    streams: updatedStreams,
                    clickedSpurtId: null,
                };
            }
            // first spurt click
            if (
                !streamsObj.clickedSpurtId &&
                streamsObj.clickedSpurtId !== 0
            ) {
                const updatedStreams = streamsObj.streams.map(
                    (stream) => {
                        const newSpurts = stream.spurts.map((spurt) => {
                            if (spurt.id !== action.spurt.id) {
                                return spurt;
                            }
                            return { ...spurt, focusState: "clicked" };
                        });
                        return { ...stream, spurts: newSpurts };
                    }
                );
                return {
                    ...streamsObj,
                    streams: updatedStreams,
                    clickedSpurtId: action.spurt.id,
                };
            }
            // edit spurt, second click same spurt
            else if (streamsObj.clickedSpurtId === action.spurt.id) {
                const updatedStreams = streamsObj.streams.map(
                    (stream) => {
                        const spurtIndex = stream.spurts.findIndex(
                            (spurt) => spurt.id === action.spurt.id
                        );
                        if (spurtIndex === -1) {
                            return stream;
                        }
                        return {
                            ...stream,
                            spurts: stream.spurts.map((spurt, i) =>
                                i === spurtIndex ? { ...spurt, focusState: "edit" } : spurt
                            ),
                            ableToSave: false
                        };
                    }
                );
                return {
                    ...streamsObj,
                    clickedSpurtId: null,
                    streams: updatedStreams,
                };
            }
            // second click new spurt, move old spurt to position immediately after new spurt
            else {
                let movingSpurt;
                const deleteClickedSpurtStreams = streamsObj.streams.map(
                    (stream) => {
                        const clickedIndex = stream.spurts.findIndex(
                            (spurt) => spurt.id === streamsObj.clickedSpurtId
                        );
                        if (clickedIndex === -1) {
                            return stream;
                        }
                        movingSpurt = stream.spurts[clickedIndex];
                        return {
                            ...stream,
                            spurts: stream.spurts.filter((spurt, i) => i !== clickedIndex),
                            ableToSave: true
                        };
                    }
                );
                const addedClickedSpurtStreams = deleteClickedSpurtStreams.map(
                    (stream) => {
                        const clickedIndex = stream.spurts.findIndex(
                            (spurt) => spurt.id === action.spurt.id
                        );
                        if (clickedIndex === -1) {
                            return stream;
                        }
                        const newSpurts = [...stream.spurts];
                        newSpurts.splice(clickedIndex + 1, 0, {
                            ...movingSpurt,
                            focusState: null,
                        });
                        return { 
                            ...stream, 
                            spurts: newSpurts, 
                            ableToSave: true 
                        };
                    }
                );
                return {
                    ...streamsObj,
                    clickedSpurtId: null,
                    streams: addedClickedSpurtStreams,
                };
            }
        default:
            return streamsObj;
    }

}
