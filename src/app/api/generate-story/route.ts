import {google} from '@ai-sdk/google'
import { generateText } from 'ai'

import { NextResponse, type NextRequest } from 'next/server'

import { GAME_PROMPTS } from '@/lib/promps'
import { GAME_CONFIG } from '@/lib/consts'
import { GenerateStoryRequest } from '@/lib/type'

export async function POST(request: NextRequest) {
    try {
        const { userMessage, conversationHistory, isStart }: GenerateStoryRequest = await request.json();
        let prompt:string=GAME_PROMPTS.INITIAL_STORY;

        if(!isStart){
            const historyText=conversationHistory.map((message)=>`${message.role}:${message.content}`).join('\n');

            prompt=GAME_PROMPTS.CONTINUE_STORY(historyText, userMessage);
        }


        const {text}=await generateText({
            model: google('gemini-2.5-flash'),
            prompt,
        })

        const [narrative, imagePrompt]=text.split(GAME_CONFIG.IMAGE.SEPARATOR);

        return NextResponse.json({narrative, imagePrompt})
    } catch (error) {
        console.error('Erroe generating story:', error);
        return NextResponse.json({error: 'Erroe generating story'}, {status:500})
    }
}