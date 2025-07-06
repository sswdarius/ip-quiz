import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const score = searchParams.get('score') || '0';
  const title = searchParams.get('title') || 'IP Quiz';
  const nickname = searchParams.get('nickname') || 'Player';

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: '#1e40af',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: 48,
          fontWeight: 'bold',
          padding: 40,
          boxSizing: 'border-box',
        }}
      >
        <div>{nickname}'s IP Quiz Result</div>
        <div style={{ fontSize: 72, marginTop: 20 }}>{score} Points</div>
        <div style={{ fontSize: 48, marginTop: 20 }}>{title}</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
