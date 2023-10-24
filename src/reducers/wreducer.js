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
        case "spurtselect":
            return {
                ...streamsObj,
                suspenSpurt: {...action.spurt, streamId: action.streamId},
                suspenStream: null
                };
        case "suspstreamselect":
            return {
                ...streamsObj,
                suspenSpurt: null,
                suspenStream: action.stream
            };
        case "streamtitleclick":
            return {
                ...streamsObj,
                suspenSpurt: null,
                suspenStream: action.stream
            }
        case "clearinfoblock":
            return {
                ...streamsObj,
                suspenSpurt: null,
                suspenStream: null
            };
        case "suspstreamtitleeditstart":
            return {
                ...streamsObj,
                suspenStream: {
                    ...streamsObj.suspenStream,
                    editTitleState: true
                }
            }
        case "suspstreamtitleeditend":
            return {
                ...streamsObj,
                suspenStream: {
                    ...streamsObj.suspenStream,
                    editTitleState: false,
                    title: action.title
                },
                streams: streamsObj.streams.map((stream)=>{
                    if(stream.id !== streamsObj.suspenStream.id){
                        return stream;
                    }
                    return {
                        ...stream,
                        title: action.title
                    }
                })
            };
        case "spurtdelete":
            return {
                ...streamsObj,
                streams: streamsObj.streams.map((stream)=>{
                    if(stream.id !== action.spurt.streamId){
                        return stream;
                    }
                    return {...stream, spurts: stream.spurts.filter((spurt)=>{
                        return spurt.id !== action.spurt.id;
                    })};
                })
            };
        case "spurteditstart":
            return {
                ...streamsObj, 
                suspenSpurt: {
                    ...streamsObj.suspenSpurt,
                    editState: true
                }
            };
        case "spurteditend":
            return {
                ...streamsObj,
                suspenSpurt: {
                    ...streamsObj.suspenSpurt,
                    text: action.suspenSpurt.text,
                    editState: false
                },
                streams: streamsObj.streams.map((stream)=>{
                    if(stream.id !== action.suspenSpurt.streamId){
                        return stream;
                    }
                    else{
                        return {...stream, spurts: stream.spurts.map((spurt)=>{
                            if(spurt.id !== action.suspenSpurt.id){
                                return spurt;
                            }
                            else{
                                return  {
                                    ...spurt, 
                                    text: action.suspenSpurt.text
                                }
                            }
                        })};
                    }
                })};
        default:
            return streamsObj;
    }

}
