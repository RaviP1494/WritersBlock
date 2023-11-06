export default function wReducer(openStream, action){
    switch (action.type){
        case "addSpurt":
            return {
                ...openStream,
                spurts: [
                    ...openStream.spurts,
                    {
                        ...action.spurt
                    }
                ]
            };
        case "addStream":
            return {
                id: action.nextStreamId,
                dbStreamId: null,
                title: "New Stream",
                ableToSave: false,
                spurts: [],
                tags: [],
                createDTime: Date.now()
            }
        default:
            return openStream;
    }
}
