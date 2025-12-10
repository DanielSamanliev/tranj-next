import { GoogleMapsEmbed } from "@next/third-parties/google";

export const Map = ({ t }: { t: (key: string) => string }) => (
  <div className="space-y-4">
    <div className="bg-card p-6 rounded-lg shadow-md border">
      <h2 className="font-[Playfair] text-3xl font-bold mb-1.5 text-foreground">
        {t("findUs")}
      </h2>

      <GoogleMapsEmbed
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
        mode="place"
        width="100%"
        height={400}
        q='Tranj, Northern Industrial ZoneMladost, ul. "Troleyna" 12, 9009 Varna'
      />
    </div>
  </div>
);
