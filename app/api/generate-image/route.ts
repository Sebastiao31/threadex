import { NextRequest, NextResponse } from 'next/server'
import { openai } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const { prompt, tweetContent, threadName } = await request.json()

    if (!tweetContent || tweetContent.trim().length === 0) {
      return NextResponse.json(
        { error: 'Tweet content is required to generate relevant images' },
        { status: 400 }
      )
    }

    const defaultPrompt = `Create a visually engaging, high-quality image that clearly represents the following social media post:
${tweetContent}
This Thread is about ${threadName}
The image should capture and really represent the key theme or message of the post in a way that is relevant, simple and shareable on social media.

Guidelines:

Style: modern, clean, and professional

Visual elements should align with the tone and context of the content

Use composition and symbolism where appropriate to enhance understanding

Avoid clutter and focus on one clear idea
`

    // Create a detailed prompt for DALL-E based on tweet content
    const imagePrompt = prompt || defaultPrompt

    // Generate image using DALL-E 3
    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: imagePrompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      style: "vivid"
    })

    const imageUrl = imageResponse.data?.[0]?.url

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Failed to generate image' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      imageUrl,
      prompt: imagePrompt
    })

  } catch (error: any) {
    console.error('Error generating image:', error)

    if (error?.response?.status === 429) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      )
    }

    if (error?.response?.status === 401) {
      return NextResponse.json(
        { error: 'OpenAI API key is invalid or missing' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to generate image. Please try again.' },
      { status: 500 }
    )
  }
}
