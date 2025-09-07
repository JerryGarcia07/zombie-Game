'use client'
import { useEffect } from "react";

export default function Home() {
  useEffect(()=>{
    fetch('/api/generate-story', {
    method: 'POST',
    body: JSON.stringify({
      userMessage: 'I want to go to the store',
      conversationHistory: [],
      isStart: true
    })
  }).then(res=>res.json())
  .then((data)=>{console.log(data)})
  .catch(error=>console.log('error generating story:', error));

  })
  return (
    <div className="font-sans min-h-screen p-8 ">        
    zombie apocalice game
    </div>
  );
}
