import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Pen } from "lucide-react";
import { Button } from "./ui/button";

export default function MyEditAd({ ads, fillForm }) {
  return (
    <div className="w-full md:w-auto flex justify-center">
      <div className="max-w-md w-full">
        <div className="grid gap-4">
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
      </div>
    </div>
  );
}
