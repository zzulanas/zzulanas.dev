import { ImageResponse } from "next/server";
// App router includes @vercel/og.
// No need to install it.

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "flex-start",
          justifyContent: "center",
          flexDirection: "row",
          background: "linear-gradient(140deg, #dbf4ff, #fff1f1)",
          fontSize: 60,
          letterSpacing: -2,
          fontWeight: 700,
          textAlign: "center",
          padding: "100px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgb(0, 124, 240), rgb(0, 223, 216))",
              backgroundClip: "text",
              "-webkit-background-clip": "text",
              color: "rgba(241,146,60,1)",
            }}
          >
            Zachary
          </div>
          <div
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgb(121, 40, 202), rgb(255, 0, 128))",
              backgroundClip: "text",
              "-webkit-background-clip": "text",
              color: "transparent",
            }}
          >
            Zulanas
          </div>
          <div
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgb(255, 77, 77), rgb(249, 203, 40))",
              backgroundClip: "text",
              "-webkit-background-clip": "text",
              color: "black",
            }}
          >
            /zzulanas.dev
          </div>
        </div>
        <div
          style={{
            display: "flex",
            padding: "10px",
            borderRadius: 128,
            background:
              "linear-gradient(141deg, rgba(241,146,60,1) 0%, rgba(231,121,249,0.8281513288909313) 48%, rgba(52,211,153,1) 100%)",
          }}
        >
          <img
            width="200"
            height="200"
            src={`https://qgxvhncvypeqowyohhys.supabase.co/storage/v1/object/public/blog-images/me?t=2023-06-29T18%3A05%3A32.888Z`}
            style={{
              borderRadius: 128,
            }}
          />
        </div>
      </div>
    ),
    {
      width: 800,
      height: 400,
    }
  );
}
