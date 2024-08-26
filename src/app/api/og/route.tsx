import { ImageResponse } from "next/og";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          fontSize: 32,
          fontWeight: 600,
        }}
      >
        <div style={{ marginTop: 40 }}>Plebresume</div>
        <div style={{ marginTop: 10, fontSize: 20, fontWeight: 400 }}>
          Where plebs like you get unlimited ai assisted resumes and
          coverletters
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
