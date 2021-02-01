import StoryblokClient, { StoryblokComponent, StoryData } from 'storyblok-js-client'
import { useEffect, useState } from 'react'
import { merge, debounce } from 'lodash'

const Storyblok = new StoryblokClient({
    accessToken: 'your-preview-token',
    cache: {
      clear: 'auto',
      type: 'memory'
    }
})

export function useStoryblok(originalStory: StoryData) {
    let [story, setStory] = useState(originalStory);
  
    function initEventListeners() {
      if (window.storyblok) {
        window.storyblok.init();
  
        window.storyblok.on(["change", "published"], () => location.reload(true));
  
      const inputFunction = (event: any) => {
        if (event && event.story.content._uid === story.content._uid) { 
            const newContent: any =  window.storyblok.addComments(event.story.content, event.story.id)

            if(newContent.body) {
              const mergedBody: any[] = newContent.body?.map((item: StoryblokComponent<string>) => {
                let oldItem = story.content.body.find((itemWithData: StoryblokComponent<string>) => itemWithData._uid === item._uid)
                return merge(oldItem, item)
              }).filter(Boolean)

              newContent.body = mergedBody
            }
            setStory(newContent)
        }
      }

        // we will debounce the funcction since we're doing some data processing inside
        window.storyblok.on('input', debounce(inputFunction, 300))
      }
    }
  
    function addBridge(callback: { (): void; (): void; }) {
      const existingScript = document.getElementById("storyblokBridge");
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = `https://app.storyblok.com/f/storyblok-latest.js?t=${Storyblok.accessToken}`;
        script.id = "storyblokBridge";
        document.body.appendChild(script);
        script.onload = () => {
          // once the scrip is loaded, init the event listeners
          callback();
        };
      } else {
          callback();
      }
    }
  
    useEffect(() => {
      // first load the bridge, then initialize the event listeners
      addBridge(initEventListeners);
    });
  
    return story;
  }

export default Storyblok