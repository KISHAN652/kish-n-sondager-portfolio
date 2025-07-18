import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Kishan Sondagar - Portfolio';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {

  const poppinsBold = fetch(
    new URL('./fonts/Poppins-Bold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());
  
  const poppinsRegular = fetch(
    new URL('./fonts/Poppins-Regular.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());


  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: 'hsl(208, 100%, 97%)',
          padding: '80px',
          fontFamily: '"Poppins"',
        }}
      >
        <div tw="flex flex-col">
           <h1
            style={{
              fontSize: '80px',
              fontWeight: 700,
              color: 'hsl(204, 45%, 62%)',
              margin: '0',
              lineHeight: 1,
              fontFamily: '"PoppinsBold"',
            }}
          >
            Kishan Sondagar
          </h1>
          <p
            style={{
              fontSize: '40px',
              color: 'hsl(240, 3.8%, 46.1%)',
              margin: '20px 0 0 0',
              lineHeight: 1.2,
              fontFamily: '"PoppinsRegular"',
            }}
          >
            Passionate Developer | Elegant & Efficient Web Solutions
          </p>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'PoppinsBold',
          data: await poppinsBold,
          style: 'normal',
          weight: 700,
        },
         {
          name: 'PoppinsRegular',
          data: await poppinsRegular,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  );
}
