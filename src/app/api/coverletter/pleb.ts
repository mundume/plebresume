// @ts-nocheck

while (!done) {
        const { done: doneReading, value } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        accumulatedResponse += chunkValue;
        utils.getCoverLetter.setInfiniteData({ fileId }, (oldData) => {
          if (!oldData) {
            return {
              pages: [],
              pageParams: [],
            };
          }
          let newPages = [...oldData.pages];

          let latestPages = newPages[0]!;
          let isAiResponseCreated = oldData.pages.some(
            (mesage) => (mesage.id = "ai-response")
          );
          let updatedMessages = oldData?.pages.map((page) => {
             if (page === oldData.pages[0]) {
               let updatedMessages;
               if (!isAiResponseCreated) {
                 updatedMessages = [
                   {
                     createdAt: new Date().toISOString(),
                     id: "ai-response",
                     text: accumulatedResponse,
                   },
                   page,
                 ];
               } else {
                if (page.id === "ai-response") {
                  updatedMessages = [
                   {
                      ...page,
                      text: accumulatedResponse,
                    },

                  ];
                   return page
                }
               }

return {
                 ...page,
                  messages: updatedMessages,
};

            } )
          return

        });
      }