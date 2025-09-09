import {google} from '@ai-sdk/google'
import { generateText } from 'ai'

import { NextResponse, type NextRequest } from 'next/server'

import { GAME_PROMPTS } from '@/lib/promps'
import { GAME_CONFIG } from '@/lib/consts'
import { generateImageRequest } from '@/lib/type'


export async function POST(request: NextRequest) {
    try {
        const { imageProps }: generateImageRequest = await request.json();
        
        const prompt=GAME_PROMPTS.GENERATE_IMAGE(imageProps)
    
        const {files}=await generateText({
            model: google('gemini-2.5-flash-image-preview'),
            prompt,
            providerOptions:{
                google:{
                    responseModalities:['IMAGE']
                }
            }
        })

        console.log('generated images: ',files)

        return NextResponse.json({image:files[0]||null})
    } catch (error) {
        console.error('Erroe generating story:', error);
        return NextResponse.json({error: 'Erroe generating story'}, {status:500})
    }
}