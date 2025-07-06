import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default function handler(req) {
  const { searchParams } = new URL(req.url);
  const score = searchParams.get('score') || '0';
  const title = searchParams.get('title') || 'IP Lawsuit Trivia';
  const nickname = searchParams.get('nickname') || 'Player';

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: 'linear-gradient(90deg, #4B6CB7, #182848)',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          fontWeight: 'bold',
          padding: 40,
          textAlign: 'center',
        }}
      >
        <div>{nickname}</div>
        <div style={{ fontSize: 100, margin: '20px 0' }}>{score}</div>
        <div>{title}</div>
        <div style={{ fontSize: 24, marginTop: 40 }}>Can you beat me?</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
