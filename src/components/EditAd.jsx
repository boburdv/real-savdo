import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Pen } from "lucide-react";
import { Button } from "./ui/button";

export default function MyEditAd({ ads, fillForm }) {
  return (
    <div className="max-w-md w-full flex flex-col gap-4 md:mt-0 mt-8 md:max-h-[524px] md:overflow-y-auto rounded-xl">
      {ads.map((ad) => (
        <Card key={ad.id}>
          <CardContent className="space-y-2">
            <CardTitle className="line-clamp-1">{ad.title}</CardTitle>
            <p className="text-sm line-clamp-1">{ad.description}</p>
            <div className="flex justify-between items-center">
              <p className="font-medium">Narx: {ad.price}.000 so'm</p>
              <Button onClick={() => fillForm(ad)} variant="secondary" size="sm" className="flex items-center gap-2">
                <Pen className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
